<template>
<div>
    <panel :icon="mdiMulticast" :title="title" :collapsible="true" card-class="mmu-panel">
        <template #buttons>
            <v-menu left offset-y :close-on-content-click="false">
                <template #activator="{ on, attrs }">
                    <v-btn icon tile v-bind="attrs" v-on="on">
                        <v-icon>{{ mdiDotsVertical }}</v-icon>
                    </v-btn>
                </template>
                <v-list dense>
                    <v-list-item :disabled="['printing'].includes(printer_state) || !enabled" :class="{ 'mmu-disabled': !enabled }">
                        <v-btn small style="width: 100%"
                               :loading="loadings.includes('mmu_recover')"
                               @click="doLoadingSend('MMU_RECOVER', 'mmu_recover')">
                            <v-icon left>{{ mdiAutoFix }}</v-icon>
                            {{ $t('Panels.MmuPanel.RecoverFilamentPosition') }}
                        </v-btn>
                    </v-list-item>
                    <v-list-item :disabled="['printing'].includes(printer_state) || !enabled" :class="{ 'mmu-disabled': !enabled }">
                        <v-btn small style="width: 100%"
                               :loading="loadings.includes('mmu_check_gates')"
                               @click="doLoadingSend('MMU_CHECK_GATES', 'mmu_check_gates')">
                            <v-icon left>{{ mdiCheckAll }}</v-icon>
                            {{ $t('Panels.MmuPanel.CheckAllGates') }}
                        </v-btn>
                    </v-list-item>
                    <v-list-item :disabled="['printing'].includes(printer_state) || !enabled" :class="{ 'mmu-disabled': !enabled }">
                        <v-btn small style="width: 100%" @click="showRecoverStateDialog = true">
                            <v-icon left>{{ mdiCogRefresh }}</v-icon>
                            {{ $t('Panels.MmuPanel.RecoverState') }}
                        </v-btn>
                    </v-list-item>
                    <v-list-item :disabled="['printing'].includes(printer_state) || !enabled" :class="{ 'mmu-disabled': !enabled }">
                        <v-btn small style="width: 100%" @click="showEditTtgMapDialog = true">
                            <v-icon left>{{ mdiStateMachine }}</v-icon>
                            {{ $t('Panels.MmuPanel.EditTtgMap') }}
                        </v-btn>
                    </v-list-item>
                    <v-list-item :disabled="['printing'].includes(printer_state) || !enabled" :class="{ 'mmu-disabled': !enabled }">
                        <v-btn small style="width: 100%" @click="showEditGateMapDialog = true">
                            <v-icon left>{{ mdiDatabaseEdit }}</v-icon>
                            {{ $t('Panels.MmuPanel.EditGateMap') }}
                        </v-btn>
                    </v-list-item>
                    <v-list-item :disabled="['printing'].includes(printer_state) || !enabled" :class="{ 'mmu-disabled': !enabled }">
                        <v-btn small style="width: 100%" @click="showMaintenanceDialog = true">
                            <v-icon left>{{ mdiWrenchCog }}</v-icon>
                            {{ $t('Panels.MmuPanel.MmuMaintenance') }}
                        </v-btn>
                    </v-list-item>
                    <v-list-item :disabled="!enabled" :class="{ 'mmu-disabled': !enabled }">
                        <v-btn small style="width: 100%"
                               :loading="loadings.includes('mmu_stats')"
                               @click="doLoadingSend('MMU_STATS SHOWCOUNTS=1', 'mmu_stats')">
                            <v-icon left>{{ mdiNoteText }}</v-icon>
                            {{ $t('Panels.MmuPanel.PrintStats') }}
                        </v-btn>
                    </v-list-item>
                </v-list>
            </v-menu>
            <mmu-panel-settings/>
        </template>

        <div :class="{ 'mmu-disabled': !enabled }">
            <v-container fluid>
                <v-row align="start">
                    <mmu-machine/>
                </v-row>
                <v-row align="start">
                    <v-col cols="5" class="pt-0 d-flex flex-column align-center justify-center">
                        <div class="text--disabled smaller-font min-height-text">{{ toolchangeText }}</div>
                        <div class="min-height-text">{{ statusText }}</div>
                        <mmu-filament-status/>
                        <template v-if="showClogDetection">
                            <mmu-clog-meter v-if="hasEncoder" width="40%"/>
                            <div class="text--disabled">Clog Detection</div>
                        </template>
                    </v-col>
                    <v-col cols="7" class="d-flex flex-column align-center justify-center">
                        <template v-if="showDetails">
                            <v-row class="pb-3 pt-0" style="align-self: flex-start; width: 100%;">
                                <mmu-active-gate-summary/>
                            </v-row>
                        </template>
                        <v-divider style="width: 100%;"/>
                        <mmu-controls/>
                        <v-divider style="width: 100%;"/>
                        <template v-if="showTtgMap">
                            <mmu-ttg-map :startY="20" width="75%"></mmu-ttg-map>
                            <div class="text--disabled">Tool Mapping</div>
                        </template>
                    </v-col>
                </v-row>
                <v-row>
                    <v-divider/>
                </v-row>
                <v-row v-if="reasonForPause">
                    <v-col cols="auto" class="d-flex align-center justify-center">
                        <v-icon class="error-icon">{{ mdiInformationOutline }}</v-icon>
                    </v-col>
                    <v-col class="d-flex align-center">
                        <div>
                            <div class="text--secondary"><strong>Last Error</strong></div>
                            <div class="text--disabled smaller-font">{{ reasonForPause }}</div>
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </panel>
    <mmu-recover-state-dialog :show-dialog="showRecoverStateDialog" @close="showRecoverStateDialog = false"/>
    <mmu-edit-ttg-map-dialog :show-dialog="showEditTtgMapDialog" @close="showEditTtgMapDialog = false"/>
    <mmu-edit-gate-map-dialog :show-dialog="showEditGateMapDialog" @close="showEditGateMapDialog = false"/>
    <mmu-maintenance-dialog :show-dialog="showMaintenanceDialog" @close="showMaintenanceDialog = false"/>
</div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import BaseMixin from '@/components/mixins/base'
import MmuMixin from '@/components/mixins/mmu'
import { mdiMulticast, mdiDotsVertical, mdiAutoFix, mdiCheckAll, mdiWrenchCog, mdiCogRefresh, mdiDatabaseEdit, mdiStateMachine, mdiNoteText, mdiInformationOutline } from '@mdi/js'
import Panel from '@/components/ui/Panel.vue'
import MmuMachine from '@/components/panels/Mmu/MmuMachine.vue'
import MmuPanelSettings from '@/components/panels/Mmu/MmuPanelSettings.vue'
import MmuFilamentStatus from '@/components/panels/Mmu/MmuFilamentStatus.vue'
import MmuClogMeter from '@/components/panels/Mmu/MmuClogMeter.vue'
import MmuActiveGateSummary from '@/components/panels/Mmu/MmuActiveGateSummary.vue'
import MmuControls from '@/components/panels/Mmu/MmuControls.vue'
import MmuTtgMap from '@/components/panels/Mmu/MmuTtgMap.vue'

@Component({
    components: { Panel, MmuMachine, MmuPanelSettings, MmuFilamentStatus, MmuClogMeter, MmuActiveGateSummary, MmuControls, MmuTtgMap},
})
export default class MmuPanel extends Mixins(BaseMixin, MmuMixin) {
    mdiMulticast = mdiMulticast
    mdiDotsVertical = mdiDotsVertical
    mdiAutoFix = mdiAutoFix
    mdiCheckAll = mdiCheckAll
    mdiWrenchCog = mdiWrenchCog
    mdiCogRefresh = mdiCogRefresh
    mdiDatabaseEdit = mdiDatabaseEdit
    mdiStateMachine = mdiStateMachine
    mdiNoteText = mdiNoteText
    mdiInformationOutline = mdiInformationOutline

    showRecoverStateDialog = false
    showEditTtgMapDialog = false
    showEditGateMapDialog = false
    showMaintenanceDialog = false

    get title() {
        const headline = this.$t('Panels.MmuPanel.Headline') as string
        if (!this.enabled) {
            return `${headline} (disabled)`
        }
        return headline
    }

    get showClogDetection(): boolean {
        return !this.hasEncoder || !!this.$store.state.gui.view.mmu.showClogDetection
    }

    get showTtgMap(): boolean {
        return this.$store.state.gui.view.mmu.showTtgMap ?? true
    }

    get showDetails(): boolean {
        return this.$store.state.gui.view.mmu.showDetails ?? true
    }

    get statusText(): string {
        let posStr: string = ""
        if (["complete", "error", "cancelled", "started"].includes(this.printState)) {
            posStr = capitalize(this.printState)
        } else if (this.action == "Idle") {
            posStr = (this.filament !== "Unloaded") ? `Filament: ${this.filamentPosition}mm` : "Filament: Unloaded";
        } else if (this.action === "Loading" || this.action === "Unloading") {
            posStr = `${this.action}: ${this.filamentPosition}mm`
        } else {
            posStr = this.action
        }
        return posStr
    }

    private capitalize(str: string): string {
        if (!str) return str;
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    handleEditTtgMap() {
        console.log('Received edit-ttg-map event');
    }

    mounted() {
        if (this.$store.state.printer.mmu?.spoolman_support ?? 'off' !== 'off') {
            this.refreshSpoolmanData()
        }
    }
}
</script>

<style scoped>
.mmu-disabled {
    pointer-events: none !important;
    opacity: 0.5 !important;
}

.error-icon {
    color: red;
}

.smaller-font {
    font-size: 0.8em;
}
.min-height-text {
    min-height: 1.2em;
    line-height: 1.2em;
}
</style>

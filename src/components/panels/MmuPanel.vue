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
                        <v-btn small style="width: 100%" @click="doSend('MMU_CHECK_GATES')">
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
                        <v-btn small style="width: 100%" @click="doSend('MMU_STATS SHOWCOUNTS=1')">
                            <v-icon left>{{ mdiNoteText }}</v-icon>
                            {{ $t('Panels.MmuPanel.PrintStats') }}
                        </v-btn>
                    </v-list-item>
                </v-list>
            </v-menu>
            <mmu-panel-settings/>
        </template>

        <div :class="{ 'mmu-disabled': !enabled }">
            <mmu-machine/>
            <v-container pt-0 fluid>
                <v-row align="start">
                    <v-col cols="5" class="d-flex flex-column justify-center align-center">
                        <mmu-filament-status/>
                        <template v-if="showClogDetection">
                            <mmu-clog-meter v-if="hasEncoder" width="40%"/>
                            <div class="text--disabled">Clog Detection</div>
                        </template>
                    </v-col>
                    <v-col cols="7" class="d-flex flex-column align-center justify-center">
                        <v-row class="pb-3 pt-6" style="align-self: flex-start; width: 100%;">
                            <mmu-active-gate-summary/>
                        </v-row>
                        <v-divider style="width: 100%;"/>
                        <mmu-controls/>
                        <template v-if="showTtgMap">
                            <v-divider style="width: 100%;"/>
                            <mmu-ttg-map width="75%"></mmu-ttg-map>
                            <div class="text--disabled">Tool Mapping</div>
                        </template>
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
import ControlMixin from '@/components/mixins/control'
import { mdiMulticast, mdiDotsVertical, mdiCheckAll, mdiWrenchCog, mdiCogRefresh, mdiDatabaseEdit, mdiStateMachine, mdiNoteText } from '@mdi/js'
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
export default class MmuPanel extends Mixins(BaseMixin, ControlMixin) {
    mdiMulticast = mdiMulticast
    mdiDotsVertical = mdiDotsVertical
    mdiCheckAll = mdiCheckAll
    mdiWrenchCog = mdiWrenchCog
    mdiCogRefresh = mdiCogRefresh
    mdiDatabaseEdit = mdiDatabaseEdit
    mdiStateMachine = mdiStateMachine
    mdiNoteText = mdiNoteText

    showRecoverStateDialog = false
    showEditTtgMapDialog = false
    showEditGateMapDialog = false
    showMaintenanceDialog = false

    get hasEncoder() {
        return !!this.$store.state.printer.mmu?.encoder;
    }

    get enabled() {
        return this.$store.state.printer.mmu?.enabled ?? false
    }

    get title() {
        const headline = this.$t('Panels.MmuPanel.Headline') as string
        if (!this.enabled) {
            return `${headline} (disabled)`
        }
        return headline
    }

    get showClogDetection(): boolean {
        return !this.hasEncoder || !!this.$store.state.gui.view.mmu.showClogDetection;
    }

    get showTtgMap(): boolean {
        return this.$store.state.gui.view.mmu.showTtgMap ?? true;
    }

    get showDetails(): boolean {
        return this.$store.state.gui.view.mmu.showDetails ?? true;
    }


/* PAUL
    get active_spool(): ServerSpoolmanStateSpool | null {
        return this.$store.state.server.spoolman.active_spool ?? null
    }

    get toolsWithSpoolId() {
        return Object.keys(this.$store.state.printer)
            .filter((key) => /^gcode_macro T\d+$/i.test(key.toLowerCase()))
            .filter((keys) => {
                const object = this.$store.state.printer[keys] ?? {}

                return Object.keys(object).some((key) => key.toLowerCase() === 'spool_id')
            })
    }
*/

    mounted() {
        if (this.$store.state.printer.mmu?.spoolman_support ?? 'off' !== 'off') {
            this.refreshSpoolData()
        }
    }

    refreshSpoolData() {     
        this.$store.dispatch('server/spoolman/refreshSpools')
    }
}
</script>

<style scoped>
.mmu-disabled {
  pointer-events: none !important;
  opacity: 0.5 !important;
}

</style>

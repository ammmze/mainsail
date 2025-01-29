<template>
<panel
    :icon="mdiMulticast"
    :title="title"
    :collapsible="true"
    card-class="mmu-panel">

    <!-- PANEL-HEADER 3-DOT-MENU -->
    <template #buttons>
        <v-menu left offset-y :close-on-content-click="false" class="pa-0">
            <template #activator="{ on, attrs }">
                <v-btn icon tile v-bind="attrs" :disabled="['printing'].includes(printer_state)" v-on="on">
                    <v-icon>{{ mdiDotsVertical }}</v-icon>
                </v-btn>
            </template>
            <v-list dense>
                <v-list-item>
                    <v-btn small style="width: 100%" @click="showEjectSpoolDialog = true">
                        <v-icon left>{{ mdiCheckAll }}</v-icon>
                        {{ $t('Panels.MmuPanel.CheckAllGates') }}
                    </v-btn>
                </v-list-item>
                <v-list-item>
                    <v-btn small style="width: 100%" @click="showEjectSpoolDialog = true">
                        <v-icon left>{{ mdiWrenchCog }}</v-icon>
                        {{ $t('Panels.MmuPanel.RecoverState') }}
                    </v-btn>
                </v-list-item>
                <v-list-item>
                    <v-btn small style="width: 100%" @click="showEjectSpoolDialog = true">
                        <v-icon left>{{ mdiGraph }}</v-icon>
                        {{ $t('Panels.MmuPanel.EditTtgMap') }}
                    </v-btn>
                </v-list-item>
                <v-list-item>
                    <v-btn small style="width: 100%" @click="showEjectSpoolDialog = true">
                        <v-icon left>{{ mdiDatabaseEdit }}</v-icon>
                        {{ $t('Panels.MmuPanel.EditGateMap') }}
                    </v-btn>
                </v-list-item>
                <v-list-item>
                    <v-btn small style="width: 100%" @click="showEjectSpoolDialog = true">
                        <v-icon left>{{ mdiStateMachine }}</v-icon>
                        {{ $t('Panels.MmuPanel.MmuMaintenance') }}
                    </v-btn>
                </v-list-item>
                <v-list-item>
                    <v-btn small style="width: 100%" @click="showEjectSpoolDialog = true">
                        <v-icon left>{{ mdiNoteText }}</v-icon>
                        {{ $t('Panels.MmuPanel.PrintStats') }}
                    </v-btn>
                </v-list-item>
            </v-list>
        </v-menu>
       <mmu-panel-settings />
    </template>

    <!-- VISUALIZATION OF PHYSICAL MMUs -->
    <mmu-machine/>

    <!-- FILAMENT VISUALIZATION AND CONTROLS -->
    <v-container pt-0 fluid>
        <v-row align="start">
            <v-col cols="5" class="d-flex flex-column justify-center align-center">
                <mmu-filament-status/>
                <template v-if="showClogDetection">
                    <mmu-clog-meter v-if="hasEncoder" width="40%"/>
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
                    <mmu-ttg-map width="70%"></mmu-ttg-map>
                </template>
            </v-col>
        </v-row>
    </v-container>
</panel>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import BaseMixin from '@/components/mixins/base'
import { mdiMulticast, mdiDotsVertical, mdiCheckAll, mdiWrenchCog, mdiGraph, mdiDatabaseEdit, mdiStateMachine, mdiNoteText } from '@mdi/js'
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
export default class MmuPanel extends Mixins(BaseMixin) {
    mdiMulticast = mdiMulticast
    mdiDotsVertical = mdiDotsVertical
    mdiCheckAll = mdiCheckAll
    mdiWrenchCog = mdiWrenchCog
    mdiGraph = mdiGraph
    mdiDatabaseEdit = mdiDatabaseEdit
    mdiStateMachine = mdiStateMachine
    mdiNoteText = mdiNoteText

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
</style>

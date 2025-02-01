<template>
<v-container class="d-flex flex-column">
    <v-row dense>
      <v-col cols="6">
        <v-btn block small color="secondary"
               :disabled="['printing'].includes(printer_state)"
               :loading="loadings.includes('mmu_preload')"
               @click="doLoadingSend('MMU_PRELOAD', 'mmu_preload')">
            {{ $t('Panels.MmuPanel.ButtonPreload') }}
        </v-btn>
      </v-col>
      <v-col cols="6">
        <v-btn block small color="secondary"
               :disabled="['printing'].includes(printer_state)"
               :loading="loadings.includes('mmu_eject')"
               @click="doLoadingSend('MMU_EJECT', 'mmu_eject')">
            <v-icon>{{ mdiEject }}</v-icon>
            {{ $t('Panels.MmuPanel.ButtonEject') }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="6">
        <v-btn block small color="secondary"
               :disabled="['printing'].includes(printer_state)"
               :loading="loadings.includes('mmu_check_gate')"
               @click="doLoadingSend('MMU_CHECK_GATE', 'mmu_check_gate')">
            {{ $t('Panels.MmuPanel.ButtonCheckGate') }}
        </v-btn>
      </v-col>
      <v-col cols="6">
        <v-btn block small color="secondary"
               :disabled="['printing'].includes(printer_state) || printState !== 'pause_locked'"
               :loading="loadings.includes('mmu_unlock')"
               @click="doLoadingSend('MMU_UNLOCK', 'mmu_unlock')">
            <v-icon>{{ mdiThermometerPlus }}</v-icon>
            {{ $t('Panels.MmuPanel.ButtonUnlock') }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn block medium color="secondary"
               class="btnMinWidthAuto fill-width"
               :disabled="['printing'].includes(printer_state) || filamentPos === FILAMENT_POS_UNLOADED"
               :loading="loadings.includes('mmu_unload')"
               @click="doLoadingSend('MMU_UNLOAD', 'mmu_unload')">
            <v-icon>{{ mdiArrowCollapseUp }}</v-icon>
            {{ $t('Panels.MmuPanel.ButtonUnload') }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn block medium color="secondary"
               class="btnMinWidthAuto fill-width"
               :disabled="['printing'].includes(printer_state) || filamentPos !== FILAMENT_POS_UNLOADED"
               :loading="loadings.includes('mmu_load')"
               @click="doLoadingSend('MMU_LOAD', 'mmu_load')">
            <v-icon>{{ mdiArrowCollapseDown }}</v-icon>
            {{ $t('Panels.MmuPanel.ButtonLoad') }}
        </v-btn>
      </v-col>
    </v-row>
</v-container>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import BaseMixin from '@/components/mixins/base'
import MmuMixin from '@/components/mixins/mmu'
import { mdiEject, mdiThermometerPlus, mdiArrowCollapseUp, mdiArrowCollapseDown } from '@mdi/js'

@Component({ })
export default class MmuControls extends Mixins(BaseMixin, MmuMixin) {
    mdiEject = mdiEject
    mdiThermometerPlus = mdiThermometerPlus
    mdiArrowCollapseUp = mdiArrowCollapseUp
    mdiArrowCollapseDown = mdiArrowCollapseDown
}
</script>

<style scoped>
.btnMinWidthAuto {
    min-width: auto !important;
}
</style>

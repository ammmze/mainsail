<template>
<v-container class="d-flex flex-column">
    <v-row dense>
      <v-col cols="6">
        <v-btn block small color="secondary"
               :disabled="['printing'].includes(printer_state)"
               :loading="loadings.includes('mmu_preload')"
               @click="doLoadingSend('MMU_PRELOAD', 'mmu_preload')">
            <v-icon left>{{ mdiDownloadOutline }}</v-icon>
            {{ $t('Panels.MmuPanel.ButtonPreload') }}
        </v-btn>
      </v-col>
      <v-col cols="6">
        <v-btn block small color="secondary"
               :disabled="['printing'].includes(printer_state)"
               :loading="loadings.includes('mmu_eject')"
               @click="doLoadingSend('MMU_EJECT', 'mmu_eject')">
            <v-icon left>{{ mdiEject }}</v-icon>
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
            <v-icon left>{{ mdiCheck }}</v-icon>
            {{ $t('Panels.MmuPanel.ButtonCheckGate') }}
        </v-btn>
      </v-col>
      <v-col cols="6">
        <v-btn block small color="secondary"
               :disabled="['printing'].includes(printer_state)"
               :loading="loadings.includes('mmu_recover')"
               @click="doLoadingSend('MMU_RECOVER', 'mmu_recover')">
            <v-icon left>{{ mdiAutoFix }}</v-icon>
            {{ $t('Panels.MmuPanel.ButtonRecover') }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="2"></v-col>
      <v-col cols="8">
        <v-btn block small color="secondary"
               :disabled="['printing'].includes(printer_state) || printState !== 'pause_locked'"
               :loading="loadings.includes('mmu_unlock')"
               @click="doLoadingSend('MMU_UNLOCK', 'mmu_unlock')">
            <v-icon left>{{ mdiThermometerPlus }}</v-icon>
            {{ $t('Panels.MmuPanel.ButtonUnlock') }}
        </v-btn>
      </v-col>
      <v-col cols="2"></v-col>
    </v-row>
  <v-row>
    <v-col cols="6">
      <v-btn large block color="secondary"
             class="tall-button"
             :disabled="['printing'].includes(printer_state) || filamentPos === FILAMENT_POS_UNLOADED"
             :loading="loadings.includes('mmu_unload')"
             @click="doLoadingSend('MMU_UNLOAD', 'mmu_unload')">
        <v-icon left>{{ mdiUpload }}</v-icon>
        {{ $t('Panels.MmuPanel.ButtonUnload') }}
      </v-btn>
    </v-col>
    <v-col cols="6">
      <v-btn large block color="secondary"
             class="tall-button"
             :disabled="['printing'].includes(printer_state) || filamentPos !== FILAMENT_POS_UNLOADED"
             :loading="loadings.includes('mmu_load')"
             @click="doLoadingSend('MMU_LOAD', 'mmu_load')">
        <v-icon left>{{ mdiDownload }}</v-icon>
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
import { mdiDownloadOutline, mdiEject, mdiCheck, mdiAutoFix, mdiThermometerPlus, mdiDownload, mdiUpload } from '@mdi/js'

@Component({ })
export default class MmuControls extends Mixins(BaseMixin, MmuMixin) {
    mdiDownloadOutline = mdiDownloadOutline
    mdiEject = mdiEject
    mdiCheck = mdiCheck
    mdiAutoFix = mdiAutoFix
    mdiThermometerPlus = mdiThermometerPlus
    mdiUpload = mdiUpload
    mdiDownload = mdiDownload
}
</script>

<style scoped>
.btnMinWidthAuto {
    min-width: auto !important;
}

.tall-button {
  min-height: 4em;
}
</style>

<template>
<v-container class="d-flex flex-column">
    <v-row dense>
      <v-col cols="6">
        <v-btn block small color="secondary"
               :disabled="isPrinting || [GATE_AVAILABLE, GATE_AVAILABLE_FROM_BUFFER].includes(currentGateStatus)"
               :loading="loadings.includes('mmu_preload')"
               @click="doLoadingSend('MMU_PRELOAD', 'mmu_preload')">
            <v-icon left>{{ mdiDownloadOutline }}</v-icon>
            {{ $t('Panels.MmuPanel.ButtonPreload') }}
        </v-btn>
      </v-col>
      <v-col cols="6">
        <v-btn block small color="secondary"
               :disabled="isPrinting || [GATE_EMPTY].includes(currentGateStatus)"
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
               :disabled="isPrinting"
               :loading="loadings.includes('mmu_check_gate')"
               @click="doLoadingSend('MMU_CHECK_GATE', 'mmu_check_gate')">
            <v-icon left>{{ mdiCheck }}</v-icon>
            {{ $t('Panels.MmuPanel.ButtonCheckGate') }}
        </v-btn>
      </v-col>
      <v-col cols="6">
        <v-btn block small color="secondary"
               :disabled="isPrinting"
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
               :disabled="isPrinting || !isMmuPausedAndLocked"
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
             class="wrap-text-btn"
             :disabled="isPrinting || filamentPos === FILAMENT_POS_UNLOADED"
             :loading="loadings.includes('mmu_unload')"
             @click="doLoadingSend('MMU_UNLOAD', 'mmu_unload')">
        <v-icon left>{{ mdiUpload }}</v-icon>
        {{ unloadButtonText }}
      </v-btn>
    </v-col>
    <v-col cols="6">
      <v-btn large block color="secondary"
             class="wrap-text-btn"
             :disabled="isPrinting || filamentPos !== FILAMENT_POS_UNLOADED"
             :loading="loadings.includes('mmu_load')"
             @click="doLoadingSend('MMU_LOAD', 'mmu_load')">
        <v-icon left>{{ mdiDownload }}</v-icon>
        {{ loadButtonText }}
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

    get unloadButtonText() {
        if (this.gate === this.TOOL_GATE_BYPASS) return this.$t('Panels.MmuPanel.ButtonUnloadExt')
        return this.$t('Panels.MmuPanel.ButtonUnload')
    }

    get loadButtonText() {
        if (this.gate === this.TOOL_GATE_BYPASS) return this.$t('Panels.MmuPanel.ButtonLoadExt')
        return this.$t('Panels.MmuPanel.ButtonLoad')
    }
}
</script>

<style scoped>
.btnMinWidthAuto {
    min-width: auto !important;
}

.wrap-text-btn {
    min-height: 3em;
    display: inline-block;
    white-space: normal;
}

</style>


<template>
<v-container class="d-flex flex-column">
    <v-row>
      <v-col cols="12">
        <v-btn block small color="secondary"
               @click="doSend('MMU_EJECT')">
            <v-icon>{{ mdiEject }}</v-icon>
            {{ $t('Panels.MmuPanel.ButtonEject') }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="6">
        <v-btn block small color="secondary"
               @click="doSend('MMU_PRELOAD')">
            {{ $t('Panels.MmuPanel.ButtonPreload') }}
        </v-btn>
      </v-col>
      <v-col cols="6">
        <v-btn block small color="secondary"
               @click="doSend('MMU_CHECK_GATE')">
            {{ $t('Panels.MmuPanel.ButtonCheckGate') }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn block medium color="secondary"
               class="btnMinWidthAuto fill-width"
               @click="doSend('MMU_UNLOAD')">
            <v-icon>{{ mdiArrowCollapseUp }}</v-icon>
            {{ $t('Panels.MmuPanel.ButtonUnload') }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn block medium color="secondary"
               class="btnMinWidthAuto fill-width"
               @click="doSend('MMU_LOAD')">
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
import { mdiEject, mdiArrowCollapseUp, mdiArrowCollapseDown } from '@mdi/js'

@Component({ })
export default class MmuControls extends Mixins(BaseMixin, MmuMixin) {
    mdiEject = mdiEject
    mdiArrowCollapseUp = mdiArrowCollapseUp
    mdiArrowCollapseDown = mdiArrowCollapseDown
}
</script>

<style scoped>
.btnMinWidthAuto {
    min-width: auto !important;
}
</style>


<template>
    <v-container class="d-flex flex-column">
    <v-row>
      <v-col cols="12">
        <v-btn block small color="secondary"
               class="w-100"
               @click="doSendOperation('MMU_EJECT')">
            <v-icon>{{ mdiEject }}</v-icon>
            Eject</v-btn>
        </v-btn>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="6">
        <v-btn block small color="secondary"
               @click="doSendOperation('MMU_PRELOAD')">
            Preload</v-btn>
        </v-btn>
      </v-col>
      <v-col cols="6">
        <v-btn block small color="secondary"
               @click="doSendOperation('MMU_CHECK_GATE')">
            Check Gate</v-btn>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn block large color="secondary"
               class="btnMinWidthAuto fill-width"
               @click="doSendOperation('MMU_UNLOAD')">
            <v-icon>{{ mdiArrowCollapseUp }}</v-icon>
            <div>Unload</div>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn block large color="secondary"
               class="btnMinWidthAuto fill-width"
               @click="doSendOperation('MMU_LOAD')">
            <v-icon>{{ mdiArrowCollapseDown }}</v-icon>
            <div>Load</div>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import BaseMixin from '@/components/mixins/base'
import { mdiEject, mdiArrowCollapseUp, mdiArrowCollapseDown } from '@mdi/js'

@Component({
    components: { },
})
export default class MmuControls extends Mixins(BaseMixin) {
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

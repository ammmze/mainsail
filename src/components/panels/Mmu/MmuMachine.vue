<template>
<v-container>
    <v-row dense>
        <v-col v-for="index in unitArray" cols="auto" :key="'unit_' + index">
          <div class="mmu_unit">
            <mmu-unit :unit="index"/>
          </div>
        </v-col>
    </v-row>
</v-container>
</template>

<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator'
import BaseMixin from '@/components/mixins/base'
import MmuMixin from '@/components/mixins/mmu'
import MmuUnit from '@/components/panels/Mmu/MmuUnit.vue'

@Component({ })
export default class MmuMachine extends Mixins(BaseMixin, MmuMixin) {

    get unitArray(): number[] {
        const numUnits = this.$store.state.printer?.mmu_machine?.num_units || 0
        return Array.from({ length: numUnits }, (_, k) => k)
    }
}
</script>

<style scoped>
.mmu_unit {
    border-radius: 10px;
    background: #282828;
}
</style>

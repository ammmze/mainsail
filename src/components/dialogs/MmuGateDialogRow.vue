<template>
    <tr :class="rowClass"
        @click="$emit('select-gate', details.index)"
        @mouseover="$emit('mouseover', details.index)"
        @mouseleave="$emit('mouseleave', details.index)">

        <td>{{ details.index }}</td>
        <td class="pr-0 py-2">
            <mmu-spool :gateIndex="details.index"
                       :showPercent="false"
                       style="width: 30px; float: left" class="mr-0"/>
        </td>
        <td class="py-0" style="min-width: 300px">
            <mmu-gate-summary :gateIndex="details.index"
                              :showDetails="false"/>
        </td>
        <td class="text-center text-no-wrap">{{ details.material }}</td>
        <td class="text-right text-no-wrap">
            <strong>100g</strong>
            <small class="ml-1">/ 1kg</small>
        </td>
    </tr>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Mixins, Prop } from 'vue-property-decorator'
import BaseMixin from '@/components/mixins/base'
import MmuMixin from '@/components/mixins/mmu'

@Component({ })
export default class MmuGateDialogRow extends Mixins(BaseMixin, MmuMixin) {

    @Prop({ required: true }) declare readonly details: MmuGateDetails

    get rowClass() {
        if (this.details.status === this.GATE_EMPTY) return 'disabled-row cursor-pointer'
        return 'cursor-pointer'
    }
}
</script>

<style scoped>
.v-data-table__table {
    table-layout: fixed;
}

.disabled-row {
    opacity: 0.5;
}
</style>

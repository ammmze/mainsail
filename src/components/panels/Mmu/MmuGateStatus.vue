<template>
    <svg viewBox="0 0 120 54"
         xml:space="preserve"
         preserveAspectRatio="xMidYMid meet"
         ref="mmuGateStatusSvg">

        <rect x="15" y="18" width="80" height="31" rx="8" ry="8"
              stroke-width="3"
              :stroke="statusColor"
              :fill="selectedColor"/>
        <text v-if="gate >= 0" x="56" y="44" text-anchor="middle"
              font-weight="bold" font-size="30px"
              :class="{ 'selected-text': (gate === selectedGate), 'regular-text': (gate !== selectedGate) }">
            {{ gate }}
        </text>
    </svg>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Mixins, Prop } from 'vue-property-decorator'
import BaseMixin from '@/components/mixins/base'
import MmuMixin from '@/components/mixins/mmu'

@Component({ })
export default class MmuGateStatus extends Mixins(BaseMixin, MmuMixin) {
    @Prop({ required: false, default: -1 }) declare readonly gate!: number

    get statusColor(): string {
        const gateStatus = this.$store.state.printer.mmu.gate_status;
        if (this.gateStatus < 0) {
            return "none";
        } else if (gateStatus[this.gate] >= 1) {
            return "green";
        } else if (gateStatus[this.gate] === 0) {
            return "#808080";
        }
        return "orange"; // Unknown
    }

    get selectedColor(): string {
        const gate = this.$store.state.printer.mmu.gate;
        if (this.selectedGate === this.gate) {
            return "limegreen";
        } else {
            return "none";
        }
    }

    get selectedGate(): number {
        return this.$store.state.printer.mmu.gate;
    }
}
</script>

<style scoped>
.selected-text {
    fill: #000000;
}
.regular-text {
    fill: #808080;
}
</style>

<template>
<svg viewBox="0 0 120 54"
     xml:space="preserve"
     preserveAspectRatio="xMidYMid meet"
     ref="mmuGateStatusSvg">

    <rect x="15" y="18" width="80" height="31" rx="8" ry="8"
          stroke-width="3"
          :stroke="statusColor"
          :fill="selectedColor"/>
    <text v-if="gateIndex >= 0" x="56" y="44" text-anchor="middle"
          font-weight="bold" font-size="30px"
          :class="(gateIndex === gate) ? 'selected-text' : 'regular-text'">
        {{ gateIndex }}
    </text>
    <text v-if="gateIndex === TOOL_GATE_BYPASS" x="56" y="41" text-anchor="middle"
          font-weight="bold" font-size="20px"
          :class="(gateIndex === gate) ? 'selected-text' : 'regular-text'">
        BYPASS
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

    @Prop({ required: true, default: -1 }) declare readonly gateIndex!: number

    get statusColor(): string {
        if (this.gateIndex < 0) {
            return "none"
        } else if (this.gateStatus[this.gateIndex] >= 1) {
            return "green"
        } else if (this.gateStatus[this.gateIndex] === 0) {
            return "#808080"
        }
        return "orange" // Unknown
    }

    get selectedColor(): string {
        if (this.gate === this.gateIndex) {
            return "limegreen"
        } else {
            return "none"
        }
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

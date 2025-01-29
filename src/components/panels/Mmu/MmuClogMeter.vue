<template>
<svg viewBox="0 0 140 160"
     preserveAspectRatio="xMidYMid meet"
     :class="{ 'disabled-svg': (detection_mode === 0 || enabled === false) }"
     ref="clogMeter">

  <g transform="rotate(120 70 70)">
      <circle cx="70" cy="70" r="50"
              class="v-progress-circular__underlay" fill="transparent" stroke-width="18"
              :stroke-dasharray="circumference"
              :stroke-dashoffset="dialArc">
      </circle>
      <circle cx="70" cy="70" r="50"
              class="primary-color" fill="transparent" stroke-width="18"
              :stroke-dasharray="circumference"
              :stroke-dashoffset="dashOffset"
              ref="dialCircle">
      </circle>
  </g>
  <g :transform="'rotate(' + headroomRotate + ' 70 70)'">
      <circle cx="70" cy="70" r="50"
              class="warning-color" fill="transparent" stroke-width="18" opacity="0.4"
              :stroke-dasharray="circumference"
              :stroke-dashoffset="headroomArc">
      </circle>
  </g>
  <line x1="70" y1="70" :x2="x2Start" :y2="y2Start"
        stroke="white" stroke-width="2"
        stroke-dashoffset="-41"
        stroke-dasharray="65"/>
  <line x1="70" y1="70" :x2="x2End" :y2="y2End"
        class="warning-color" stroke-width="2"
        stroke-dashoffset="-41"
        stroke-dasharray="65"/>
  <line x1="70" y1="70" :x2="x2MinHeadroom" :y2="y2MinHeadroom"
        :class="{ 'warning-color': headroomWarning, 'primary-color': !headroomWarning }" stroke-width="4"
        stroke-dashoffset="-59"
        stroke-dasharray="65"/>

  <text x="70" y="56" text-anchor="middle" class="small-text-color" font-size="11px">FLOW</text>
  <text x="70" y="80" text-anchor="middle" class="small-text-color" font-size="20px">{{ flow_rate }}%</text>
  <text v-if="detection_mode === 2" x="70" y="124" text-anchor="middle" class="small-text-color" font-size="12px">Auto</text>
  <text x="69" y="155" text-anchor="middle" fill="currentColor" font-size="18px">Clog Detection</text>
  <text x="28" y="132" text-anchor="middle" class="small-text-color" font-size="12px">0</text>
  <text x="108" y="132" class="small-text-color" font-size="12px">{{ detection_length }}</text>
</svg>
</template>

<script lang="ts">
import { Component, Mixins, Prop, Watch } from 'vue-property-decorator'
import BaseMixin from '@/components/mixins/base'

@Component({
    components: { },
})
export default class MmuClogMeter extends Mixins(BaseMixin) {
    @Prop({ default: 1 }) readonly rotationTime!: number;

    private circumference: number = 2 * Math.PI * 50;
    private dialArc: number = this.circumference * (60 / 360);
    private dashOffset: number = this.circumference;

    private x2Start: number = 70 + 65 * Math.cos(120 * Math.PI / 180);
    private y2Start: number = 70 + 65 * Math.sin(120 * Math.PI / 180);
    private x2End: number = 70 + 65 * Math.cos(60 * Math.PI / 180);
    private y2End: number = 70 + 65 * Math.sin(60 * Math.PI / 180);

    x2MinHeadroom: number = 70 + 65 * Math.cos((120 + 0) * Math.PI / 180);
    y2MinHeadroom: number = 70 + 65 * Math.sin((120 + 0) * Math.PI / 180);
    headroomWarning: boolean = false;

    get headroomArc(): number {
        return this.circumference * (1 - (this.desired_headroom / this.detection_length) * (300 / 360));
    }

    get headroomRotate(): number {
        return 420 - (this.desired_headroom / this.detection_length) * 300;
    }

    get encoder_pos(): number {
        return this.$store.state.printer.mmu.encoder.encoder_pos;
    }

    @Watch('$store.state.printer.mmu.encoder.headroom')
    onHeadroomChanged(newHeadroom: number): void {
        const { detection_length } = this.$store.state.printer.mmu.encoder;
        const clogPercent = (Math.min(Math.max(0, detection_length - newHeadroom), detection_length) / detection_length) * 100;
        const offset = ((100 - (clogPercent * 300 / 360)) / 100) * this.circumference;
        this.animateMeter(offset);
    }

    @Watch('$store.state.printer.mmu.encoder.min_headroom')
    onMinHeadroomChanged(newMinHeadroom: number): void {
        const { detection_length, desired_headroom } = this.$store.state.printer.mmu.encoder;
        const clogPercent = (Math.min(Math.max(0, detection_length - newMinHeadroom), detection_length) / detection_length) * 100;
        const angle = clogPercent * 3;
        this.x2MinHeadroom = 70 + 65 * Math.cos((120 + angle) * Math.PI / 180);
        this.y2MinHeadroom = 70 + 65 * Math.sin((120 + angle) * Math.PI / 180);
        this.headroomWarning = (newMinHeadroom < desired_headroom);
    }

    get desired_headroom(): number {
        return this.$store.state.printer.mmu.encoder.desired_headroom;
    }

    get detection_length(): number {
        return this.$store.state.printer.mmu.encoder.detection_length;
    }

    get enabled(): number {
        return this.$store.state.printer.mmu.encoder.enabled;
    }

    get detection_mode(): number {
        return this.$store.state.printer.mmu.encoder.detection_mode;
    }

    get flow_rate(): number {
        return this.$store.state.printer.mmu.encoder.flow_rate;
    }

    private animateMeter(newOffset: number) {
        const circle = this.$refs.dialCircle as SVGElement;
        const currentOffset = parseFloat(getComputedStyle(circle).strokeDashoffset) ?? this.circumference;
        const difference = Math.abs(currentOffset - newOffset);
        //const duration = (difference / this.circumference) * this.rotationTime;
        const duration = this.rotationTime;
        circle.style.transition = `stroke-dashoffset ${duration}s ease-out`;
        this.dashOffset = newOffset;
    }
}
</script>

<style scoped>
.disabled-svg {
  opacity: 0.5;
  cursor: not-allowed;
}
.primary-color {
    stroke: #2CA9BC;
}
.warning-color {
    stroke: #FF0000;
}
.small-text-color {
    fill: #2CA9BC;
}
</style>

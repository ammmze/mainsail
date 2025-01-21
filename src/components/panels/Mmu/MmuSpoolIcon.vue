<template>
    <svg version="1.1"
         xmlns="http://www.w3.org/2000/svg"
         xmlns:xlink="http://www.w3.org/1999/xlink"
         viewBox="0 0 247 500"
         xml:space="preserve"
         preserveAspectRatio="xMidYMid meet"
         ref="mmuSpoolSvg"
         class="cursor-pointer"
         @click="clickSpool">

        <defs>
            <path id="oval" d="M 0 -63 C 35 -63 63 -35 63 0 C 63 35 35 63 0 63 C -35 63 -63 35 -63 0 C -63 -35 -35 -63 0 -63 z" vector-effect="non-scaling-stroke"/>
            <path id="filament" d="M 0 -63 C 35 -63 63 -35 63 0 C 63 35 35 63 0 63 L -424 63 L -424 -63 z" vector-effect="non-scaling-stroke"/>
        </defs>
        <filter id="blur_wheel" width="1.3" height="1.1">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
            <feOffset dx="20" dy="0" result="oBlur"/>
            <feFlood flood-color="#000" flood-opacity=".67"/>
            <feComposite in2="oBlur" operator="in"/>
            <feMerge>
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
        </filter>
        <g transform="matrix(0.59,0,0,3.95,197,250)">
            <use href="#oval" style="filter:url(#blur_wheel)" :style="`fill:` + spoolColor" />
            <use href="#oval" transform="scale(0.41)" style="fill:#111111" />
        </g>
        <use href="#filament" transform="matrix(0.38,0,0,3.46,197,250)" :style="`fill:` + filamentColor + `;`" />
        <g transform="matrix(0.59,0,0,3.95,37,250)">
            <use href="#oval" style="filter:url(#blur_wheel)" :style="`fill:` + spoolColor + `;`"/>
            <use href="#oval" transform="scale(0.41)" style="fill:#111111"/>
        </g>
    </svg>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Mixins, Prop, Emit } from 'vue-property-decorator'
import BaseMixin from '@/components/mixins/base'

@Component({})
export default class MmuSpoolIcon extends Mixins(BaseMixin) {
    @Prop({ required: false, default: "" }) declare readonly color: string | none

    get filamentColor() {
        return this.color || "#000000";
    }

    get spoolColor() {
        return '#AD8762'
    }

    @Emit('click-spool')
    clickSpool() {
        console.log("PAUL: click-spool")
    }
}
</script>

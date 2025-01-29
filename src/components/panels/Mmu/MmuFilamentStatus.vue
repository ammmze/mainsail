<template>
<svg xmlns="http://www.w3.org/2000/svg"
     xmlns:xlink="http://www.w3.org/1999/xlink"
     viewBox="140 0 285 430"
     fill="none"
     preserveAspectRatio="xMidYMid meet"
     ref="filStatusSvg">

    <defs>
        <g id="sync-feedback" :style="'stroke:' + colorOutline + '; stroke-linecap: round; stroke-linejoin: round; fill: none;'">
            <path d="M18,9,13.78,3.39a1,1,0,0,0-1.56,0L8,9" style="stroke-width: 1; stroke-opacity: 0.8"></path>
            <path d="M13,8.24,18,15H15H8Z" style="stroke-width: 2;"></path>
        </g>
        <g id="sissors" :style="'stroke:' + colorOutline + ';fill: none; stroke-linecap: round; stroke-linejoin: round;'">
            <path d="M8.8,7.72c-.6,1.21-2.34,1.64-3.89,1S2.6,6.48,3.2,5.28s2.34-1.64,3.89-1S9.4,6.52,8.8,7.72Zm-3.89,1L21,16M7.09,19.68c-1.55.68-3.29.25-3.89-1s.17-2.73,1.71-3.4,3.29-.25,3.89,1S8.63,19,7.09,19.68ZM21,8,4.91,15.32" style="fill: none; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></path>
            <line x1="31" y1="12.5" x2="44" y2="12.5" style="stroke-width: 1; stroke-dasharray: 2,2;" />
        </g>

        <g id="sync-extruder">
            <g style="stroke: none; stroke-width: 2; stroke-dasharray: none; stroke-linecap: round; stroke-linejoin: round; stroke-miterlimit: 4;">
                <rect style="fill: rgb(131,148,150);" x="145" y="506" width="710" height="256"/>
                <rect style="fill: rgb(147,161,161);" x="324" y="506" width="355" height="256"/>
                <rect style="fill: rgb(101,123,131);" x="274" y="364" width="455" height="142"/>
                <rect style="fill: rgb(88,110,117);" x="181" y="222" rx="28" ry="28" width="639" height="142"/>
                <rect style="fill: rgb(88,110,117);" x="181" y="108" width="639" height="142"/>
                <path style="fill: rgb(88,110,117);" d="m 322 762 h 355 l -118 142 h -118 z"/>
            </g>
            <g transform="matrix(23.2058 0 0 23.2058 329.7195 325.9517)" id="375155">
                <path style="stroke: rgb(0,0,0); stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; is-custom-font: none; font-file-url: none; fill: rgb(254,162,54); fill-rule: nonzero; opacity: 1;"
                      vector-effect="non-scaling-stroke" transform=" translate(-15.4288, -16.4198)" stroke-linecap="round"
                      d="M 25.032 26.16 c 2.884 -2.883 4.184 -6.74 3.928 -10.51 c -1.511 0.013 -3.021 0.021 -4.531 0.034 c 0.254 2.599 -0.603 5.287 -2.594 7.277 c -3.535 3.533 -9.263 3.533 -12.796 0 c -3.534 -3.533 -3.534 -9.26 0 -12.794 c 3.015 -3.016 7.625 -3.446 11.109 -1.314 c -1.181 1.167 -2.57 2.549 -2.57 2.549 c -1 1.062 0.016 1.766 0.69 1.77 h 8.828 c 0.338 0 0.611 -0.274 0.612 -0.612 V 3.804 c 0.041 -0.825 -0.865 -1.591 -1.756 -0.7 c 0 0 -1.495 1.48 -2.533 2.509 C 18.112 1.736 10.634 2.175 5.841 6.967 c -5.3 5.3 -5.3 13.892 0 19.193 C 11.141 31.459 19.733 31.459 25.032 26.16 z"/>
            </g>
        </g>
    </defs>

    <rect x="150" y="30" width="265" height="130" fill="#808080" fill-opacity="0.1" rx="10" ry="10"/>
    <rect x="150" y="333" width="265" height="66" fill="#808080" fill-opacity="0.1" rx="10" ry="10"/>
    <g :style="'stroke:' + colorOutline + '; stroke-linecap: round; stroke-linejoin: round; stroke-width: 1;'">
        <path d="M242 25 L242 405 L249 411 L251 411 L258 405 L258 25" style="fill: none; stroke-linecap: round; stroke-linejoin: round; stroke-width: 1;"></path>
    </g>

    <g> /* PAUL make this is single dynamic line (and a cut fragment) */
        <rect id="f_pregate" x="243" y="25" width="14" height="25" fill="#8CDFAC" />
        <rect id="f_gear" x="243" y="50" width="14" height="30" fill="#8CDFAC" />
        <rect id="f_gate" x="243" y="80" width="14" height="30" fill="#8CDFAC" />
        <rect id="f_encoder" x="243" y="110" width="14" height="30" fill="#8CDFAC" />
        <rect id="f_bowden_start" x="243" y="140" width="14" height="20" fill="#8CDFAC" />
        <rect id="f_extruder_entry" x="243" y="160" width="14" height="160" fill="#8CDFAC" />
        <rect id="f_extruder" x="243" y="320" width="14" height="12" fill="none" />
        <rect id="f_toolhead" x="243" y="332" width="14" height="18" fill="none" />
        <rect id="f_cut" x="243" y="350" width="14" height="30" fill="none" />
        <polygon id="f_nozzle" points="257,380 243,380 243,405 249,412 249,413 251,413 251,412 257,405" fill="purple" />
    </g>

    <g :style="'stroke:' + colorOutline + '; fill:' + colorFont + '; stroke-linecap: round; stroke-linejoin: round; stroke-width: 0; font-family: Roboto; font-size: 16;'">
        <g v-if="hasPregateSensor()">
            <circle cx="258" cy="50" r="8" :style="'fill:' + pregateSensorColor + '; stroke-width:1; stroke-dasharray:0'" />
            <text x="278" y="55">Pre-Gate</text>
        </g>

        <g v-if="hasGearSensor()">
            <circle cx="258" cy="80" r="8" :style="'fill:' + gearSensorColor + '; stroke-width:1; stroke-dasharray:0'" />
            <text x="278" y="85">Gear</text>
            <text v-if="homedToGear()" x="219.5" y="85" font-weight="bold">H</text>
        </g>

        <g v-if="hasGateSensor()">
            <circle cx="258" cy="110" r="8" :style="'fill:' + gateSensorColor + '; stroke-width:1; stroke-dasharray:0'" />
            <text x="278" y="115">Gate</text>
            <text v-if="homedToGate()" x="219.5" y="115" font-weight="bold">H</text>
        </g>
  
        <circle cx="258" cy="140" r="8" :style="'fill:' + encoderSensorColor + '; stroke-width:1; stroke-dasharray:0'" />
        <path d="M257 135 L261 140 L257 145" stroke-width="2" fill="none" />
        <text x="278" y="145">Encoder:</text>
        <text x="348" y="145" font-size="11px">{{ encoderPos }} mm</text>
        <text v-if="homedToEncoder()" x="219.5" y="145" font-weight="bold">H</text>
  
        <circle cx="258" cy="320" r="8" :style="'fill:' + extruderSensorColor + '; stroke-width:1; stroke-dasharray:0'" />
        <text x="278" y="325">Extruder</text>
        <text v-if="homedToExtruder()" x="219.5" y="325" font-weight="bold">H</text>

        <circle cx="258" cy="350" r="8" :style="'fill:' + toolheadSensorColor + '; stroke-width:1; stroke-dasharray:0'" />
        <text x="278" y="355">Toolhead</text>
        <text v-if="homedToToolhead()" x="219.5" y="355" font-weight="bold">H</text>

        <g v-if="hasSyncFeedback()">
            <g v-if="syncTensionTriggered()">
                <use xlink:href="#sync-feedback" transform="translate(258, 199) scale(1.2)"/>
                <use xlink:href="#sync-feedback" transform="translate(258, 271) scale(1.2,-1.2)"/>
            </g>
            <g v-if="syncCompressionTriggered()">
                <use xlink:href="#sync-feedback" transform="translate(258, 235) scale(1.2)"/>
                <use xlink:href="#sync-feedback" transform="translate(258, 235) scale(1.2,-1.2)"/>
            </g>
            <g style="font-size: 14px;">
                <text v-if="syncTensionTriggered() && syncCompressionTriggered()" x="288" y="240" fill="#FF0000">Error!</text>
                <text v-else-if="syncTensionTriggered()" x="288" y="240">Tension</text>
                <text v-else-if="syncCompressionTriggered()" x="288" y="240">Compression</text>
            </g>
        </g>
        <text x="200" y="16">{{ operation }}</text>
        <text x="160" y="60" font-size="25px" font-weight="bold">T11</text>
    </g>

    <use xlink:href="#sync-extruder" transform="translate(278, 385) scale(.030)"/>
    <use xlink:href="#sissors" transform="translate(205, 145) scale(1.2)"/>
    <use xlink:href="#sissors" transform="translate(205, 365) scale(1.2)"/>
    <use xlink:href="#sync-extruder" transform="translate(278, 385) scale(.030)"/>
</svg>
</template>

<script lang="ts">
import { Component, Mixins, Watch, Prop, Emit } from 'vue-property-decorator'
import BaseMixin from '@/components/mixins/base'
import MmuMixin from '@/components/mixins/mmu'

@Component({ })
export default class MmuFilamentStatus extends Mixins(BaseMixin, MmuMixin) {
/* PAUL
    @Prop({ type: Boolean, required: false, default: true }) has_pregate_sensor: boolean | null
    @Prop({ required: false, default: mdiChevronDown }) declare readonly iconExpanded: string | null
*/

    private operation: string = "Unloading 48.7mm"

    get encoderPos(): number {
        // PAUL round(1)
        return 63.4
    }

    @Watch('username')
    onEncoderDataChanged(newVal: string, oldVal: string) {
        // PAUL console.log(`Username changed from ${oldVal} to ${newVal}`);
    }

    // PAUL: Fixme for light theme
    private primaryBackground = "#1E1E1E"
    private highlightedBackground = "#272727"
    private testing = false

    get colorOutline(): string {
        return '#2CA9BC'
    }
    get colorOutlineContrast(): string {
        return '#222222'
    }
    get colorFont(): string {
        return '#FFFFFF'
    }
    get pregateSensorColor(): string {
        if (this.testing) {
            return this.highlightedBackground
        } else {
            return 'limegreen'
        }
    }
    get gearSensorColor(): string {
        if (this.testing) {
            return this.highlightedBackground
        } else {
            return 'limegreen'
        }
    }
    get gateSensorColor(): string {
        if (this.testing) {
            return this.highlightedBackground
        } else {
            return 'limegreen'
        }
    }
    get encoderSensorColor(): string {
        if (this.testing) {
            return this.highlightedBackground
        } else {
            return 'limegreen'
        }
    }
    get extruderSensorColor(): string {
        if (this.testing) {
            return this.primaryBackground
        } else {
            return 'limegreen'
        }
    }
    get toolheadSensorColor(): string {
        if (!this.testing) {
            return this.highlightedBackground
        } else {
            return 'limegreen'
        }
    }

    hasPregateSensor(): boolean {
        return true /* return this.has_pregate_sensor */
    }
    hasGearSensor(): boolean {
        return true /* return this.has_gear_sensor */
    }
    hasGateSensor(): boolean {
        return true
    }
    hasSyncFeedback(): boolean {
        return true
    }

    syncCompressionTriggered(): boolean | null {
        return true
    }
    syncTensionTriggered(): boolean | null {
        return false
    }

    homedToPreGate(): boolean {
        return false
    }
    homedToEncoder(): boolean {
        return false
    }
    homedToGear(): boolean {
        return false
    }
    homedToGate(): boolean {
        return false
    }
    homedToExtruder(): boolean {
        return true
    }
    homedToToolhead(): boolean {
        return false
    }
}
</script>

<style scoped>
</style>

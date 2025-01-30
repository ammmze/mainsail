<template>
<svg :viewBox="'0 0 '+ width + ' ' + height"
     preserveAspectRatio="xMidYMid meet"
     ref="ttgMap">

    <defs>
        <marker id="squareStart" markerWidth="7" markerHeight="7" refX="7" refY="3.5" orient="auto" markerUnits="userSpaceOnUse">
            <rect x="0" y="0" width="7" height="7" stroke-width="2"
                  class="stroke-background-color fill-regular-color"/>
        </marker>
        <marker id="squareStartSelected" markerWidth="7" markerHeight="7" refX="7" refY="3.5" orient="auto" markerUnits="userSpaceOnUse">
            <rect x="0" y="0" width="7" height="7" stroke-width="2"
                  class="stroke-selected-color fill-selected-color"/>
        </marker>
        <marker id="arrowEnd" markerWidth="7" markerHeight="7" refX="0" refY="3.5" orient="auto" markerUnits="userSpaceOnUse">
            <polygon points="0 0, 7 3.5, 0 7" stroke-width="1"
                     class="stroke-background-color fill-regular-color"/>
        </marker>
        <marker id="arrowEndSelected" markerWidth="7" markerHeight="7" refX="0" refY="3.5" orient="auto" markerUnits="userSpaceOnUse">
            <polygon points="0 0, 7 3.5, 0 7" stroke-width="1"
                     class="stroke-selected-color fill-selected-color"/>
        </marker>
    </defs>

    <g v-for="(g, t) in ttgMap" :key="t">
        <text :x="toolX" :y="(t) * verticalSpacing + startY + 8"
              text-anchor="end" fill="currentColor" font-size="10px">
            T{{ t }}
        </text>
        <text :x="gateX" :y="(t) * verticalSpacing + startY + 8"
              text-anchor="start" fill="currentColor" font-size="10px">
            #{{ t }}
        </text>
        <g v-if="t !== tool">
            <path :d="generateMappingPathD(t)" stroke-width="4"
                  class="stroke-background-color" fill="none"/>
            <path :d="generateMappingPathD(t)" stroke-width="2"
                  class="stroke-regular-color" fill="none"
                  marker-start="url(#squareStart)" marker-end="url(#arrowEnd)"/>
        </g>
    </g>
    <g v-if="tool >= 0">
        <path :d="generateMappingPathD(tool)" stroke-width="6"
              class="stroke-background-color" fill="none"/>
        <path :d="generateMappingPathD(tool)" stroke-width="4"
              class="stroke-selected-color" fill="none"
              marker-start="url(#squareStartSelected)" marker-end="url(#arrowEndSelected)"/>
    </g>
    <g v-if="showESgroups" v-for="(group, index) in getEndlessSpoolGroups()">
        <g v-if="group !== currentGroup">
            <path :d="generateEndlessSpoolPathD(group, index)" stroke-width="2" stroke-linecap="round"
                  class="stroke-regular-color" fill="none"/>
            <text :x="groupX + (index * groupSpacing)" :y="startY + (ttgMap.length * verticalSpacing) + 2"
                  class="fill-regular-color" font-size="8px">{{ String.fromCharCode(group + 65) }}</text>
        </g>
        <g v-else>
            <path :d="generateEndlessSpoolPathD(group, index)" stroke-width="2" stroke-linecap="round"
                  class="stroke-selected-color" fill="none"/>
            <text :x="groupX + (index * groupSpacing)" :y="startY + (ttgMap.length * verticalSpacing) + 2"
                  class="fill-selected-color" font-size="8px" font-weight="bold">{{ String.fromCharCode(group + 65) }}</text>
        </g>
    </g>
</svg>
</template>

<script lang="ts">
import { Component, Mixins, Prop, Watch } from 'vue-property-decorator'
import BaseMixin from '@/components/mixins/base'
import MmuMixin from '@/components/mixins/mmu'

@Component({ })
export default class MmuTtgMap extends Mixins(BaseMixin, MmuMixin) {
    @Prop({ default: 10 }) readonly startX!: number
    @Prop({ default: 8 }) readonly startY!: number
    @Prop({ default: 12 }) readonly verticalSpacing!: number
    @Prop({ default: 12 }) readonly groupSpacing!: number
    @Prop({ default: 80 }) readonly mapSpace!: number
    @Prop({ default: 10 }) readonly leader!: number
    @Prop({ default: true }) readonly showESgroups!: boolean

    private toolX: number = this.startX + 14
    private gateX: number = this.startX + 2 * this.leader + this.mapSpace + 40
    private groupX: number = this.startX + 2 * this.leader + this.mapSpace + 65

    get width(): number {
        return this.groupX + (this.getEndlessSpoolGroups().length * this.groupSpacing); // Single gate groups aren't displayed
    }

    get height(): number {
        return this.startY + (this.$store.state.printer.mmu.ttg_map.length * this.verticalSpacing) + 6
    }

    get currentGroup(): number {
        const currentGate = this.$store.state.printer.mmu.gate
        if (currentGate >= 0) {
            return this.$store.state.printer.mmu.endless_spool_groups[currentGate]
        } else {
            return -1
        }
    }

    generateMappingPathD(tool: number): string {
        const ttgMap = this.$store.state.printer.mmu.ttg_map
        const xOffset = 28
        const x1 = this.startX + xOffset
        const y1 = this.startY + tool * this.verticalSpacing + 4  // yOffset of 4 to align line with text
        const tX = x1 + this.leader                               // X position for tool column
        const gX = tX + this.mapSpace                             // X position for gate column
        const gate = ttgMap[tool]                                 // Gate corresponding to the tool
        const tSpace = 2                                          // Horizontal "break" spacing tool side
        const gSpace = 2                                          // Horizontal "break" spacing gate side

        return `M ${x1} ${y1} L ${tX} ${y1} ` +                   // Draw leader line
               `L ${tX + gate * tSpace} ${y1} ` +                 // Horizontal to gateX column
               `L ${gX - (ttgMap.length - gate) * gSpace} ${this.startY + gate * this.verticalSpacing + 4} ` + // To gate column
               `L ${gX + this.leader} ${this.startY + gate * this.verticalSpacing + 4}`  // Add trailer
    }

    generateEndlessSpoolPathD(group: number, index: number): string {
        const tick = 5                                            // Dash size
        const x1 = this.gateX + 24 + (index * this.groupSpacing)  // X distance from TTG map
        const y1 = this.startY + 4                                // Align line with text

        let dStr = ""
        let y0: number | null = null
        const gatesInGroup = this.findAllGatesInGroup(group)
        if (gatesInGroup.length > 1) {
            gatesInGroup.forEach(gate => {
                const y = y1 + gate * this.verticalSpacing
                dStr += `M ${x1 + tick} ${y} L ${x1} ${y} `
                if (y0 !== null) {
                    dStr += `M ${x1 + tick} ${y0} L ${x1 + tick} ${y} `
                }
                y0 = y
            })
        }
        return dStr
    }

    // Find groups with more than one gate
    getEndlessSpoolGroups(): number[] {
        const endlessSpoolGroups = this.$store.state.printer.mmu.endless_spool_groups
        const countMap: { [key: number]: number } = {}
        endlessSpoolGroups.forEach(num => {
            if (countMap[num]) {
                countMap[num]++
            } else {
                countMap[num] = 1
            }
        })
        const duplicates = Object.keys(countMap)
                                 .filter(key => countMap[key] > 1)
                                 .map(Number)
                                 .sort((a, b) => a - b)
        return duplicates
    }

    private findAllGatesInGroup(gate: number): number[] {
        const endlessSpoolGroups = this.$store.state.printer.mmu.endless_spool_groups
        const gatesInGroup: number[] = []
        endlessSpoolGroups.forEach((g, index) => {
            if (g === gate) {
                gatesInGroup.push(index)
            }
        })
        return gatesInGroup
    }
}
</script>

<style scoped>
/* Bug in <path> requires separation of styles - fill attribute doesn't override! */
.stroke-regular-color {
    stroke: #808080;
}
.stroke-selected-color {
    stroke: #2CA9BC;
}
.stroke-background-color {
    stroke: #1E1E1E;
}
.fill-regular-color {
    fill: #808080;
}
.fill-selected-color {
    fill: #2CA9BC;
}
.fill-background-color {
    fill: #1E1E1E;
}
</style>

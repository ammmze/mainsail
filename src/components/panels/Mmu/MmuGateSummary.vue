<template>
    <v-list-item :lines="lines" :class="{ 'disabled-panel': (details.status === 0) }">
        <v-list-item-content :class="listItemContentClass">
            <div :class="overlineClass">{{ title }}</div>
            <v-list-item-title :class="listItemTitleClass">
                {{ name }}
            </v-list-item-title>
            <v-list-item-subtitle v-if="showDetails" class="subtitle-container">
                {{ subtitle }}
            </v-list-item-subtitle>
            <v-list-item-subtitle v-if="showDetails" class="subtitle-container smaller-font">
                {{ extra }}
            </v-list-item-subtitle>
        </v-list-item-content>
    </v-list-item>
</template>

<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator'
import BaseMixin from '@/components/mixins/base'
import MmuMixin from '@/components/mixins/mmu'
import Panel from '@/components/ui/Panel.vue'

@Component({ })
export default class MmuGateSummary extends Mixins(BaseMixin, MmuMixin) {

    @Prop({ required: true, default: -1 }) declare readonly gateIndex!: number
    @Prop({ required: false, default: true }) readonly compact!: boolean
    @Prop({ required: false, default: true }) readonly showDetails!: boolean

    get details(): MmuGateDetails {
        return this.gateDetails(this.gateIndex)
    }

    get lines(): string {
        if (this.showDetails) return "three"
        return "two"
    }

    get title(): string {
        return [this.gateText, this.vendorText].filter ((v) => v !== null).join(' | ')
    }

    get name(): string {
        return this.details.filamentName
    }

    get subtitle(): string {
        return [this.details.material, this.temperatureText, this.speedOverrideText].filter((v) => v !== null).join(' | ')
    }

    get extra(): string {
        let text = [this.spoolIdText, this.weightText, this.lengthText].filter((v) => v !== null).join(' | ')
        if (!text) return "No spool ID"
        return text
    }

    get gateText(): string {
        return this.gateIndex === -1 ? "?" : this.gateIndex === this.TOOL_GATE_BYPASS ? "Bypass" : "@" + this.gateIndex
    }

    get speedOverrideText(): string {
        if (this.details.speedOverride === 100) return null
        return "Speed: " + this.details.speedOverride + "%"
    }

    get temperatureText(): string {
        if (this.details.temperature <= 0) return null
        return this.details.temperature + '\u00B0' + 'C'
    }

    get spoolIdText(): string {
        if (this.details.spoolId <= 0) return null
        return "Spool ID: #" + this.details.spoolId
    }

    // Only available with Spoolman...

    get vendorText() {
        const spoolmanSpool = this.spoolmanSpool(this.details.spoolId)
        return spoolmanSpool?.filament?.vendor?.name ?? 'Unknown'
    }

    get weightText() {
        const spoolmanSpool = this.spoolmanSpool(this.details.spoolId)
        const remaining = this.spoolmanSpool?.remaining_weight ?? null
        const total = this.spoolmanSpool?.initial_weight ?? this.spoolmanSpool?.filament?.weight ?? null
        if (remaining === null || total === null) return null

        if (total >= 1000) {
            let totalRound = Math.floor(total / 1000)
            if (totalRound !== total / 1000) {
                totalRound = Math.round(total / 100) / 10
            }
            return `${Math.round(remaining)}g / ${totalRound}kg`
        }
        return `${Math.round(remaining)} / ${Math.round(total)}g`
    }

    get lengthText() {
        const spoolmanSpool = this.spoolmanSpool(this.details.spoolId)
        let remaining = this.spoolmanSpool?.remaining_length ?? null
        if (remaining === null) return null
        return `${Math.round(remaining / 1000)}m`
    }

    get listItemContentClass() {
        if (this.compact) return 'my-0'
        return ''
    }

    get overlineClass() {
        const classes = ['text-overline', 'mb-1']
        if (this.compact) classes.push('line-height-auto')
        return classes
    }

    get listItemTitleClass() {
        if (this.compact) return ['text-h6', 'mb-1']
        return ['text-h5', 'mb-1']
    }
}
</script>

<style scoped>
.line-height-auto {
    line-height: 1;
}

.subtitle-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.smaller-font {
  font-size: 0.75em;
}

.disabled-panel {
    opacity: 0.5;
} 
</style>

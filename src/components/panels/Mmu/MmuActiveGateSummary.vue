<template>
<v-list-item three-line>
    <v-list-item-content :class="listItemContentClass">
        <div :class="overlineClass">{{ title }}</div>
        <v-list-item-title :class="listItemTitleClass">
            {{ name }}
        </v-list-item-title>
        <v-list-item-subtitle class="subtitle-container">
            {{ subtitle }}
        </v-list-item-subtitle>
        <v-list-item-subtitle class="subtitle-container smaller-font">
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
import { ServerSpoolmanStateSpool } from '@/store/server/spoolman/types'

@Component({ })
export default class MmuActiveGateSummary extends Mixins(BaseMixin, MmuMixin) {
    @Prop({ required: false, default: true }) readonly small!: boolean

    get listItemContentClass() {
        if (this.small) return 'my-0'
        return ''
    }

    get overlineClass() {
        const classes = ['text-overline', 'mb-1']
        if (this.small) classes.push('line-height-auto')
        return classes
    }

    get listItemTitleClass() {
        if (this.small) return ['text-h6', 'mb-1']
        return ['text-h5', 'mb-1']
    }

    get title(): string {
        return "#" + [this.gate, this.vendorText].filter ((v) => v !== null).join(' | ')
    }

    get name(): string {
        return this.currentGateFilamentName
    }

    get subtitle(): string {
        return [this.currentGateMaterial,this.temperatureText, this.speedOverrideText].filter((v) => v !== null).join(' | ')
    }

    get extra(): string {
        return [this.spoolIdText, this.weightText, this.lengthText].filter((v) => v !== null).join(' | ')
    }

    get speedOverrideText(): string {
        if (this.currentGateSpeedOverride === 100) return null
        return "Speed: " + this.currentGateSpeedOverride + "%"
    }

    get temperatureText(): string {
        if (!this.currentGateTemperature) return null
        return this.currentGateTemperature + '\u00B0' + 'C'
    }

    get spoolIdText(): string {
        if (this.currentGateSpoolId <= 0) return null
        return "Spool ID: " + this.currentGateSpoolId
    }

    // Only available with Spoolman...

    get vendorText() {
        return this.spoolmanSpool?.filament?.vendor?.name ?? "n/a"
    }

    get weightText() {
        let remaining = this.spoolmanSpool?.remaining_weight ?? null
        const total = this.spoolmanSpool?.filament.weight ?? null
        const unit = 'g'
        if (remaining === null || total === null) return null
        remaining = Math.round(remaining)
        let totalRound = Math.floor(total / 1000)
        if (total >= 1000) {
            if (totalRound !== total / 1000) {
                totalRound = Math.round(total / 100) / 10
            }
            return `${remaining}g / ${totalRound}kg`
        }
        return `${remaining} / ${total}${unit}`
    }

    get lengthText() {
        let remaining = this.spoolmanSpool?.remaining_length ?? null
        if (remaining === null) return null
        remaining = Math.round(remaining / 1000)
        return `${remaining}m`
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
</style>

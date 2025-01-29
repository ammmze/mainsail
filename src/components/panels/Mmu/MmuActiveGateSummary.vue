<template>
    <v-list-item three-line>
        <v-list-item-content :class="listItemContentClass">
            <div :class="overlineClass">#{{ id }} | {{ vendor }}</div>
            <v-list-item-title :class="listItemTitleClass">
                {{ name }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ subtitle }}</v-list-item-subtitle>
        </v-list-item-content>
    </v-list-item>
</template>

<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator'
import BaseMixin from '@/components/mixins/base'
import MmuMixin from '@/components/mixins/mmu'
import Panel from '@/components/ui/Panel.vue'
import SpoolmanChangeSpoolDialog from '@/components/dialogs/SpoolmanChangeSpoolDialog.vue'
import SpoolmanEjectSpoolDialog from '@/components/dialogs/SpoolmanEjectSpoolDialog.vue'
import { ServerSpoolmanStateSpool } from '@/store/server/spoolman/types'

@Component({
    components: { SpoolmanChangeSpoolDialog, SpoolmanEjectSpoolDialog },
})
export default class MmuActiveGateSummary extends Mixins(BaseMixin, MmuMixin) {
    @Prop({ required: false, default: false }) readonly small!: boolean

/* PAUL USEFUL SNIPPITS
    get warningColor(): string {
        return this.$vuetify?.theme?.currentTheme?.warning?.toString() ?? '#ff8300'
    }

    get primaryTextColor(): string {
        let splits = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.primaryColor)
        if (splits) {
            const r = parseInt(splits[1], 16) * 0.2126
            const g = parseInt(splits[2], 16) * 0.7152
            const b = parseInt(splits[3], 16) * 0.0722
            const perceivedLightness = (r + g + b) / 255

            return perceivedLightness > 0.7 ? '#222' : '#fff'
        }

        return '#ffffff'
    }
*/

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

    get active_spool(): ServerSpoolmanStateSpool | null {
        return this.$store.state.server.spoolman.active_spool ?? null
    }

    get color() {
        const color = this.active_spool?.filament.color_hex ?? null
        if (color === null) return '#000'

        return `#${color}`
    }

    get id() {
        return this.active_spool?.id ?? 'XX'
    }

    get vendor() {
        return this.active_spool?.filament?.vendor?.name ?? 'Unknown'
    }

    get name() {
        return this.active_spool?.filament.name ?? 'Unknown'
    }

    get materialOutput() {
        const material = this.active_spool?.filament.material ?? null
        if (material === null) return null

        return material
    }

    get weightOutput() {
        let remaining = this.active_spool?.remaining_weight ?? null
        let total = this.active_spool?.filament.weight ?? null
        let unit = 'g'

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

    get lengthOutput() {
        let remaining = this.active_spool?.remaining_length ?? null

        if (remaining === null) return null
        remaining = Math.round(remaining / 1000)

        return `${remaining}m`
    }

    get subtitle() {
        return [this.materialOutput, this.weightOutput, this.lengthOutput].filter((v) => v !== null).join(' | ')
    }
}
</script>

<style scoped>
.line-height-auto {
    line-height: 1;
}
</style>

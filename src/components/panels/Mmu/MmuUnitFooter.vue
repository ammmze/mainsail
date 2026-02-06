<template>
    <div class="mmu-unit-footer zindex-4 d-flex flex-row align-center px-2 pb-1">
        <v-icon
            v-if="showLogos"
            class="mr-4 flex-grow-0 flex-shrink-0 opacity-70"
            :class="logoClasses"
            :size="logoHeight">
            {{ logo }}
        </v-icon>
        <div class="flex-grow-1 flex-shrink-1 min-width-0 text-caption">
            <div v-if="showName" class="text-truncate">{{ unitDisplayName }}</div>

            <v-tooltip :disabled="!hasPerGateHeaters && !hasPerGateClimateSensors" top open-delay="500">
                <template #activator="{ on, attrs }">
                    <div class="text-truncate d-flex" v-bind="attrs" v-on="on">
                        <span v-if="unitClimateHumidity" class="d-inline-flex align-center ml-n1 mr-1">
                            <v-icon size="18" class="blue--text">{{ mdiWater }}</v-icon>
                            {{ unitClimateHumidity }}
                        </span>
                        <span v-if="unitClimateTemp" class="d-inline-flex align-center mr-2">
                            <v-icon size="18" class="deep-orange--text">{{ mdiThermometer }}</v-icon>
                            {{ unitClimateTemp}}
                        </span>
                        <span v-if="unitHeaterIcon" class="d-inline-flex align-center ml-auto">
                            <v-icon size="22" class="red--text">{{ unitHeaterIcon }}</v-icon>
                            {{ unitHeaterTemp}}
                        </span>
                    </div>
                </template>
                <span style="white-space: pre-line;">{{ perGateReport }}</span>
            </v-tooltip>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator'
import BaseMixin from '@/components/mixins/base'
import MmuMixin, { MmuMachineUnit } from '@/components/mixins/mmu'
import { mdiWater, mdiThermometer, mdiHeatingCoil, mdiRotateOrbit } from '@mdi/js'
import {
    mmuIcon3MS,
    mmuIconAngryBeaver,
    mmuIconBoxTurtle,
    mmuIconEmu,
    mmuIconErcf,
    mmuIconHappyHare,
    mmuIconKms,
    mmuIconMmx,
    mmuIconNightOwl,
    mmuIconQuattroBox,
    mmuIconTradrack,
    mmuIconVvd,
    mmuThemeIcons,
} from '@/plugins/mmuIcons'
import { additionalSensors } from '@/store/variables'

const squareLogoVendors = ['3MS', 'AngryBeaver', 'EMU', 'ERCF', 'KMS']

@Component
export default class MmuUnitFooter extends Mixins(BaseMixin, MmuMixin) {
    mdiWater = mdiWater
    mdiThermometer = mdiThermometer
    mdiHeatingCoil = mdiHeatingCoil
    mdiRotateOrbit = mdiRotateOrbit

    @Prop({ required: true }) readonly unitIndex!: number
    @Prop({ required: true }) readonly mmuMachineUnit!: MmuMachineUnit

    get numGates() {
        return this.mmuMachineUnit?.num_gates ?? 0
    }

    get firstGateNumber() {
        return this.mmuMachineUnit?.first_gate ?? 0
    }

    get unitDisplayName(): string {
        const name = this.mmuMachineUnit?.name

        return `#${this.unitIndex + 1} ${name}`
    }

    get showLogos(): boolean {
        return this.$store.state.gui.view.mmu.showLogos ?? true
    }

    get showName(): boolean {
        return this.$store.state.gui.view.mmu.showName ?? true
    }

    get unitClimateSensorName() {
        let name: string | undefined
        if (this.hasPerGateClimateSensors) {
            const names = this.mmuMachineUnit?.environment_sensors ?? undefined
            if (!names || this.gate < this.firstGateNumber || this.gate >= (this.numGates - this.firstGateNumber)) return undefined
            const index = this.gate - this.firstGateNumber
            name = names[index]?.replace(/^"(.*)"$/, '$1')
        } else {
            name = this.mmuMachineUnit?.environment_sensor?.replace(/^"(.*)"$/, '$1') ?? undefined
        }
        if (!name) return undefined

        const parts = name.split(' ')
        if (parts.length !== 2) return undefined

        return parts[1]
    }

    get unitClimateSensor() {
        if (!this.unitClimateSensorName) return undefined

        for (const key of additionalSensors) {
            const objectName: string = `${key} ${this.unitClimateSensorName}`
            if (!(objectName in this.$store.state.printer)) continue

            return this.$store.state.printer[objectName]
        }

        return undefined
    }

    get available_heaters() {
        return this.$store.state.printer?.heaters?.available_heaters ?? []
    }

    get unitHeater() {
        let name: string | undefined
        if (this.hasPerGateHeaters) {
            const names = this.mmuMachineUnit?.filament_heaters ?? undefined
            if (!names || this.gate < this.firstGateNumber || this.gate >= (this.numGates - this.firstGateNumber)) return undefined
            const index = this.gate - this.firstGateNumber
            name = names[index]?.replace(/^"(.*)"$/, '$1')
        } else {
            name = this.mmuMachineUnit?.filament_heater?.replace(/^"(.*)"$/, '$1') ?? undefined
        }

        if (!name) return undefined

        return this.$store.state.printer[name] ?? undefined
    }

    get hasPerGateClimateSensors() {
        return !!this.mmuMachineUnit?.environment_sensors
    }

    get hasPerGateHeaters() {
        return !!this.mmuMachineUnit?.filament_heaters
    }

    get unitDryingCycle(): boolean {
        const start = this.firstGateNumber
        const end = this.firstGateNumber + this.numGates

        return this.dryingState
          .slice(start, end)
          .some(state => state === 'active' || state === 'queued')
    }

    get dryingState() {
        return this.mmu?.drying_state ?? []
    }

    get perGateReport(): string {
        const envSensors = this.mmuMachineUnit?.environmentSensors
        const heaters = this.mmuMachineUnit?.filament_heaters

        const lines: string[] = []

        for (let i = 0; i < this.numGates; i++) {
            const gate = this.firstGateNumber + i
            const parts: string[] = []

            const sensor = envSensors?.[i]
            if (sensor || true) {
                parts.push(`${this.humidity(sensor)} / ${this.temperature(sensor)}`)
            }

            const heater = heaters?.[i]
            if (heater) {
                if (this.unitDryingCycle) {
                    const state = this.dryingState?.[gate]
                    if (state === 'active') {
                        let prefix = this.$t('Panels.MmuPanel.Drying').toString()
                        parts.push(`${prefix}: ${this.target(heater)}`)
                    } else if (state === 'queued') {
                        parts.push(this.$t('Panels.MmuPanel.DryingQueued').toString())
                    } else if (state === 'complete') {
                        parts.push(this.$t('Panels.MmuPanel.DryingComplete').toString())
                    } else {
                        let prefix = this.$t('Panels.MmuPanel.Heater').toString()
                        parts.push(`${prefix}: ${this.target(heater)}`)
                    }
                } else {
                    let prefix = this.$t('Panels.MmuPanel.Heater').toString()
                    parts.push(`${prefix}: ${this.target(heater)}`)
                }
            }

            let prefix = this.$t('Panels.MmuPanel.Gate').toString()
            lines.push(`${prefix} ${gate}: ${parts.join(', ')}`)
        }

        return lines.join('\n')
    }

    private humidity(sensor) {
        if (sensor && 'humidity' in sensor && sensor.humidity !== null) {
            return `${sensor.humidity.toFixed(0)}%`
        }
        return undefined
    }

    private temperature(sensor) {
        if (sensor && 'temperature' in sensor && sensor.temperature !== null) {
            return `${sensor.temperature.toFixed(0)}°C`
        }
        return undefined
    }

    private target(sensor) {
        if (sensor && 'target' in sensor && sensor.target !== null) {
            return `${sensor.target.toFixed(0)}°C`
        }
        return undefined
    }

    get unitHeaterTemp() {
        if (this.hasPerGateHeaters && !this.unitHeater) return "..."
        if (!this.unitHeater) return undefined

        if ('target' in this.unitHeater && this.unitHeater.target !== null && this.unitHeater.target > 0) {
            const value = `${this.unitHeater.target.toFixed(0)}°C`
            return this.hasPerGateHeaters ? `${value}...` : value
        }
    }

    get unitHeaterIcon() {
        if (this.unitDryingCycle) return mdiRotateOrbit
        if (this.hasPerGateHeaters || this.unitHeaterTemp) return mdiHeatingCoil

        return undefined
    }

    get unitClimateHumidity() {
        if (this.hasPerGateClimateSensors && !this.unitClimateSensor) return "..."
        if (!this.unitClimateSensor) return undefined

        if ('humidity' in this.unitClimateSensor && this.unitClimateSensor.humidity !== null) {
            return `${this.unitClimateSensor.humidity.toFixed(0)}%`
        }

        return undefined
    }

    get unitClimateTemp() {
        if (this.hasPerGateClimateSensors && !this.unitClimateSensor) return "..."
        if (!this.unitClimateSensor) return undefined

        if ('temperature' in this.unitClimateSensor && this.unitClimateSensor.temperature !== null) {
            const value = `${this.unitClimateSensor.temperature.toFixed(0)}°C`
            return this.hasPerGateClimateSensors ? `${value}...` : value
        }

        return undefined
    }

    get mmuVendor() {
        return this.mmuMachineUnit?.vendor ?? 'Unknown'
    }

    get logoHeight() {
        if (squareLogoVendors.includes(this.mmuVendor)) return this.spoolWidth - 16

        return this.spoolWidth - 8
    }

    get logoClasses() {
        if (squareLogoVendors.includes(this.mmuVendor)) return ['my-1']

        return []
    }

    get logo() {
        const baseIcon = this.getBaseIcon(this.mmuVendor)
        const themeVariants = mmuThemeIcons[this.mmuVendor]

        if (!themeVariants) return baseIcon

        const isDark = this.$vuetify.theme.dark
        const themeIcon = isDark ? themeVariants.dark : themeVariants.light

        return themeIcon ?? baseIcon
    }

    private getBaseIcon(vendor: string) {
        switch (vendor) {
            case '3MS':
                return mmuIcon3MS

            case 'AngryBeaver':
                return mmuIconAngryBeaver

            case 'BoxTurtle':
                return mmuIconBoxTurtle

            case 'EMU':
                return mmuIconEmu

            case 'ERCF':
                return mmuIconErcf

            case 'KMS':
                return mmuIconKms

            case 'MMX':
                return mmuIconMmx

            case 'NightOwl':
                return mmuIconNightOwl

            case 'QuattroBox':
                return mmuIconQuattroBox

            case 'Tradrack':
                return mmuIconTradrack

            case 'VVD':
                return mmuIconVvd

            default:
                return mmuIconHappyHare
        }
    }
}
</script>

<style scoped>
.mmu-unit-footer {
    background: #2c2c2c;
    border-radius: 0 0 8px 8px;
}

html.theme--light .mmu-unit-footer {
    background: #f0f0f0;
}

.opacity-70 {
    opacity: 0.7;
}

.zindex-4 {
    z-index: 4;
}
</style>

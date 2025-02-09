<template>
<v-container>
    <div class="spool-row text--disabled">{{ unitName }}</div>
    <div class="spool-row">
        <div v-for="gate in unitGateRange" :key="'gate_' + gate"
             class="gate-status cursor-pointer" @click="selectGate(gate)">
            <mmu-spool :width="width" :gateIndex="gate" :class="{ 'hover-effect': !isMobile }"/>
            <mmu-gate-status :gateIndex="gate"/>
        </div>
        <div v-if="hasBypass"
             class="gate-status cursor-pointer" @click="selectBypass()">
            <mmu-spool :width="width" :gateIndex="TOOL_GATE_BYPASS" :class="{ 'hover-effect': !isMobile }"/>
            <mmu-gate-status :gateIndex="TOOL_GATE_BYPASS"/>
        </div>
    </div>
</v-container>
</template>

<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator'
import BaseMixin from '@/components/mixins/base'
import MmuMixin from '@/components/mixins/mmu'
import MmuSpool from '@/components/panels/Mmu/MmuSpool.vue'
import MmuGateStatus from '@/components/panels/Mmu/MmuGateStatus.vue'

@Component({
    components: { MmuSpool, MmuGateStatus },
})
export default class MmuUnit extends Mixins(BaseMixin, MmuMixin) {
    @Prop({ required: false, default: 0 }) readonly unit!: number

    get unitRef(): string {
        return `unit_${this.unit}`
    }

    get unitName(): string {
        const name = this.$store.state.printer?.mmu_machine?.[this.unitRef]?.name || 'Unit'
        return `#${this.unit + 1} ${name}`
    }

    get unitNumGates(): number {
        return this.$store.state.printer?.mmu_machine?.[this.unitRef]?.num_gates
    }

    get unitFirstGate(): number {
        return this.$store.state.printer?.mmu_machine?.[this.unitRef]?.first_gate
    }

    get unitGateRange(): number[] {
        const start = this.unitFirstGate
        return Array.from({ length: this.unitNumGates }, (v, k) => k + start)
    }

    get width(): number {
        if (this.numGates <= 9) {
            return "56px"
        } else if (this.numGates <= 12) {
            return "48px"
        }
        return "40px"
    }

    selectGate(gate): null {
        if (!this.isPrinting) {
            this.doSend("MMU_SELECT GATE=" + gate)
        }
    }

    selectBypass() {
        if (!this.isPrinting) {
            this.doSend("MMU_SELECT BYPASS=1")
        }
    }
}
</script>

<style scoped>
.spool-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    gap: 0px;
    font-size: 14px;
}

.gate-status {
    font-size: 0px;
}

.hover-effect {         
    transition: transform 0.2s ease-in-out;
}               
            
.hover-effect:hover {
    transform: translateY(-3px);
}  
</style>

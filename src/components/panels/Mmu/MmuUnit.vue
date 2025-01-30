<template>
<v-container>
    <div class="spool-row text--disabled">{{ unitName }}</div>
    <div class="spool-row">
        <div v-for="gate in unitGateRange" :key="'gate_' + gate"
             class="gate-status cursor-pointer" @click="selectGate(gate)">
            <mmu-spool :width="width" :thisGate="gate"/>
            <mmu-gate-status :thisGate="gate"/>
        </div>
    </div>
</v-container>
</template>

<script lang="ts">
import { Component, Mixins, Prop, Emit } from 'vue-property-decorator'
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

    @Emit('select-gate')
    selectGate(gate) {
        this.doSend("MMU_SELECT GATE=" + gate)
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
</style>

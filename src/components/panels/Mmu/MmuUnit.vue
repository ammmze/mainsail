<template>
    <v-container>
      <div class="spool-row text--disabled">{{ name }}</div>
      <div class="spool-row">
          <div v-for="gate in gateRange" :key="'gate_' + gate"
               class="gate-status cursor-pointer" @click="selectGate(gate)">
              <mmu-spool :width="width" :gate="gate"/>
              <mmu-gate-status :gate="gate"/>
          </div>
      </div>
    </v-container>
</template>

<script lang="ts">
import { Component, Mixins, Prop, Emit } from 'vue-property-decorator'
import BaseMixin from '@/components/mixins/base'
import ControlMixin from '@/components/mixins/control'
import MmuSpool from '@/components/panels/Mmu/MmuSpool.vue'
import MmuGateStatus from '@/components/panels/Mmu/MmuGateStatus.vue'

@Component({
    components: { MmuSpool, MmuGateStatus },
})
export default class MmuUnit extends Mixins(BaseMixin, ControlMixin) {
    @Prop({ required: false, default: 0 }) readonly unit!: number

    get unitRef(): string {
        return `unit_${this.unit}`;
    }

    get name(): string {
        const name = this.$store.state.printer?.mmu_machine?.[this.unitRef]?.name || 'Unit';
        return `#${this.unit + 1} ${name}`;
    }

    get numGates(): number {
        return this.$store.state.printer?.mmu_machine?.[this.unitRef]?.num_gates;
    }

    get firstGate(): number {
        return this.$store.state.printer?.mmu_machine?.[this.unitRef]?.first_gate;
    }

    get gateRange(): number[] {
        const start = this.firstGate;
        return Array.from({ length: this.numGates }, (v, k) => k + start);
    }

    get width(): number {
        const numGates = this.$store.state.printer?.mmu?.num_gates;
        if (numGates <= 9) {
            return "56px"
        } else if (numGates <= 12) {
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

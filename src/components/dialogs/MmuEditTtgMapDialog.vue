<template>
    <v-dialog v-model="showDialog" width="800" persistent :fullscreen="isMobile">
        <panel :title="$t('Panels.MmuPanel.EditTtgMap')"
               :icon="mdiStateMachine"
               card-class="mmu-edit-ttg-map-dialog"
               :margin-bottom="false">
            <template #buttons>
                <v-btn icon tile @click="close">
                    <v-icon>{{ mdiCloseThick }}</v-icon>
                </v-btn>
            </template>

            <v-card-subtitle>
                <v-container fluid>
                    <v-row>
                        <v-col cols="8" class="d-flex justify-start align-center no-padding">
                            <span>Map slicer tools to MMU gates for print</span>
                        </v-col>
                        <v-col cols="4" class="d-flex justify-end align-center no-padding pr-10">
                            <v-switch label="All Tools" hide-details class="short-switch"></v-switch>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="9">
                            <v-row>
                                <v-col cols="1" v-for="(g, t) in ttgMap" :key="t" class="no-padding min-width-card">
                                  <v-card :class="toolCardClass(t)" @click="selectTool(t)">
                                    <v-card-title class="justify-center">T{{ t }}</v-card-title>
                                    <v-card-text>
                                        <v-container>
                                            <v-row>
                                                <v-col cols="5" class="no-padding">
                                                    <mmu-spool :gateIndex="g"
                                                               :showPercent="false"
                                                               width="100%"/>
                                                </v-col>
                                                <v-col cols="7" class="d-flex flex-column no-padding pr-1 pt-2">
                                                    <div class="small-font text-center">Gate</div>
                                                    <div class="text-center">#{{ g }}</div>
                                                    <v-spacer/>
                                                    <v-divider/>
                                                    <div class="text-center small-font">&infin;14</div>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-card-text>
                                  </v-card>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="3" class="d-flex flex-column align-center justify-center pa-0 min-width-map">
                            <mmu-ttg-map :map="localTtgMap"
                                         :groups="localEndlessSpoolGroups"
                                         :selectedTool="selectedTool"
                                         :selectedGate="selectedGate"/>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-subtitle>

            <v-divider/>

            <v-card-text class="px-12 pb-4">
                <div style="height: 350px; overflow-y: auto;">
                    <v-data-table :headers="gatesHeaders"
                                  :items="gatesData"
                                  item-key="index"
                                  sort-by="index"
                                  :items-per-page="-1"
                                  hide-default-footer>

                        <template #no-data>
                            <div class="text-center">Select Tool then choose gate from list</div>
                        </template>

                        <template #item="{ item }">
                            <MmuGateDialogRow :key="item.index"
                                              :details="item"
                                              @select-gate="selectGate"
                                              @mouseover="onGateHover"
                                              @mouseleave="onGateLeave"/>
                        </template>
                     </v-data-table>
                </div>
            </v-card-text>

            <v-card-actions>
                <v-spacer />
                <v-btn text @click="close">{{ $t('Panels.MmuPanel.Cancel') }}</v-btn>
                <v-btn color="primary" text @click="commit">
                    {{ $t('Panels.MmuPanel.Ok') }}
                </v-btn>
            </v-card-actions>
        </panel>
    </v-dialog>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Mixins, Prop, Watch } from 'vue-property-decorator'
import BaseMixin from '@/components/mixins/base'
import MmuMixin from '@/components/mixins/mmu'
import Panel from '@/components/ui/Panel.vue'
import { mdiCloseThick, mdiStateMachine } from '@mdi/js'

@Component({
    components: { Panel }
})
export default class MmuEditTtgMapDialog extends Mixins(BaseMixin, MmuMixin) {
    mdiCloseThick = mdiCloseThick
    mdiStateMachine = mdiStateMachine

    @Prop({ required: true }) declare readonly showDialog: boolean

    private localTtgMap: number[] = []
    private localEndlessSpoolGroups: number[] = []

    private selectedTool: number = -1
    private selectedGate: number = -1
                                
    @Watch('showDialog')
    onShowDialogChanged(newValue: boolean): void {
        if (newValue) {
            this.localTtgMap = this.ttgMap
            this.localEndlessSpoolGroups = this.endlessSpoolGroups
        }           
    }

    private toolCardClass(tool: number): string[] {
        let classes = []
        classes.push('no-padding')
        classes.push('tool-card')
        if (!this.isMobile && !this.isTablet && this.selectedTool !== tool) classes.push('hover-effect')
        if (this.selectedTool === tool) classes.push('selected-card')
        if (this.selectedTool !== tool && this.selectedTool >= 0) classes.push('disabled-card')
        return classes
    }

    get gatesData() {
        // TODO agument with vendor and filament remaining/total
        if (this.selectedTool < 0) return []
        return this.gateMap
    }

    get gatesHeaders() {
        if (this.selectedTool < 0) return []
        return [
            {
                text: 'Gate',
                align: 'start',
                value: 'index',
                sortable: false,
            },
            {
                text: '',
                align: 'center',
                sortable: false,
            },
            {
                text: 'Filament Name',
                align: 'start',
                value: 'filamentName',
                sortable: false,
            },
            {
                text: 'Material',
                align: 'center',
                value: 'material',
                sortable: false,
            },
            {
                text: 'Remaining',
                align: 'center',
                sortable: false,
            },
        ]
    }

    private selectTool(tool: number): string {
        if (this.selectedTool === tool) {
            this.selectedTool = -1
            this.selectedGate = -1
        } else {
            this.selectedTool = tool
        }
    }

    private onGateHover(gate) {
        this.localTtgMap[this.selectedTool] = gate
        this.selectedGate = gate
    }

    private onGateLeave(gate) {
        this.selectedGate = -1
    }

    private selectGate(gate) {
        this.selectedTool = -1
        this.selectedGate = -1
    }

    private handleEscapePress(event) {
        if (event.key === 'Escape' || event.keyCode === 27) {
            this.selectedTool = -1
            this.selectedGate = -1
        }
    }

    close() {
        this.selectedTool = -1
        this.selectedGate = -1
        this.$emit('close')
    }

    commit() {  
        let mapStr = this.localTtgMap.join(',')
        let esGrpStr = this.localEndlessSpoolGroups.join(',')
        let cmd = `MMU_TTG_MAP MAP="${mapStr}"`
        this.doSend(cmd)
        cmd = `MMU_ENDLESS_SPOOL GROUPS="${esGrpStr}"`
        this.doSend(cmd)
        this.close()
    }

    mounted() {
        document.addEventListener('keydown', this.handleEscapePress)

    }
    beforeDestroy() {
        document.removeEventListener('keydown', this.handleEscapePress)
    }
}
</script>

<style scoped>
.selected-card {
    background: #595959 !important;
}

.disabled-card {
    opacity: 0.5;
    pointer-events: none;
}

.tool-card {
    background-color: #2C2C2C;
}

.small-font {
    font-size: 0.8em;
}

.no-padding {
    padding: 3px;
}

.min-width-card {
    min-width: 112px;
}

.min-width-map {
    min-width: 180px;
}

.no-padding .v-card__title,
.no-padding .v-card__subtitle,
.no-padding .v-card__text {
  padding: 0px;
  line-height: 1em;
}

.short-switch {
    padding-top: 0px;
    margin-top: 0px;
    margin-bottom: 2px;
}

.hover-effect {
    transition: transform 0.2s ease-in-out;
}

.hover-effect:hover {
    transform: translateY(-3px);
}
</style>

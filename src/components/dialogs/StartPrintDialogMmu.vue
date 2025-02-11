<template>
    <v-card-text class="pb-0">
        <v-divider class="mt-4 mb-4"/>
        <p class="body-2">
            {{ summary }}
        </p>
        <div class="text-center">
            <v-btn color="primary" medium @click="showEditTtgMapDialog = true">
                <v-icon left>{{ mdiStateMachine }}</v-icon>
                {{ $t('Panels.MmuPanel.EditTtgMap') }}
            </v-btn>
        </div>
        <v-divider :class="classSecondDivider"/>
        <mmu-edit-ttg-map-dialog :show-dialog="showEditTtgMapDialog" @close="showEditTtgMapDialog = false" />
    </v-card-text>
<!--
    <div>
        <v-divider class="mt-4 mb-4"/>

            <v-card-text class="pb-0">
                <p class="body-2">
                    Do you want to start TEST_DUMMY  Ha ha
                </p>
            </v-card-text>

        <v-card-text class="py-0 px-2">
            <div class="text-center">
                <v-btn color="primary" medium @click="showEditTtgMapDialog = true">
                    {{ buttonText }}
                    <v-icon right>{{ mdiStateMachine }}</v-icon>
                </v-btn>
            </div>

        </v-card-text>
        <v-divider :class="classSecondDivider"/>
        <mmu-edit-ttg-map-dialog :show-dialog="showEditTtgMapDialog" @close="showEditTtgMapDialog = false" />
    </div>
-->
</template>

<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator'
import BaseMixin from '@/components/mixins/base'
import MmuMixin from '@/components/mixins/mmu'
import { FileStateGcodefile } from '@/store/files/types'
import { mdiStateMachine } from '@mdi/js'

@Component({ })
export default class StartPrintDialogMmu extends Mixins(BaseMixin, MmuMixin) {
    mdiStateMachine = mdiStateMachine

    showEditTtgMapDialog = false

    @Prop({ required: true }) readonly file!: FileStateGcodefile

    get summary() {
        const referencedTools = this.file.referenced_tools ?? ""
        const numTools = referencedTools.split(',').length
        if (referencedTools.length <= 1 && this.gate !== this.TOOL_GATE_BYPASS) {
            return "This looks like a single color print but you don't have the bypass selected on your MMU. You may want to check the chosen tool"
        }
        return `This looks like a Multi Material Single Extruder print using ${numTools} tools. You should probably review tool mapping`
    }

    get classSecondDivider() {
        const classes = ['mt-4']
        classes.push(this.moonrakerComponents.includes('timelapse') ? 'mb-2' : 'mb-0')
        return classes
    }
}
</script>

<style scoped>
</style>

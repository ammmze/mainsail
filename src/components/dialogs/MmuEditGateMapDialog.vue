<template>
    <v-dialog v-model="showDialog" width="400" persistent :fullscreen="isMobile">
        <panel
            :title="$t('Panels.MmuPanel.EditGateMap')"
            :icon="mdiDatabaseEdit"
            card-class="mmu-edit-gate-map-dialog"
            :margin-bottom="false">
            <template #buttons>
                <v-btn icon tile @click="close">
                    <v-icon>{{ mdiCloseThick }}</v-icon>
                </v-btn>
            </template>
            <v-card-text>
                <v-row>
                    <v-col>
                        <p class="body-2">{{ $t('Panels.MmuPanel.CommingSoon') }}</p>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn text @click="close">{{ $t('Panels.MmuPanel.Cancel') }}</v-btn>
                <v-btn color="primary" text @click="close">
                    {{ $t('Panels.MmuPanel.Ok') }}
                </v-btn>
            </v-card-actions>
        </panel>
    </v-dialog>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import { Mixins, Prop } from 'vue-property-decorator'
import BaseMixin from '@/components/mixins/base'
import MmuMixin from '@/components/mixins/mmu'
import Panel from '@/components/ui/Panel.vue'
import { mdiCloseThick, mdiDatabaseEdit } from '@mdi/js'

@Component({
    components: { Panel }
})
export default class MmuEditGateMapDialog extends Mixins(BaseMixin, MmuMixin) {
    mdiCloseThick = mdiCloseThick
    mdiDatabaseEdit = mdiDatabaseEdit

    @Prop({ required: true }) declare readonly showDialog: boolean

    close() {
        this.$emit('close')
    }
}
</script>

<style scoped>
</style>

import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class MmuMixin extends Vue {

    get hasEncoder() {
        return !!this.$store.state.printer.mmu?.encoder;
    }

    get enabled() {
        return this.$store.state.printer.mmu?.enabled ?? false
    }   




    refreshSpoolmanData() {     
        this.$store.dispatch('server/spoolman/refreshSpools')
    }

    async doLoadingSend(gcode: string, loadingKey: string) {
        await this.$store.dispatch('socket/addLoading', { name: loadingKey })
        this.doSend(gcode)
        await new Promise(resolve => setTimeout(resolve, 500));
        await this.$store.dispatch('socket/removeLoading', { name: loadingKey })
    }

    doSend(gcode: string) {
        this.$store.dispatch('server/addEvent', { message: gcode, type: 'command' })
        this.$socket.emit('printer.gcode.script', { script: gcode })
    }

/* PAUL note to change in Extruder panel..
    get active_spool(): ServerSpoolmanStateSpool | null {
        return this.$store.state.server.spoolman.active_spool ?? null
    }

    get toolsWithSpoolId() {
        return Object.keys(this.$store.state.printer)
            .filter((key) => /^gcode_macro T\d+$/i.test(key.toLowerCase()))
            .filter((keys) => {
                const object = this.$store.state.printer[keys] ?? {}

                return Object.keys(object).some((key) => key.toLowerCase() === 'spool_id')
            })
    }
*/
}

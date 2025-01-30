import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class MmuMixin extends Vue {

    get hasMmu(): boolean {
        return !!this.$store.state.printer.mmu
    }

    get hasEncoder(): boolean {
        return !!this.$store.state.printer.mmu?.encoder
    }


    /*
     * Encoder properties
     */
    get encoderPos(): number {
        return this.$store.state.printer.mmu?.encoder?.encoder_pos
    }

    get encoderEnabled(): number {
        return this.$store.state.printer.mmu?.encoder?.enabled
    }

    get encoderDesiredHeadroom(): number {
        return this.$store.state.printer.mmu?.encoder.desired_headroom
    }

    get encoderDetectionLength(): number {
        return this.$store.state.printer.mmu.encoder.detection_length
    }

    get encoderDetectionMode(): number {
        return this.$store.state.printer.mmu?.encoder.detection_mode
    }

    get encoderFlowRate(): number {
        return this.$store.state.printer.mmu?.encoder.flow_rate
    }


    /*
     * All Happy Hare mmu properties
     */
    get enabled(): boolean {
        return this.$store.state.printer.mmu?.enabled ?? false
    }   

    get numGates(): number {
        return this.$store.state.printer.mmu?.num_gates
    }

    get isPaused(): boolean {
        return this.$store.state.printer.mmu?.is_paused
    }

    get isHomed(): boolean {
        return this.$store.state.printer.mmu?.is_homed
    }

    get isInPrint(): boolean {
        return this.$store.state.printer.mmu?.is_in_print
    }

    get gate(): number {
        return this.$store.state.printer.mmu?.gate
    }

    get tool(): number {
        return this.$store.state.printer.mmu?.tool
    }

    get activeFilament(): object[] {
        return this.$store.state.printer.mmu?.active_filament
    }

    get lastTool(): number {
        return this.$store.state.printer.mmu?.last_tool
    }

    get nextTool(): number {
        return this.$store.state.printer.mmu?.next_tool
    }

    get toolchangePurgeVolue(): number {
        return this.$store.state.printer.mmu?.toolchange_purge_volume
    }

    get lastToolchange(): string {
        return this.$store.state.printer.mmu?.last_toolchange
    }

    get operation(): string {
        return this.$store.state.printer.mmu?.operation
    }

    get filament(): string {
        return this.$store.state.printer.mmu?.filament
    }

    get filamentPosition(): number {
        return this.$store.state.printer.mmu?.filament_position
    }

    get filamentPos(): number {
        return this.$store.state.printer.mmu?.filament_pos
    }

    get filamentDirection(): number {
        return this.$store.state.printer.mmu?.filament_direction
    }

    get ttgMap(): number[] {
        return this.$store.state.printer.mmu?.ttg_map
    }

    get endlessSpoolGroups(): number[] {
        return this.$store.state.printer.mmu?.endless_spool_groups
    }

    get gateStatus(): number[] {
        return this.$store.state.printer.mmu?.gate_status
    }

    get gateFilamentName(): string[] {
        return this.$store.state.printer.mmu?.gate_filament_name
    }

    get gateMaterial(): string[] {
        return this.$store.state.printer.mmu?.gate_material
    }

    get gateColor(): string[] {
        return this.$store.state.printer.mmu?.gate_color
    }

    get gateTemperature(): number[] {
        return this.$store.state.printer.mmu?.gate_temperature
    }

    get gateSpoolId(): number[] {
        return this.$store.state.printer.mmu?.gate_spool_id
    }

    get gateSpeedOverride(): number[] {
        return this.$store.state.printer.mmu?.gate_speed_override
    }

    get currentGateStatus(): number {
        return this.$store.state.printer.mmu?.gate_status?.[this.gate] ?? -1
    }

    get currentGateFilamentName(): string {
        return this.$store.state.printer.mmu?.gate_filament_name?.[this.gate] || "Unknown"
    }

    get currentGateMaterial(): string {
        return this.$store.state.printer.mmu?.gate_material?.[this.gate] || "Unknown"
    }

    get currentGateColor(): string {
        return this.$store.state.printer.mmu?.gate_color?.[this.gate] || "#808080E0"
    }

    get currentGateTemperature(): number {
        return this.$store.state.printer.mmu?.gate_temperature?.[this.gate] ?? -1
    }

    get currentGateSpoolId(): number {
        return this.$store.state.printer.mmu?.gate_spool_id?.[this.gate] ?? -1
    }

    get currentGateSpeedOverride(): number {
        return this.$store.state.printer.mmu?.gate_speed_override?.[this.gate] ?? 100
    }

    //return this.$store.state.printer.mmu?.gate_color_rgb
    //return this.$store.state.printer.mmu?.slicer_color_rgb
    //return this.$store.state.printer.mmu?.tool_extrusion_multipliers
    //return this.$store.state.printer.mmu?.tool_speed_multipliers
    //return this.$store.state.printer.mmu?.slicer_tool_map

    get action(): string {
        return this.$store.state.printer.mmu?.action
    }

    get hasBypass(): boolean {
        return this.$store.state.printer.mmu?.has_bypass
    }

    get syncDrive(): boolean {
        return this.$store.state.printer.mmu?.sync_drive
    }

    //return this.$store.state.printer.mmu?.sync_feedback_state

    get printState(): string {
        return this.$store.state.printer.mmu?.print_state
    }

    get clogDetectionEnabled(): boolean {
        return this.$store.state.printer.mmu?.clog_detection
    }

    get endlessSpoolEnabled(): boolean {
        return this.$store.state.printer.mmu?.endless_spool
    }

    get reasonForPause(): string {
        return this.$store.state.printer.mmu?.reason_for_pause
    }

    get extruderFilamentRemaining(): number {
        return this.$store.state.printer.mmu?.extruder_filament_remaining
    }

    get spoolmanSupport(): string {
        return this.$store.state.printer.mmu?.spoolman_support
    }

    //return this.$store.state.printer.mmu?.selector_type

    get sensors(): object[] {
        return this.$store.state.printer.mmu?.sensors
    }


    /*
     * Miscellaneous
     */

    refreshSpoolmanData() {     
        this.$store.dispatch('server/spoolman/refreshSpools')
    }

    // Prefer active if its the correct one (updated more frequently)
    get spoolmanSpool(): ServerSpoolmanStateSpool | null {
        const activeSpool = this.$store.state.server.spoolman.active_spool ?? null
        if (activeSpool?.id === this.currentGate) {
            return activeSpool
        }
        const spools = this.$store.state.server.spoolman?.spools ?? []
        return spools.find((spool: ServerSpoolmanStateSpool) => spool.id === this.currentGateSpoolId) ?? null
    }

    async doLoadingSend(gcode: string, loadingKey: string) {
        await this.$store.dispatch('socket/addLoading', { name: loadingKey })
        this.doSend(gcode)
        await new Promise(resolve => setTimeout(resolve, 500))
        await this.$store.dispatch('socket/removeLoading', { name: loadingKey })
    }

    doSend(gcode: string) {
        this.$store.dispatch('server/addEvent', { message: gcode, type: 'command' })
        this.$socket.emit('printer.gcode.script', { script: gcode })
    }

/* PAUL note to change in Extruder panel..

    get toolsWithSpoolId() {
        return Object.keys(this.$store.state.printer)
            .filter((key) => /^gcode_macro T\d+$/i.test(key.toLowerCase()))
            .filter((keys) => {
                const object = this.$store.state.printer[keys] ?? {}

                return Object.keys(object).some((key) => key.toLowerCase() === 'spool_id')
            })
    }

// HH Actions:
        return ("Idle" if action == self.ACTION_IDLE else
                "Loading" if action == self.ACTION_LOADING else
                "Unloading" if action == self.ACTION_UNLOADING else
                "Loading Ext" if action == self.ACTION_LOADING_EXTRUDER else
                "Exiting Ext" if action == self.ACTION_UNLOADING_EXTRUDER else
                "Forming Tip" if action == self.ACTION_FORMING_TIP else
                "Heating" if action == self.ACTION_HEATING else
                "Checking" if action == self.ACTION_CHECKING else
                "Homing" if action == self.ACTION_HOMING else
                "Selecting" if action == self.ACTION_SELECTING else
                "Unknown") # Error case - should not happen

*/
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
}

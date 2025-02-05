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
     * Select encoder properties
     */
    get encoderPos(): number {
        return Math.round(this.$store.state.printer.mmu?.encoder?.encoder_pos ?? 0)
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
        return this.$store.state.printer.mmu?.num_gates ?? 0
    }

    get printState(): string {
        return this.$store.state.printer.mmu?.print_state
    }

    get isPrinting(): boolean {
        return ["started", "printing"].includes(this.$store.state.printer.mmu?.print_state)
    }

    get isInPrint(): boolean {
        return ["printing", "pause_locked", "paused"].includes(this.$store.state.printer.mmu?.print_state)
    }

    get isMmuPaused(): boolean {
        return this.$store.state.printer.mmu?.is_paused ?? false
        return ["pause_locked", "paused"].includes(this.$store.state.printer.mmu?.print_state)
    }

    get isMmuPausedAndLocked(): boolean {
        return ["pause_locked"].includes(this.$store.state.printer.mmu?.print_state)
    }

    get isHomed(): boolean {
        return this.$store.state.printer.mmu?.is_homed ?? false
    }

    get gate(): number {
        return this.$store.state.printer.mmu?.gate
    }
    get tool(): number {
        return this.$store.state.printer.mmu?.tool
    }
    readonly TOOL_GATE_UNKNOWN: number = -1
    readonly TOOL_GATE_BYPASS: number = -2

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
        return this.$store.state.printer.mmu?.last_toolchange ?? ''
    }

    get operation(): string {
        return this.$store.state.printer.mmu?.operation
    }

    get filament(): string {
        return this.$store.state.printer.mmu?.filament
    }

    get filamentPosition(): number {
        return (this.$store.state.printer.mmu?.filament_position ?? 0).toFixed(1)
    }

    get filamentPos(): number {
        return this.$store.state.printer.mmu?.filament_pos ?? FILAMENT_POS_UNKNOWN
    }
    readonly FILAMENT_POS_UNKNOWN: number = -1
    readonly FILAMENT_POS_UNLOADED: number = 0       // Parked in gate
    readonly FILAMENT_POS_HOMED_GATE: number = 1     // Homed at either gate or gear sensor (currently assumed mutually exclusive sensors)
    readonly FILAMENT_POS_START_BOWDEN: number = 2   // Point of fast load portion
    readonly FILAMENT_POS_IN_BOWDEN: number = 3      // Some unknown position in the bowden
    readonly FILAMENT_POS_END_BOWDEN: number = 4     // End of fast load portion
    readonly FILAMENT_POS_HOMED_ENTRY: number = 5    // Homed at entry sensor
    readonly FILAMENT_POS_HOMED_EXTRUDER: number = 6 // Collision homing case at extruder gear entry
    readonly FILAMENT_POS_EXTRUDER_ENTRY: number = 7 // Past extruder gear entry
    readonly FILAMENT_POS_HOMED_TS: number = 8       // Homed at toolhead sensor
    readonly FILAMENT_POS_IN_EXTRUDER: number = 9    // In extruder past toolhead sensor
    readonly FILAMENT_POS_LOADED: number = 10        // Homed to nozzle

    get filamentDirection(): number {
        return this.$store.state.printer.mmu?.filament_direction
    }
    readonly DIRECTION_LOAD: number = 1
    readonly DIRECTION_UNKNOWN: number = 0
    readonly DIRECTION_UNLOAD: number = -1

    get bowdenProgress(): number {
        return this.$store.state.printer.mmu?.bowden_progress ?? -1
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
    readonly GATE_UNKNOWN: number = -1
    readonly GATE_EMPTY: number = 0
    readonly GATE_AVAILABLE: number = 1 // Available to load from either buffer or spool
    readonly GATE_AVAILABLE_FROM_BUFFER: number = 2

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

    //return this.$store.state.printer.mmu?.gate_color_rgb
    //return this.$store.state.printer.mmu?.slicer_color_rgb
    //return this.$store.state.printer.mmu?.tool_extrusion_multipliers
    //return this.$store.state.printer.mmu?.tool_speed_multipliers
    //return this.$store.state.printer.mmu?.slicer_tool_map

    get action(): string {
        return this.$store.state.printer.mmu?.action
    }
    readonly ACTION_IDLE: string = "Idle"
    readonly ACTION_LOADING: string = "Loading"
    readonly ACTION_LOADING_EXTRUDER: string = "Loading Ext"
    readonly ACTION_UNLOADING: string = "Unloading"
    readonly ACTION_UNLOADING_EXTRUDER: string = "Unloading Ext"
    readonly ACTION_FORMING_TIP: string = "Forming Tip"
    readonly ACTION_CUTTING_TIP: string = "Cutting Tip"
    readonly ACTION_HEATING: string = "Heating"
    readonly ACTION_CHECKING: string = "Checking"
    readonly ACTION_HOMING: string = "Homing"
    readonly ACTION_SELECTING: string = "Selecting"
    readonly ACTION_CUTTING_FILAMENT: string = "Cutting Filament"
    readonly ACTION_PURGING: string = "Purging"

    get hasBypass(): boolean {
        return this.$store.state.printer.mmu?.has_bypass ?? false
    }

    get syncDrive(): boolean {
        return this.$store.state.printer.mmu?.sync_drive
    }

    //return this.$store.state.printer.mmu?.sync_feedback_state

    get syncFeedbackEnabled(): boolean {
        return this.$store.state.printer.mmu?.sync_feedback_enabled
    }

    get clogDetectionEnabled(): boolean {
        return this.$store.state.printer.mmu?.clog_detection // PAUL TODO change to clog_detection_enabled
    }

    get endlessSpoolEnabled(): boolean {
        return this.$store.state.printer.mmu?.endless_spool // PAUL TODO change to endless_spool_enabled
    }

    get reasonForPause(): string {
        return this.$store.state.printer.mmu?.reason_for_pause ?? ''
    }

    get extruderFilamentRemaining(): number {
        return this.$store.state.printer.mmu?.extruder_filament_remaining
    }

    get spoolmanSupport(): string {
        return this.$store.state.printer.mmu?.spoolman_support
    }

    //return this.$store.state.printer.mmu?.selector_type

    get sensors(): object[] {
        return this.$store.state.printer.mmu?.sensors ?? []
    }

    get espoolerActive(): string {
        return this.$store.state.printer.mmu?.espooler_active ?? ''
    }


    /*
     * Convenience access to current gate info in the gate map. If bypass is
     * selected then try to get info from active spoolman spool
     */

    get currentGateStatus(): number {
        return this.$store.state.printer.mmu?.gate_status?.[this.gate] ?? -1
    }

    get currentGateFilamentName(): string {
        if (this.gate === this.TOOL_GATE_BYPASS) {
            // Assume active spoolman spool if available
            return this.$store.state.server.spoolman?.active_spool?.filament?.name ?? 'Unknown'
        }
        return this.$store.state.printer.mmu?.gate_filament_name?.[this.gate] || 'Unknown'
    }

    get currentGateMaterial(): string {
        if (this.gate === this.TOOL_GATE_BYPASS) {
            // Assume active spoolman spool if available
            return this.$store.state.server.spoolman?.active_spool?.filament?.material ?? 'Unknown'
        }
        return this.$store.state.printer.mmu?.gate_material?.[this.gate] || 'Unknown'
    }

    get currentGateColor(): string {
        let color = null
        if (this.gate === this.TOOL_GATE_BYPASS) {
            // Assume active spoolman spool if available
            color = this.$store.state.server.spoolman?.active_spool?.filament.color_hex ?? null
            if (color !== null) '#' + color
        } else {
            color = this.$store.state.printer.mmu?.gate_color[this.gate] || '#808080E0'
        }
        return this.formColorString(color)
    }

    get currentGateTemperature(): number {
        if (this.gate === this.TOOL_GATE_BYPASS) {
            // Assume active spoolman spool if available
            return this.$store.state.server.spoolman?.active_spool?.filament?.settings_extruder_temp ?? -1
        }
        return this.$store.state.printer.mmu?.gate_temperature?.[this.gate] ?? -1

    }

    get currentGateVendor(): string { // Happy Hare doesn't store vendor
        if (this.gate === this.TOOL_GATE_BYPASS) {
            // Assume active spoolman spool if available
            return this.$store.state.server.spoolman?.active_spool?.filament?.vendor?.name ?? 'Unknown'
        }
        return this.spoolmanSpool?.filament?.vendor?.name ?? 'Unknown'
    }

    get currentGateSpoolId(): number {
        if (this.gate === this.TOOL_GATE_BYPASS) {
            // Assume active spoolman spool if available
            return this.$store.state.server.spoolman?.active_spool?.id ?? -1
        }
        return this.$store.state.printer.mmu?.gate_spool_id?.[this.gate] ?? -1
    }

    get currentGateSpeedOverride(): number {
        return this.$store.state.printer.mmu?.gate_speed_override?.[this.gate] ?? 100
    }


    /*
     * Selective Happy Hare configuration parameters
     */

    get configGateHomingEndstop(): string {
        // TODO ideally make dynamic because of MMU_TEST_CONFIG
        return this.$store.state.printer.configfile.config.mmu?.gate_homing_endstop
    }

    get configExtruderHomingEndstop(): string {
        // TODO ideally make dynamic because of MMU_TEST_CONFIG
        return this.$store.state.printer.configfile.config.mmu?.extruder_homing_endstop
    }

    get configExtruderForceHoming(): boolean {
        // TODO ideally make dynamic because of MMU_TEST_CONFIG
        return (this.$store.state.printer.configfile.config.mmu?.extruder_force_homing ?? 0) === 1
    }

    get varsCalibrationBowdenLengths(): number[] {
        return this.$store.state.printer.save_variables?.variables?.mmu_calibration_bowden_lengths
    }

    get varsFilamentRemaining(): string {
        return this.$store.state.printer.save_variables?.variables?.mmu_state_filament_remaining ?? 0
    }

    get varsFilamentRemainingColor(): string {
        let color = this.$store.state.printer.save_variables?.variables?.mmu_state_filament_remaining_color ?? ''
        if (color) return this.formColorString(color)
        return color
    }


    /*
     * Miscellaneous
     */

    get gateText(): string {
        return this.gate === -1 ? "?" : this.gate === this.TOOL_GATE_BYPASS ? "Bypass" : this.gate
    }

    get toolText(): string {
        return this.tool === -1 ? "T?" : this.tool === this.TOOL_GATE_BYPASS ? "Bypass" : "T" + this.tool
    }

    // Empty string if nothing to report
    get toolchangeText(): string {
        if (this.nextTool === this.TOOL_GATE_UNKNOWN) return "";
        const fromText = this.lastTool !== this.TOOL_GATE_UNKNOWN ?
            ` from ${this.lastTool === this.TOOL_GATE_BYPASS ? "Bypass" : `T${this.lastTool}`}` : "";
        const toText = ` to ${this.nextTool === this.TOOL_GATE_BYPASS ? "Bypass" : `T${this.nextTool}`}`;
        return `Changing tool${fromText}${toText}`;
    }

    refreshSpoolmanData() {     
        this.$store.dispatch('server/spoolman/refreshSpools')
    }

    // Prefer active if its the correct one (updated more frequently)
    get spoolmanSpool() {
        const activeSpool = this.$store.state.server.spoolman.active_spool ?? null
        if (activeSpool?.id === this.gate) {
            return activeSpool
        }
        const spools = this.$store.state.server.spoolman?.spools ?? []
        return spools.find((spool) => spool.id === this.currentGateSpoolId) ?? null
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


    /*
     * Helper functions
     */

    // Fix Happy Hare color strings (# problematic in klipper CLI)
    private formColorString(color: string): string {
        if (!color) {
            return "#808080E0"
        }
        const hexColorPattern = /^[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/
        if (hexColorPattern.test(color) && !color.startsWith('#')) {
            return '#' + color
        }
        return color
    }

    private getLuminance({ r, g, b }) {
        const a = [r, g, b].map(function (v) {
            v /= 255
            return v <= 0.03928 ? v / 12.92 : Math.pow(((v + 0.055) / 1.055), 2.4)
        })
        return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
    } 

/* PAUL TEMP
   PAUL note to change in Extruder panel..
   PAUL and USEFUL CODE SNIPPITS

   Remember:  || <val> if default should apply to 0 or "", ?? <val> if default only for undefined, etc

    get toolsWithSpoolId() {
        return Object.keys(this.$store.state.printer)
            .filter((key) => /^gcode_macro T\d+$/i.test(key.toLowerCase()))
            .filter((keys) => {
                const object = this.$store.state.printer[keys] ?? {}

                return Object.keys(object).some((key) => key.toLowerCase() === 'spool_id')
            })
    }

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

    // For walking store to find property
    private findKey(obj: any, keyToFind: string): boolean {
        // Check if the current object has the key
        if (obj.hasOwnProperty(keyToFind)) {
            return true;
        }

        // Otherwise, iterate over all properties of the object
        for (let key in obj) {
            if (obj[key] && typeof obj[key] === 'object') {
                // Recursively search in each nested object
                if (this.findKey(obj[key], keyToFind)) {
                    console.log("-->" + key)
                    return true;
                }
            }
        }
        return false;
    }

    def is_printing(self, force_in_print=False): # Actively printing and not paused
        return self.print_state in ["started", "printing"] or force_in_print or self.test_force_in_print
*/
}

export default {
    template: `
        <div class="overflow bg-blue-200 grid place-items-center border-b-8 border-blue-100 space-y-2">
            <div class="text-blue-800 text-2xl">
                {{ patient.name }}
            </div>
            <div>
                Patient Weight<label class="italic">(kg)</label>:
            </div>
            <div>    
                <input class="p-2 border border-gray-800 text-black" v-model="correctedWeight" placeholder="kg...">
            </div>
            <div>
                Drop Factor<label class="italic">(Optional for gravity drips)</label>:
            </div>
            <div>
                <input class="p-2 border border-gray-800 text-black" v-model="correctedGtt" placeholder="gtt/mL..." />
            </div>
            
            <div class="place-self-start">    
                <button class="text-white bg-blue-600 hover:bg-blue-800 rounded px-4 py-2 p-2"
                    @click="corrected"    
                >
                    Save
                </button>
            </div>
        </div>
    `,

    props: {
        patient: Object,
    },

    data() {
        return {
            correctedWeight: this.patient.weight,
            correctedGtt: this.patient.gtt, 
        }
    },

    methods: {
        corrected() {
            this.patient.edit = false;
            this.patient.weight = this.correctedWeight;
            this.patient.gtt = this.correctedGtt;

            this.$emit('save')
        },
    },
}
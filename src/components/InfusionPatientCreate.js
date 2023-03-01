import InfusionModal from "./InfusionModal.js";

export default{
    components: { InfusionModal },


    data() {
        return {
            newName: '',
            newWeight: 1,
            newGtt: 1,
        }
    },

    template: `
        <infusion-modal v-show="addPatient">
            <template #header>
                <label class="flex text-blue-800 text-xl">
                    Add a new patient:
                </label>
            </template>
            <template #default>
                <div class="grid place-items-center space-y-2">
                    <p>Patient Initials:</p>
                    <input class="p-2 border border-gray-800" v-model="newName" placeholder="Patient Initials..." maxlength="3" />
                    <p>Patient Weight<label class="italic">(kg)</label>:</p>
                    <input class="p-2 border border-gray-800" v-model="newWeight" placeholder="kg..."/>
                    <p>Drop Factor<label class="italic">(Optional for gravity drips)</label>:</p>
                    <input class="p-2 border border-gray-800" v-model="newGtt" placeholder="gtt/mL..." /></p>
                </div>
            </template>
            <template #footer>
                <div class="flex gap-16">
                    <button class="text-white bg-blue-600 hover:bg-blue-800 rounded px-7 py-2 p-2" 
                        @click="newPatient"
                    >
                        Add
                    </button>

                    <button class="text-white bg-blue-600 hover:bg-blue-800 rounded px-7 py-2 p-2" 
                        @click="this.$emit('close')"
                    >
                        Cancel
                    </button>
                </div>
            </template>
        </infusion-modal>
    `,

    methods: {
        newPatient() {
            if (!this.newName) {
                alert("Please include patient initials.")
            }
            else {

                this.$emit('newPatient', this.newName, this.newWeight, this.newGtt)

                this.newName = '';
                this.newWeight = 1;
                this.newGtt = 1;
                this.$emit('close')
            }
        },
    },

    computed: {
        activePatients() {
            return this.patients.filter(patient => patient.active);
        }
    },

    props: {
        addPatient: Boolean,
    }
}
import InfusionButton from "./InfusionButton.js";
import InfusionModal from "./InfusionModal.js";

export default{
    components: { InfusionButton, InfusionModal },


    data() {
        return {
            newName: '',
            newWeight: 1,
            newGtt: 1,
        }
    },

    template: `
        <infusion-modal v-show="addPatient">
            <template #image>
                <img src="/src/assets/infusionPatientIcon.png" width="30" height="30" aria-hidden="true">
            </template>
            <template #header>
                    Add a new patient:
            </template>
            <template #default>
                    <p>Patient Initials:</p>
                    <input class="p-2 border border-gray-800" v-model="newName" placeholder="Patient Initials..." maxlength="3" />
                    <p>Patient Weight<label class="italic">(kg)</label>:</p>
                    <input class="p-2 border border-gray-800" v-model="newWeight" placeholder="kg..."/>
                    <p>Drop Factor<label class="italic">(Optional for gravity drips)</label>:</p>
                    <input class="p-2 border border-gray-800" v-model="newGtt" placeholder="gtt/mL..." /></p>
            </template>
            <template #footer>
                <infusion-button size="small" @click="newPatient">
                    Add
                </infusion-button>

                <infusion-button size="small" theme="white" @click="$emit('close')" class="ml-0 sm:ml-2 mt-2 sm:mt-0">
                    Cancel
                </infusion-button>
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
import InfusionModal from "./InfusionModal.js";
import InfusionSearchl from "./InfusionSearchl.js"
import InfusionButton from "./InfusionButton.js";

export default{
    components: { InfusionModal, InfusionSearchl, InfusionButton },

    data(){
        return{

            currentSearch: '',
            selectedMed: [{
                name: '',
                units: '',
                u: '',
                mL: '',
                medID: '',
            }],

            medications: [
                //A
                {
                    name: "amiodarone",
                    units: 4,
                    u: 250,
                    mL: 250,
                    time: 60, 
                    weightBased: false,
                },
                //B
                //C
                //D
                {
                    name: "dexmedetomidine",
                    units: 5,
                    u: 400,
                    mL: 100,
                    time: 1,
                    weightBased: true, 
                },
                {
                    name: "diltiazem",
                    units: 4,
                    u: 125,
                    mL: 125,
                    time: 1,
                    weightBased: false, 
                },
                //E
                
                //F
                {
                    name: "fentanyl",
                    units: 5,
                    u: 1500,
                    mL: 30,
                    time: 1, 
                    weightBased: false,
                },
                //G
                //H
                {
                    name: "heparin",
                    units: 6,
                    u: 25000,
                    mL: 500,
                    time: 1, 
                    weightBased: true,
                },
                //I
                {
                    name: "insulin (non weight based)",
                    units: 6,
                    u: 100,
                    mL: 100,
                    time: 1, 
                    weightBased: false,
                },
                {
                    name: "insulin (weight based)",
                    units: 6,
                    u: 100,
                    mL: 100,
                    time: 1, 
                    weightBased: true,
                },
                //J
                //K
                {
                    name: "ketamine",
                    units: 5,
                    u: 250000,
                    mL: 250,
                    time: 60, 
                    weightBased: true,
                },
                //L
                //M
                {
                    name: "midazolam",
                    units: 4,
                    u: 150,
                    mL: 30,
                    time: 1, 
                    weightBased: false,
                },
                //N
                {
                    name: "nicardipine",
                    units: 4,
                    u: 25,
                    mL: 250,
                    time: 1, 
                    weightBased: false,
                },
                {
                    name: "norepinephrine",
                    units: 5,
                    u: 8000,
                    mL: 250,
                    time: 60, 
                    weightBased: false,

                },
                //O
                //P
                {
                    name: "propofol",
                    units: 5,
                    u: 1000000,
                    mL: 100,
                    time: 60,
                    weightBased: true,
                },
                //Q
                //R
                //S
                //T
                //U
                //V
                //W
                //X
                //Y
                //Z
            ]

        }
    },

    template: `
        <div v-if="searchMed">
            <infusion-modal>
                <template #header>
                    <label class="flex justify-center text-blue-800 text-xl">
                        Search Medications:
                    </label>
                </template>
                <template #default>
                    <div class="p-2 space-x-2 grid place-items-center">
                        <input type="search" v-model="currentSearch" class="p-2 border border-gray-800">
                    </div>

                    <div>
                        <infusion-searchl v-for="medication in searchMedications" :currentSearch="currentSearch" :medication="medication" @results="results"></infusion-searchl>
                    </div>



                </template>
                <template #footer>
                    <div>
                        <infusion-button class="ml-0 mt-2 md:ml-2 sm:mt-0" size="small" theme="white" @click="$emit('close')">
                            Cancel
                        </infusion-button>
                    </div>
                </template>
            </infusion-modal>
        </div>
    `,

    methods: {
        results(name, units, u, mL, time, weightBased){
            this.$emit('results', name, units, u, mL, time, weightBased)
            this.$emit('close')
            this.currentSearch = '';
        }
    },

    computed:{
        searchMedications(){
            return this.medications.filter(a => a.name.includes(this.currentSearch.toLowerCase()));
        },
    },

    props: {
        searchMed: Boolean,
        patients: Object
    }
}

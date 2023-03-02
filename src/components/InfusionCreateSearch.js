import InfusionModal from "./InfusionModal.js";
import InfusionSearchl from "./InfusionSearchl.js"

export default{
    components: { InfusionModal, InfusionSearchl },

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
                    weightBased: false
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
                    units: 4,
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
                        <button class="text-white bg-blue-600 hover:bg-blue-800 rounded px-4 py-2 p-2" 
                            @click="this.$emit('close')"
                        >
                            Cancel
                        </button>
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

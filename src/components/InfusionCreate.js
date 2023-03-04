import InfusionModal from "./InfusionModal.js";
import InfusionCreateSearch from "./InfusionCreateSearch.js"
import InfusionButton from "./InfusionButton.js";

export default{
    components: { InfusionModal, InfusionCreateSearch, InfusionButton },

    template: `
        <div v-show="addMed">
            <infusion-modal>
                <template #header>
                        Search or Add new Med
                </template>
                <template #default>
                    <div>
                        Search: Look up a medication from the library
                    </div>
                    <div>
                        Add Med: Input a medidcation from scratch. 
                    </div>
                </template>
                <template #footer>
                    <infusion-button size="small" @click="searchMed = true, $emit('close')">
                        Search
                    </infusion-button>

                    <infusion-button class="ml-0 sm:ml-2 mt-2 sm:mt-0" size="small" theme="white" @click="createMed = true, $emit('close')">
                        Add Med
                    </infusion-button>
                </template>
            </infusion-modal>
        </div>

        <div v-if="createMed">
            <infusion-modal>
                <template #header>
                        Create a medication:
                    </label>
                </template>
                <template #default>
                    <div class="space-y-2">
                        <p>Patient:</p> 
                        <select v-model="currentName" class="p-2 border border-gray-800" placeholder="newPt" >
                            <option v-for="patient in patients" v-show="patient.name" :value="patient.name">{{ patient.name }}</option>
                        </select>

                        <p>Medication:</p>
                        <input class="md:w-full p-2 border border-gray-800" v-model="newInfusion" placeholder="Medications..." />
                
                        <p>Dose:</p>
                        <input class="md:w-full p-2 border border-gray-800" v-model="newRate" placeholder="Dose..." />
                
                        <p>Units</p>
                        <select name="units" v-model="newUnits" placeholder="1" class="p-2 border border-gray-800">
                            <option value="1">mL</option>
                            <option value="2">gtt</option>
                            <option value="3">g</option>
                            <option value="4">mg</option>
                            <option value="5">mcg</option>
                            <option value="6">u</option>
                        </select>

                        <p>Time</p>
                        <select name="time" v-model="newTime" placeholder="1" class="p-2 border border-gray-800">
                            <option value="1">hour</option>
                            <option value="60">minute</option>
                        </select>

                        <p v-show="newUnits > 1 && newUnits < 3">Drop factor: <input type="checkbox" v-model="newGtt"></p>
                        <p v-show="newUnits > 2">Concentration u/mL</p>
                        <p v-show="newUnits > 2"><input v-model="newU" placeholder="U..." class="p-2 border border-gray-800"/></p>
                        <p v-show="newUnits > 2"><input v-model="newML" placeholder="mL..." class="p-2 border border-gray-800"/></p>
                        <p v-show="newUnits > 2">Weight based: <input type="checkbox" v-model="weightBased"></p>
                        
                        <p>Volume:</p>
                        <input class="md:w-full p-2 border border-gray-800" v-model="newVolume" placeholder="mL..." />
                        
                        <p>Percent to Complete</p>
                        <select name="Percent Completed" v-model="percentComplete" placeholder="1" class="p-2 border border-gray-800">
                            <option value="1">100%</option>
                            <option value=".75">75%</option>
                            <option value=".5">50%</option>
                            <option value=".25">25%</option>
                        </select>
                    </div>
                </template>
                <template #footer>
                    <div>
                    <infusion-button size="small" @click="add">
                        Add
                    </infusion-button>

                    <infusion-button class="ml-0 mt-2 md:ml-2 sm:mt-0" size="small" theme="white" @click="createMed = false, $emit('close')">
                        Cancel
                    </infusion-button>
                    </div>
                </template>
            </infusion-modal>
        </div>

        <infusion-create-search :patients="patients" :searchMed="searchMed" @close="searchMed = false" @results="results"></infusion-create-search>
    `,

    props: {
        addMed: Boolean,
        patients: Array,
    },

    data() {
        return {
            createMed: false,
            searchMed: false,

            currentName: '',

            newInfusion: '',
            newRate: '',
            newUnits: '',
            newTime: 1,
            newGtt: false,
            newU: 1,
            newML: 1, 
            weightBased: false, 
            newVolume: '',
            percentComplete: '',
        }
    },

    methods: {
        results(name, units, u, mL, time, weightBased){
            this.createMed = true;
            this.newInfusion = name;
            this.newUnits = units;
            this.newU = u;
            this.newML = mL;
            this.weightBased = weightBased;
            this.newVolume = mL
            this.newTime = time;


        },

        add() {
            if(!this.currentName) {
                alert("Please choose a patient.")
            }
            else {
                this.$emit('add', this.newInfusion, this.calcConcentration, this.newUnits, this.newRate, 
                this.newTime, this.weightBased, this.newGtt, this.calcVolume, this.currentName)
                
                this.currentName = '';
                this.newInfusion = '';
                this.newRate = '';
                this.newUnits = '';
                this.newTime = 1;
                this.newGtt = false;
                this.newU = 1; 
                this.newML = 1;
                this.weightBased = false; 
                this.newVolume = '';
                this.percentComplete = '';
                this.weight = '';
                this.gtt = '';
                this.addPatient = false;

                this.createMed = false;
                this.$emit('close')
            }
        }
    },

    computed: {
        calcConcentration() {
            return this.newU/this.newML
        },

        calcVolume() {
            return this.newVolume * this.percentComplete
        },
    }
}
import InfusionTab from "./InfusionTab.js"
import InfusionList from "./InfusionList.js"
import InfusionCreate from "./InfusionCreate.js";
import InfusionPatientCreate from "./InfusionPatientCreate.js";
import InfusionModal from "./InfusionModal.js";

export default {
    components: { InfusionTab, InfusionList, InfusionCreate, InfusionPatientCreate, InfusionModal },

    data() {
        if(!localStorage.getItem("infusions")){var infusionP = []}
        else { var infusionP = JSON.parse(localStorage.getItem("infusions"))}

        if(!localStorage.getItem("patients")){var patientP = []}
        else { var patientP = JSON.parse(localStorage.getItem("patients"))}
        
        return {
            tabSet: [{
                name: "Infusing"
            }], 

            newMenu: false,

            patients: patientP,

            infusions: infusionP,

            addPatient: false,

            addMed: false,

            reset: false,
        }
    },

    template: `
        <div class="grid grid-cols-3 bg-blue-400">
            <div class="col-span-2">
                <infusion-tab title="Infusing" :tabSet="tabSet"></infusion-tab>
                <infusion-tab title="Completed" :tabSet="tabSet"></infusion-tab>
            </div>
            <div class="place-self-end">
                <button v-model="newMenu" @click="newMenu = !newMenu" 
                    class="place-self-end text-gray-300 font-bold text-lg bg-blue-600 
                    rounded px-4 py-2 hover:bg-blue-800"
                >
                    +
                </button>
            </div>
        </div>
        <div v-show="newMenu" class="flex justify-end absolute right-0">
            <button @click="addPatient = true, newMenu = false" class="text-white bg-blue-600 hover:bg-blue-800
                px-4 py-2 border-8 border-blue-400"
            >
                New pt. 
            </button>
            <div>
            <button @click="addMed = true, newMenu = false" class="text-white bg-blue-600 hover:bg-blue-800
                px-4 py-2 border-8 border-blue-400" :disabled="!filters.activePatients.length"
            >
                New Med 
            </button>
            </div>

            <div>
                <button @click="reset = true, newMenu = false" class="text-white bg-blue-600 hover:bg-blue-800
                    px-4 py-2 border-8 border-blue-400"
                >
                    Reset 
                </button>
            </div>
        </div>

        <div class="bg-blue-300">
            <infusion-list title="Infusing" :tabSet="tabSet" 
                :infusions="filters.inComplete" :patients="filters.activePatients"
                @save="save"    
            >
            </infusion-list>
            <infusion-list title="Completed" :tabSet="tabSet" 
                :infusions="filters.completed" :patients="filters.activePatients"
                @save="save"    
            >
            </infusion-list>
        </div>

        <infusion-patient-create :addPatient="addPatient" :patients="filters.activePatients" @newPatient="newPatient" @close="addPatient = false"></infusion-patient-create>
        <infusion-create :addMed="addMed" @close="addMed = false" :patients="filters.activePatients" @add="add"></infusion-create>

        
        <infusion-modal v-if="reset">
            <template #header>
                <label class="flex text-blue-800 text-xl">
                    Delete information?  
                </label>
            </template>
            <template #default>
                All patient and medication information will be erased. 
            </template>
            <template #footer>
                <div class="flex gap-16">
                    <button class="text-white bg-blue-600 hover:bg-blue-800 rounded px-7 py-2 p-2" 
                        @click="erase"
                    >
                        Erase
                    </button>

                    <button class="text-white bg-blue-600 hover:bg-blue-800 rounded px-7 py-2 p-2" 
                        @click="reset = false"
                    >
                        Cancel
                    </button>
                </div>
            </template>
        </infusion-modal>
    
        `,



    computed: {
        filters() {
            return{
                inComplete: this.infusions.filter(infusion => !infusion.complete && infusion.active),
                completed: this.infusions.filter(infusion => infusion.complete && infusion.active),
                activePatients: this.patients.filter(patient => patient.active),
            }
        }
    },

    methods: {
        save(){
            var tempInfusion = this.infusions;
            var tempPatient = this.patients;
            localStorage.removeItem("infusions")
            localStorage.removeItem("patients")
            localStorage.setItem("infusions",
            JSON.stringify(tempInfusion));
            localStorage.setItem("patients",
            JSON.stringify(tempPatient));
        },

        newPatient(name, weight, gtt) {
            this.patients.push({
                name: name,
                weight: weight, 
                gtt: gtt,
                edit: false,
                active: true, 
                Pid: this.patients.length + 1,
            });
            this.save()
        },

        add(name, concentration, units, dose, time, weightBased, gtt, volume, patient){
            this.infusions.push({
                name: name,
                concentration: concentration,
                units: units,
                dose: dose,
                time: time,
                end: 1, 
                weightBased: weightBased,
                gtt: gtt,
                active: true,
                complete: false,
                running: false,
                favorites: false,
                patient: patient,
                volume: volume,
                id: this.infusions.length + 1,
            })
            this.save()
        },

        erase(){
            localStorage.removeItem("infusions")
            localStorage.removeItem("patients")

            location.reload()

            this.reset = false;
        }
    },
}
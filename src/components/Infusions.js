import InfusionTab from "./InfusionTab.js"
import InfusionButton from "./InfusionButton.js";
import InfusionList from "./InfusionList.js"
import InfusionCreate from "./InfusionCreate.js";
import InfusionPatientCreate from "./InfusionPatientCreate.js";
import InfusionDeleteM from "./InfusionDeleteM.js";

export default {
    components: { InfusionTab, InfusionButton, InfusionList, InfusionCreate, InfusionPatientCreate, InfusionDeleteM },

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
                <infusion-button @click="newMenu = !newMenu">
                    +
                </infusion-button>
            </div>
        </div>
        <div v-show="newMenu" class="flex justify-end absolute right-0 space-x-2 bg-blue-400 border-8 border-blue-400">
            <button @click="addPatient = true, newMenu = false" class="justify-center rounded-md 
                px-3 py-2 text-sm font-semibold shadow-sm text-white bg-blue-500 hover:bg-blue-600"
            >
                New pt. 
            </button>
            <div>
            <button @click="addMed = true, newMenu = false" class="justify-center rounded-md 
                px-3 py-2 text-sm font-semibold shadow-sm text-white bg-blue-500 hover:bg-blue-600" 
                :disabled="!filters.activePatients.length"
            >
                New Med 
            </button>
            </div>

            <div>
                <button @click="reset = true, newMenu = false" class="justify-center rounded-md 
                    px-3 py-2 text-sm font-semibold shadow-sm text-white bg-blue-500 hover:bg-blue-600"
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


        <infusion-delete-m v-if="reset" title="information" @erase="erase" @close="reset = false">
            Are you sure you want to delete all patient and medication information? This 
            action cannot be undone. 
        </infusion-delete-m>
    
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
import InfusionFiltered from "./InfusionFiltered.js"
import InfusionPatientEdit from "./InfusionPatientEdit.js"

export default {
    components: { InfusionFiltered, InfusionPatientEdit },

    data(){
        return{
            ptExpand: false,
        }
    },

    template: `
        <ul>   
            <li>
                <div v-if="!patient.edit" class="overflow-clip bg-blue-200 grid border-b-8 border-blue-100 sticky top-0">

                    <div class="place-self-center py-2">

                        <button v-model="ptExpand" @click="ptExpand = !ptExpand" class="w-screen hover:bg-blue-300">
                            <label class="text-blue-800 text-2xl">
                                {{ patient.name }} -
                            </label>
                            <label>
                                Weight: {{ patient.weight }}kg
                            </label>
                        </button>
                        
                        <div v-show="ptExpand" class="grid grid-cols-3">
                            <div>
                                <button @click="patient.edit = true" class="text-white rounded px-7 py-2 bg-blue-600 hover:bg-blue-800">
                                    Edit
                                </button>
                            </div>

                            <div class="place-self-center">
                                Drop Factor: {{ patient.gtt }}gtt/mL
                            </div>  

                            <div class="place-self-end">
                                <button @click="erase" class="text-white rounded px-4 py-2 pr-5 bg-blue-600 hover:bg-blue-800">
                                    Delete
                                </button>
                            </div>
                        </div>
                    
                    </div>
                </div>
                
                <div v-else>
                    <infusion-patient-edit :patient="patient" :infusions="infusions" @save="save"></infusion-patient-edit>
                </div>

                <ul>
                    <infusion-filtered title="Infusing" :patient="patient" :infusions="filters.running" @save="save"></infusion-filtered>
                    <infusion-filtered title="Paused" :patient="patient" :infusions="filters.paused" @save="save"></infusion-filtered>
                    <infusion-filtered title="Favorites" :patient="patient" :infusions="filters.favorites" @save="save"></infusion-filtered>
                    <infusion-filtered title="Completed" :patient="patient" :infusions="filters.notFavorites" @save="save"></infusion-filtered>
                </ul>
            </li>
        </ul>
    `,

    props: {
        patient: Object,
        infusions: Object,
    },

    methods: {
        save() {
            this.$emit('save')
        },
        erase() {
            this.patient.active = false,

            delete this.patient.name;
            delete this.patient.weight;
            delete this.patient.gtt;
            delete this.patient.edit;
            delete this.patient.active;
            delete this.patient.Pid;
            this.save()
        }
    },

    computed: {
        filters(){
            return {
                running: this.infusions.filter(infusion => infusion.running && !infusion.complete),
                paused: this.infusions.filter(infusion => !infusion.running && !infusion.complete),
                favorites: this.infusions.filter(infusion => infusion.favorites && infusion.complete),
                notFavorites: this.infusions.filter(infusion => !infusion.favorites && infusion.complete),
            }
        }
    },
}
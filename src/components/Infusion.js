import InfusionUnits from "./InfusionUnits.js"
import InfusionButton from "./InfusionButton.js"
import InfusionEdit from "./InfusionEdit.js"
import InfusionTimer from "./InfusionTimer.js"
import InfusionDeleteM from "./InfusionDeleteM.js"

export default {
    components: { InfusionUnits, InfusionButton, InfusionEdit, InfusionTimer, InfusionDeleteM },

    data(){
        return { 
            eraseM: false, 
        }
    },

    template: `
        <li v-if="!infusion.edit">
            <div class="border-8 border-gray-300">
                <div class="grid grid-cols-6 justify-items-stretch border-b-8 border-blue-200">
                    <div class="col-span-5">
                        Infusion: 
                        <label class="text-blue-800 text-2xl">
                            {{ infusion.name }}
                            <label v-if="infusion.units > 1">
                                {{ infusion.concentration }} 
                            </label>
                            (<infusion-units :infusion="infusion"></infusion-units>
                            <label v-if="infusion.units > 1">/mL</label>)
                        </label>
                    </div>
                    <div class="justify-self-end">
                        <infusion-button @click="eraseM = true">
                            &times
                        </infusion-button>
                    </div>
                </div>
            
                <div class="border-b-8 border-blue-200">Rate: 
			        <label class="text-blue-800 md:text-l text-2xl">{{ infusionRate }} mL/hr</label>
		        </div>

                <div class="border-b-8 border-blue-200" v-show="infusion.units > 1">
                    <label>
                        Dose: 
                        {{ infusion.dose }}
                        <infusion-units :infusion="infusion"></infusion-units>
                        <label v-show="infusion.weightBased">/kg</label>
                        <label v-if="infusion.time > 1">/min</label>
                        <label v-else>/hr</label>
                        <label v-if="infusion.weightBased">
                            &times {{ patient.weight }}kg
                        </label>
                    </label>
                </div>

                <infusion-timer :infusion="infusion" :rate="infusionRate" @save="save"></infusion-timer>

                <div class="flex justify-between">
                    <div class="mt-2">
                        <input type="checkbox" @change="save" v-model="infusion.favorites" />
                        Favorite
                    </div>
                        <infusion-button @click="infusion.edit = true">
                            Edit
                        </infusion-button>
        	    </div>
            </div>
        </li>
        <li v-else>
            <infusion-edit @save="save" :infusion="infusion" :patient="patient">
            </infusion-edit>
        </li>

        <infusion-delete-m v-if="eraseM" title="medication" @erase="deleteDrip" @close="eraseM = false">
            Are you sure you want to delete this medication?
        </infusion-delete-m>
    `,

    props: {
        infusion: Object,
        patient: Object,
    },

    methods: {
        useWeight() { 
            if (this.infusion.weightBased) { return this.patient.weight }
            else { return 1 }
        },
        
        useGtt() {
            if (this.infusion.gtt) { return this.patient.gtt }
            else { return 1 }
        },

        deleteDrip() {
            this.infusion.active = false; 

            delete this.infusion.name;
            delete this.infusion.concentration;
            delete this.infusion.units;
            delete this.infusion.dose;
            delete this.infusion.time;
            delete this.infusion.end;
            delete this.infusion.weightBased;
            delete this.infusion.gtt;
            delete this.infusion.active;
            delete this.infusion.complete;
            delete this.infusion.running;
            delete this.infusion.favorites;
            delete this.infusion.patient;
            delete this.infusion.volume;
            delete this.infusion.edit;
            delete this.infusion.id;

            this.save()
        },

        save() {
            this.$emit('save')
        },
    },

    computed: {
        infusionRate() {
            return (((this.infusion.dose/this.useGtt()) * this.infusion.time) * this.useWeight())/this.infusion.concentration
        },
    },
}
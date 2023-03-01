import InfusionUnits from "./InfusionUnits.js"

export default {
    components: { InfusionUnits },

    template: `
    <div class="border-b-2 border-blue-100">
        <div class="border-b-8 border-blue-200">
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
    
        <div class="border-b-8 border-blue-200">Dose: 
            <input class="p-2 border border-gray-800 text-black" v-model="correctedRate" placeholder="Dose..." />
            <infusion-units :infusion="infusion"></infusion-units>
            <label v-show="infusion.weightBased">/kg</label>
            <label v-if="infusion.time > 1">/min</label>
            <label v-else>/hr</label>
            <label v-if="infusion.weightBased">
                &times {{ patient.weight }}kg
            </label>
        </div>

        <div class="border border-blue-300">
            <label>
                Volume: 
            </label>
            <input class="p-2 border border-gray-800 text-black" v-model ="correctedVolume" placeholder="Volume..." /> 
            mL
        </div>
        <div class="border border-blue-300">
            <label>
                Volume to complete: 
            </label>
            <select class="p-2 border border-gray-800 text-black" name="correctedCompleted" 
                v-model="correctedCompleted" placeholder="1" class="p-2 text-black"
            >
                <option value="1">100%</option>
                <option value="0.75">75%</option>
                <option value="0.50">50%</option>
                <option value="0.25">25%</option>
            </select>
        </div>


        <div class="border-4 border-blue-200 flex justify-between">
            <div class="mt-2">
                Favorite: 
                <input type="checkbox" v-model="infusion.favorites" />
            </div>
            <button class="text-white bg-blue-600 hover:bg-blue-800 
                rounded px-4 py-2 p-2" @click="corrected"
            >
                Save
            </button>
        </div>
    </div>
    `,

    props: {
        infusion: Object,
        patient: Object, 
    },

    data() {
        return {
            correctedRate: this.infusion.dose,
            correctedVolume: this.infusion.volume, 
            correctedCompleted: 1, 
        }
    },

    methods: {
        corrected() {
            this.infusion.edit = false;
            this.infusion.dose = this.correctedRate
            this.volumeCorrect()
            
            this.$emit('save')
        },

        volumeCorrect() {
            if(this.infusion.volume === this.corCalcVolume)
            {
                this.infusion.volume = this.corCalcVolume
            }
            else {
                this.infusion.volume = this.corCalcVolume
                this.infusion.running = false;
            }
        },
    },

    computed: {
        corCalcVolume() {
            return this.correctedVolume * this.correctedCompleted
        }

    }
}


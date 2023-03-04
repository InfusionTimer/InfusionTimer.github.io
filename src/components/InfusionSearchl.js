import InfusionUnits from "./InfusionUnits.js";
import InfusionButton from "./InfusionButton.js";

export default{
    components: { InfusionUnits, InfusionButton },

    template: `
        <div v-show="currentSearch.length" class="py-4 grid place-items-center overflow-y-auto border-y-2 border-blue-300">
                <div class="grid grid-cols-5">
                    <div class="col-span-4">
                        <label class="text-blue-800 text-2xl">
                            {{ medication.name }} 
                        </label>
                            {{ medConc }}(<infusion-units :infusion="medication"></infusion-units>/mL)
                            {{ medication.u }} <infusion-units :infusion="medication"></infusion-units>
                            in {{ medication.mL }}mL
                    </div>
                    <div class="place-self-end">
                        <infusion-button size="small" @click="add">
                            +
                        </infusion-button>
                    </div>
                </div>
        </div>
    `,

    methods: {
        add() {
            this.$emit('results', this.medication.name, this.medication.units, this.medication.u, this.medication.mL, this.medication.time, this.medication.weightBased)
        }
    },

    computed: {
        medConc(){
            return this.medication.u/this.medication.mL
        },
    },

    props: {
        medication: Object,
        currentSearch: Array,
    }
}
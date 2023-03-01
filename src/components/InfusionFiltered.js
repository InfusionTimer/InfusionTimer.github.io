import Infusion from "./Infusion.js"

export default {
    components: { Infusion },

    data() {
        return {
            bannerExpand: true,
        }
    },

    template: `
        <div v-if="filteredInfusions.length > 0" class="border-b-8 border-x-8 border-gray-300 overflow-hidden">
            <p class ="text-red-500 text-2xl bg-gray-300"><button @click="bannerExpand = !bannerExpand"class="w-screen hover:bg-gray-400">{{ title }}</button></p>
            <div v-if="bannerExpand">
                <infusion
                    v-for="infusion in filteredInfusions"
                    :key="infusion.id"
                    :infusion="infusion" 
                    :patient="patient"
                    @save="save"
                ></infusion>
            </div>
        </div>
    `,

    methods: {
        save(){
            this.$emit('save')
        }
    },

    computed: {
        filteredInfusions() {
            return this.infusions.filter(a=> a.patient === this.patient.name);
        },
    },

    props: {
        infusions: Object,
        patient: Object,
        title: String,
    },
}
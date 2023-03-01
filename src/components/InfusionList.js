import InfusionPatients from "./InfusionPatients.js"

export default {
    components: { InfusionPatients },


    template: `
        <section v-if="tabSet.name != title"></section>
        <section v-else class="bg-blue-100">
            <ul>
            <infusion-patients :patients="patients" :infusions="infusions" @save="save"></infusion-patients>
            </ul>
        </section>
    `,

    methods:{
        save(){
            this.$emit('save')
        }
    },

    props: {
        title: String,
        infusions: Array,
        tabSet: Array,
        patients: Array,
    },
}
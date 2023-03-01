export default {
    template: `
        <button v-if="tabSet.name != title" @click="tabS" class="border-t-4 border-blue-400 bg-blue-500 hover:bg-blue-600 rounded-t-lg p-2 max-w-lg">{{ title }}</button>
        <button v-else @click="shrinkTab" class="bg-blue-300 hover:bg-blue-400 rounded-t-lg p-2 border-t-4 border-blue-500">{{ title }}</button>
    `,

    methods: {
        tabS() {
            this.tabSet.name = this.title;
            localStorage.setItem("tab", this.title)

        },
        shrinkTab() {
            this.tabSet.name = null;
            localStorage.removeItem("tab")
        }
    },

    mounted() {
        this.tabSet.name = localStorage.getItem("tab")
    }, 
    
    props: {
        title: String, 
        tabSet: Array,
    }
}
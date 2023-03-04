import InfusionAbout from "./InfusionAbout.js"

export default { 
    components: { InfusionAbout },

    data(){
        return{
            about: false,
        }
    },

    template: `
        <div v-if="about">
            <infusion-about @close="about = false"></infusion-about>
        </div>
        <div class="text-sm md:text-lg">
            Infusion Timer&reg;
            <label class="italic">
                version 1.0.2
            </label>
            <label class="px-2">
                <button @click="about = true" class="text-blue-800 underline">
                    About
                </button>   
            </label>
        </div>
        
    `,
}
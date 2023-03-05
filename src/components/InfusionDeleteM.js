import InfusionModal from "./InfusionModal.js"
import InfusionButton from "./InfusionButton.js"

export default {
    components: { InfusionModal, InfusionButton },

    template: `
        <infusion-modal>
            <template #header>
                    Delete {{ title }}?  
            </template>
            <template #default>
                <slot /> 
            </template>
            <template #footer>
                <infusion-button size="small" @click="$emit('erase')">
                    Delete
                </infusion-button>

                <infusion-button class="ml-0 mt-2 md:ml-2 sm:mt-0" size="small" theme="white" @click="$emit('close')">
                    Cancel
                </infusion-button>
                </div>
            </template>
        </infusion-modal>
    `,

    props: {
        title: Array,
    }
}
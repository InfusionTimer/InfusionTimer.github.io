import InfusionModal from "./InfusionModal.js"
import InfusionButton from "./InfusionButton.js"

export default{ 
    components: { InfusionModal, InfusionButton },
    
    template: `
        <infusion-modal>
            <template #header>
                About: 
            </template>
            <template #default>
                Infusion Timer&reg; is a free to use web app for calculating infusion times on your phone!
                This app should not replace monitoring medications, and all calculations should be checked
                for accuracy. Please consult a qualified professional for medical questions.
                <div class="mt-2">
                    For any inquiries please email at:
                    <label class="text-blue-900 underline">
                        <a href="mailto: infusiontimer.gmail.com">
                            infusiontimer.gmail.com
                        </a>
                    </label>
                </div> 
            </template>
            <template #footer>
                <infusion-button size="small" @click="$emit('close')">OK</infusion-button>
            </template>
        </infusion-modal>
    `,
}

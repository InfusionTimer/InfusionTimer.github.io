import InfusionModal from "./InfusionModal.js"
import InfusionButton from "./InfusionButton.js"

export default{
    components: { InfusionModal, InfusionButton },

    data(){
        if(localStorage.getItem("agreement")) { var agreementP = false }
        else { var agreementP = true }
        return{
            agreement: agreementP
        }
    },

    template: `
        <div v-if="agreement">
            <infusion-modal>
                <template #header>
                    Thank you for trying out Infusion Timer&reg;!
                </template>
                <template #default>
                    This app is for informational purposes only and should not replace monitoring medications. 
                    Infusion timer uses start times and end times to estimate volumes. This app does 
                    not reflect an 100% accurate total. This app makes no claims regarding accuracy, and all 
                    calculations should be checked and confirmed. Please consult a qualified professional for 
                    medical questions. 
                </template>
                <template #footer>
                    <infusion-button size="small" @click="acceptAgreement">Acknowledge</infusion-button>
                </template>
            </infusion-modal>
        </div>
    `,

    methods: {
        acceptAgreement() {
            this.agreement = false; 
            localStorage.setItem("agreement", this.agreement)
        }
    }
}

import InfusionModal from "./InfusionModal.js"

export default {
    components: { InfusionModal }, 

    data() {
        if (localStorage.getItem("agreement")) {var agreementP = false}
        else{var agreementP = true}
        return {
            agreement: agreementP,
        }
    },

    template: `
        <div v-if="agreement">
            <infusion-modal>
                <template #header>
                    <div class="flex text-blue-800 text-xl">
                        Thank you for trying out Infusion Timer!
                    </div>
                </template>
                <template #default>
                    <div>
                        This app is for informational purposes only and should never replace monitoring medications.
                        Infusion timer uses start and end times to estimate volumes and cannot reflect an 
                        100% accurate total. Infusion Timer makers no claims regarding accuracy and all calculations 
                        should be checked and confirmed. Please consult a qualified professional for medical 
                        questions. 
                    </div>
                    <div>
                        Current version is only supported on desktop or firefox mobile. 
                    </div>
                </template>
                <template #footer>
                    <div class="justify-center">
                        <button class="text-white bg-blue-600 hover:bg-blue-800 
                            rounded px-7 py-2 p-2" @click="showAgreement">Acknowledge
                        </button>
                    </div>
                </template>
            </infusion-modal>
        </div>
    `,

    methods: {
        showAgreement() {
            this.agreement = false;
            localStorage.setItem("agreement",this.agreement)
        }
    },
}

import InfusionAgreement from "./InfusionAgreement.js"
import Infusions from "./Infusions.js"
import InfusionFooter from "./InfusionFooter.js"
import InfusionNotification from "./InfusionNotification.js"

export default {
    components: { Infusions, InfusionAgreement, InfusionFooter, InfusionNotification }, 

    template: `
        
        <div class="h-screen">
            <div class="overflow-y-auto h-[97vh]">
                <infusion-title></infusion-title>
                <infusions></infusions>
            </div>
            <div class="absolute bottom-0">
                <infusion-footer></infusion-footer>
            </div>
        </div>
        
        <infusion-agreement></infusion-agreement>

        <infusion-notification></infusion-notification>
    `,

}

import InfusionAgreement from "./InfusionAgreement.js"
import Infusions from "./Infusions.js"
import InfusionFooter from "./InfusionFooter.js"
import InfusionNotification from "./InfusionNotification.js"

export default {
    components: { Infusions, InfusionAgreement, InfusionFooter, InfusionNotification }, 

    template: `
        
        <infusions></infusions>
        
        <infusion-agreement></infusion-agreement>

        <infusion-footer></infusion-footer>

        <infusion-notification></infusion-notification>
    `,

}
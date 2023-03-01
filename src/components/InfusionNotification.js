export default {
    data() {
        if (localStorage.getItem("agreement")) {var agreementP = false}
        else{var agreementP = true}
        return {
            agreement: agreementP,
        }
    },
    
    mounted() {
        if(this.agreement) {
            Notification.requestPermission().then((permission) => {
                if (permission === "granted"){
                    Push.create("Infusion Timer",
                    {
                        body:"Welcome to Infusion Timer!",
                        icon: "/src/assets/infusionTimerIcon.png",
                    });
                }
                else {
                    alert("Please enable notifications!")
                }
            })
        }
    }
}
import InfusionModal from "./InfusionModal.js"

export default {
    components: { InfusionModal },

    template: `

        <div class="border-b-8 border-blue-200">
            <label>
                Volume:
            </label>
            <label class="text-blue-800 text-2xl">
                <span :class="infusion.running && 
                    'text-red-600'"
                >
                    {{ displayVolume }} mL
                </span>
            </label>
            <label v-show="!infusion.complete">
                <button v-if="!infusion.running" @click="timer" 
                    class="text-white bg-blue-600 hover:bg-blue-800 
                    rounded px-5 p-2"
                >
                    Start
                </button>
            </label>
        
            <label v-show="infusion.running === true">
                <button @click="stop" 
                    class="text-white bg-blue-600 hover:bg-blue-800 
                    rounded px-5 py-2 p-2"
                >
                    Stop
                </button>
            </label>
        </div> 
    
        <div class="border-b-8 border-blue-200">Time to Complete: 
            <span :class="infusion.running && 'text-red-600'"> 
                {{ timeCD.days }} days 
                {{ timeCD. hours}}h : 
                {{ timeCD.minutes }}m : 
                {{ timeCD.seconds }}s
            </span>
        </div>

        <div class="flex justify-center border-8 border-blue-100" v-if="infusion.complete === true">
            <button @click="restart" class="text-white bg-blue-600 hover:bg-blue-800 
                border-2 rounded border-blue-200 px-7 py-2 p-2"
            >
                Restart
            </button>
        </div>
    `,

    props: {
        infusion: Object,
        rate: Array,
    },
    
    data() {
        return {
            timeCD: [
                {
                    days:'',
                    hours:'',
                    minutes:'', 
                    seconds:'',
                }
            ],
            displayVolume: this.infusion.volume,

            countDownTimer() {
                if (this.infusion.running === true) {
                    var endTime = this.infusion.end + this.timeComplete;
                    var now = Date.now();
                    var t = endTime - now;
                    var l = (now - this.infusion.end) / 1000;
                    var volumeL = l * this.volumeDec;
                    var days = Math.floor(t / (1000 * 60 * 60 * 24));
                    var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
                    var seconds = Math.floor((t % (1000 * 60)) / 1000);

                    if (t > 0) {
                        setTimeout(() =>{
                            this.displayVolume = Math.round((this.infusion.volume - volumeL) * 100) / 100;
                            this.timeCD.seconds = seconds
                            this.timeCD.minutes = minutes
                            this.timeCD.hours = hours
                            this.timeCD.days = days
                            this.countDownTimer();
                        }, 1000)
                    }
                    else {
                        this.infusion.running = false;
                        this.infusion.complete = true;
                        this.displayVolume = this.infusion.volume;
                        this.$emit('save');
                        this.message();
                    }
                }
            }
        }
    },

    methods: {
        timer(){

            Notification.requestPermission().then((permission) => {
                if (permission === "granted"){
                this.displayVolume = this.infusion.volume;
                this.infusion.end = Date.now();
                this.infusion.running = true;
                this.$emit('save');
                this.countDownTimer();
                    
                }
                else {
                    alert("Please enable notifications!")
                }
            })
        },

        message() {
            if(this.infusion.running === true) {}
            else {
                Push.create("Infusion Timer",
                    {
                        body: this.infusion.name + " is completed.",
                        icon: "/src/assets/infusionTimerIcon.png",
                    });
                }
                
        },

        stop() {
            this.message();
            this.infusion.volume = this.displayVolume;
            this.infusion.running = false;
            this.$emit('save');
        },
        restart() {
            this.infusion.complete = false;
            this.$emit('save');
            this.timer();
        }
    },

    computed: {
        timeComplete() {
            return (this.infusion.volume / this.rate) * 3600000
        },

        volumeDec() {
            return this.rate / 3600
        }

    },

    mounted() {
        if (this.infusion.running === true) {this.displayVolume = this.infusion.volume;
            this.countDownTimer();}
    }
}
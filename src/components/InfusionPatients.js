import InfusionPatient from "./InfusionPatient.js";

export default {
    components: { InfusionPatient },
    
    data() {
        return {
            currentName: 'All',
        }
    },

    template: `
        <div class="bg-blue-300 mt-2">
            <label>
                <select v-if="patients.length" v-model="currentName" class="w-1/4 rounded-t-xl bg-blue-200 p-2 text-xl border-t-8 border-blue-300" placeholder="All" >
                    <option v-for="patient in patients" v-show="patient.name" :value="patient.name">{{ patient.name }}</option>
                    <option value="All">All</option>
                </select>
            </label>
            <label class="p-2">
                Patients: 
                ({{ patients.length }})
            </label>
        </div>
        <infusion-patient
            v-for="patient in filteredPatients"
            :key="patient.Pid"
            :patient="patient"
            :infusions="infusions"
            @save="save"
        >
        </infusion-pateint>
    `,

    methods: {
        save(){
            this.$emit('save')
        }
    },

    computed: {
        filteredPatients() {
            if (this.currentName === 'All') {
                return this.patients;
            }
                return this.patients.filter(a => a.name === this.currentName);
        }
    },

    props: {
        infusions: Array,
        patients: Array,
    }
}
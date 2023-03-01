(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function s(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(t){if(t.ep)return;t.ep=!0;const n=s(t);fetch(t.href,n)}})();const l={template:`
        <div class="grid place-items-center bg-black w-full h-full overflow-y-auto bg-opacity-60 absolute top-0 z-10">
            <div class="bg-blue-100 rounded-lg p-1 min-w-1/2 max-w-lg min-h-1/2 grid place-items-center">
                <header class="p-2">
                    <slot name="header">default header</slot>
                </header>
                <div class="p-2">
                    <slot>default body</slot>
                </div>
        
                <footer class="p-2 border-t-2 w-full border-blue-300 grid place-items-center">
                    <slot name="footer">default footer</slot>
                </footer>
            </div>
        </div>
    `},c={components:{InfusionModal:l},data(){if(localStorage.getItem("agreement"))var e=!1;else var e=!0;return{agreement:e}},template:`
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
    `,methods:{showAgreement(){this.agreement=!1,localStorage.setItem("agreement",this.agreement)}}},p={template:`
        <button v-if="tabSet.name != title" @click="tabS" class="border-t-4 border-blue-400 bg-blue-500 hover:bg-blue-600 rounded-t-lg p-2 max-w-lg">{{ title }}</button>
        <button v-else @click="shrinkTab" class="bg-blue-300 hover:bg-blue-400 rounded-t-lg p-2 border-t-4 border-blue-500">{{ title }}</button>
    `,methods:{tabS(){this.tabSet.name=this.title,localStorage.setItem("tab",this.title)},shrinkTab(){this.tabSet.name=null,localStorage.removeItem("tab")}},mounted(){this.tabSet.name=localStorage.getItem("tab")},props:{title:String,tabSet:Array}},d={template:`
        <label v-if="infusion.units < 2">mL</label>
        <label v-else-if="infusion.units < 3">gtt</label>
        <label v-else-if="infusion.units < 4">g</label>
        <label v-else-if="infusion.units < 5">mg</label>
        <label v-else-if="infusion.units < 6">mcg</label>
        <label v-else>u</label>
    `,props:{infusion:Object}},m={components:{InfusionUnits:d},template:`
    <div class="border-b-2 border-blue-100">
        <div class="border-b-8 border-blue-200">
            Infusion: 
            <label class="text-blue-800 text-2xl">
                {{ infusion.name }}
                <label v-if="infusion.units > 1">
                    {{ infusion.concentration }} 
                </label>
                (<infusion-units :infusion="infusion"></infusion-units>
                <label v-if="infusion.units > 1">/mL</label>)
            </label>
        </div>
    
        <div class="border-b-8 border-blue-200">Dose: 
            <input class="p-2 border border-gray-800 text-black" v-model="correctedRate" placeholder="Dose..." />
            <infusion-units :infusion="infusion"></infusion-units>
            <label v-show="infusion.weightBased">/kg</label>
            <label v-if="infusion.time > 1">/min</label>
            <label v-else>/hr</label>
            <label v-if="infusion.weightBased">
                &times {{ patient.weight }}kg
            </label>
        </div>

        <div class="border border-blue-300">
            <label>
                Volume: 
            </label>
            <input class="p-2 border border-gray-800 text-black" v-model ="correctedVolume" placeholder="Volume..." /> 
            mL
        </div>
        <div class="border border-blue-300">
            <label>
                Volume to complete: 
            </label>
            <select class="p-2 border border-gray-800 text-black" name="correctedCompleted" 
                v-model="correctedCompleted" placeholder="1" class="p-2 text-black"
            >
                <option value="1">100%</option>
                <option value="0.75">75%</option>
                <option value="0.50">50%</option>
                <option value="0.25">25%</option>
            </select>
        </div>


        <div class="border-4 border-blue-200 flex justify-between">
            <div class="mt-2">
                Favorite: 
                <input type="checkbox" v-model="infusion.favorites" />
            </div>
            <button class="text-white bg-blue-600 hover:bg-blue-800 
                rounded px-4 py-2 p-2" @click="corrected"
            >
                Save
            </button>
        </div>
    </div>
    `,props:{infusion:Object,patient:Object},data(){return{correctedRate:this.infusion.dose,correctedVolume:this.infusion.volume,correctedCompleted:1}},methods:{corrected(){this.infusion.edit=!1,this.infusion.dose=this.correctedRate,this.volumeCorrect(),this.$emit("save")},volumeCorrect(){this.infusion.volume===this.corCalcVolume?this.infusion.volume=this.corCalcVolume:(this.infusion.volume=this.corCalcVolume,this.infusion.running=!1)}},computed:{corCalcVolume(){return this.correctedVolume*this.correctedCompleted}}},f={template:`
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
    `,props:{infusion:Object,rate:Array},data(){return{timeCD:[{days:"",hours:"",minutes:"",seconds:""}],displayVolume:this.infusion.volume,countDownTimer(){if(this.infusion.running===!0){var e=this.infusion.end+this.timeComplete,i=Date.now(),s=e-i,o=(i-this.infusion.end)/1e3,t=o*this.volumeDec,n=Math.floor(s/(1e3*60*60*24)),a=Math.floor(s%(1e3*60*60*24)/(1e3*60*60)),r=Math.floor(s%(1e3*60*60)/(1e3*60)),u=Math.floor(s%(1e3*60)/1e3);s>0?setTimeout(()=>{this.displayVolume=Math.round((this.infusion.volume-t)*100)/100,this.timeCD.seconds=u,this.timeCD.minutes=r,this.timeCD.hours=a,this.timeCD.days=n,this.countDownTimer()},1e3):(this.infusion.running=!1,this.infusion.complete=!0,this.displayVolume=this.infusion.volume,this.$emit("save"),this.message())}}}},methods:{timer(){Notification.requestPermission().then(e=>{e==="granted"?(this.displayVolume=this.infusion.volume,this.infusion.end=Date.now(),this.infusion.running=!0,this.$emit("save"),this.countDownTimer()):alert("Please enable notifications!")})},message(){this.infusion.running===!0||Notification.requestPermission().then(e=>{e==="granted"&&new Notification("Infusion Timer",{body:this.infusion.name+" is completed"})})},stop(){this.message(),this.infusion.volume=this.displayVolume,this.infusion.running=!1,this.$emit("save")},restart(){this.infusion.complete=!1,this.$emit("save"),this.timer()}},computed:{timeComplete(){return this.infusion.volume/this.rate*36e5},volumeDec(){return this.rate/3600}},mounted(){this.infusion.running===!0&&(this.displayVolume=this.infusion.volume,this.countDownTimer())}},b={components:{InfusionUnits:d,InfusionEdit:m,InfusionTimer:f},template:`
        <li v-if="!infusion.edit">
            <div class="border-8 border-gray-300">
                <div class="grid grid-cols-6 justify-items-stretch border-b-8 border-blue-200">
                    <div class="col-span-5">
                        Infusion: 
                        <label class="text-blue-800 text-2xl">
                            {{ infusion.name }}
                            <label v-if="infusion.units > 1">
                                {{ infusion.concentration }} 
                            </label>
                            (<infusion-units :infusion="infusion"></infusion-units>
                            <label v-if="infusion.units > 1">/mL</label>)
                        </label>
                    </div>
                    <div class="justify-self-end">
                        <button @click="deleteDrip" class="text-white bg-blue-600 hover:bg-blue-800 
                        rounded p-2 px-4">
                            &times
                        </button>
                    </div>
                </div>
            
                <div class="border-b-8 border-blue-200">Rate: 
			        <label class="text-blue-800 md:text-l text-2xl">{{ infusionRate }} mL/hr</label>
		        </div>

                <div class="border-b-8 border-blue-200" v-show="infusion.units > 1">
                    <label>
                        Dose: 
                        {{ infusion.dose }}
                        <infusion-units :infusion="infusion"></infusion-units>
                        <label v-show="infusion.weightBased">/kg</label>
                        <label v-if="infusion.time > 1">/min</label>
                        <label v-else>/hr</label>
                        <label v-if="infusion.weightBased">
                            &times {{ patient.weight }}kg
                        </label>
                    </label>
                </div>

                <infusion-timer :infusion="infusion" :rate="infusionRate" @save="save"></infusion-timer>

                <div class="flex justify-between">
                    <div class="mt-2">
                        <input type="checkbox" @change="save" v-model="infusion.favorites" />
                        Favorite
                    </div>
            	    <button class="text-white bg-blue-600 hover:bg-blue-800 
                        rounded px-4 py-2 p-2" @click="infusion.edit = true"
                    >
                        Edit
                    </button>
        	    </div>
            </div>
        </li>
        <li v-else>
            <infusion-edit @save="save" :infusion="infusion" :patient="patient">
            </infusion-edit>
        </li>
    `,props:{infusion:Object,patient:Object},methods:{useWeight(){return this.infusion.weightBased?this.patient.weight:1},useGtt(){return this.infusion.gtt?this.patient.gtt:1},deleteDrip(){this.infusion.active=!1,delete this.infusion.name,delete this.infusion.concentration,delete this.infusion.units,delete this.infusion.dose,delete this.infusion.time,delete this.infusion.end,delete this.infusion.weightBased,delete this.infusion.gtt,delete this.infusion.active,delete this.infusion.complete,delete this.infusion.running,delete this.infusion.favorites,delete this.infusion.patient,delete this.infusion.volume,delete this.infusion.edit,delete this.infusion.id,this.save()},save(){this.$emit("save")}},computed:{infusionRate(){return this.infusion.dose/this.useGtt()*this.infusion.time*this.useWeight()/this.infusion.concentration}}},h={components:{Infusion:b},data(){return{bannerExpand:!0}},template:`
        <div v-if="filteredInfusions.length > 0" class="border-b-8 border-x-8 border-gray-300 overflow-hidden">
            <p class ="text-red-500 text-2xl bg-gray-300"><button @click="bannerExpand = !bannerExpand"class="w-screen hover:bg-gray-400">{{ title }}</button></p>
            <div v-if="bannerExpand">
                <infusion
                    v-for="infusion in filteredInfusions"
                    :key="infusion.id"
                    :infusion="infusion" 
                    :patient="patient"
                    @save="save"
                ></infusion>
            </div>
        </div>
    `,methods:{save(){this.$emit("save")}},computed:{filteredInfusions(){return this.infusions.filter(e=>e.patient===this.patient.name)}},props:{infusions:Object,patient:Object,title:String}},v={template:`
        <div class="overflow bg-blue-200 grid place-items-center border-b-8 border-blue-100 space-y-2">
            <div class="text-blue-800 text-2xl">
                {{ patient.name }}
            </div>
            <div>
                Patient Weight<label class="italic">(kg)</label>:
            </div>
            <div>    
                <input class="p-2 border border-gray-800 text-black" v-model="correctedWeight" placeholder="kg...">
            </div>
            <div>
                Drop Factor<label class="italic">(Optional for gravity drips)</label>:
            </div>
            <div>
                <input class="p-2 border border-gray-800 text-black" v-model="correctedGtt" placeholder="gtt/mL..." />
            </div>
            
            <div class="place-self-start">    
                <button class="text-white bg-blue-600 hover:bg-blue-800 rounded px-4 py-2 p-2"
                    @click="corrected"    
                >
                    Save
                </button>
            </div>
        </div>
    `,props:{patient:Object},data(){return{correctedWeight:this.patient.weight,correctedGtt:this.patient.gtt}},methods:{corrected(){this.patient.edit=!1,this.patient.weight=this.correctedWeight,this.patient.gtt=this.correctedGtt,this.$emit("save")}}},g={components:{InfusionFiltered:h,InfusionPatientEdit:v},data(){return{ptExpand:!1}},template:`
        <ul>   
            <li>
                <div v-if="!patient.edit" class="overflow-clip bg-blue-200 grid border-b-8 border-blue-100 sticky top-0">

                    <div class="place-self-center py-2">

                        <button v-model="ptExpand" @click="ptExpand = !ptExpand" class="w-screen hover:bg-blue-300">
                            <label class="text-blue-800 text-2xl">
                                {{ patient.name }} -
                            </label>
                            <label>
                                Weight: {{ patient.weight }}kg
                            </label>
                        </button>
                        
                        <div v-show="ptExpand" class="grid grid-cols-3">
                            <div>
                                <button @click="patient.edit = true" class="text-white rounded px-7 py-2 bg-blue-600 hover:bg-blue-800">
                                    Edit
                                </button>
                            </div>

                            <div class="place-self-center">
                                Drop Factor: {{ patient.gtt }}gtt/mL
                            </div>  

                            <div class="place-self-end">
                                <button @click="erase" class="text-white rounded px-4 py-2 pr-5 bg-blue-600 hover:bg-blue-800">
                                    Delete
                                </button>
                            </div>
                        </div>
                    
                    </div>
                </div>
                
                <div v-else>
                    <infusion-patient-edit :patient="patient" :infusions="infusions" @save="save"></infusion-patient-edit>
                </div>

                <ul>
                    <infusion-filtered title="Infusing" :patient="patient" :infusions="filters.running" @save="save"></infusion-filtered>
                    <infusion-filtered title="Paused" :patient="patient" :infusions="filters.paused" @save="save"></infusion-filtered>
                    <infusion-filtered title="Favorites" :patient="patient" :infusions="filters.favorites" @save="save"></infusion-filtered>
                    <infusion-filtered title="Completed" :patient="patient" :infusions="filters.notFavorites" @save="save"></infusion-filtered>
                </ul>
            </li>
        </ul>
    `,props:{patient:Object,infusions:Object},methods:{save(){this.$emit("save")},erase(){this.patient.active=!1,delete this.patient.name,delete this.patient.weight,delete this.patient.gtt,delete this.patient.edit,delete this.patient.active,delete this.patient.Pid,this.save()}},computed:{filters(){return{running:this.infusions.filter(e=>e.running&&!e.complete),paused:this.infusions.filter(e=>!e.running&&!e.complete),favorites:this.infusions.filter(e=>e.favorites&&e.complete),notFavorites:this.infusions.filter(e=>!e.favorites&&e.complete)}}}},w={components:{InfusionPatient:g},data(){return{currentName:"All"}},template:`
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
    `,methods:{save(){this.$emit("save")}},computed:{filteredPatients(){return this.currentName==="All"?this.patients:this.patients.filter(e=>e.name===this.currentName)}},props:{infusions:Array,patients:Array}},x={components:{InfusionPatients:w},template:`
        <section v-if="tabSet.name != title"></section>
        <section v-else class="bg-blue-100">
            <ul>
            <infusion-patients :patients="patients" :infusions="infusions" @save="save"></infusion-patients>
            </ul>
        </section>
    `,methods:{save(){this.$emit("save")}},props:{title:String,infusions:Array,tabSet:Array,patients:Array}},y={components:{InfusionUnits:d},template:`
        <div v-show="currentSearch.length" class="py-4 grid place-items-center overflow-y-auto border-t-2 border-blue-300">
                <div class="grid grid-cols-5">
                    <div class="col-span-4">
                        <label class="text-blue-800 text-2xl">
                            {{ medication.name }} 
                        </label>
                            {{ medConc }}(<infusion-units :infusion="medication"></infusion-units>/mL)
                            {{ medication.u }} <infusion-units :infusion="medication"></infusion-units>
                            in {{ medication.mL }}mL
                    </div>
                    <div class="place-self-end">
                        <button class="text-white bg-blue-600 hover:bg-blue-800 rounded px-4 py-2 p-2"
                            @click="add"
                        >
                            +
                        </button>
                    </div>
                </div>
        </div>
    `,methods:{add(){this.$emit("results",this.medication.name,this.medication.units,this.medication.u,this.medication.mL,this.medication.time,this.medication.weightBased)}},computed:{medConc(){return this.medication.u/this.medication.mL}},props:{medication:Object,currentSearch:Array}},I={components:{InfusionModal:l,InfusionSearchl:y},data(){return{currentSearch:"",selectedMed:[{name:"",units:"",u:"",mL:"",medID:""}],medications:[{name:"amiodarone",units:4,u:360,mL:200,time:60,weightBased:!1},{name:"diltiazem",units:4,u:100,mL:100,time:1,weightBased:!1},{name:"fentanyl",units:5,u:1250,mL:25,time:1,weightBased:!1},{name:"heparin",units:6,u:25e3,mL:500,time:1,weightBased:!0},{name:"insulin (non weight based)",units:6,u:100,mL:100,time:1,weightBased:!1},{name:"insulin (weight based)",units:6,u:100,mL:100,time:1,weightBased:!0},{name:"midazolam",units:4,u:25,mL:25,time:1,weightBased:!1},{name:"nicardipine",units:4,u:20,mL:200,time:1,weightBased:!1},{name:"norepinephrine",units:4,u:8,mL:250,time:1,weightBased:!1},{name:"propofol",units:5,u:1e6,mL:100,time:60,weightBased:!0}]}},template:`
        <div v-if="searchMed">
            <infusion-modal>
                <template #header>
                    <label class="flex justify-center text-blue-800 text-xl">
                        Search Medications:
                    </label>
                </template>
                <template #default>
                    <div class="p-2 space-x-2 grid place-items-center">
                        <input type="search" v-model="currentSearch" class="p-2 border border-gray-800">
                    </div>

                    <div>
                        <infusion-searchl v-for="medication in searchMedications" :currentSearch="currentSearch" :medication="medication" @results="results"></infusion-searchl>
                    </div>



                </template>
                <template #footer>
                    <div>
                        <button class="text-white bg-blue-600 hover:bg-blue-800 rounded px-4 py-2 p-2" 
                            @click="this.$emit('close')"
                        >
                            Cancel
                        </button>
                    </div>
                </template>
            </infusion-modal>
        </div>
    `,methods:{results(e,i,s,o,t,n){this.$emit("results",e,i,s,o,t,n),this.$emit("close"),this.currentSearch=""}},computed:{searchMedications(){return this.medications.filter(e=>e.name.includes(this.currentSearch.toLowerCase()))}},props:{searchMed:Boolean,patients:Object}},S={components:{InfusionModal:l,InfusionCreateSearch:I},template:`
        <div v-show="addMed">
            <infusion-modal>
                <template #header>
                    <label class="flex text-blue-800 text-xl">
                        Search or Add new Med
                    </label>
                </template>
                <template #default>
                    <div>
                        Search: Look up a medication in the library
                    </div>
                    <div>
                        Add Med: Make a med from scratch. 
                    </div>
                </template>
                <template #footer>
                    <div class="flex gap-16">
                        <button class="text-white bg-blue-600 hover:bg-blue-800 rounded px-4 py-2 p-2"
                            @click="searchMed = true, this.$emit('close')"
                        >
                            Search
                        </button>

                        <button class="text-white bg-blue-600 hover:bg-blue-800 rounded px-4 py-2 p-2" 
                            @click="createMed = true, this.$emit('close')"
                        >
                            Add Med
                        </button>
                    </div>
                </template>
            </infusion-modal>
        </div>

        <div v-if="createMed">
            <infusion-modal>
                <template #header>
                    <label class="flex text-blue-800 text-xl">
                        Create a medication:
                    </label>
                </template>
                <template #default>
                    <div class="grid place-items-center space-y-2 whitespace-nowrap ">
                
                        <p>Patient:</p> 
                        <select v-model="currentName" class="p-2 border border-gray-800" placeholder="newPt" >
                            <option v-for="patient in patients" v-show="patient.name" :value="patient.name">{{ patient.name }}</option>
                        </select>
                        <p>Medication:</p>
                        <input class="p-2 border border-gray-800" v-model="newInfusion" placeholder="Medications..." />
                
                        <p>Dose:</p>
                        <input class="p-2 border border-gray-800" v-model="newRate" placeholder="Dose..." />
                
                        <p>Units</p>
                        <select name="units" v-model="newUnits" placeholder="1" class="p-2 border border-gray-800">
                            <option value="1">mL</option>
                            <option value="2">gtt</option>
                            <option value="3">g</option>
                            <option value="4">mg</option>
                            <option value="5">mcg</option>
                            <option value="6">u</option>
                        </select>
                        <p>Time</p>
                        <select name="time" v-model="newTime" placeholder="1" class="p-2 border border-gray-800">
                            <option value="1">hour</option>
                            <option value="60">minute</option>
                        </select>
                        <p v-show="newUnits > 1 && newUnits < 3">Drop factor: <input type="checkbox" v-model="newGtt"></p>
                        <p v-show="newUnits > 2">Concentration u/mL</p>
                        <p v-show="newUnits > 2"><input v-model="newU" placeholder="U..." class="p-2 border border-gray-800"/></p>
                        <p v-show="newUnits > 2"><input v-model="newML" placeholder="mL..." class="p-2 border border-gray-800"/></p>
                        <p v-show="newUnits > 2">Weight based: <input type="checkbox" v-model="weightBased"></p>
                        <p>Volume:</p>
                        <input class="p-2 border border-gray-800" v-model="newVolume" placeholder="mL..." />
                        <p>Percent to Complete</p>
                        <select name="Percent Completed" v-model="percentComplete" placeholder="1" class="p-2 border border-gray-800">
                            <option value="1">100%</option>
                            <option value=".75">75%</option>
                            <option value=".5">50%</option>
                            <option value=".25">25%</option>
                        </select>
                
                    </div>
                </template>
                <template #footer>
                    <div class="flex gap-16">
                        <button class="text-white bg-blue-600 hover:bg-blue-800 rounded px-4 py-2 p-2" 
                            @click="add"
                        >
                            Add
                        </button>
                        <button class="text-white bg-blue-600 hover:bg-blue-800 rounded px-4 py-2 p-2" 
                            @click="createMed = false, this.$emit('close')"
                        >
                            Cancel
                        </button>
                    </div>
                </template>
            </infusion-modal>
        </div>

        <infusion-create-search :patients="patients" :searchMed="searchMed" @close="searchMed = false" @results="results"></infusion-create-search>
    `,props:{addMed:Boolean,patients:Array},data(){return{createMed:!1,searchMed:!1,currentName:"",newInfusion:"",newRate:"",newUnits:"",newTime:1,newGtt:!1,newU:1,newML:1,weightBased:!1,newVolume:"",percentComplete:""}},methods:{results(e,i,s,o,t,n){this.createMed=!0,this.newInfusion=e,this.newUnits=i,this.newU=s,this.newML=o,this.weightBased=n,this.newVolume=o,this.newTime=t},add(){this.currentName?(this.$emit("add",this.newInfusion,this.calcConcentration,this.newUnits,this.newRate,this.newTime,this.weightBased,this.newGtt,this.calcVolume,this.currentName),this.currentName="",this.newInfusion="",this.newRate="",this.newUnits="",this.newTime=1,this.newGtt=!1,this.newU=1,this.newML=1,this.weightBased=!1,this.newVolume="",this.percentComplete="",this.weight="",this.gtt="",this.addPatient=!1,this.createMed=!1,this.$emit("close")):alert("Please choose a patient.")}},computed:{calcConcentration(){return this.newU/this.newML},calcVolume(){return this.newVolume*this.percentComplete}}},P={components:{InfusionModal:l},data(){return{newName:"",newWeight:1,newGtt:1}},template:`
        <infusion-modal v-show="addPatient">
            <template #header>
                <label class="flex text-blue-800 text-xl">
                    Add a new patient:
                </label>
            </template>
            <template #default>
                <div class="grid place-items-center space-y-2">
                    <p>Patient Initials:</p>
                    <input class="p-2 border border-gray-800" v-model="newName" placeholder="Patient Initials..." maxlength="3" />
                    <p>Patient Weight<label class="italic">(kg)</label>:</p>
                    <input class="p-2 border border-gray-800" v-model="newWeight" placeholder="kg..."/>
                    <p>Drop Factor<label class="italic">(Optional for gravity drips)</label>:</p>
                    <input class="p-2 border border-gray-800" v-model="newGtt" placeholder="gtt/mL..." /></p>
                </div>
            </template>
            <template #footer>
                <div class="flex gap-16">
                    <button class="text-white bg-blue-600 hover:bg-blue-800 rounded px-7 py-2 p-2" 
                        @click="newPatient"
                    >
                        Add
                    </button>

                    <button class="text-white bg-blue-600 hover:bg-blue-800 rounded px-7 py-2 p-2" 
                        @click="this.$emit('close')"
                    >
                        Cancel
                    </button>
                </div>
            </template>
        </infusion-modal>
    `,methods:{newPatient(){this.newName?(this.$emit("newPatient",this.newName,this.newWeight,this.newGtt),this.newName="",this.newWeight=1,this.newGtt=1,this.$emit("close")):alert("Please include patient initials.")}},computed:{activePatients(){return this.patients.filter(e=>e.active)}},props:{addPatient:Boolean}},k={components:{InfusionTab:p,InfusionList:x,InfusionCreate:S,InfusionPatientCreate:P,InfusionModal:l},data(){if(localStorage.getItem("infusions"))var e=JSON.parse(localStorage.getItem("infusions"));else var e=[];if(localStorage.getItem("patients"))var i=JSON.parse(localStorage.getItem("patients"));else var i=[];return{tabSet:[{name:"Infusing"}],newMenu:!1,patients:i,infusions:e,addPatient:!1,addMed:!1,reset:!1}},template:`
        <div class="grid grid-cols-3 bg-blue-400">
            <div class="col-span-2">
                <infusion-tab title="Infusing" :tabSet="tabSet"></infusion-tab>
                <infusion-tab title="Completed" :tabSet="tabSet"></infusion-tab>
            </div>
            <div class="place-self-end">
                <button v-model="newMenu" @click="newMenu = !newMenu" 
                    class="place-self-end text-gray-300 font-bold text-lg bg-blue-600 
                    rounded px-4 py-2 hover:bg-blue-800"
                >
                    +
                </button>
            </div>
        </div>
        <div v-show="newMenu" class="flex justify-end absolute right-0">
            <button @click="addPatient = true, newMenu = false" class="text-white bg-blue-600 hover:bg-blue-800
                px-4 py-2 border-8 border-blue-400"
            >
                New pt. 
            </button>
            <div>
            <button @click="addMed = true, newMenu = false" class="text-white bg-blue-600 hover:bg-blue-800
                px-4 py-2 border-8 border-blue-400" :disabled="!filters.activePatients.length"
            >
                New Med 
            </button>
            </div>

            <div>
                <button @click="reset = true, newMenu = false" class="text-white bg-blue-600 hover:bg-blue-800
                    px-4 py-2 border-8 border-blue-400"
                >
                    Reset 
                </button>
            </div>
        </div>

        <div class="bg-blue-300">
            <infusion-list title="Infusing" :tabSet="tabSet" 
                :infusions="filters.inComplete" :patients="filters.activePatients"
                @save="save"    
            >
            </infusion-list>
            <infusion-list title="Completed" :tabSet="tabSet" 
                :infusions="filters.completed" :patients="filters.activePatients"
                @save="save"    
            >
            </infusion-list>
        </div>

        <infusion-patient-create :addPatient="addPatient" :patients="filters.activePatients" @newPatient="newPatient" @close="addPatient = false"></infusion-patient-create>
        <infusion-create :addMed="addMed" @close="addMed = false" :patients="filters.activePatients" @add="add"></infusion-create>

        
        <infusion-modal v-if="reset">
            <template #header>
                <label class="flex text-blue-800 text-xl">
                    Delete information?  
                </label>
            </template>
            <template #default>
                All patient and medication information will be erased. 
            </template>
            <template #footer>
                <div class="flex gap-16">
                    <button class="text-white bg-blue-600 hover:bg-blue-800 rounded px-7 py-2 p-2" 
                        @click="erase"
                    >
                        Erase
                    </button>

                    <button class="text-white bg-blue-600 hover:bg-blue-800 rounded px-7 py-2 p-2" 
                        @click="reset = false"
                    >
                        Cancel
                    </button>
                </div>
            </template>
        </infusion-modal>
    
        `,computed:{filters(){return{inComplete:this.infusions.filter(e=>!e.complete&&e.active),completed:this.infusions.filter(e=>e.complete&&e.active),activePatients:this.patients.filter(e=>e.active)}}},methods:{save(){var e=this.infusions,i=this.patients;localStorage.removeItem("infusions"),localStorage.removeItem("patients"),localStorage.setItem("infusions",JSON.stringify(e)),localStorage.setItem("patients",JSON.stringify(i))},newPatient(e,i,s){this.patients.push({name:e,weight:i,gtt:s,edit:!1,active:!0,Pid:this.patients.length+1}),this.save()},add(e,i,s,o,t,n,a,r,u){this.infusions.push({name:e,concentration:i,units:s,dose:o,time:t,end:1,weightBased:n,gtt:a,active:!0,complete:!1,running:!1,favorites:!1,patient:u,volume:r,id:this.infusions.length+1}),this.save()},erase(){localStorage.removeItem("infusions"),localStorage.removeItem("patients"),location.reload(),this.reset=!1}}},M={components:{InfusionModal:l},template:`
        <div class="fixed bottom-0 z-0">
            Infusion Timer&reg
            <label class="italic">
                version 1.0.1
            </label>
        </div>
    `},C={data(){if(localStorage.getItem("agreement"))var e=!1;else var e=!0;return{agreement:e}},mounted(){this.agreement&&Notification.requestPermission().then(e=>{e==="granted"?(new Notification("Infusion Timer",{body:"Welcome to Infusion Timer!"}),alert("Welcome to Infusion Timer!")):alert("Please enable notifications!")})}},L={components:{Infusions:k,InfusionAgreement:c,InfusionFooter:M,InfusionNotification:C},template:`
        
        <infusions></infusions>
        
        <infusion-agreement></infusion-agreement>

        <infusion-footer></infusion-footer>

        <infusion-notification></infusion-notification>
    `},D={components:{InfusionProfile:L},template:`
        <infusion-profile></infusion-profile>
    `};Vue.createApp(D).mount("#app");

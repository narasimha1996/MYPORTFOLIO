import { LightningElement, track } from 'lwc';
import AlarmClockAssets from "@salesforce/resourceUrl/AlarmClockAssets"


export default class AlarmClockApp extends LightningElement {
    clockImage= AlarmClockAssets + '/AlarmClockAssets/clock.png';
    alarmRingtone = new Audio(AlarmClockAssets + '/AlarmClockAssets/Clocksound.mp3') ;
  
    currentTime = '';
    hours = [];
    minutes = [];
    meridiams = ['AM','PM'];
    hourseletion;
    minuteseletion;
    meridiamselection;
    alarmtime;
    isAlarmSet = false;
    isShake = false;
    

    get isFieldNotselected(){
      
        return  !(this.hourseletion && this.minuteseletion && this.meridiamselection );
        
    }

    get ImageShake(){
        return this.isShake ? 'shake' : '';
    }

    

    connectedCallback(){
        this.currentTimeHandler();
        this.createHoursOptions();
        this.createMinutesOptions();
    }

    currentTimeHandler(){
        setInterval(()=>{
            let dateTime = new Date();
            let hour = dateTime.getHours();
            let min = dateTime.getMinutes();
            let Sec = dateTime.getSeconds();
            let ampm ="AM";
    
            if(hour ===0){
                hour=12;
                ampm = 'Am'
            } else if(hour ===12){
                ampm ='PM';
            }
            if(hour >=12){
                hour = hour-12;
                ampm='PM';
            }
    
            hour = hour<10 ? '0'+hour :hour;
            min = min<10 ? '0'+min : min; 
            Sec = Sec <10 ? '0'+Sec : Sec;
    
            this.currentTime = hour + ':' + min +':' +Sec + ' '+ampm;
            if(this.alarmtime === `${hour} : ${min} ${ampm}`){
                this.isShake = true;
                this.alarmRingtone.play();
                this.alarmRingtone.loop = true;
            }
            

        },1000);
    }

    createHoursOptions(){
        for(let i=1; i<=12; i++){
            let val = i<10 ? '0'+i : i;
            this.hours.push(val);

        }

    }

    createMinutesOptions(){
        for(let i=0; i<=59; i++){
            let val = i<10 ? '0'+i : i;
            this.minutes.push(val);

        }

    }

    optionhandler(event){
        const {label, value} = event.detail;
        if(label === "Hour(s)"){
            this.hourseletion = value;
        } else if(label === "Minute(s)"){
            this.minuteseletion = value;
        }else if(label === "Am/Pm"){
           this.meridiamselection = value;
        }
  
    }


    setAlarmHandler(){
        this.alarmtime = `${this.hourseletion} : ${this.minuteseletion} ${this.meridiamselection}`;
        this.isAlarmSet = true;
    }

    clearAlarmHandler(){
        this.alarmtime ='';
        this.isAlarmSet = false;
        this.isShake = false;
        this.alarmRingtone.pause();
        const elements= this.template.querySelectorAll('c-alarm-clock-dropdown');
        Array.from(elements).forEach(element=>{
            element.reset('');
        })
    }
    

}
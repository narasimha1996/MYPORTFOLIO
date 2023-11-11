import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import TECH_Skills from '@salesforce/schema/Portfolio__c.Technical_Skills__c';
import SOFT_Skills from '@salesforce/schema/Portfolio__c.Soft_Skills__c';
import SOFTWARE_TOOLS from '@salesforce/schema/Portfolio__c.Software_Tools__c';
import SOFTWARE_METHODOLOGIES from '@salesforce/schema/Portfolio__c.Software_Development_Methodologies__c'; 


export default class PortfolioSkillsTab extends LightningElement {

    @api recordId;
    techicalSkills = [];
    softSkills = [];
    softwareTools = [];
    softwareMethodologies = [];


    @wire(getRecord, {
        recordId:'$recordId',
    fields:[TECH_Skills, SOFT_Skills, SOFTWARE_TOOLS, SOFTWARE_METHODOLOGIES]
})SkillHandler({data,error}){
        if(data){
            // console.log("skill data", JSON.stringify(data));
           this.skillsFormat(data);
        }
        if(error){
            console.log('error', error);
        }

    }

    skillsFormat(data){
       const {Technical_Skills__c, Soft_Skills__c, Software_Tools__c, Software_Development_Methodologies__c} = data.fields;
       this.techicalSkills = Technical_Skills__c ? Technical_Skills__c.value.split(','):[];
       this.softSkills = Soft_Skills__c ? Soft_Skills__c.value.split(','):[];
       this.softwareTools = Software_Tools__c ? Software_Tools__c.value.split(','):[];
       this.softwareMethodologies = Software_Development_Methodologies__c ? Software_Development_Methodologies__c.value.split(','):[];

    }



}
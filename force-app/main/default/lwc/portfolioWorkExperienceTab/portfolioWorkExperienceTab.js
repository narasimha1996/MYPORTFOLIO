import { LightningElement, wire, api } from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';

export default class PortfolioWorkExperienceTab extends LightningElement {
   
    @api recordId;
     workExperiencelist =[];

    @wire(getRelatedListRecords, 
        {
            parentRecordId : '$recordId',
            relatedListId: 'Work_Experience__r',
            fields:[
                'Work_Experience__c.Job_Start_Date__c',
                'Work_Experience__c.Job_End_Date__c',
                'Work_Experience__c.Role__c',
                'Work_Experience__c.CompanyName__c',
                'Work_Experience__c.Work_Location__c',
                'Work_Experience__c.Description__c',
                'Work_Experience__c.Is_current__c',
            ]
        })WorkExperienceHandler({data, error}){
            if(data){
                console.log('json data :', JSON.stringify(data));
                this.workExperience(data);
            }
            if(error){
                console.error(error);
            }
        }

        workExperience(data){
             this.workExperiencelist = data.records.map(item =>{
                let id = item.id;
                const {Job_Start_Date__c, Job_End_Date__c, Role__c, CompanyName__c, Work_Location__c, Description__c, Is_current__c}=item.fields
                let JobStartDate = this.getValue(Job_Start_Date__c);
                let JobEndDate = this.getValue(Job_End_Date__c);
                let Role = this.getValue(Role__c);
                let CompanyName = this.getValue(CompanyName__c);
                let WorkLocation = this.getValue(Work_Location__c);
                let Description = this.getValue(Description__c);
                let Iscurrent = this.getValue(Is_current__c); 
                return {id, JobStartDate, JobEndDate, Role, CompanyName, WorkLocation, Description, Iscurrent};
            })

           console.log('workExperiencelist',JSON.stringify(this.workExperiencelist));
            
        }

        getValue(data){
            return data &&( data.displayValue || data.value);
        }


}
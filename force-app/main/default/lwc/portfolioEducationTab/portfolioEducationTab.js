import { LightningElement, wire, api } from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';

const COLUMNS =[
    {label:'Education' , fieldName :'Education'},
    {label: 'Institution Name', fieldName:'InstitutionName'},
    {label: 'Passing Year', fieldName:'PassingYear'}
];
export default class PortfolioEducationTab extends LightningElement {
    tableData = [];
    columns = COLUMNS;
    @api recordId
   
    @wire(getRelatedListRecords, {
        parentRecordId:"$recordId",
        relatedListId:"Educations__r",
        fields:['Education__c.Instuition_Name__c', 'Education__c.Passing_Year__c', 'Education__c.Title__c' ],
        sortBy:['Education__c.Passing_Year__c']
    })EducationHandler({data, error}){
        if(data){
            console.log("education data", JSON.stringify(data));
            this.formatData(data);
        }
        if(error){
            console.error('error', error);
        }
    }

    formatData(data){
       this.tableData= [...data.records].reverse().map(item =>{
            let Id =item.id;
           const{Instuition_Name__c, Passing_Year__c, Title__c} = item.fields;
           let Education= Title__c.value;
           let InstitutionName = Instuition_Name__c.value;
           let PassingYear = Passing_Year__c.value;
        return {Id, Education, InstitutionName, PassingYear };

        });

    }

}
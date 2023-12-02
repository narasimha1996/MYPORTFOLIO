import { LightningElement, wire, api } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import SUPER_BADGES from '@salesforce/schema/Portfolio__c.Superbadges__c';
import LANGUAGES from '@salesforce/schema/portfolio__c.Languages__c'; 
import PortfolioAssets from  '@salesforce/resourceUrl/PortfolioAssets';


export default class OtherDetails extends LightningElement {

superBadges=[];
languages =[];
badgeIcon = `${PortfolioAssets}/PortfolioAssets/badge.png`;
languageIcon = `${PortfolioAssets}/PortfolioAssets/language.png`;
@api
recordId;

@wire(getRecord,{recordId :'$recordId', fields:[SUPER_BADGES, LANGUAGES]})
otherDetailsHandler({data,error}){
    if(data){
        console.log('OtherDeatailsTab data', JSON.stringify(data));
        this.formatData(data);
    }
    if(error){
        console.log('OtherDeatailsTab data error', error);
    }
}

formatData(data){
    const {Languages__c , Superbadges__c}=data.fields;
    this.superBadges= Superbadges__c && Superbadges__c.value !=null ? Superbadges__c.value.split(';') :[] ;
    this.languages = Languages__c && Languages__c.value !=null ? Languages__c.value.split(',') : []
}
}
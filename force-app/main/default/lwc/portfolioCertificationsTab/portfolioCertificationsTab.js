import { LightningElement, api, wire} from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import SALES_CERI from '@salesforce/schema/Portfolio__c.Certifications__c';
import OTHER_CERT from '@salesforce/schema/Portfolio__c.Other__c';
import PortfolioAssets from  '@salesforce/resourceUrl/PortfolioAssets';

export default class PortfolioCertificationsTab extends LightningElement {
    sf_certified = [];
    other_certified = [];
    @api recordId;
    cert_logo =`${PortfolioAssets}/PortfolioAssets/cert_logo.png`;

    @wire(getRecord, {
        recordId: '$recordId',
        fields:[SALES_CERI, OTHER_CERT]
    })certificationData({data,error}){
        if(data){
            console.log('certification data', JSON.stringify(data));
            this.formatData(data);   
        }if(error){
            console.error('error', error);
        }
    }

    formatData(data){
        const{Certifications__c, Other__c} = data.fields;
        this.sf_certified = Certifications__c ? Certifications__c.value.split(';').map(item=>{
            return `Salesforce Certified ${item}`;
        }):[];
        this.other_certified = Other__c? Other__c.value.split(','):[];
    }

}
import { LightningElement, api, wire } from 'lwc';
import PortfolioAssets from  '@salesforce/resourceUrl/PortfolioAssets';
import {getRecord, getFieldValue} from 'lightning/uiRecordApi';
import fullName from '@salesforce/schema/Portfolio__c.Full_Name__c';
import designation from '@salesforce/schema/Portfolio__c.Designation__c';
import companyLocation from '@salesforce/schema/Portfolio__c.Company_Location__c'; 

export default class PortfolioBanner extends LightningElement {
    
    @api recordId; //='a035i00000BYfyZAAT';
    
    @api linkedinUrl; //="https://www.linkedin.com/in/narasimha-palacholla/";
    @api githubUrl; //= "https://github.com/narasimha1996";
    @api trailheadUrl;// ="https://www.salesforce.com/trailblazer/murali1234";
    @api twitterUrl; //="https://twitter.com/muralipala3333";
    

    profilePic = `${PortfolioAssets}/PortfolioAssets/pic.jpg`;
    linkedin = `${PortfolioAssets}/PortfolioAssets/Social/linkedin.svg`;
    github = `${PortfolioAssets}/PortfolioAssets/Social/github.svg`;
    trailhead = `${PortfolioAssets}/PortfolioAssets/Social/trailhead.svg`;
    twitter=`${PortfolioAssets}/PortfolioAssets/Social/twitter.svg`;

    

    @wire(getRecord, {
        recordId :'$recordId',
        fields:[fullName, designation, companyLocation]})
    Portfoliodata;
    // portfolioHandler({data, error}){    
    // if(data){
    // console.log("record Data", JSON.stringify(data));
    // }
    // if(error){
    //     console.error("error", error);
    // }

    get fullName(){
        return getFieldValue(this.Portfoliodata.data, fullName);
    }

    get designation(){
        return getFieldValue(this.Portfoliodata.data, designation);
    }

    get companyLocation(){
        return getFieldValue(this.Portfoliodata.data, companyLocation);
    }

}
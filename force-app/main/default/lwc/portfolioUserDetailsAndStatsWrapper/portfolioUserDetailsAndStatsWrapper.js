import { LightningElement,api} from 'lwc';

export default class PortfolioUserDetailsAndStatsWrapper extends LightningElement {
    
     @api recordId ;//= "a035i00000BYfyZAAT";
     @api objectApiName; // = "Portfolio__c";
     @api badges;
     @api points ;
     @api trails;
     @api rank;
     @api resumeUrl;

}
import { LightningElement, api } from 'lwc';

export default class PortfolioUserDetails extends LightningElement {
   @api recordId;
   @api objectApiName;
   @api resumeUrl;


   downloadResume(){
      window.open(this.resumeUrl, "_blank");
     // "https://raw.githubusercontent.com/narasimha1996/Resume/dcac455c472c05c9c76ac2687d709ef84697a00e/Lakshmi%20Narashimha%20Palacholla.pdf"
   }
}
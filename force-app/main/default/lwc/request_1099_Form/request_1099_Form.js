import { LightningElement } from 'lwc';

export default class Request_1099_Form extends LightningElement {
    value = '';
    signature;
    Name;
    Date;
    EstNumber;

    get options() {
        return [
            {'label': 'Both Efile And Printing, Or', 'value': 'option1'},	
          {'label': 'Only efile of 1099 data to IRS via FIRE upload, on behalf of my company ', 'value': 'option2'},
         {'label': 'Only printing and shaping 1099-NEC and/or 1099-MISC forms to my company for self-distribution', 'value': 'option3'}
        ];
    }
      
}
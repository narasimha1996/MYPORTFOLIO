import { LightningElement } from 'lwc';

export default class AmazonClone extends LightningElement {
    email;
    password;

    handleUsername(event){
        this.email = event.target.value;
    }

    handlePassword(event){
        this.password = event.target.value;
    }


    handleclick(){
        
    }

}
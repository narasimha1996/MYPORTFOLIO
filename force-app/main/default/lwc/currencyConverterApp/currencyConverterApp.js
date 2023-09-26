import { LightningElement } from 'lwc';
import {countryCodeList} from "c/countryCodeList";
import currencyConverterAssests  from "@salesforce/resourceUrl/currencyConverterAssests";   

export default class CurrencyConverterApp extends LightningElement {
    currencyImage = currencyConverterAssests +'/currencyConverterAssets/currency.svg';
    countryList = countryCodeList;
    countryFrom ="USD";
    countryto = "AUD";
    amount='';
    result;
    error;

    handleChange(event){
        const {name,value} = event.target;
        this[name] = value;
        console.log(name);
        console.log(value);
        this.result = '';
        this.error = '';
    }

    submmitHandler(event){
        event.preventDefault();
        this.convert();
    }

   async convert(){
    const API_URL = `https://api.exchangerate.host/convert?from=${this.countryFrom}&to=${this.countryto}`;
    try{
        const data = await fetch(API_URL);   
        const jsondata = await data.json();
        this.result = (Number(this.amount) * jsondata.result).toFixed(2);
        console.log(this.result);

    }catch (error){
        console.log(error);
        this.error = "An error occurred. Please try again...";
    }

    }
}
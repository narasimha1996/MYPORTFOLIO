import { LightningElement, api } from 'lwc';
// const API_Key ="b12f8c3852615567d2b14837fef7400a";
import WEATHER_ICONS from '@salesforce/resourceUrl/WeatherAppIcons';
import getWeatherDetails from '@salesforce/apex/WeatherAppController.getWeatherDetails';

export default class WeatherApp extends LightningElement {
    arrowback = WEATHER_ICONS+'/weatherAppIcons/arrow-back.svg';
    clearIcon = WEATHER_ICONS+'/weatherAppIcons/clear.svg';
    cloudIcon = WEATHER_ICONS+'/weatherAppIcons/cloud.svg';
    dropletIcon = WEATHER_ICONS+'/weatherAppIcons/droplet.svg';
    hazeIcon = WEATHER_ICONS+'/weatherAppIcons/haze.svg';
    mapIcon = WEATHER_ICONS +'/weatherAppIcons/map.svg';
    rainIcon = WEATHER_ICONS+'/weatherAppIcons/rain.svg';
    snowIcon = WEATHER_ICONS +'/weatherAppIcons/snow.svg';
    stormIcon = WEATHER_ICONS+'/weatherAppIcons/storm.svg';
    thermometerIcon = WEATHER_ICONS+'/weatherAppIcons/thermometer.svg';

    cityName ='';
    loadingText = '';
    isError = false;
    response;
    weatherIcon;

    @api
    get loadingClasses(){
       return this.isError ? "error-Msg" : "success-Msg";
    }

    inputhandler(event){
        this.cityName = event.target.value;
    }

    onsubmitHandler(event){
        event.preventDefault();
        this.fetchdata();        
    }

   async fetchdata(){
    this.isError = false;
    this.loadingText ="Fetching Weather details...."
    console.log("CityName :",this.cityName);
     await getWeatherDetails({input:this.cityName}).then(
        result =>{
            this.weatherdetials(JSON.parse(result));
        }
    ).catch((error)=>{
        this.response =null;
        this.loadingText ="something went wrong";
        this.isError =true;
    })

  

    // Below is client side calling
    // const API_URL= `https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&appid=${API_Key}`;
    // try{
    //     const  data = await fetch(API_URL);
    //     const jsondata = await data.json();
    //     this.weatherdetials(jsondata);
    //     console.log(jsondata);
    // }catch(error){
    //     console.error(error);
    //     this.loadingText ="something went wrong";
    //     this.isError =true;
    // }


    }

    weatherdetials(jsondata){
        if(jsondata.cod == '404'){
            this.isError =true;
            this.loadingText = `${this.cityName} isn't valid city name`;
        }else{
            this.loadingText = "";
            this.isError =false;
            const city = jsondata.name;
            const country = jsondata.sys.country;
            const {description,id} = jsondata.weather[0];
            const {temp, feels_like, humidity} = jsondata.main;
            if(id == 800){
                this.weatherIcon = this.clearIcon;
            }else if(id >=801 && id<=804){
                this.weatherIcon = this.cloudIcon;
            }else if(id>=500 && id<=531 || id>=300 && id<= 321){
                this.weatherIcon = this.rainIcon;
            }else if(id>=200 && id<=232 || id >=600 && id<=622){
                this.weatherIcon = this.stormIcon; 
            }else if(id>=701 && id<=781){
                this.weatherIcon=this.hazeIcon;
            }

            this.response={
                city: city,
                temperature: Math.floor(temp),
                description :description,
                location : `${city},${country}`,
                feels_like: Math.floor(feels_like),
                humidity: `${humidity}%`
            }
        }
    }

    onBackHandler(){
        this.response = null;
        this.cityName ='';
        this.loadingText = '';
        this.isError = false;
        this.weatherIcon = '';
    }


}
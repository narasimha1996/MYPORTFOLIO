import { LightningElement } from 'lwc';
import PortfolioAssets from '@salesforce/resourceUrl/PortfolioAssets';

export default class PortfolioPersonalProjectsTab extends LightningElement {

    BMICalculator = `${PortfolioAssets}/PortfolioAssets/Projects/BMICalculator.png`;
    AlarmClock = `${PortfolioAssets}/PortfolioAssets/Projects/AlarmClock.png`;
    CurrencyCalculator = `${PortfolioAssets}/PortfolioAssets/Projects/CurrencyCalculator.png`;
    NoteTakingApp = `${PortfolioAssets}/PortfolioAssets/Projects/NoteTakingApp.png`;
    WeatherApp = `${PortfolioAssets}/PortfolioAssets/Projects/WeatherApp.png`;
    Survey = `${PortfolioAssets}/PortfolioAssets/Projects/Survey.png`;


    Projects = [
        {
            "name": "BMI Calculator App",
            "img" : this.BMICalculator,
            "link":"https://narasimhalwc-dev-ed.develop.my.site.com/portfolio/bmi-calculator"
        },
        {
            "name": "Alarm Clock App",
            "img" : this.AlarmClock,
            "link":"https://narasimhalwc-dev-ed.develop.my.site.com/portfolio/alarm-clock"
        },

        {
            "name": "Currency Converter App",
            "img" : this.CurrencyCalculator,
            "link":"https://narasimhalwc-dev-ed.develop.my.site.com/portfolio/currency-converter"
        },
        {
            "name": "Note Taking App",
            "img" : this.NoteTakingApp,
            "link":"https://narasimhalwc-dev-ed.develop.my.site.com/portfolio/note-taking-app"
        },
        {
            "name": "Weather App",
            "img" : this.WeatherApp,
            "link":"https://narasimhalwc-dev-ed.develop.my.site.com/portfolio/weather-app"
        },
        {
            "name": "Employee Survey App",
            "img" : this.Survey,
            "link":"https://narasimhalwc-dev-ed.develop.my.site.com/survey/survey/runtimeApp.app?invitationId=0Ki5i000000F3AV&surveyName=employee_survey&UUID=7191744c-2bf9-4958-8d45-120a764b2993"
        }
    ]
}
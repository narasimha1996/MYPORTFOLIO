public with sharing class WeatherAppController {
    @AuraEnabled
    public static string getWeatherDetails(string input) {
        string url ='https://api.openweathermap.org/data/2.5/weather?q='+input+'&units=metric'+getKey();
        string response = getResponse(url);
        return response;
    }

    public static String getKey(){
        string key ='b12f8c3852615567d2b14837fef7400a'; //system.label.weatherApiKey
        String output = '&appid=' + key;
        return output;
    }

	public static String getResponse(String url){
	 Http http = new Http();
     HttpRequest req = new HttpRequest();
     req.setEndpoint(url);
     req.setMethod('GET');
     req.setTimeout(120000);
     HttpResponse res =new HttpResponse();
     res = http.send(req);
     String responseBody = res.getBody();
     return responseBody;
     
	} 
}
global class LoginUser {
    @AuraEnabled
    global static String login(String UserName, String Password) {
        String homeURL = 'https://seanergydigital9-dev-ed.develop.my.site.com/s/';
        System.PageReference pageRef = Site.login(UserName, Password, homeURL);
        return pageRef.getUrl();
    }
}
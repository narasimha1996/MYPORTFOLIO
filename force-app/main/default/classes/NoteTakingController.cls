public without sharing class NoteTakingController {
    @AuraEnabled  
    public static Boolean createNoteRecord(string title , string description) {
        try {
            if (!String.isBlank(title)) {
            My_Note__c myNote = new My_Note__c(Name = title, Note_Description__c = description);
            insert myNote;
            return true;
            }
            return false;
        } catch (Exception e) {
            throw new  AuraHandledException(e.getMessage());
            
        }

    }

    @AuraEnabled (cacheable =true)
    public static List<My_Note__c> getNotes(){
        try {
           return [select Id, Name, Note_Description__c , LastModifiedDate from My_Note__c order by LastModifiedDate desc];
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static Boolean updateNoteRecord(String noteId, String title, String description){
        try {
            if(!String.isBlank(noteId)){
                My_Note__c myNote =  [select Id, Name, Note_Description__c from My_Note__c where id=:noteId ];
                myNote.Name = title;
                myNote.Note_Description__c = description;
                update myNote;
                return true;
            }
           return false;    
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static Boolean deleteNoteRecord(string noteId){
        try {
            if(!string.isBlank(noteId)){
                System.debug(noteId);
                My_Note__c myNote = new My_Note__c(Id=noteId);
                delete myNote;
                return true;
            }
            return false;        
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
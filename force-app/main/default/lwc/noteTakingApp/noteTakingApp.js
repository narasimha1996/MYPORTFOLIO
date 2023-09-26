import { LightningElement , wire} from 'lwc';
import createNoteRecord from '@salesforce/apex/NoteTakingController.createNoteRecord';
import getNotes from '@salesforce/apex/NoteTakingController.getNotes';
import updateNoteRecord from '@salesforce/apex/NoteTakingController.updateNoteRecord';
import {refreshApex} from '@salesforce/apex';
import LightningConfirm from 'lightning/Confirm';
import deleteNoteRecord from '@salesforce/apex/NoteTakingController.deleteNoteRecord'; 

const DEFAULT_NOTE_FORM = {
    Name:"",
    Note_Description__c: "",
}

export default class NoteTakingApp extends LightningElement {
    showModal=false;
    noteRecord = DEFAULT_NOTE_FORM;
    noteList = [];
    selectedRecordId ;
    wiredNoteResult;
    formats = [
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'list',
        'indent',
        'align',
        'link',
        'clean',
        'table',
        'header',
        'color',
    ];

    CreateNoteHandler(){
        this.showModal= true;
        this.noteRecord.Name = "";
        this.noteRecord.Note_Description__c ="";
    }

    CloseModalHandler(){
        this.showModal= false;
        this.noteRecord = DEFAULT_NOTE_FORM;
        this.selectedRecordId=null;
    }


    changeHandler(event){
        const {name, value} = event.target;
        this.noteRecord = {...this.noteRecord, [name]:value} ;

    }

    formSubmitHandler(event){
        event.preventDefault();
        console.log("noteRecord",JSON.stringify(this.noteRecord));   
        if(this.selectedRecordId){
            this.UpdateNotes(this.selectedRecordId);
        } else{
            this.createNote();
        }
    }

  get isFormInValid(){
        return !(this.noteRecord && this.noteRecord.Name && this.noteRecord.Note_Description__c);

    }


    createNote(){
        createNoteRecord({title: this.noteRecord.Name, description:this.noteRecord.Note_Description__c}).then(()=>{
            this.showModal = false;
            this.showToastMsg('Note Created Successfully!!','success');
            this.refresh();
        }).catch(error =>{
            console.error("error", error.message.body);
            this.showToastMsg(error.message.body,'error');
        })
    }

    showToastMsg(message , variant){
        const elem = this.template.querySelector('c-notification');
        if(elem){
            elem.showToast(message , variant);
        }
    }


    @wire(getNotes)
    noteListInfo(result){
    this.wiredNoteResult = result;
     const {data , error} = result;
        if(data){
            console.log("data of notes", JSON.stringify(data));
            this.noteList = data.map(item=>{
                let formatedDate = new Date(item.LastModifiedDate).toDateString();
                return {...item, formatedDate}
            })

        }
        if(error){
            console.error("error in fetching", error);
            this.showToastMsg(error.message.body,'error');
        }
    }


    editNoteHandler(event){
        const {recordid} = event.target.dataset;
      const noteRecorditem = this.noteList.find(item =>item.Id === recordid );
      this.noteRecord = {
        Name: noteRecorditem.Name,
        Note_Description__c:noteRecorditem.Note_Description__c,
      }
      this.selectedRecordId = recordid;
      this.showModal=true;
    }

   get modalName(){
    return this.selectedRecordId ? 'Update Note' : 'Add Note';
   }


   UpdateNotes(noteid){
        updateNoteRecord({noteId:noteid, title:this.noteRecord.Name, description:this.noteRecord.Note_Description__c}).then(()=>{
                this.showModal=false;
                this.showToastMsg("Note Updated Successfully!!", 'success');
                this.refresh();            
        }).catch(error => {
            console.error("error in Updating", error);
            this.showToastMsg(error.message.body,'error');

        })
    

    }

    refresh(){
        return refreshApex(this.wiredNoteResult);
    }


    deleteNoteHandler(event){
        this.selectedRecordId = event.target.dataset.recordid;
        this.handleConfirm();
    }

   async handleConfirm(){
    const result = await LightningConfirm.open({
        message :"Are you sure you want to delete this note?",
        variant : 'headerless',
        label :'Delete Confirmation'
        });
        if(result){
            this.deleteHandler();

        }else {
            this.selectedRecordId = null;
        }
    }

    deleteHandler(){
        console.log(this.selectedRecordId);
        deleteNoteRecord({noteId:this.selectedRecordId}).then(()=>{
            this.showModal = false;
            this.selectedRecordId=null;
            this.showToastMsg("Note Deleted Successfully!!",'success');   
            this.refresh();  
        }).catch(error =>{
            console.error("error in deletion", error);
            this.showToastMsg(error.message.body,'error');
        });

    }
}
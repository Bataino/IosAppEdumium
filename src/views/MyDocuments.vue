<template>
  <ion-page>
     <ion-header>
        <app-header title="My Documents" :backButton="true" />
    </ion-header>
    <ion-content >
      <list-component titleIcon="ion:clipboard" bodyWidth="200px" height="50px" v-for="doc in docs" :key="doc" :title="doc.title">
        <div class="d-flex mt-3">
          <icon icon="ion:document" class="fs-6 my-auto" />
          <div class="my-auto px-1 " >
            {{ doc.doc }}
          </div>
        </div>
        <template v-slot:body-status >
          <ion-item  @click="download(this.$host+'uploads/student_documents/'+doc.student_id+'/'+doc.doc)">
            <icon icon="ion:arrow-down-circle" class="fs-1 mx2" />
          </ion-item >
        </template>
      </list-component>
       <ion-fab vertical="bottom" horizontal="end" slot="fixed" id="add-doc">
        <ion-fab-button color="secondary m-2 mb-3">
          <icon icon="ion:add" class="text-white fs-1" />
        </ion-fab-button>
      </ion-fab>
    </ion-content>
    <ion-modal trigger="add-doc" 
        :is-open="addDoc.isOpen"  
        @didDismiss="closeAddDoc"
        :breakpoints="[0.1, 0.5, 1]"
        :initialBreakpoint="0.7">
            <ion-header color="primary" >
              <ion-toolbar>
                <ion-title>
                  Add New Document
                </ion-title>
                <ion-buttons slot="end" >
                  <ion-button @click="closeAddDoc" id="add-task">
                     <icon class="fs-5 text-dark" icon="ion:close"  />
                  </ion-button >
                </ion-buttons>
              </ion-toolbar>
            </ion-header>
            <ion-content>
                <form class="p-4" @submit.prevent="addDocs">
                    <ion-input v-model="addDoc.title" style="" class="border w-100 bg-white rounded small px-2 mb-3" required="true" placeholder="Title" />
                    <input ref="docFile" type="file" style="" class="form-control border shadow-0 w-100 bg-white rounded small px-2 mb-3" required="true" placeholder="File" />
                    <button class="btn-secondary ion-padding-vertical w-100 rounded small" type="submit">
                        Upload Document
                    </button>
                </form>
            </ion-content>
        </ion-modal>
  </ion-page>
</template>

<script>
import { IonFab, IonFabButton, IonItem, IonModal, IonInput } from '@ionic/vue';
import { dismiss, openLoading, openToast } from '@/functions/widget';
import { download } from '@/functions/storage';
import { addDocs, getDocs } from '@/services/student';

export default {
  name: 'ExamPage',
  components: { 
    IonFab, 
    IonFabButton, 
    IonItem, 
    IonModal,
    IonInput
  },
  data() {
    return {
      docs:[],
      addDoc: {
        title:'',
        isOpen: false
      },
    }
  },
  methods: {
    closeAddDoc(){
      this.addDoc.isOpen = false
      this.addDoc.title = ''
    },
    addDocs(){
      openLoading("Uploading")
      let formdata = new FormData()
      formdata.append('title', this.addDoc.title)
      formdata.append('file', this.$refs.docFile.files[0])
      addDocs(formdata)
      .then((data) => {
        if(!Number(data.status)){
          openToast("File could not be uploaded")
        }
        else{
          openToast("File uploaded successfully")
          location.reload()
        }
        dismiss()

      })
    },
    download(link) {
      download(link)
    }
  },
  ionViewDidEnter() {
    openLoading()
    getDocs()
    .then((data) => {
      if(!data[0])
        openToast("No document has been added")
      this.docs = data
      dismiss()
    })
  }
};
</script>

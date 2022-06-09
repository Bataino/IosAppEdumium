<template>
  <ion-page>
    <ion-header>
        <app-header title="Notice" />
    </ion-header>
    <ion-content>
      <list-component  v-for="note in notice" :key="note.id" :title="note.title" :smalltitle="'Date: '+note.date" height="20">
            <template v-slot:body-status>
              <span class="small px-2 text-primary" @click="openNotice(note)">
                  <icon icon="ion:arrow-redo-sharp" class="text-dark" height="15" />
                  view
              </span>
          </template>
        </list-component>
    </ion-content>
    <ion-modal 
        :is-open="modal.isOpen"
        :breakpoints="[0.1, 0.5, 1]"
        :initialBreakpoint="0.5"
        @didDismiss="closeNotice">
            <ion-header color="primary" >
              <ion-toolbar>
                <ion-title>
                  {{ modal.notice.title }}
                </ion-title>
                <ion-buttons slot="end" >
                  <ion-button >
                     <icon class="ion-f/loat-end text-dark" icon="ion:close" @click="closeNotice" />
                  </ion-button >
                </ion-buttons>
              </ion-toolbar>
            </ion-header>
            <ion-content>
              <div class="p-3 text-sm" v-html="modal.notice.message" ></div>
            </ion-content>
        </ion-modal>
  </ion-page>
</template>

<script>
import { IonModal } from '@ionic/vue';
import { openLoading, dismiss, openToast } from '@/functions/widget';
import { getNotifications } from '@/services/student';


export default {
  name: 'NoticePage',
  components: { 
    IonModal
   },
   data() {
        return {
            notice: [],
            modal: {
              notice: {},
              isOpen: false
            }
        }
    },
    methods: {
      openNotice(notice){
        this.modal.notice = notice
        this.modal.isOpen = true
      },
      closeNotice() {
        this.modal.notice = {}
        this.modal.isOpen = false
      }
    },
    ionViewDidEnter() {
      openLoading()
      getNotifications()
      .then((data) => {
        if(!data.data[0])
          openToast("Notice is Empty")
        data.data.forEach((elem) => {
          if(elem.visible_student.toLowerCase() == 'yes'){
            this.notice.push(elem)
          }
        })
        // this.notice = data.data
        dismiss()
      })
    }
};
</script>

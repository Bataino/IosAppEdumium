<template>
  <ion-page>
    <ion-header>
      <app-header title="Apply Leave" :backButton="true" />
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-list>
        <list-component
          bodyWidth="230px"
          height="20px"
          v-for="leave in leaves"
          :key="leave.id"
          :title="'Apply Date - '+  leave.apply_date"
        >
          <template v-slot:header-end>
            <icon icon="ic:round-file-download" height="15" class="mx-2" @click="download(this.$host +'uploads/student_leavedocuments/' + leave.docs)"/>
            <icon icon="ri:pencil-fill" height="15" class="mx-2" @click="openToUpdate(leave)" />
            <icon icon="ion:trash" height="15" class="mx-2" @click="deleteLeave(leave.id)"/>
          </template>
          <div class="w-100 pe-2">
            <div class="d-flex justify-content-between mb-1 w-100">
              <span class="fw-bold me-1"> From Date </span>
              <span class=""> {{ leave.from_date}}</span>
              <span class="fw-bold ms-2 me-1"> To Date </span>
              <span class=""> {{ leave.to_date }} </span>
            </div>
          </div>
          <template v-slot:body-status>
            <ion-badge
              color="success"
              v-if="Number(leave.status)"
              mode="md"
              class="text-sm text-light"
              >APPROVED</ion-badge
            >
            <ion-badge
              color="warning"
              v-else
              mode="md"
              class="text-sm text-light"
              >PENDING</ion-badge
            >
          </template>
        </list-component>
      </ion-list>
      <ion-modal trigger="add-leave" 
        :is-open="modalLeave.isOpen"  
        @didDismiss="this.modalLeave = {}"
        :breakpoints="[0.1, 0.5, 1]"
        :initialBreakpoint="0.7">
            <ion-header color="primary" >
              <ion-toolbar>
                <ion-title>
                  {{ modalLeave.toUpdate ? 'Update' : 'Add' }} Leave
                </ion-title>
                <ion-buttons slot="end" >
                  <ion-button @click="closeModal" id="add-task">
                     <icon class="fs-5 text-dark" icon="ion:close"  />
                  </ion-button >
                </ion-buttons>
              </ion-toolbar>
            </ion-header>
            <ion-content>
                <form class="p-4" @submit.prevent="addLeave">
                  <div class="d-flex">
                    <div class="small me-1 w-100">
                      <label for="">
                        Date From
                      </label>
                      <ion-input v-model="modalLeave.from_date" type="date" class="border w-100 bg-white rounded small px-2 mb-3" required="true" placeholder="From Date" />
                    </div>
                    <div class="ms-1 small w-100">
                      <label for="">
                        Date To
                      </label>
                      <ion-input v-model="modalLeave.to_date" type="date" class="border w-100 bg-white rounded small px-2 mb-3" required="true" placeholder="Tom-2  Date" />
                    </div>
                  </div>
                    <ion-input v-model="modalLeave.reason" style="" class="border w-100 bg-white rounded small px-2 mb-3" required="true" placeholder="Reason" />
                    <input ref="updateFile" v-if="modalLeave.toUpdate" type="file" style="" class="form-control border w-100 bg-white rounded small px-2 mb-3"  placeholder="File" />
                    <input ref="leaveFile" v-else type="file" style="" class="form-control border w-100 bg-white rounded small px-2 mb-3" required="true" placeholder="File" />
                    <button class="btn-secondary ion-padding-vertical w-100 rounded small" type="submit">
                        {{ modalLeave.toUpdate ? 'Update' : 'Add' }} Leave
                    </button>
                </form>
            </ion-content>
        </ion-modal>
      <ion-fab vertical="bottom" horizontal="end" slot="fixed" id="add-leave">
        <ion-fab-button color="secondary m-2 mb-3">
          <icon icon="ion:add" class="text-white fs-1" />
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonBadge, IonFab, IonFabButton, IonInput, IonModal, IonToolbar, IonTitle, alertController } from '@ionic/vue';
import { getApplyLeave, addLeave, updateLeave, deleteLeave } from "@/services/student"
import { openLoading, dismiss, openToast } from '@/functions/widget';
import { download } from "@/functions/storage"

export default {
  name: "ApplyLeave",
  components: {
    IonBadge,
    IonFab,
    IonFabButton,
    IonInput, 
    IonModal, 
    IonToolbar, 
    IonTitle
  },
  data() {
    return {
      leaves: [],
      modalLeave: {
        isOpen: false,
        toUpdate: false
      }
    };
  },
  ionViewDidEnter() {
    openLoading()
    getApplyLeave().then((data) => {
      this.leaves = data.result_array
      dismiss()
    })
  },
  methods: {
    download(link){
      download(link)
    },
    openToUpdate(leave) {
      this.modalLeave = leave
      this.modalLeave.isOpen = true
      this.modalLeave.toUpdate = true
    },
    addLeave(){
      if(this.modalLeave.toUpdate){
        this.updateLeave()
      }
      else {
        this.newLeave()
      }
      this.modalLeave = {}
    },
    newLeave() {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

      openLoading("Uploading")
      let formdata = new FormData()

      formdata.append('from_date',this.modalLeave.from_date)
      formdata.append('to_date',this.modalLeave.to_date)
      formdata.append('apply_date', date)
      formdata.append('reason',this.modalLeave.reason)
      formdata.append('file',this.$refs.leaveFile.files[0])
      addLeave(formdata).then(() => {
        openToast("Upload Successful")
        dismiss()
        this.$router.go()

      })
    },
    updateLeave() {
      openLoading("Uploading")
      let formdata = new FormData()

      formdata.append('from_date',this.modalLeave.from_date)
      formdata.append('to_date',this.modalLeave.to_date)
      formdata.append('apply_date', this.modalLeave.apply)
      formdata.append('reason',this.modalLeave.reason)
      if(this.$refs.updateFile.files)
        formdata.append('file',this.$refs.updateFile.files[0])
      updateLeave(formdata).then(() => {
        openToast("Upload Successful")
        dismiss()
        this.$router.go()

      })
    },
    async deleteLeave(id) {
      const alert = await alertController
      .create({
          cssClass: 'text-dark',
          message: 'This cannot be undone',
          header:"Delete Leave",
          buttons: [{
              text: 'Ok',
              role: 'OK'
          }, 'Cancel'],
          backdropDismiss: false,
      });
      await alert.present();

      const role = await alert.onDidDismiss();
      console.log('onDidDismiss resolved with role', role);

      if(role.role == "OK") {
        openLoading()
        deleteLeave({
          leave_id:id
        })
        .then(() => {
          dismiss()
          this.$router.go()
        })
      }
    }
  }
};
</script>

<style scoped>
</style>

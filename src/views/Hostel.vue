<template>
  <ion-page>
    <ion-header>
      <app-header title="Hostel" />
    </ion-header>
    <ion-content class="ion">
      <div class="bg-l-gray shadow-sm mb-2 py-3 p-2 d-flex justify-content-between" v-for="hostel in hostels"
        :key="hostel">
        <div class="">
          <icon icon="ion:business" class="fs-4 me-1" />
          <span class="small text-sm">
            {{ hostel.hostel_name }}
          </span>
        </div>
        <div class="small px-2 text-primary text-sm my-auto" @click="openHostel(hostel.id)">
          <icon icon="ion:arrow-redo-sharp" class="text-dark" height="15" />
          view
        </div>
      </div>
      <ion-modal :is-open="modal.isOpen" @didDismiss="closeHostel" :breakpoint="[0.1, 0.5]" :initialBreakpoint="0.4">
        <ion-header color="primary">
          <ion-toolbar>
            <ion-title>
              Hostel Details
            </ion-title>
            <ion-buttons slot="end">
              <ion-button @click="closeHostel">
                <icon class="fs-5 text-dark" icon="ion:close" />
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <div class="d-flex fw-bold flex-wrap p-3 text-sm justify-content-between">
            <div class="">
              Room type
            </div>
            <div class="">
              No of Beds
            </div>
            <div class="">
              Room No
            </div>
            <div class="">
              Room Cost
            </div>
          </div>
          <div class="d-flex flex-wrap p-3 text-sm justify-content-between" v-for="room in this.modal.data"
            :key="room.id">
            <div class="">
              {{ room.room_type }}
            </div>
            <div class="">
              {{ room.no_of_bed }}
            </div>
            <div class="">
              {{ room.room_no }}
            </div>
            <div class="">
              {{ room.cost_per_bed }}
            </div>
          </div>
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonModal, IonToolbar, IonTitle, } from '@ionic/vue';
import { openLoading, dismiss, openToast } from "@/functions/widget"
import { getHostelList, getHostelDetails } from "@/services/student"

export default {
  name: 'HostelPage',
  components: {
    IonModal,
    IonToolbar,
    IonTitle
  },
  data() {
    return {
      hostels: [],
      modal: {
        isOpen: false,
        data: []
      },
      result: { "success": 1, "data": [{ "id": "1", "hostel_name": "Boys Hostel 101", "type": "Boys" }, { "id": "2", "hostel_name": "Boys Hostel 102", "type": "Boys" }, { "id": "3", "hostel_name": "Girls Hostel 103", "type": "Girls" }, { "id": "4", "hostel_name": "Girls Hostel 104", "type": "Girls" }] },
      hostel: { "success": 1, "data": [{ "id": "6", "hostel_id": "4", "room_type_id": "1", "room_no": "G2", "no_of_bed": "1", "cost_per_bed": "300.00", "title": null, "description": "", "created_at": "2021-03-22 05:31:26", "updated_at": null, "room_type": "One Bed", "student_id": "0" }, { "id": "8", "hostel_id": "4", "room_type_id": "3", "room_no": "G4", "no_of_bed": "2", "cost_per_bed": "300.00", "title": null, "description": "", "created_at": "2021-03-22 05:32:28", "updated_at": null, "room_type": "Two Bed", "student_id": "0" }] }

    }
  },
  methods: {
    openHostel(hostelId) {
      openLoading()
      getHostelDetails({
        hostelId
      })
        .then((data) => {
          this.modal.data = data.data
          this.modal.isOpen = true
          // this.modal.data = this.hostel.data
          dismiss()
        })
    },
    closeHostel() {
      this.modal.isOpen = false
      this.modal.data = []
    }
  },
  ionViewDidEnter() {
    openLoading()
    getHostelList()
      .then((data) => {
        if (!data.success) {
          openToast(data.errorMsg)
        }
        else {
          this.hostels = data.data
        }
        // this.hostels = this.result.data
        dismiss()
      })
  }
};
</script>

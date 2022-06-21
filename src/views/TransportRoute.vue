<template>
  <ion-page>
    <app-header title="Routes" :backButton="true" />
    <ion-content >
      <list-component
        titleIcon="ion:git-network"
        height="50px"
        v-for="route in routes"
        :key="route.id"
        :title="route.route_title"
        bodyWidth="100%"
      >
        <div class="w-100">
          <div
            class="pt-1 d-flex justify-content-between w-100 align-items-center"
            v-for="vehicle in route.vehicles"
            :key="vehicle.id"
          >
            <div class="">
              <icon icon="ion:bus" class="fs-3 me-1" />
              <ion-text> {{ vehicle.vehicle_no }} </ion-text>
              <ion-text
                class="text-primary ps-1"
                v-if="vehicle.assigned == 'yes'"
              >
                Assigned
              </ion-text>
            </div>
            <div class="d-flex text-primary pe-2" v-if="vehicle.assigned == 'yes'" @click="openVehicle(vehicle)">
              <icon
                icon="ion:arrow-redo-sharp"
                class="text-dark me-1"
                height="15"
              />
              view
            </div>
          </div>
        </div>
        <template v-slot:body-status> </template>
      </list-component>
      <ion-modal :is-open="modal.isOpen" @didDismiss="closeVehicle" :breakpoint="[0.1,0.5]" :initialBreakpoint="0.4">
        <ion-header color="primary" >
              <ion-toolbar>
                <ion-title>
                  Vehicle Details
                </ion-title>
                <ion-buttons slot="end" >
                  <ion-button @click="closeVehicle" >
                     <icon class="fs-5 text-dark" icon="ion:close"  />
                  </ion-button >
                </ion-buttons>
              </ion-toolbar>
            </ion-header>
            <ion-content>
                <div class="d-flex flex-wrap p-3 text-sm justify-content-between">
                  <div class="w-50" >
                    Vehicle No.
                  </div>
                  <div class="w-50" >
                    {{ this.modal.data.vehicle_no }}
                  </div>
                  <div class="w-50" >
                    Vehicle Model.
                  </div>
                  <div class="w-50" >
                    {{ this.modal.data.driver_licence }}
                  </div>
                  <div class="w-50" >
                    Year Made
                  </div>
                  <div class="w-50" >
                    {{ this.modal.data.manufacture_year }}
                  </div>
                  <div class="w-50" >
                    Driver name
                  </div>
                  <div class="w-50" >
                    {{ this.modal.data.driver_name }}
                  </div>
                  <div class="w-50" >
                    Driver license
                  </div>
                  <div class="w-50" >
                    {{ this.modal.data.driver_licence }}
                  </div>
                  <div class="w-50" >
                    Driver contact
                  </div>
                  <div class="w-50" >
                    {{ this.modal.data.driver_contact }}
                  </div>
                </div>
            </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script>
import { getTransportRoute } from "@/services/student";
import { openLoading, dismiss } from "@/functions/widget";
import { IonModal, IonButton, IonButtons, IonToolbar, IonTitle } from "@ionic/vue";

export default {
  name: "ExamPage",
  components: {
    IonModal, 
    IonButton, 
    IonButtons, 
    IonToolbar, 
    IonTitle
  },
  data() {
    return {
      routes: [],
      modal:{
        isOpen:false,
        data: {}
      },
    };
  },
  methods: {
    closeVehicle() {
      this.modal.isOpen = false
      this.modal.data = {}
    },
    openVehicle(vehicle) {
      this.modal.data = vehicle
      this.modal.isOpen = true
    }
  },
  ionViewDidEnter() {
    openLoading();
    getTransportRoute().then((data) => {
      this.routes = data;
      // this.routes = this.result;
      dismiss()
    });
  },
};
</script>

<style scoped>
.w-50 {
  padding-bottom:4px;
}
</style>
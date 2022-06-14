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
import { openLoading } from "@/functions/widget";
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
      result: [
        {
          id: "1",
          route_title: "Brooklyn Central",
          no_of_vehicle: null,
          fare: "300.00",
          note: null,
          is_active: "no",
          created_at: "2021-03-22 05:33:13",
          updated_at: null,
          vehicles: [
            {
              vec_route_id: "2",
              id: "2",
              vehicle_no: "VH5645",
              vehicle_model: "Volvo Bus",
              manufacture_year: "2018",
              driver_name: "Maximus",
              driver_licence: "545645666776",
              driver_contact: "885456456",
              note: "",
              created_at: "2021-03-22 05:36:28",
              assigned: "no",
            },
            {
              vec_route_id: "1",
              id: "1",
              vehicle_no: "VH1001",
              vehicle_model: "Volvo Bus",
              manufacture_year: "2017",
              driver_name: "Michel",
              driver_licence: "R534534",
              driver_contact: "8667777869",
              note: "",
              created_at: "2021-03-22 05:35:46",
              assigned: "no",
            },
          ],
        },
        {
          id: "2",
          route_title: "Brooklyn East",
          no_of_vehicle: null,
          fare: "350.00",
          note: null,
          is_active: "no",
          created_at: "2021-03-22 05:33:50",
          updated_at: null,
          vehicles: [
            {
              vec_route_id: "4",
              id: "3",
              vehicle_no: "VH4584",
              vehicle_model: "Ford CAB",
              manufacture_year: "2015",
              driver_name: "Salman Ansari",
              driver_licence: "258714545",
              driver_contact: "8521479630",
              note: "",
              created_at: "2021-03-22 05:37:01",
              assigned: "no",
            },
            {
              vec_route_id: "3",
              id: "1",
              vehicle_no: "VH1001",
              vehicle_model: "Volvo Bus",
              manufacture_year: "2017",
              driver_name: "Michel",
              driver_licence: "R534534",
              driver_contact: "8667777869",
              note: "",
              created_at: "2021-03-22 05:35:46",
              assigned: "no",
            },
          ],
        },
        {
          id: "3",
          route_title: "Brooklyn West",
          no_of_vehicle: null,
          fare: "500.00",
          note: null,
          is_active: "no",
          created_at: "2021-03-22 05:34:00",
          updated_at: null,
          vehicles: [
            {
              vec_route_id: "6",
              id: "3",
              vehicle_no: "VH4584",
              vehicle_model: "Ford CAB",
              manufacture_year: "2015",
              driver_name: "Salman Ansari",
              driver_licence: "258714545",
              driver_contact: "8521479630",
              note: "",
              created_at: "2021-03-22 05:37:01",
              assigned: "no",
            },
            {
              vec_route_id: "5",
              id: "2",
              vehicle_no: "VH5645",
              vehicle_model: "Volvo Bus",
              manufacture_year: "2018",
              driver_name: "Maximus",
              driver_licence: "545645666776",
              driver_contact: "885456456",
              note: "",
              created_at: "2021-03-22 05:36:28",
              assigned: "no",
            },
          ],
        },
        {
          id: "4",
          route_title: "Brooklyn South",
          no_of_vehicle: null,
          fare: "400.00",
          note: null,
          is_active: "no",
          created_at: "2021-03-22 05:34:23",
          updated_at: null,
          vehicles: [
            {
              vec_route_id: "7",
              id: "2",
              vehicle_no: "VH5645",
              vehicle_model: "Volvo Bus",
              manufacture_year: "2018",
              driver_name: "Maximus",
              driver_licence: "545645666776",
              driver_contact: "885456456",
              note: "",
              created_at: "2021-03-22 05:36:28",
              assigned: "no",
            },
          ],
        },
        {
          id: "5",
          route_title: "Brooklyn North",
          no_of_vehicle: null,
          fare: "480.00",
          note: null,
          is_active: "no",
          created_at: "2021-03-22 05:34:46",
          updated_at: null,
          vehicles: [
            {
              vec_route_id: "8",
              id: "2",
              vehicle_no: "VH5645",
              vehicle_model: "Volvo Bus",
              manufacture_year: "2018",
              driver_name: "Maximus",
              driver_licence: "545645666776",
              driver_contact: "885456456",
              note: "",
              created_at: "2021-03-22 05:36:28",
              assigned: "yes",
            },
          ],
        },
      ],
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
      this.routes = this.result;
    });
  },
};
</script>

<style scoped>
.w-50 {
  padding-bottom:4px;
}
</style>
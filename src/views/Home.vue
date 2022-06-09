<template>
<ion-page>
    <ion-header>
        <app-header title="Home" />
    </ion-header>
    <ion-content :fullscreen="true">
        <ion-list>
            <ion-item class="mb-2 border-0 shadow-sm" lines="none" color="primary" @click="this.$router.push('/attendance')">
                <icon icon="bi:calendar-check" width="29" slot="start" />
                <ion-label>
                    Attendance
                    <br>
                    <ion-text class="text-muted small">
                        This Month
                    </ion-text>
                </ion-label>
                <ion-label slot="end" class="">
                    {{ studentSummary[0] }}%
                </ion-label>
            </ion-item>
            <ion-item class="mb-2 border-0 shadow-sm" lines="none" color="primary" @click="this.$router.push('/homework')">
                <icon icon="ion:clipboard" width="29" slot="start" />
                <ion-label>
                    HomeWork<br>
                    <ion-text class="text-muted small">
                        Incomplete
                    </ion-text>
                </ion-label>
                <ion-label slot="end" class="">
                    {{ studentSummary[1] }}
                </ion-label>
            </ion-item>
            <ion-item class="mb-2 border-0 shadow-sm" lines="none" color="primary" @click="this.$router.push('/tasks')">
                <icon icon="ion:list-sharp" width="29" slot="start" />
                <ion-label>
                    My Pending Task<br>
                    <ion-text class="text-muted small">
                        Today's
                    </ion-text>
                </ion-label>
                <ion-label slot="end" class="">
                    {{ studentSummary[2] }}
                </ion-label>
            </ion-item>

            <v-calendar class="border-0 px-2 " :attributes="events" @dayclick="openEventModal" isExpanded ref="calendar" @update:to-page="loadEvents" />
        </ion-list>
        <ion-modal 
        :is-open="modal.state"
        :breakpoints="[0.1, 0.5, 1]"
        :initialBreakpoint="0.5"
        @didDismiss="closeEventModal">
            <ion-header color="primary" >
              <ion-toolbar>
                <ion-title>
                  Task & Events
                </ion-title>
                <ion-buttons slot="end" >
                  <ion-button >
                     <icon class="ion-f/loat-end text-dark" icon="ion:close" @click="closeEventModal" />
                  </ion-button >
                </ion-buttons>
              </ion-toolbar>
            </ion-header>
            <div>
              <div v-for="event in modal.events" class="p-2 d-flex align-items-center" :key="event.id">
                <icon icon="ion:newspaper" class="fs-3"/>
                <div class="text-start ion-text-capitalize small ps-3 w-100">
                  {{ event.event_title }}
                </div>
              </div>
            </div>
        </ion-modal>
    </ion-content>
</ion-page>
</template>

<script>
import { dashboard } from '@/services/student'
import { openLoading, dismiss } from '../functions/widget';
import { IonModal } from "@ionic/vue"

export default {
    name: 'HomeTab',
    components: {
      IonModal
    },
    data() {
        return {
            studentSummary: [],
            events: [],
            modal:{
              events: [],
              state:false
            },
        }
    },
    methods: {
        loadEvents(event) {
            openLoading()
            event.month -= 1
            console.log("calendar", event)
            dashboard({
                    date_from: new Date(event.year, event.month, 1),
                    date_to: new Date(event.year, event.month, new Date(event.year, event.month, 0).getDate()),
                    role: "student"
                })
                .then((res) => {
                    dismiss()
                    this.pushEvents(res.public_events)
                    this.studentSummary[0] = res.student_attendence_percentage
                    this.studentSummary[1] = res.student_homework_incomplete
                    this.studentSummary[2] = res.student_incomplete_task
                })
        },
        openEventModal(event){
          console.log(new Date(event.date))
          this.events.forEach((element) => {
            if(new Date(event.date).getDate() === new Date(element.start_date).getDate()){
              console.log("An Event")
              this.modal.state = true
              this.modal.events.push(element)
            }
          })
        },
        closeEventModal(){
            this.modal = {
              events: [],
              state:false
            }
        },
        pushEvents(events){
            events.forEach((element, index) => {
                if(element.is_active == 'yes'){
                    this.events.push({
                        key: 'today' + index,
                        highlight: true,
                        dates: new Date(element.start_date),
                        ...element
                    })
                }
            });
        }
    },
    async ionViewDidEnter() {
        openLoading()
        const date = new Date()
        const year = date.getFullYear()
        const month = date.getMonth() -1
        const response = await dashboard({
            date_from: new Date(year, month, 1),
            date_to: new Date(year, month, new Date(year, month, 0).getDate()),
            role: "student"
        })

        if (response) {
            dismiss()
            this.pushEvents(response.public_events)
            this.studentSummary[0] = response.student_attendence_percentage
            this.studentSummary[1] = response.student_homework_incomplete
            this.studentSummary[2] = response.student_incomplete_task
        }
    }
};
</script>

<style scoped>
ion-item {
    font-size: 70%;
    --padding-top: 2px;
    --padding-bottom: 2px;
    border-color: white !important;
    border: white !important;
}
</style>

<template>
  <ion-page>
    <ion-header >
      <app-header title="Timetable" backButton="true" />
    </ion-header >
    <ion-content>
      <ion-content >
      <list-component height="20" bodyWidth="100%" v-for="(day,key, index) in timetable" :key="index" :title="key">
          <div class="w-100 pe-2">
            <ion-row class="w-100 ion-no-padding"> 
              <ion-col>
                <ion-text class="fw-bold" >
                  Time
                </ion-text>
              </ion-col>
              <ion-col >
                <ion-text class="fw-bold" >
                  Subject
                </ion-text>
              </ion-col>
              <ion-col class="ion-text-end">
                <ion-text class="fw-bold " >
                  Room No
                </ion-text>
              </ion-col>
            </ion-row>
            
             <ion-row class="w-100 ion-no-padding" v-for="subject in day" :key="subject.id"> 
              <ion-col>
                <ion-text class="text-gray" >
                 {{ subject.time_from + ' - ' + subject.time_to }}
                </ion-text>
              </ion-col>
              <ion-col >
                <ion-text class="" >
                  {{ subject.subject_name }}
                </ion-text>
              </ion-col>
              <ion-col class="ion-text-end">
                <ion-text  >
                  {{ subject.room_no }}
                </ion-text>
              </ion-col>
            </ion-row>
          </div>
            <template v-slot:body-status>
            </template>
        </list-component>
    </ion-content>
    </ion-content>
  </ion-page>
</template>

<script>
import { openLoading, dismiss } from '@/functions/widget';
import { getTimetable } from '@/services/student';

export default {
  name: 'ExamPage',
  components: { },
  data(){
    return { 
      timetable: {
        monday:[],
        tuesday:[],
        wednesday:[],
        thursday:[],
        friday:[],
        saturday:[],
        sunday:[],
      },
      result: {"timetable":{"Monday":[{"subject_id":"1","subject_name":"English","code":"210","type":"theory","name":"Shivam","surname":"Verma","employee_id":"9002","id":"1","day":"Monday","class_id":"1","section_id":"1","subject_group_id":"1","subject_group_subject_id":"1","staff_id":"2","time_from":"8:00 AM","time_to":"9:00 AM","start_time":"08:00:00","end_time":"09:00:00","room_no":"101","session_id":"16","created_at":"2021-03-23 01:48:23","subject_group_class_sections_id":"1"},{"subject_id":"3","subject_name":"Hindi","code":"230","type":"theory","name":"Shivam","surname":"Verma","employee_id":"9002","id":"2","day":"Monday","class_id":"1","section_id":"1","subject_group_id":"1","subject_group_subject_id":"3","staff_id":"2","time_from":"10:10 AM","time_to":"11:10 AM","start_time":"10:10:00","end_time":"11:10:00","room_no":"101","session_id":"16","created_at":"2021-03-23 01:54:38","subject_group_class_sections_id":"1"},{"subject_id":"4","subject_name":"Mathematics","code":"110","type":"practical","name":"Shivam","surname":"Verma","employee_id":"9002","id":"3","day":"Monday","class_id":"1","section_id":"1","subject_group_id":"1","subject_group_subject_id":"4","staff_id":"2","time_from":"11:11 AM","time_to":"12:11 PM","start_time":"11:11:00","end_time":"12:11:00","room_no":"102","session_id":"16","created_at":"2021-03-23 01:48:23","subject_group_class_sections_id":"1"},{"subject_id":"5","subject_name":"Science","code":"111","type":"practical","name":"Shivam","surname":"Verma","employee_id":"9002","id":"4","day":"Monday","class_id":"1","section_id":"1","subject_group_id":"1","subject_group_subject_id":"5","staff_id":"2","time_from":"1:12 PM","time_to":"2:12 PM","start_time":"13:12:00","end_time":"14:12:00","room_no":"105","session_id":"16","created_at":"2021-03-23 01:54:38","subject_group_class_sections_id":"1"}],"Tuesday":[{"subject_id":"1","subject_name":"English","code":"210","type":"theory","name":"Shivam","surname":"Verma","employee_id":"9002","id":"5","day":"Tuesday","class_id":"1","section_id":"1","subject_group_id":"1","subject_group_subject_id":"1","staff_id":"2","time_from":"7:13 AM","time_to":"8:13 AM","start_time":"07:13:00","end_time":"08:13:00","room_no":"102","session_id":"16","created_at":"2021-03-23 01:50:37","subject_group_class_sections_id":"1"},{"subject_id":"3","subject_name":"Hindi","code":"230","type":"theory","name":"Shivam","surname":"Verma","employee_id":"9002","id":"6","day":"Tuesday","class_id":"1","section_id":"1","subject_group_id":"1","subject_group_subject_id":"3","staff_id":"2","time_from":"8:13 AM","time_to":"9:14 AM","start_time":"08:13:00","end_time":"09:14:00","room_no":"102","session_id":"16","created_at":"2021-03-23 01:54:48","subject_group_class_sections_id":"1"},{"subject_id":"4","subject_name":"Mathematics","code":"110","type":"practical","name":"Shivam","surname":"Verma","employee_id":"9002","id":"7","day":"Tuesday","class_id":"1","section_id":"1","subject_group_id":"1","subject_group_subject_id":"4","staff_id":"2","time_from":"9:30 AM","time_to":"10:30 AM","start_time":"09:30:00","end_time":"10:30:00","room_no":"102","session_id":"16","created_at":"2021-03-23 01:50:37","subject_group_class_sections_id":"1"},{"subject_id":"6","subject_name":"Social Studies","code":"212","type":"theory","name":"Shivam","surname":"Verma","employee_id":"9002","id":"9","day":"Tuesday","class_id":"1","section_id":"1","subject_group_id":"1","subject_group_subject_id":"6","staff_id":"2","time_from":"1:14 PM","time_to":"2:14 PM","start_time":"13:14:00","end_time":"14:14:00","room_no":"102","session_id":"16","created_at":"2021-03-23 01:54:48","subject_group_class_sections_id":"1"}],"Wednesday":[{"subject_id":"1","subject_name":"English","code":"210","type":"theory","name":"Shivam","surname":"Verma","employee_id":"9002","id":"10","day":"Wednesday","class_id":"1","section_id":"1","subject_group_id":"1","subject_group_subject_id":"1","staff_id":"2","time_from":"8:15 AM","time_to":"9:15 AM","start_time":"08:15:00","end_time":"09:15:00","room_no":"101","session_id":"16","created_at":"2021" }]}}
    }
  },
  ionViewDidEnter() {
    openLoading()
    getTimetable().then((data) => {
      this.timetable = data.timetable
      this.timetable = this.result.timetable

      dismiss()
    })
  }
};
</script>

<template>
  <ion-page>
    <ion-header>
      <app-header title="BBB Live Classes" :backButton="true" />
    </ion-header>
    <ion-content>
      <list-component
        v-for="liveClass in classes"
        :title="liveClass.title"
        height="20"
        bodyWidth="150px"
        :key="liveClass.id"
      >
        <template v-slot:header-end>
          <div class="text-primary small px-3" :href="liveClass.join_url" @click="joinClass(liveClass)">
            <icon icon="ion:enter-outline" class="text-dark mb-1" height="15" />
            Join
          </div>
        </template>
        <span class="fw-bold">
          Date: <br />
          Class :
        </span>
        <span>
          {{ liveClass.date.split(" ")[0] }}<br />
          {{ liveClass.class + " " + liveClass.section}}
        </span>
        <template v-slot:body-status>
          <ion-badge
            color="warning"
            mode="md"
            v-if="liveClass.status == 0"
            class="fw-normal text-sm small text-light p-1 my-auto"
            >Awaited</ion-badge
          >
          <ion-badge color="purple" mode="md" v-else-if="liveClass.status == 1" class="small text-sm text-light"
            >In Progress</ion-badge
          >
          <ion-badge mode="md" color="success" v-else class="text-sm small text-light"
            >Finished</ion-badge>
        </template>
      </list-component>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonBadge } from '@ionic/vue';
import { getBbbClasses } from '@/services/student';
import { openLoading, dismiss, openToast } from '@/functions/widget';

export default {
  name: 'ExamPage',
  components: { IonBadge },
  data() {
    return {
      classes: [],
      // result: {"live_classes":[{"id":"55","purpose":"class","staff_id":"2","created_id":"1","title":"Maths Online classes","date":"2021-11-25 01:30:00","duration":"40","password":"dztDR","subject":null,"class_id":null,"section_id":null,"session_id":"16","host_video":"1","client_video":"1","description":"","timezone":"Asia/Kolkata","api_type":"global","status":"2","created_at":"2021-11-02 03:18:16","class":"Class 1","section":"A","create_for_name":"Shivam","create_for_surname":"Verma","for_create_employee_id":"9002","for_create_role_name":"Teacher","join_url":"https://us04web.zoom.us/j/79493940289?pwd=ODIwNFoyQXR5OEwzaGhvQko0czNMUT09"},{"id":"54","purpose":"class","staff_id":"5","created_id":"1","title":"NCERT (All Paper Discussion)","date":"2021-11-20 01:00:00","duration":"33","password":"qXVO9","subject":null,"class_id":null,"section_id":null,"session_id":"16","host_video":"1","client_video":"1","description":"","timezone":"Asia/Kolkata","api_type":"global","status":"0","created_at":"2021-11-02 03:06:33","class":"Class 1","section":"A","create_for_name":"Jason","create_for_surname":"Sharlton","for_create_employee_id":"9001","for_create_role_name":"Teacher","join_url":"https://us04web.zoom.us/j/78918456681?pwd=NDJGdmNETTVmN3cza25OeVNpcXUzdz09"},{"id":"53","purpose":"class","staff_id":"5","created_id":"1","title":"English Examination (Discussion)","date":"2021-11-10 09:30:00","duration":"20","password":"pGag0","subject":null,"class_id":null,"section_id":null,"session_id":"16","host_video":"1","client_video":"1","description":"","timezone":"Asia/Kolkata","api_type":"global","status":"0","created_at":"2021-11-02 03:05:57","class":"Class 1","section":"A","create_for_name":"Jason","create_for_surname":"Sharlton","for_create_employee_id":"9001","for_create_role_name":"Teacher","join_url":"https://us04web.zoom.us/j/76411311526?pwd=NldPZjV5NTRUeVFTbXdPTmFvNVUzUT09"},{"id":"46","purpose":"class","staff_id":"2","created_id":"1","title":"Online viva practical exam","date":"2021-10-28 02:00:00","duration":"30","password":"4oj1S","subject":null,"class_id":null,"section_id":null,"session_id":"16","host_video":"1","client_video":"1","description":"","timezone":"Asia/Kolkata","api_type":"global","status":"0","created_at":"2021-10-05 03:20:42","class":"Class 1","section":"A","create_for_name":"Shivam","create_for_surname":"Verma","for_create_employee_id":"9002","for_create_role_name":"Teacher","join_url":"https://us04web.zoom.us/j/76793538494?pwd=U2dxamlYeWIrNVE3enplWVJrVHVZQT09"},{"id":"45","purpose":"class","staff_id":"2","created_id":"1","title":"NCERT Old Paper preparation","date":"2021-10-22 09:00:00","duration":"30","password":"Kn3QS","subject":null,"class_id":null,"section_id":null,"session_id":"16","host_video":"1","client_video":"1","description":"","timezone":"Asia/Kolkata","api_type":"global","status":"0","created_at":"2021-10-05 03:18:34","class":"Class 1","section":"A","create_for_name":"Shivam","create_for_surname":"Verma","for_create_employee_id":"9002","for_create_role_name":"Teacher","join_url":"https://us04web.zoom.us/j/71370002396?pwd=dUV0Q0gyL2JSbWt5bFpaMmI0bDNxdz09"},{"id":"44","purpose":"class","staff_id":"6","created_id":"1","title":"Fees Discussion","date":"2021-10-18 01:00:00","duration":"30","password":"HIX3K","subject":null,"class_id":null,"section_id":null,"session_id":"16","host_video":"1","client_video":"1","description":"","timezone":"Asia/Kolkata","api_type":"global","status":"0","created_at":"2021-10-05 03:17:34","class":"Class 1","section":"A","create_for_name":"James","create_for_surname":"Deckar","for_create_employee_id":"9004","for_create_role_name":"Accountant","join_url":"https://us04web.zoom.us/j/75338329607?pwd=U0hXQnE5eVpyNFh3b2RKU2tVTHRVUT09"},{"id":"42","purpose":"class","staff_id":"7","created_id":"1","title":"PD Classes","date":"2021-10-12 10:00:00","duration":"20","password":"xk2zl","subject":null,"class_id":null,"section_id":null,"session_id":"16","host_video":"1","client_video":"1","description":"","timezone":"Asia/Kolkata","api_type":""}]
      // }
    }
  },
  methods: {
    joinClass(liveClass){
      this.$router.push({
        name: 'WebView',
        params: {
          title:liveClass.title,
          url: liveClass.url
        }
    })
    }
  },
  ionViewWillEnter() {
    openLoading()
    getBbbClasses().then((data) => {
      if(!data.live_classes[0]){
        openToast("No Ongoing or Scheduled Live Class")
      }
      this.classes = data.live_classes
      // this.classes = this.result.live_classes
      dismiss()
    })
  }
};
</script>

<template>
  <ion-page>
    <ion-header>
      <app-header title="Timeline" />
    </ion-header>
    <ion-content>
      <div class="d-flex p-3 mt-2" v-for="time in timeline" :key="time.id">
        <div>
          <icon icon="carbon:dot-mark" class="fs-2 text-success" />
        </div>
        <div class="ps-1">
          <div class="text-sm fw-bolder">
              {{ time.title }}
            <div class="text-muted fst-italic fw-normal">
              {{ time.timeline_date }}
            </div>
          </div>
          <div class="text-sm text-dark">
            {{ time.description }}
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { } from "@ionic/vue";
import { getTimeline } from "@/services/student";
import { dismiss, openLoading, openToast } from "@/functions/widget";

export default {
  name: "TimelinePage",
  components: {},
  data() {
    return {
      timeline: [],
      result: [
        {
          id: "1",
          student_id: "1",
          title: "Update your status regularly",
          timeline_date: "2021-04-02",
          description:
            "Posting updates helps you stay on\r\nyour network\u2019s radar and build your\r\nprofessional image. Mention your\r\nprojects, professional books or\r\narticles, or events you\u2019re attending.\r\nMany recruiters read y",
          document: "",
          status: "yes",
          date: "2021-04-02",
        },
        {
          id: "2",
          student_id: "1",
          title: "Show your connectedness.",
          timeline_date: "2021-04-05",
          description:
            "Groups you join appear at the\r\nbottom of your profile. Joining\r\nsome shows that you want to\r\nengage in professional\r\ncommunities and learn the lingo.\r\nStart with your university and\r\nindustry groups.",
          document: "",
          status: "yes",
          date: "2021-04-02",
        },
      ],
    };
  },
  ionViewDidEnter() {
    openLoading();
    getTimeline()
    .then((data) => {
      this.timeline = data
      if(!data[0]){
        openToast("No Timeline Found Yet")
      }
      // this.timeline = this.result
      dismiss();
    });
  },
};
</script>

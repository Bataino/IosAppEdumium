<template>
  <ion-page>
    <ion-header>
      <ion-toolbar title="Syllabus Status" :backButton="true">
        <ion-title>
          {{ subject.subject_name }}
        </ion-title>
        <ion-buttons slot="start">
          <ion-back-button mode="md"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="p-0">
      <ion-list>
        <div class="" v-for="sub in subjectSyllabus" :key="sub.id">
          <div
            class="
              d-flex
              align-items-start
              justify-content-between
              p-2
              px-3
              bg-l-gray
            "
            style="font-size: 11px"
          >
            <div class="p-2 fw-bold">
              {{ sub.id }}
            </div>
            <div class="p-2  fw-bold w-100">
              {{ sub.name }}
            </div>
            <div class="p-2 fw-bold ion-text-nowrap">
              {{ sub.total_complete }}% completed
            </div>
          </div>
          <div
            class=" d-flex
              align-items-center
              justify-content-between
              p-2 px-3 ps-5"
            v-for="topic in sub.topics"
            :key="topic.id"
            style="font-size: 11px"
          >
            <div class="p-2">
              {{ sub.id + "." + topic.id }}
            </div>
            <div class="p-2 w-100">
              {{ topic.name }}
            </div>
            <div class="p-2 ion-text-nowra">
              {{ Number(topic.status) ? 'completed' :'incomplete' }}
            </div>
          </div>
        </div>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import { getSubjectSyllabus } from "@/services/student";
import { IonBackButton, IonButtons, IonToolbar } from "@ionic/vue";
import { openLoading, dismiss } from "@/functions/widget";
export default {
  name: "SyllabusStatus",
  components: {
    IonBackButton,
    IonButtons,
    IonToolbar,
  },
  data() {
    return {
      subjectSyllabus: [],
      subject: {},
    };
  },
  methods: {},
  ionViewDidEnter() {
    try {
      this.subject = JSON.parse(this.$route.params.subject);
    } catch (err) {
      this.$router.push("/syllabus");
    }
    openLoading();
    getSubjectSyllabus({
      subject_group_subject_id: this.subject.subject_group_subject_id,
      subject_group_class_sections_id: this.subject.class_section_id,
    }).then((data) => {
      this.subjectSyllabus = data;
      dismiss();
    });
  },
  created() {},
};
</script>

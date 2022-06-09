<template>
  <ion-page>
    <ion-header>
      <ion-toolbar title="Syllabus Status" :backButton="true">
        <ion-title>
          {{ exam.exam }}
        </ion-title>
        <ion-buttons slot="start">
          <ion-back-button mode="md"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="p-0">
      <list-component
        v-for="subject in examSubjects"
        :key="subject.id"
        :title="subject.subject_name + ' (' + subject.subject_code + ')'"
        titleIcon="ion:book"
        bodyWidth="100%;"
      >
        <div class="pt-2 pe-2 w-100">
          <div class="pt-2 d-flex justify-content-between fw-bold">
            <div class="d-flex align-items-center">
              <icon icon="ion:calendar-outline" class="fs-1" />
              <div class="ps-1 small">
                <span> Date </span><br />
                <span> {{ subject.date_from }} </span>
              </div>
            </div>
            <div class="d-flex  align-items-center">
              <icon icon="ion:albums" class="fs-1" />
              <div class="ps-1 small">
                <span> Room No </span><br />
                <span> {{ subject.room_no }} </span>
              </div>
            </div>
            <div class="pt-2">
              <div class="d-flex align-items-center">
                <icon icon="ion:time-outline" class="fs-1" />
                <div class="ps-1 small">
                  <span> Start Time </span><br />
                  <span> {{ subject.time_from }} </span>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-between mt-2 fw-bold">
            <div class="d-flex">
              <icon icon="ion:time-outline" class="fs-1 my-auto" />
              <div class="ps-1 small">
                <span> Duration </span><br />
                <span> {{ subject.room_no }} </span>
              </div>
            </div>
            <div class="text-center">
              Min mark<br>
              {{ subject.min_marks }}
            </div>
            <div class="text-center">
              Max mark<br>
              {{ subject.max_marks }}
            </div>
            <div class="text-center">
              Credit hours<br>
              {{ subject.credit_hours }}
            </div>
          </div>
        </div>
      </list-component>
    </ion-content>
  </ion-page>
</template>

<script>
import { getExamSchedule } from "@/services/student";
import { IonBackButton, IonButtons, IonToolbar } from "@ionic/vue";
import { openLoading, dismiss, openToast } from "@/functions/widget";
export default {
  name: "SyllabusStatus",
  components: {
    IonBackButton,
    IonButtons,
    IonToolbar,
  },
  data() {
    return {
      exam: {},
      examSubjects: [],
      // result: {
      //   exam_subjects: [
      //     {
      //       id: "57",
      //       exam_group_class_batch_exams_id: "13",
      //       subject_id: "1",
      //       date_from: "2021-06-01",
      //       time_from: "10:00:27",
      //       duration: "1",
      //       room_no: "101",
      //       max_marks: "100.00",
      //       min_marks: "33.00",
      //       credit_hours: "0.00",
      //       date_to: null,
      //       is_active: "0",
      //       created_at: "2021-04-21 00:44:34",
      //       updated_at: null,
      //       subject_name: "English",
      //       subject_code: "210",
      //       subject_type: "theory",
      //     },
      //     {
      //       id: "58",
      //       exam_group_class_batch_exams_id: "13",
      //       subject_id: "3",
      //       date_from: "2021-06-05",
      //       time_from: "10:00:36",
      //       duration: "1",
      //       room_no: "101",
      //       max_marks: "100.00",
      //       min_marks: "33.00",
      //       credit_hours: "0.00",
      //       date_to: null,
      //       is_active: "0",
      //       created_at: "2021-04-21 00:44:34",
      //       updated_at: null,
      //       subject_name: "Hindi",
      //       subject_code: "230",
      //       subject_type: "theory",
      //     },
      //     {
      //       id: "59",
      //       exam_group_class_batch_exams_id: "13",
      //       subject_id: "4",
      //       date_from: "2021-06-12",
      //       time_from: "10:00:46",
      //       duration: "1",
      //       room_no: "101",
      //       max_marks: "100.00",
      //       min_marks: "33.00",
      //       credit_hours: "0.00",
      //       date_to: null,
      //       is_active: "0",
      //       created_at: "2021-04-21 00:44:34",
      //       updated_at: null,
      //       subject_name: "Mathematics",
      //       subject_code: "110",
      //       subject_type: "practical",
      //     },
      //     {
      //       id: "60",
      //       exam_group_class_batch_exams_id: "13",
      //       subject_id: "5",
      //       date_from: "2021-06-19",
      //       time_from: "12:00:55",
      //       duration: "1",
      //       room_no: "101",
      //       max_marks: "100.00",
      //       min_marks: "33.00",
      //       credit_hours: "0.00",
      //       date_to: null,
      //       is_active: "0",
      //       created_at: "2021-04-21 00:44:34",
      //       updated_at: null,
      //       subject_name: "Science",
      //       subject_code: "111",
      //       subject_type: "practical",
      //     },
      //   ],
      // },
    };
  },
  methods: {},
  ionViewDidEnter() {
    try {
      this.exam = JSON.parse(this.$route.params.exam);
    } catch (err) {
      this.$router.push("/exam");
    }
    openLoading();
    getExamSchedule({
      exam_group_class_batch_exam_id: this.exam.exam_group_class_batch_exam_id,
    }).then((data) => {
      if (!data.exam_subjects[0]) {
        openToast("Exam schedule data could not be found");
        this.$router.push("/exam");
      }
      this.examSubjects = data.exam_subjects;
      // this.examSubjects = this.result.exam_subjects;

      dismiss();
    });
  },
  created() {},
};
</script>

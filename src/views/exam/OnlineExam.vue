<template>
  <ion-page>
    <ion-header>
      <app-header title="Online Exam" backButton="true" />
    </ion-header>
    <ion-content>
      <list-component
        height="20"
        bodyWidth="100%"
        v-for="exam in exams"
        :key="exam.id"
        :title="exam.exam"
      >
        <template v-slot:header-end v-if="Number(exam.is_submitted)">
          <div class="text-primary pe-20" @click="openResult(exam)">
            <icon icon="ion:arrow-redo-sharp" class="text-dark" />
            view
          </div>
        </template>
        <div class="d-flex justify-content-between mb-1 pe-2 flex-wrap">
          <div
            class="d-flex justify-content-between mb-1 pe-2"
            style="width: 48%"
          >
            <span class="fw-bold"> Exam from</span>
            <span class=""> {{ exam.exam_from }}</span>
          </div>
          <div
            class="d-flex justify-content-between mb-1 pe-2"
            style="width: 48%"
          >
            <span class="fw-bold"> Exam To</span>
            <span class=""> {{ exam.exam_to }}</span>
          </div>
          <div
            class="d-flex justify-content-between mb-1 pe-2"
            style="width: 48%"
          >
            <span class="fw-bold"> Total Attempts</span>
            <span class=""> {{ exam.attempt }}</span>
          </div>
          <div
            class="d-flex justify-content-between mb-1 pe-2"
            style="width: 48%"
          >
            <span class="fw-bold"> Attempted</span>
            <span class=""> {{ exam.is_attempted }}</span>
          </div>

          <div
            class="d-flex justify-content-between mb-1 pe-2"
            style="width: 48%"
          >
            <span class="fw-bold"> Duration</span>
            <span class=""> {{ exam.duration }}</span>
          </div>
          <div
            class="d-flex justify-content-between mb-1 pe-2"
            style="width: 48%"
          >
            <span class="fw-bold"> Status</span>
            <span class="">
              {{
                Number(exam.is_submitted) ? "Submitted" : "Available"
              }}</span
            >
          </div>

          <div
            class="d-flex justify-content-between mb-1 pe-2"
            style="width: 48%"
          >
            <span class="fw-bold"> Quiz</span>
            <span class=""> {{ exam.is_quiz }}</span>
          </div>
          <div
            class="d-flex justify-content-between mb-1 pe-2"
            style="width: 48%"
          >
            <span class="fw-bold"> Passing(%)</span>
            <span class=""> {{ exam.passing_percentage }}</span>
          </div>

          <div
            class="d-flex justify-content-between mb-1 pe-2"
            style="width: 48%"
          >
            <span class="fw-bold"> Total Question</span>
            <span class=""> {{ exam.total_question }}</span>
          </div>

          <div
            class="d-flex justify-content-between mb-1 pe-2"
            style="width: 48%"
          >
            <span class="fw-bold"> Decriptive Question</span>
            <span class=""> {{ exam.total_descriptive }}</span>
          </div>
        </div>
      </list-component>
    </ion-content>
  </ion-page>
</template>

<script>
import {} from "@ionic/vue";
import { getOnlineExam } from "@/services/student";
import { dismiss, openLoading } from "@/functions/widget";

export default {
  name: "ExamPage",
  components: {},
  data() {
    return {
      exams: [],
    };
  },
  methods:{
    openResult(exam){
      this.$router.push({
        name:"OnlineExamResult",
        params: {
          exam: JSON.stringify(exam)
        }
      })
    }
  },
  ionViewDidEnter() {
    openLoading();
    getOnlineExam().then((data) => {
      this.exams = data.onlineexam;
      // this.exams = this.result.onlineexam;
      dismiss();
    });
  },
};
</script>

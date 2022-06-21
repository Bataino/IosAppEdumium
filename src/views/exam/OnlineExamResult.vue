<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title> {{ exam.exam }} Result </ion-title>
        <ion-buttons slot="start">
          <ion-button>
            <ion-back-button></ion-back-button>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class=" p-2 m-3 shadow small text-sm">
        <div class="d-flex mb-1 pe-2 flex-wrap" style="max-width: 300px">
          <div class="d-flex justify-content-between mb-1 pe-2" style="width: 100%">
            <span class="fw-bold"> Exam from</span>
            <span class=""> {{ exam.exam_from }}</span>
          </div>
          <div class="d-flex justify-content-between mb-1 pe-2" style="width: 100%">
            <span class="fw-bold"> Exam To</span>
            <span class=""> {{ exam.exam_to }}</span>
          </div>
          <div class="d-flex justify-content-between mb-1 pe-2" style="width: 100%">
            <span class="fw-bold"> Total Attempts</span>
            <span class=""> {{ exam.attempt }}</span>
          </div>
          <div class="d-flex justify-content-between mb-1 pe-2" style="width: 100%">
            <span class="fw-bold"> Attempted</span>
            <span class=""> {{ exam.is_attempted }}</span>
          </div>

          <div class="d-flex justify-content-between mb-1 pe-2" style="width: 100%">
            <span class="fw-bold"> Duration</span>
            <span class=""> {{ exam.duration }}</span>
          </div>
          <div class="d-flex justify-content-between mb-1 pe-2" style="width: 100%">
            <span class="fw-bold"> Status</span>
            <span class="">
              {{
                  Number(exam.is_submitted) ? "Submitted" : "Available"
              }}</span>
          </div>

          <div class="d-flex justify-content-between mb-1 pe-2" style="width: 100%">
            <span class="fw-bold"> Quiz</span>
            <span class=""> {{ exam.is_quiz }}</span>
          </div>
          <div class="d-flex justify-content-between mb-1 pe-2" style="width: 100%">
            <span class="fw-bold"> Passing(%)</span>
            <span class=""> {{ exam.passing_percentage }}</span>
          </div>

          <div class="d-flex justify-content-between mb-1 pe-2" style="width: 100%">
            <span class="fw-bold"> Total Question</span>
            <span class=""> {{ exam.total_question }}</span>
          </div>

          <div class="d-flex justify-content-between mb-1 pe-2" style="width: 100%">
            <span class="fw-bold"> Descriptive Question</span>
            <span class=""> {{ exam.total_descriptive }}</span>
          </div>
        </div>
      </div>

      <!-- QUESTIONS -->

      <div class="m-3 p-3 small text-sm shadow" v-for="question in questionResult" :key="question.id">
        <h6 :v-html="question.question">
          <!-- {{ question.question }} -->
        </h6>
        <div class="float-end text-danger small">
          ({{ question.score_marks }}/{{ question.marks }})
        </div>
        <div class="mt-1 small">
          <b>
            Subject
          </b>
          <span class="ms-3">
            {{ question.subject_name }}
          </span>
        </div>

        <div class="mt-1 small" v-if="question.opt_a">
          <div class="w-100 ps-5">
            A. <span class="small fw-bold" v-html="question.opt_a"></span><br>
            B. <span class="small fw-bold" v-html="question.opt_b"></span><br>
            C. <span class="small fw-bold" v-html="question.opt_c"></span><br>
            D. <span class="small fw-bold" v-html="question.opt_d"></span><br>
            E. <span class="small fw-bold" v-html="question.opt_e"></span>
          </div>
          <div class="d-flex pt-3 align-items-center">
            <b>
              Your Answer
            </b>
            <!-- <div class="ms-3" :v-html='question[question.select_option.split("\"")[1]] ??  question[question.select_option]'> -->
            <div class="ms-3" >
              {{  question[question.select_option] }}
              <span v-html='question[question.select_option.split("\"")[1]]' ></span>
            </div>
          </div>
        </div>

        <div class="mt-1 d-flex small" v-else>
          <b>
            Your Answer
          </b>

          <div class="ms-3">
            {{ question.select_option }}
          </div>
        </div>

        <div class="mt-1 small">
          <b>
            Teacher's Remarks
          </b>
          <span class="ms-3">
            {{ question.remark }}
          </span>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonToolbar, IonTitle, IonBackButton } from "@ionic/vue";
import { getOnlineExamResult } from "@/services/student";
import { dismiss, openLoading } from "@/functions/widget";

export default {
  name: "ExamPage",
  components: {
    IonToolbar,
    IonTitle,
    IonBackButton
  },
  data() {
    return {
      exam: {},
      questionResult: [],
    };
  },
  methods: {
  },
  ionViewDidEnter() {
    let exam
    try {
      exam = JSON.parse(this.$route.params.exam)
    }
    catch (err) {
      this.$router.push("/onlineexam")
      return
    }
    this.exam = exam
    this.questionResult = exam.question_result

    openLoading();
    getOnlineExamResult({
      onlineexam_student_id: exam.onlineexam_student_id,
      exam_id: exam.id
    })
      .then((data) => {
        this.questionResult = data.result.question_result
        // this.questionResult = this.examresult.question_result
        dismiss()
      })
  },
};
</script>

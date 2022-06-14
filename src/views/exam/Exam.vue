<template>
  <ion-page>
    <ion-header>
      <app-header title="Examination" />
    </ion-header>
    <ion-content >
      <list-component
        smalltitle=" "
        titleIcon="healthicons:i-exam-qualification"
        v-for="exam in exams"
        :key="exam"
        height="20"
        :title="exam.exam"
      >
        <template v-slot:body-status>
          <span class="small px-2 text-primary my-2" v-if="Number(exam.result_publish)" @click="openResult(exam)">
            <icon
              icon="healthicons:i-exam-qualification"
              class="text-dark"
              height="20"
            />
            Exam Result
          </span>
          <span class="small px-2 text-primary" @click="openSchedule(exam)">
            <icon icon="ion:time-outline" height="20" class="my-2 text-dark" />
            Exam Schedule
          </span>
        </template>
      </list-component>
    </ion-content>
  </ion-page>
</template>

<script>
import { getExamList } from "@/services/student";
import { dismiss, openLoading, openToast } from '@/functions/widget';

export default {
  name: "ExamPage",
  components: {},
  data() {
    return {
      exams: [],
      // result: {
      //   examSchedule: [
      //     {
      //       id: "1",
      //       exam_group_class_batch_exam_id: "1",
      //       student_id: "1",
      //       student_session_id: "1",
      //       roll_no: "0",
      //       teacher_remark: null,
      //       is_active: "0",
      //       created_at: "2021-03-22 23:47:06",
      //       updated_at: null,
      //       exam: "Half Yearly Examination",
      //       exam_active: "1",
      //       result_publish: "1",
      //     },
      //     {
      //       id: "8",
      //       exam_group_class_batch_exam_id: "6",
      //       student_id: "1",
      //       student_session_id: "1",
      //       roll_no: "0",
      //       teacher_remark: null,
      //       is_active: "0",
      //       created_at: "2021-03-24 03:27:00",
      //       updated_at: null,
      //       exam: "Monthly Test",
      //       exam_active: "1",
      //       result_publish: "1",
      //     },
      //     {
      //       id: "43",
      //       exam_group_class_batch_exam_id: "8",
      //       student_id: "1",
      //       student_session_id: "1",
      //       roll_no: "0",
      //       teacher_remark: null,
      //       is_active: "0",
      //       created_at: "2021-05-03 01:58:45",
      //       updated_at: null,
      //       exam: "Monthly Test April 20-21",
      //       exam_active: "1",
      //       result_publish: "1",
      //     },
      //   ],
      // },
    };
  },
  methods: {
    openResult(exam){
      this.$router.push({
        name:"ExamResult",
        params: {
          exam: JSON.stringify(exam)
        }
      })
    },
    openSchedule(exam) {
      this.$router.push({
        name:"ExamSchedule",
        params: {
          exam: JSON.stringify(exam)
        }
      })
    }
  },
  ionViewDidEnter() {
    openLoading()
    getExamList().then((data) => {
      this.exams = data.examSchedule;
      if(!data.examSchedule[0]){
        openToast("No Exam Data Found")
      }
      // this.exams = this.result.examSchedule;
     
      dismiss()
    });
  },
};
</script>

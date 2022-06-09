<template>
  <ion-page>
    <ion-header>
      <ion-toolbar title="Syllabus Status" :backButton="true">
        <ion-title class="small"> Report card </ion-title>
        <ion-buttons slot="start">
          <ion-back-button mode="md"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="p-0">
      <div class="">
        <div class="bg-l-gray p-3 fw-bold small ion-text-uppercase">
          {{ exam.exam }}
        </div>
        <div class="p-2">
          <table class="text-sm small w-100">
            <thead>
              <th>Subject</th>
              <th>Min marks</th>
              <th>Marks Obtained</th>
              <th>Result</th>
              <th>Note</th>
            </thead>
            <tbody>
              <tr v-for="subject in exam.subject_result" :key="subject.id">
                <td>{{ subject.name }}</td>
                <td>{{ subject.min_marks }}</td>
                <td>{{ subject.get_marks }}/{{ subject.max_marks }}</td>
                <td>
                  <ion-badge
                    class="text-sm p-2 fw-normal text-white"
                    color="success"
                    mode="md"
                    v-if="Number(subject.get_marks) > Number(subject.min_marks)"
                  >
                    PASS
                  </ion-badge>
                  <ion-badge
                    color="danger"
                    class="text-sm p-2 fw-normal text-white"
                    mode="md"
                    v-else
                  >
                    FAIL
                  </ion-badge>
                </td>
                <td>
                  {{ subject.note }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="bg-l-gray p-3 small text-sm d-flex flex-wrap fw-bold">
        <div class="w-50 mb-2">
          Grand Total:
          {{ exam.total_get_marks }}/{{ exam.total_max_marks }}
        </div>
        <div class="w-50 mb-2">
          Percentage:
          {{ exam.percentage }}
        </div>
        <div class="w-50">
          Division:
          <span class="ion-text-uppercase">
            {{ exam.division }}
          </span>
        </div>
        <div class="w-50 d-flex align-items-center">
          Result
          <ion-badge
            class="ms-2 text-sm p-2 fw-normal text-white"
            color="success"
            mode="md"
            v-if="exam.exam_result_status === 'pass'"
          >
            PASS
          </ion-badge>
          <ion-badge
            color="danger"
            class="ms-2 text-sm p-2 fw-normal text-white"
            mode="md"
            v-else
          >
            FAIL
          </ion-badge>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonBackButton, IonButtons, IonToolbar, IonBadge } from "@ionic/vue";
import { openLoading, dismiss } from "@/functions/widget";
import { getExamResult } from "@/services/student";
import { openToast } from '../../functions/widget';
export default {
  name: "SyllabusStatus",
  components: {
    IonBackButton,
    IonButtons,
    IonToolbar,
    IonBadge,
  },
  data() {
    return {
      // exam: {},
      subjectResult: [],
      exam: {},
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
    getExamResult({
      exam_group_class_batch_exam_id: this.exam.exam_group_class_batch_exam_id,
    }).then((data) => {
      if(!data.exam){
        openToast("Exam Result not found")
        this.$router.push("/exam");
      }
      this.exam = data.exam
      dismiss();
    });
  },
  created() {},
};
</script>

<style scoped>
th,
td {
  padding: 5px;
}
.text-sm {
  font-size: x-small !important;
}
</style>
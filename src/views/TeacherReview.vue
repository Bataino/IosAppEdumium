<template>
  <ion-page>
    <app-header title="Teacher's Review" :backButton="true" />
    <ion-content>
      <list-component
        titleIcon="ion:person-add"
        height="50px"
        bodyWidth="200px"
        v-for="teacher in teachers"
        :key="teacher.id"
        :title="
          teacher.staff_name +
          ' ' +
          teacher.staff_surname +
          ` (${teacher.employee_id})`
        "
      >
        <template v-slot:header-end>
          <ion-badge
            class="p-2 text-sm text-light"
            mode="md"
            color="success"
            v-if="Number(teacher.class_teacher_id)"
          >
            Class teacher
          </ion-badge>
          <review-star style="max-width: 70px" :review="teacher.rate" />
        </template>
        <div class="my-auto py-2">
          <div class="d-flex">
            <icon icon="ion:call-outline" class="my-auto me-1" />
            <a
              :href="'tel:' + teacher.contact_no"
              class="text-dark nav-link p-0 m-0"
            >
              <ion-text>
                {{ teacher.contact_no }}
              </ion-text>
            </a>
          </div>
          <div class="mt-2">
            <icon icon="ion:mail-outline" class="my-auto me-1" />
            <ion-text>
              {{ teacher.email }}
            </ion-text>
          </div>
        </div>
        <template v-slot:body-status>
          <div
            class="d-flex small text-primary pt-2"
            @click="openSubject(teacher)"
          >
            <icon
              icon="ion:arrow-redo-sharp"
              class="text-dark me-1"
              height="15"
            />
            view
          </div>
        </template>
      </list-component>
      <ion-modal
        :is-open="modal.isOpen"
        :breakpoints="[0.1, 0.5, 1]"
        :initialBreakpoint="0.5"
        @didDismiss="closeSubject"
      >
        <ion-header color="primary">
          <ion-toolbar>
            <ion-title> Subject details </ion-title>
            <ion-buttons slot="end">
              <ion-button>
                <icon
                  class="ion-f/loat-end text-dark"
                  icon="ion:close"
                  @click="closeSubject"
                />
              </ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding ion-text-center text-sm small">
          <table class="text-sm small w-100">
            <thead>
              <th>Time</th>
              <th>Day</th>
              <th>Subject</th>
              <th>Room</th>
            </thead>
            <tbody>
              <tr class="py-3 shadow-sm my-2" v-for="subject in modal.subjects" :key="subject.id">
                <td class="text-nowrap">
                  {{ subject.time_from + ' - ' +subject.time_to }}
                </td>
                <td class="text-nowrap">
                  {{ subject.day }}
                  </td>
                <td class="text-nowrap">
                  {{ `${subject.subject_name} ${subject.type} (${ subject.subject_code})` }}
                </td>
                <td class="text-nowrap">
                  {{ subject.room_no }}
                </td>
              </tr>
            </tbody>
          </table>
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script>
import ReviewStar from "@/components/ReviewStar";
import { openLoading, dismiss } from "@/functions/widget";
import { getTeachersList } from "@/services/student";
import { IonModal, IonTitle, IonToolbar, IonButtons, IonButton } from "@ionic/vue";

export default {
  name: "TeacherReview",
  components: {
    ReviewStar,
    IonModal,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
  },
  data() {
    return {
      teachers: [],
      modal: {
        isOpen: false,
        data: [],
      },
      // data: {
      //   result_list: {
      //     2: {
      //       employee_id: "9002",
      //       staff_id: "2",
      //       staff_name: "Shivam",
      //       staff_surname: "Verma",
      //       contact_no: "9552654564",
      //       email: "shivam@gmail.com",
      //       class_teacher_id: "1",
      //       rate: "5",
      //       subjects: [
      //         {
      //           subject_id: "1",
      //           subject_name: "English",
      //           code: "210",
      //           type: "theory",
      //           day: "Thursday",
      //           time_from: "8:15 AM",
      //           time_to: "9:15 AM",
      //           room_no: "112",
      //         },
      //         {
      //           subject_id: "1",
      //           subject_name: "English",
      //           code: "210",
      //           type: "theory",
      //           day: "Monday",
      //           time_from: "8:00 AM",
      //           time_to: "9:00 AM",
      //           room_no: "101",
      //         },
              
      //       ],
      //     },
      //   },
      // },
    };
  },
  methods: {
    openSubject(teacher) {
      this.modal.subjects = teacher.subjects;
      this.modal.isOpen = true;
    },
    closeSubject() {
      this.modal.subjects = [];
      this.modal.isOpen = false;
    },
  },
  ionViewDidEnter() {
    openLoading();
    getTeachersList().then((data) => {
      this.teachers = data.result_list;
      // this.teachers = this.data.result_list;
        dismiss();
    });
  },
};
</script>

<style scoped>
ion-button {
  --color: white !important;
}
tr,
td {
  padding: 12px 1px;
}
</style>
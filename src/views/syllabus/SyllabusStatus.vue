<template>
  <ion-page>
     <ion-header>
      <app-header title="Syllabus Status" :backButton="true" />
    </ion-header>
    <ion-content class="p-0">
      <ion-list>
      <list-component
        smalltitle=" "
        titleStyle="max-width:70%;"
        titleIcon="ion:newspaper"
        v-for="(syllabus) in syllabuslist"
        :key="syllabus.id"
        height="20"
        :title="`${syllabus.subject_name.toUpperCase()} (${syllabus.subject_code.toUpperCase()})`"
      >
        <template v-slot:body-status>
          <div class="small px-2 text-primary text-sm" @click="openSubjectSyllabus(syllabus)">
            <icon icon="ion:list" class="text-dark my-auto" height="18" />
            Lesson Topic
          </div>
        </template>
        <template v-slot:header-end>
          <div class="text-sm ion-text-nowrap px-2"> {{ syllabus.total_complete }}% Completed </div>
        </template>
      </list-component>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import { getSyllabusStatus } from "@/services/student";
import { openLoading, dismiss } from "@/functions/widget";

export default {
  name: "SyllabusStatus",
  components: {},
  data() {
    return {
      syllabuslist: [],
    };
  },
  methods: {
    openSubjectSyllabus(subject) {
      this.$router.push({
        name:"SubjectSyllabus",
        params: {
          subject: JSON.stringify(subject),
        }
      })
    }
  },
  ionViewDidEnter() {
    openLoading()
    getSyllabusStatus().then((data) => {
      this.syllabuslist = data.subjects;
      dismiss()
    });
  },
};
</script>

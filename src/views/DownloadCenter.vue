<template>
  <ion-page>
    <ion-header>
      <app-header title="Download Center" :backButton="true" />
    </ion-header>
    <ion-content>
       <ion-list>
          <list-component
            height="40"
            bodyWidth="100%"
            v-for="material in materials"
            :key="material"
            :title="material.title"
          >
            <template v-slot:header-end> {{ material.date }} </template>
            <div class="text-center w-100 text-muted">
              <icon
                icon="ion:arrow-down-circle"
                height="40"
                class="my-2 mx-auto"
                @click="download(this.$host+ material.file)"
              />
            </div>
          </list-component>
        </ion-list>
      <ion-tabs class="">
        <ion-tab-bar slot="top" class="text-sm">
          <ion-tab-button
            tab="Assignments"
            @click="this.$router.push('./Assignments')"
          >
            ASSIGNMENT
          </ion-tab-button>
          <ion-tab-button
            tab="Study Material"
            @click="this.$router.push('./Study Material')"
          >
            STUDY MATERIAL
          </ion-tab-button>
          <ion-tab-button
            tab="Syllabus"
            @click="this.$router.push('./Syllabus')"
          >
            SYLABUS
          </ion-tab-button>
          <ion-tab-button
            tab="Other Download"
            @click="this.$router.push('./Other Download')"
          >
            OTHERS
          </ion-tab-button>
        </ion-tab-bar>
        
        <ion-router-outlet ></ion-router-outlet>
      </ion-tabs>
     
    </ion-content>
  </ion-page>
</template>

<script>
import { IonTabs, IonTabBar, IonTabButton, IonRouterOutlet } from "@ionic/vue";
import { getDownloadsLinks } from "@/services/student";
import { openLoading, dismiss, openToast } from "@/functions/widget";
import { download } from "@/functions/storage"

export default {
  name: "DownloadCenter",
  components: { IonTabs, IonTabBar, IonTabButton, IonRouterOutlet },
  data() {
    return {
      materials: [],
      tags: ["Assignments", "Study Material", "Syllabus", "Other Download"],
      result: {
        success: 1,
        data: [
          {
            id: "1",
            title: "Syllabus For Class 1",
            type: "assignments",
            is_public: "Yes",
            class_id: "0",
            cls_sec_id: "0",
            file: "uploads/school_content/material/1.jpg",
            created_by: "1",
            note: "",
            is_active: "no",
            created_at: "2021-03-23 05:17:04",
            updated_at: null,
            date: "2021-03-05",
            class_section_id: null,
            class: null,
            section: null,
          },
          {
            id: "7",
            title: "Assignment",
            type: "assignments",
            is_public: "Yes",
            class_id: "0",
            cls_sec_id: "0",
            file: "uploads/school_content/material/7.txt",
            created_by: "1",
            note: "",
            is_active: "no",
            created_at: "2021-06-05 03:39:50",
            updated_at: null,
            date: "2021-06-05",
            class_section_id: null,
            class: null,
            section: null,
          },
          {
            id: "8",
            title: "Syllabus For Class 1 (Maths and Hindi)",
            type: "assignments",
            is_public: "Yes",
            class_id: "0",
            cls_sec_id: "0",
            file: "uploads/school_content/material/8.pdf",
            created_by: "1",
            note: "",
            is_active: "no",
            created_at: "2021-07-03 02:12:48",
            updated_at: null,
            date: "2021-07-03",
            class_section_id: null,
            class: null,
            section: null,
          },
          {
            id: "9",
            title: "Writing Assignment Framework and Overview",
            type: "assignments",
            is_public: "No",
            class_id: "1",
            cls_sec_id: "1",
            file: "uploads/school_content/material/9.pdf",
            created_by: "1",
            note: "",
            is_active: "no",
            created_at: "2021-07-03 02:15:18",
            updated_at: null,
            date: "2021-07-03",
            class_section_id: "1",
            class: "Class 1",
            section: "A",
          },
          {
            id: "16",
            title: "Important Question",
            type: "assignments",
            is_public: "Yes",
            class_id: "0",
            cls_sec_id: "0",
            file: "uploads/school_content/material/16.pdf",
            created_by: "1",
            note: "",
            is_active: "no",
            created_at: "2021-08-04 05:53:05",
            updated_at: null,
            date: "2021-08-04",
            class_section_id: null,
            class: null,
            section: null,
          },
          {
            id: "19",
            title: "Regular Class Notes",
            type: "assignments",
            is_public: "No",
            class_id: "1",
            cls_sec_id: "1",
            file: "uploads/school_content/material/19.pdf",
            created_by: "1",
            note: "",
            is_active: "no",
            created_at: "2021-09-03 04:21:33",
            updated_at: null,
            date: "2021-09-03",
            class_section_id: "1",
            class: "Class 1",
            section: "A",
          },
          {
            id: "24",
            title: "Monthly Test Papers",
            type: "assignments",
            is_public: "Yes",
            class_id: "0",
            cls_sec_id: "0",
            file: "uploads/school_content/material/24.pdf",
            created_by: "1",
            note: "",
            is_active: "no",
            created_at: "2021-09-03 04:24:28",
            updated_at: null,
            date: "2021-09-29",
            class_section_id: null,
            class: null,
            section: null,
          },
          {
            id: "25",
            title: "Admit Card",
            type: "assignments",
            is_public: "Yes",
            class_id: "0",
            cls_sec_id: "0",
            file: "uploads/school_content/material/25.png",
            created_by: "1",
            note: "",
            is_active: "no",
            created_at: "2021-10-05 04:26:04",
            updated_at: null,
            date: "2021-10-05",
            class_section_id: null,
            class: null,
            section: null,
          },
          {
            id: "26",
            title: "Time Table",
            type: "assignments",
            is_public: "Yes",
            class_id: "0",
            cls_sec_id: "0",
            file: "uploads/school_content/material/26.png",
            created_by: "1",
            note: "",
            is_active: "no",
            created_at: "2021-10-05 04:27:24",
            updated_at: null,
            date: "2021-10-05",
            class_section_id: null,
            class: null,
            section: null,
          },
        ],
      },
    };
  },
  methods: {
    getFiles(ss) {
      console.log(ss);
    },
    download(link){
      download(link)
    }
  },
  ionViewDidEnter() {
    const tag = this.$route.params.tab;
    console.log(tag);
    openLoading();
    getDownloadsLinks({
      tag,
    }).then((data) => {
      if (!data.success) openToast(data.errorMsg);
      this.materials = data.data;
      this.materials = this.result.data;
      dismiss();
    });
  },
};
</script>

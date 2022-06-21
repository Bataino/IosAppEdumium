<template>
  <ion-page>
    <ion-header>
      <app-header title="Online Courses" :backButton="true"/>
    </ion-header>
    <ion-content >
    <ion-card v-for="(course, index) in courses" :key="course.id" >
      <div class="" style="height:150px;overflow:hidden;position:relative">
        <img :src="this.$host + 'uploads/course/course_thumbnail/' + course.course_thumbnail" alt="Course thumbnail" class="w-100" >
        <div class="position-absolute fixed-bottom px-2 bg-gray d-flex align-items-center" style="background:#0008" >
          <ion-thumbnail style="--size:50px" class="my-1">
            <img class="rounded-circle" :src="this.$host + 'uploads/staff_images/' + course.image" />
            </ion-thumbnail>
          <div class="small text-start text-white ion-text-capitalize p-1 px-2" style="font-size:80%;">
            {{ course.name + " " + course.surname}}<br>
            <span class="small" >
              {{ course.updated_date.split(" ")[0] }}
            </span>
          </div>
        </div>
      </div>
      <ion-card-header class="py-0 m-0">
        <ion-card-title class="my-0">
          <span class="fs-6" >
            {{ course.title }}
          </span>
        </ion-card-title>
        <ion-item class=" ion-no-padding"> 
            <ion-card-subtitle slot="start">
                <span v-if="Number(course.discount)">
                  {{ course.price - Number(course.discount) }}
                  <del>
                    {{ course.price }}
                  </del>
                </span>
                <span v-else>
                  {{ course.price }}
                </span>
            </ion-card-subtitle>
            <ion-card-subtitle slot="end">
                <div class="d-flex align-items-center" >
                  <icon icon="ion:time-outline" class="mx-2" />
                  <div >
                    {{ course.total_hour_count }}
                  </div>
                </div>
            </ion-card-subtitle>
        </ion-item>
        <div class="d-flex justify-content-between align-items-center py-2 ion-nopadding ion-nomargin mx-0 w-100">
          <ion-progress-bar :value="course.progress/100" class="w-100 m-0" color="success"></ion-progress-bar>
            <span class="text10 ps-2">
              {{ course.progress }}
            </span>
        </div>
      </ion-card-header>
      <ion-card-content class="d-flex mw-100">
          <ion-button color="secondary"  class="text-sm w-100" @click="openCourseDetail(index)">
            <span class=" text-white fw-light">
              Course details
            </span>
          </ion-button>
          <ion-button color="success" class="text-sm w-100" id="openDetail" @click="payCourse(course.id)">
            <span class=" text-white fw-light">
              Pay {{ Number(course.price) - Number(course.discount) }}
            </span>
          </ion-button>
      </ion-card-content>
    </ion-card>


    <!-- COURSE DETAIL -->

    <ion-modal 
      trigger="openDetail" 
      :isOpen="modal" 
      :breakpoints="[1]"
      @didDismiss="closeModal">
      <ion-header color="primary" >
        <ion-toolbar>
          <ion-title>
            <ion-text>
              {{ courseDetail.title }}
            </ion-text>
          </ion-title>
          <ion-buttons slot="end" >
            <ion-button >
                <icon class="fs-2 text-dark" icon="ion:close" @click="closeModal" />
            </ion-button >
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content class="overflow-auto pb-4 ">
        <div class="shadow-sm" style="height:150px;overflow:hidden;position:relative">
          <img :src="this.$host + 'uploads/course/course_thumbnail/' + courseDetail.course_thumbnail" class="h-100 w-100 position-absolutr" >
        </div>
        <div class="p-2 m-2 bg-gray d-flex align-items-center shadow-sm" style="back-ground:#0008" >
            <ion-thumbnail style="--size:50px" class="my-1">
              <img class="rounded-circle" :src="this.$host + 'uploads/staff_images/' + courseDetail.image" />
              </ion-thumbnail>
            <div class="small text-start text-dark ion-text-capitalize p-1 px-2" style="font-size:80%;">
              {{ courseDetail.name + " " + courseDetail.surname}}<br>
              <span class="small" >
                {{ courseDetail.updated_date}}
              </span>
            </div>
          </div>
          <div class="m-2" v-if="courseDetail.course_provider == 'youtube'">
            <iframe class="w-100" height="315" :src="'https://www.youtube.com/embed/'+courseDetail.video_id" frameborder="0" allowfullscreen></iframe>
          </div>
        <div class="p-3 mx-3 shadow-sm text-sm small mb-5" >
          <b class="fs-6">
            Course Description
          </b>
          <div>
            {{ courseDetail.description }}
          </div>
        </div>
      </ion-content>
    </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonCardHeader, IonCardTitle, IonContent, IonModal } from '@ionic/vue';
import { getListOnlineCourse, } from '@/services/student'
import { openLoading, dismiss } from '@/functions/widget';

export default {
  name: 'ExamPage',
  components: { IonCardHeader, IonCardTitle, IonContent, IonPage, IonModal },
  data() {
    return { 
      courses:[],
      courseDetail: {},
      modal:false
    }
  },
  computed:{
  },
  methods: {
    openCourseDetail(index){
      // openLoading()
      this.courseDetail = this.courses[index];
      this.modal = true
      // getCourseDetail(id).then((data) => {
       
      // })
    },
    payCourse(id) {
      const studentId = localStorage.getItem("student_id")
      this.$router.push({
        name:'WebView',
        params: {
          title:"Course Payment",
          url:this.$host + `/course_payment/Course_payment/payment/${ id }/${ studentId }`

        }
      })
    },
    closeModal(){
      this.modal = false; 
      this.courseDetail = {}
    }
  },
  ionViewWillEnter(){
    openLoading()
    getListOnlineCourse().then((data) => {
      dismiss()
      this.courses = data.course_list
    })
  }
};
</script>

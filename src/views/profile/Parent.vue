<template>
  <ion-page>
    <ion-content>
    
    <!-- FATHER -->
    
    <div class="d-flex align-items-center border shadow-sm mb-2 ion-padding-horizontal ion-primary pb-2 py-2" style="!important">
        <ion-thumbnail style="--size:100px">
            <img src="https://www.focusedu.org/wp-content/uploads/2018/12/circled-user-male-skin-type-1-2.png" class="" />
            <div class="small text-center ion-text-capitalize pb-1" style="font-size:80%;">
                Father
            </div>
        </ion-thumbnail>
        <div class="d-flex ion-padding text-start" :title="index">
            <ion-label class="century ion-padding-end ion-text-wrap ion-text-sm" style="font-size:80%;">
                <div >
                    <icon icon="ion:person" class="me-2" height="20"/>
                    {{ user.father_name }}
                </div>
                <br>
                 <div class="">
                    <icon icon="ion:call" class="me-2" height="20"/>
                    {{ user.father_phone }}
                </div>
                <br>
                 <div >
                    <icon icon="ion:briefcase" class="me-2" height="20"/>
                    {{ user.father_occupation }}
                </div>
            </ion-label>
        </div>
    </div>

   <!-- MOTHER -->

   <div class="d-flex align-items-center border shadow-sm mb-2 ion-padding-horizontal ion-primary pb-2" style="!important">
        <ion-thumbnail style="--size:100px" class="ion-margin-vertical">
            <img src="https://www.focusedu.org/wp-content/uploads/2018/12/circled-user-male-skin-type-1-2.png" class="" />
            <div class="small text-center ion-text-capitalize pb-1" style="font-size:80%;">
                Mother
            </div>
        </ion-thumbnail>
        <div class="d-flex ion-padding text-start" :title="index">
            <ion-label class="century ion-padding-end ion-text-wrap ion-text-sm" style="font-size:80%;">
                <!-- <div v-if="user.mother_name" class="mb-2"> -->
                <div class="mb-2">
                    <icon icon="ion:person" class="me-2" height="20"/>
                    {{ user.mother_name }}
                </div>
                 <!-- <div v-if="user.mother_phone" class="mb-3"> -->
                 <div class="mb-3">
                    <icon icon="ion:call" class="me-2" height="20"/>
                    {{ user.mother_phone }}
                </div>
                 <!-- <div v-if="user.mother_ocupation" class="mb-2"> -->
                 <div class="mb-2">
                    <icon icon="ion:briefcase" class="me-2" height="20"/>
                    {{ user.mother_occupation }}
                </div>
            </ion-label>
        </div>
    </div>

    <!-- GUARDIAN -->

    <div class="d-flex align-items-center border shadow-sm mb-2 ion-padding-horizontal ion-primary pb-2 py-2" color="danger" style="!important">
        <ion-thumbnail style="--size:100px">
            <img src="https://www.focusedu.org/wp-content/uploads/2018/12/circled-user-male-skin-type-1-2.png" class="" />
            <div class="small text-center ion-text-capitalize pb-1" style="font-size:80%;">
               Guardian
            </div>
        </ion-thumbnail>
        <div class="d-flex ion-padding text-start">
            <ion-label class="century ion-padding-end ion-text-wrap ion-text-sm" style="font-size:80%;">
                <div  class="mb-3" v-if="user.guardian_name">
                    <icon icon="ion:person" class="me-2" height="20"/>
                    {{ user.guardian_name }}
                </div>
                
                 <div class="mb-3" v-if="user.guardian_phone">
                    <icon icon="ion:call" class="me-2" height="20"/>
                    {{ user.guardian_phone }}
                </div>
                
                 <div class="mb-3" v-if="user.guardian_occupation">
                    <icon icon="ion:briefcase" class="me-2" height="20"/>
                    {{ user.guardian_occupation }}
                </div>
                
                 <div class="mb-3" v-if="user.guardian_relation">
                    <icon icon="ion:accessibility" class="me-2" height="20"/>
                    {{ user.guardian_relation }}
                </div>
                
                 <div class="mb-3" v-if="user.guardian_mail">
                    <icon icon="ion:mail" class="me-2" height="20"/>
                    {{ user.guardian_mail }}
                </div>
                
                 <div class="" v-if="user.guardian_location">
                    <icon icon="ion:location" class="me-2" height="20"/>
                    {{ user.guardian_location }}
                </div>
            </ion-label>
        </div>
    </div>
    </ion-content>
  </ion-page>
</template>

<script>

import { IonPage, IonContent } from '@ionic/vue';


export default {
  name: 'ParentPage',
  props:['profile'],
  components: {
     
      IonPage,
      IonContent
  },
  data(){
      return {
         user: {
                guardian_name:'Oliver Twist',
                guardian_tel:'088 99 333 4',
                guardian_occupation: 'Lawyer',
                guardian_relation:'father',
                guardian_mail:'batino@voxforem',
                guardian_location:'West brok'
              }
      }
  },
  IonViewDidEnter() {
    const user = JSON.parse(localStorage.getItem("user"))
    //   this.guardian.forEach((value, key) => {

    //   }) 

    this.user = user 
  }

};
</script>
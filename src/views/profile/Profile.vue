<template>
<ion-page>
    <ion-header>
        <app-header title="Profile" :backButton="true" />
        <!-- <ion-toolbar>
            <ion-title>Profile</ion-title>
            <ion-buttons slot="start">
                <ion-back-button mode="md"></ion-back-button>
            </ion-buttons>
        </ion-toolbar> -->
    </ion-header>
    <ion-content>
        <ion-tabs>
              <div class="d-flex align-items-center border-bottom ion-padding-horizontal ion-primary pb-2 py-2" color="danger" style="!important">
                  <ion-thumbnail style="--size:100px">
                      <img src="https://www.focusedu.org/wp-content/uploads/2018/12/circled-user-male-skin-type-1-2.png" class="" />
                  </ion-thumbnail>
                  <div class="d-flex ion-padding text-start">
                      <ion-label class="century ion-padding-end ion-text-wrap text-sm">
                          <b>{{ user.firstname + " " + user.lastname }}</b>
                          <br>
                          Email: {{ user.email }}
                          <br>
                          Adm. no {{ user.admission_no }}
                          <br>
                          Roll Number {{ user.roll_no }} 
                      </ion-label>
                  </div>
              </div>
          <ion-tab-bar slot="top" class="" color="primary">
                <ion-tab-button @click="this.$router.push('/profile/personal')" class="ion-text-uppercase">
                    PERSONAL
                </ion-tab-button>
                <ion-tab-button @click="this.$router.push('/profile/parent')" class="ion-text-uppercase">
                    PARENTS
                </ion-tab-button>
                <ion-tab-button @click="this.$router.push('/profile/other')" class="ion-text-uppercase">
                    OTHER
                </ion-tab-button>
            </ion-tab-bar>
            <ion-router-outlet :profile="user"></ion-router-outlet>
        </ion-tabs>
       
    </ion-content>
</ion-page>
</template>

<script>
import { IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonLabel, IonThumbnail } from '@ionic/vue';
import { getProfile } from "@/services/student"

export default {
    name: 'ExamPage',
    components: {
        IonRouterOutlet,
        IonTabBar,
        IonTabButton,
        IonTabs,
        IonLabel,
        IonThumbnail,
        // IonBackButton,
        // IonButtons,
        // IonHeader,
        // IonToolbar,
        // IonTitle,
        // IonContent,
        // IonPage,
    },
    data() {
        return {
            user: {}
        }
    },
    methods : {
        getProfile(){
            getProfile()
        }
    },
    created() {
        getProfile().then((data) => {
            this.user = data.student_result
            localStorage.setItem("user", JSON.stringify(data))
        })
        
    }
};
</script>

<style scoped>
ion-tab-bar {
  --color-selected: red  !important;
}
</style>
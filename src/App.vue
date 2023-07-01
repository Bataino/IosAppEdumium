<template>
  <ion-app>
    <ion-refresher slot="fixed"></ion-refresher>
    <Menu />
    <ion-router-outlet />
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet, IonRefresher } from '@ionic/vue';
import Menu from '@/layout/Menu.vue';
// import { openLoading } from '@/functions/widget'
import { defineComponent } from 'vue';
import { getProfile } from './services/student';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    IonRefresher,
    Menu
  },
  created(){
    navigator.mediaDevices.getUserMedia({audio:true, video:true})
    .then(() => {
      return;
    })
    // Set to Always true
    const isLoggedIn = localStorage.getItem('token') ?? true
    if(isLoggedIn){
      getProfile().then((data) => {
        localStorage.setItem("user", JSON.stringify(data.student_result))
      })
    }
    // else
      // this.$router.push('/login')
  }
});
</script>

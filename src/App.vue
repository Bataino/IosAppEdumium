<template>
  <ion-app>
    <ion-refresher></ion-refresher>
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
  async IonViewWillEnter(){
    const isLoggedIn = localStorage.getItem('token')
    if(!isLoggedIn){
      this.$router.push('/login')
    }
    else {
      getProfile().then((data) => {
        localStorage.setItem("user", JSON.stringify(data.student_result))
      })
    }
  },
  mounted(){
  },
  setup(){
  }
});
</script>
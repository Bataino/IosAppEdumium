<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          {{ this.$route.params.title }}
        </ion-title>
        <ion-buttons slot="start" key="" >
          <ion-back-button></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <iframe :src="this.$route.params.url" height="100" width="100" class="h-100 w-100"></iframe>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonToolbar, IonBackButton, IonTitle, IonButtons } from "@ionic/vue"
export default {
  name: 'WebView',
  components: { 
    IonToolbar, 
    IonBackButton, 
    IonTitle, 
    IonButtons
  },
  data() {},
  ionViewWillEnter() {}
};
</script>

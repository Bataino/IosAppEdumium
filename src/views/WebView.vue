<template>
  <ion-page>
    <ion-header>
      <app-header :title="this.$route.params.title" :backButton="true" />
    </ion-header>
    <ion-content>
      <iframe :src="this.$route.params.url" height="100" width="100" class="h-100 w-100"></iframe>
    </ion-content>
  </ion-page>
</template>

<script>

export default {
  name: 'WebView',
  components: {  },
  data() {},
  ionViewWillEnter() {}
};
</script>

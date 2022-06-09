<template>
  <ion-page>
    <ion-header>
      <ion-header>
        <ion-toolbar>
          <ion-title> Upload {{ homework.name }} Homework </ion-title>
          <ion-buttons slot="start">
            <ion-button>
              <ion-back-button mode="md"></ion-back-button>
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
    </ion-header>
    <ion-content>
      <form class="p-4" @submit.prevent="uploadHomeWork">
        <ion-input
          v-model="upload.message"
          style="min-height: 50px"
          class="border w-100 bg-white rounded small px-2 mb-3"
          required="true"
          placeholder="Message"
        />
        <input
          id="homeWorkFile"
          ref="homeWorkFile"
          type="file"
          class="border w-100 bg-white rounded small px-2 mb-3 form-control"
          required="true"
          placeholder="Task Date"
          @change="preview"
        />
        <label id="label" for="homeWorkFile" :style="'background-image:url('+ image + ');background-repeat:no-repeat;min-height:200px'" class="profile df alm jcm">
            <img src="" ref="preview" height="200px" />
        </label>
        <button
          class="btn-secondary ion-padding-vertical w-100 rounded small"
          type="submit"
        >
          Upload Homework
        </button>
      </form>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonInput, IonToolbar, IonButtons, IonButton, IonBackButton } from "@ionic/vue"
import { uploadHomeWork } from '@/services/student';
import { openLoading, dismiss, openToast } from "@/functions/widget"
export default {
  name: "AddHomeWork",
  components:{
    IonInput,   
    IonButtons, 
    IonButton, 
    IonBackButton,
    IonToolbar
  },
  data() {
    return {
      homework:{},
      upload:{
        message:"",
        image:""
      },
      image:""
    }
  },
  methods:{
    preview() {
      this.image = URL.createObjectURL(this.$refs.homeWorkFile.files[0])
			this.$refs.preview.srcObject = this.$refs.homeWorkFile.files[0]
      console.log("Image:", this.image)
    },
    uploadHomeWork() {
			openLoading("Uploading...");
      const imagefile = this.$refs.homeWorkFile;

			let formdata = new FormData()
			formdata.append('file', imagefile.files[0]);
			formdata.append('message', this.upload.message);
			formdata.append('homework_id', this.homework.id);

      uploadHomeWork(formdata).then((data) => {
        dismiss()
        if(data.status == "1"){
          openToast("Upload Succesfully")
					this.$router.push("/homework")
        }
        else {
          openToast("could not Upload")
        }
      })
    }
  },
  ionViewDidEnter() {
    try {
      this.homework = JSON.parse(this.$route.params.work);
    } catch (err) {
      this.$router.push("/homework");
    }
  
    
  },
};
</script>

<style>
</style>
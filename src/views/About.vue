<template>
<ion-page>
    <ion-header>
        <app-header title="About" :backButton="true" />
    </ion-header>
    <ion-content :fullscreen="true">
        <div id="" class="d-block p-0 m-0 w-100 shadow-sm  ion-no-padding" lines="" style="overflow:show" color="">
            <div class="d-block small mx-0 px-0 w-100" style="">
                <div class="d-flex  bg-l-gray p-3  align-items-center border-bottom ion-padding-horizontal ion-primary pb-2" color="danger">
                    <ion-thumbnail class="my-auto">
                        <img height="30" class="my-auto" :src="this.$host + 'uploads/school_content/logo/' + info.image" />
                    </ion-thumbnail>
                    <ion-label class="century ion-padding-start ion-text-wrap ion-text-sm" style="font-size:80%;">
                        <b>{{ info.name }}</b>
                    </ion-label>
                    </div>
                <div class="d-flex fw-bold flex-wrap p-3 justify-content-between ms-2 mb-1" style="font-size:10px;max-width:300px">
                    <div class="w-50">
                      Address
                    </div>
                     <div class="w-50">
                      {{ info.address }}
                    </div>
                     <div class="w-50">
                      Phone
                    </div>
                     <div class="w-50">
                      <a :href="'tel:' + info.phone" >
                        {{ info.phone}} 
                      </a>
                    </div>
                     <div class="w-50">
                      Email
                    </div>
                     <div class="w-50">
                      {{ info.email }}
                    </div>
                     <div class="w-50">
                      School Code
                    </div>
                     <div class="w-50">
                      {{ info.dise_code }}
                    </div>
                     <div class="w-50">
                      Current session
                    </div>
                     <div class="w-50">
                      {{ info.session }}
                    </div>
                     <div class="w-50">
                      Session Start Month
                    </div>
                     <div class="w-50">
                      {{ info.start_month_name }}
                    </div>
                </div>
            </div>
        </div>
    </ion-content>
</ion-page>
</template>

<script>
import { dismiss, openLoading } from '@/functions/widget';
import { getSchoolDetails } from '@/services/student';

export default {
    name: 'AboutSchool',
    components: {},
    data() {
        return {
            info: {}
        }
    },
    ionViewDidEnter() {
        openLoading()
        getSchoolDetails()
        .then((data) => {
            this.info = data
            dismiss()
        })
    }
};
</script>

<style scoped>
.w-50 {
    color: black;
    margin-bottom: 5px;
}
</style>
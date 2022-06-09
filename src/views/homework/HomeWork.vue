<template>
<ion-page>
    <ion-header>
        <app-header title="HomeWork" />
    </ion-header>
    <ion-content :fullscreen="true">
        <ion-list>
            <list-component v-for="work in homeWorks" :title="work.name" :smalltitle="work.class +' '+ work.section" bodyWidth="" :key="work">
                <template v-slot:header-end>
                    <a class="text-dark" v-if="work.document" :href="this.$host + 'uploads/homework/' + work.document" :download="work.document">
                        <icon icon="ic:round-file-download" height="20"/>
                    </a>
                    <icon icon="ic:round-file-upload mx-2"  v-if="work.staff_evaluated == '0'" height="20" @click="uploadto(work)" />
                    <span class="text-primary small px-2" id="" @click="openHomeWork(work)">
                        <icon icon="ion:arrow-redo-sharp" height="20" />
                        view
                    </span>
                </template>
                <div class="w-100 ps-2" style="font-size:10px;max-width:220px !important;">
                    <div class="d-flex justify-content-between mb-1 w-100">
                        <span class="">
                            HomeWork Date
                        </span>
                        <span class="">
                            {{ work.create_date }}
                        </span>
                        <span class="">
                            Created by {{ work.staff_created }}
                        </span>
                    </div>
                    <div class="d-flex justify-content-between mb-1 w-100">
                        <span class="">
                            Submission Date
                        </span>
                        <span class="">
                            {{ work.submit_date}}
                        </span>
                        <span class="">
                            Evaluated by {{ work.staff_evaluated }}
                        </span>
                    </div>
                    <div class="d-flex mb-1 w-100">
                        <span class="">
                           Evaluation Date
                        </span>
                        <span class="ms-2">
                            {{ work.evaluation_date }}
                        </span>
                    </div>
                </div>
                <template v-slot:body-status>
                    <ion-badge color="success" v-if="Number(work.homework_evaluation_id)" mode="md" class="small  text-light">Completed</ion-badge>
                    <ion-badge color="danger" v-else  mode="md" class="small text-light ">InComplete</ion-badge>
                </template>
            </list-component>
        </ion-list>
        <ion-modal 
        :is-open="modal.state"
        :breakpoints="[0.1, 0.5]"
        trigger="viewHomework"
        :initialBreakpoint="0.5">
            <ion-header color="primary" >
              <ion-toolbar>
                <ion-title>
                  Homework Details
                </ion-title>
                <ion-buttons slot="end" >
                  <ion-button >
                     <icon class="ion-f/loat-end text-dark" icon="ion:close" @click="this.modal.state = false; this.modal.data=[]" />
                  </ion-button >
                </ion-buttons>
              </ion-toolbar>
            </ion-header>
            <ion-content v-html="modal.data" class="ion-padding">
              
            </ion-content>
        </ion-modal>
    </ion-content>
</ion-page>
</template>

<script>
import { IonBadge, IonModal } from '@ionic/vue';
import { getHomeWork } from '@/services/student';
import { download } from '@/functions/storage'
import { openLoading, dismiss } from "@/functions/widget"

export default {
    name: 'HomeWork',
    components: {
       IonBadge,
       IonModal
    },
    data() {
        return {
            homeWorks: [],
            modal: {
                state:false
            }
        }
    },
    methods: {
        openHomeWork(homeWork) {
            this.modal.state = true
            this.modal.data = homeWork.description
        },
        isExpired(work){
            const today = new Date();
            const date = new Date(work.submit_date)
            return date < today;
        },     
        download(link) {
            download(link)
        },
        uploadto(work){
            this.$router.push({
                name:"UploadHomeWork",
                params: {
                   work: JSON.stringify(work) 
                }
            })
        }
    },
    ionViewDidEnter() {
        openLoading()
        getHomeWork().then((data) => {
            this.homeWorks = data.homeworklist
            dismiss()
        })
    }
};
</script>

<style scoped>

</style>

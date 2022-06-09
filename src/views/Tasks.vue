<template>
<ion-page>
    <ion-header>
        <app-header title="Tasks" :backButton="true" />
    </ion-header>
    <ion-content>
        <div>
            <div class="d-flex align-items-center mb-2 shadow-sm bg-l-gray p-2" v-for="task in tasks" :key="task.id">
                <icon icon="ion:list-sharp" class="fs-3" />
                <div class="text-start ion-text-capitalize small ps-3 w-100">
                    <div class="small" v-if="task.is_active == 'yes'" @click="update()">
                        {{ task.event_title }}
                    </div>
                    <div class="small" v-else>
                        <del>{{ task.event_title }}</del>
                    </div>
                    <div class="text-sm">
                        {{ task.start_date}}
                    </div>
                </div> 
                <div class="d-flex my-auto" @click="this.modal = false">
                    <ion-checkbox @click="updateTask(task.id)" v-if="task.is_active == 'yes'" mode="md" color="success me-2 text-white my-auto" style="--size:20px;--checkmark-color:white" />
                    <ion-checkbox @click="updateTask(task.id, 1)" v-else checked mode="md" color="success me-2 text-white my-auto" style="--size:20px;--checkmark-color:white" />
                </div>
            </div>
        </div>
        <ion-modal triger="add-task" 
        :is-open="isModalOpen"  
        :breakpoints="[0.1, 0.5, 1]"
        :initialBreakpoint="0.7">
            <ion-header color="primary" >
              <ion-toolbar>
                <ion-title>
                  Add Task
                </ion-title>
                <ion-buttons slot="end" >
                  <ion-button @click="closeModal" id="add-task">
                     <icon class="fs-5 text-dark" icon="ion:close"  />
                  </ion-button >
                </ion-buttons>
              </ion-toolbar>
            </ion-header>
            <ion-content>
                <form class="p-4" @submit.prevent="addTask">
                    <ion-input v-model="newTask.event_title" style="min-height:50px" class="border w-100 bg-white rounded small px-2 mb-3" required="true" placeholder="Title" />
                    <ion-input v-model="newTask.date" type="date" class="border w-100 bg-white rounded small px-2 mb-3" required="true" placeholder="Task Date" />
                    <button class="btn-secondary ion-padding-vertical w-100 rounded small" type="submit">
                        Add Task
                    </button>
                </form>
            </ion-content>
        </ion-modal>
        <ion-fab vertical="bottom" horizontal="end" slot="fixed">
            <ion-fab-button color="secondary m-2 mb-3" id="add-task" @click="openModal">
                <icon icon="ion:add" class="text-white fs-1" />
            </ion-fab-button>
        </ion-fab>
    </ion-content>
</ion-page>
</template>

<script>
import { getTask, addTask, updateTask } from '@/services/student'
import { openLoading, dismiss, openToast } from '../functions/widget';
import { IonCheckbox, IonModal, IonFab, IonFabButton, IonInput } from "@ionic/vue"

export default {
    name: 'HomeTab',
    components: {
        IonCheckbox,
        IonModal, 
        IonFab, 
        IonFabButton,
        IonInput
    },
    data() {
        return {
            isModalOpen : false,
            tasks: [],
            newTask:{},
            

        }
    },
    methods: {
        closeModal(){
            this.isModalOpen = false
        },
        openModal() {
            this.isModalOpen = true
        },
        updateTask(id, toActive){
            openLoading()
            if(toActive){
                updateTask({
                    status:'yes',
                    task_id:id,
                })
                .then(()=> {
                    openToast('User update successfully')
                    location.reload()
                })
                .catch(()=>{
                    openToast('Unknown Error occured')
                })
                return;
            }

            updateTask({
                    status:'no',
                    task_id:id,
                })
                .then(()=> {
                    openToast('Task update successful')
                    location.reload()
                })
                .catch(()=>{
                    openToast('Unknown Error occured')
                })
        },
        addTask() {
            openLoading()
            this.newTask.is_active = 'yes'
            addTask(this.newTask)
            .then((data) => {
                if(data.status){
                    openToast("Task has been added")
                    dismiss()
                    // updateTask()
                    location.reload()
                }
                else
                    openToast("Task not added")
            })
            .catch(() => {
                openToast("Unknown error Occured")
            })
        }
    },
    async ionViewDidEnter() {
        openLoading()
        getTask().then((data) => {
            this.tasks = data.tasks
            // this.tasks = this.result
        })
        dismiss()

    }
};
</script>

<style scoped>
ion-item {
    font-size: 70%;
    --background: none;
    border-color: white !important;
    border: white !important;
}
</style>

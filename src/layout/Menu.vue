<template>
<ion-menu side="start" menu-id="sideMenu" content-id="main">
    <ion-header class="w-100">
        <app-header title="Menu" :isMenu="true" />
    </ion-header>
    <ion-content>
        <div class="d-flex align-items-center border-bottom ion-padding-horizontal ion-primary pb-2" color="danger">
            <ion-thumbnail>
                <img v-if="user.image" :src="this.$host + user.image" class="rounded-circle" />
                <img v-else src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png" class="" />
            </ion-thumbnail>
            <div class="d-flex ion-padding">
                <ion-label class="century ion-padding-end ion-text-wrap ion-text-sm" style="font-size:80%;">
                    <b>{{  user.username ?? user.firstname + " " + user.lastname }}</b>
                    <br>
                    Email: {{ user.email }}<br />
                    {{ user.class + " " + user.section }}
                </ion-label>
            </div>
        </div>
        <ion-list class="ion-no-padding century text12 ion-padding-vertical">

            <ion-item lines="full" class="ion-text-capitalize menu-item" v-for="mod in modules" :key="mod.id" @click="openLink(mod)">
                <ion-icon :icon="mod.icon" /> 
                <ion-label >
                    {{ mod.name }}
                </ion-label>
            </ion-item>

        </ion-list>
    </ion-content>
    <ion-router-outlet id="main"></ion-router-outlet>
</ion-menu>
</template>

<script>
import { alertController, menuController, IonBackButton, IonButtons, IonToolbar, IonMenu, IonList, IonItem, IonRouterOutlet } from '@ionic/vue';
import { home, arrowBack, cash, person, easel, videocam, calendar, list, listSharp, statsChart, copy, wifi, hourglass, cloudDownload, clipboard, mail, newspaper, personAdd, book, gitNetwork, business, informationCircle, exit } from 'ionicons/icons'      
import { openLoading, dismiss } from '@/functions/widget'
import { logout } from '@/services/student'
import { getProfile } from '@/services/student';

export default {
    name: 'SideMenu',
    compnents: {
        IonToolbar,
        IonMenu,
        IonList,
        IonItem,
        IonRouterOutlet,
        IonBackButton,
        IonButtons,
        
    },
    data() {
        return {
            user: {},
            modules: [{
                    name: "Home",
                    status: 0,
                    short_code: "",
                    icon: home,
                    link:'/'
                },
                {
                    name: "Profile",
                    status: 0,
                    short_code: "",
                    icon: person,
                    link:'/profile'
                },
                {
                    name: "Fees",
                    status: 0,
                    short_code: "",
                    icon: cash,
                    link:'/fees'
                },
                {
                    name: "Online Courses",
                    status: 0,
                    short_code: "",
                    icon: easel,
                    link:'/courses'
                },
                {
                    name: "BBB Live Classes",
                    status: 0,
                    short_code: "",
                    icon: videocam,
                    link:'/classes'
                },
                {
                    name: "Time Table",
                    status: 0,
                    short_code: "",
                    icon: calendar,
                    link:'/timetable'
                },
                {
                    name: "Lesson Plan",
                    status: 0,
                    short_code: "",
                    icon: listSharp,
                    link:'/lessons'
                },
                {
                    name: "Syllabus Status",
                    status: 0,
                    short_code: "",
                    icon: statsChart,
                    link:'/syllabus'
                },
                {
                    name: "Homework",
                    status: 0,
                    short_code: "",
                    icon: copy,
                    link:'/homework'
                },
                {
                    name: "Online Exam",
                    status: 0,
                    short_code: "",
                    icon: wifi,
                    link:'/onlineexam'
                },
                {
                    name: "Apply Leave",
                    status: 0,
                    short_code: "",
                    icon: hourglass,
                    link:'/leave'
                },
                {
                    name: "Download Center",
                    status: 0,
                    short_code: "",
                    icon: cloudDownload,
                    link:'/download'
                },
                {
                    name: "Attendance",
                    status: 0,
                    short_code: "",
                    icon: calendar,
                    link:'/attendance'
                },
                {
                    name: "Examination",
                    status: 0,
                    short_code: "",
                    icon: clipboard,
                    link:'/exam'
                },
                {
                    name: "Notice Board",
                    status: 0,
                    short_code: "",
                    icon: mail,
                    link:'/notice'
                },
                {
                    name: "Timeline",
                    status: 0,
                    short_code: "",
                    icon: list,
                    link:'/timeline'
                },
                {
                    name: "My Documents",
                    status: 0,
                    short_code: "",
                    icon: newspaper,
                    link:'/documents'
                },
                {
                    name: "Teacher Review",
                    status: 0,
                    short_code: "",
                    icon: personAdd,
                    link:'/reviews'
                },
                {
                    name: "Library",
                    status: 0,
                    short_code: "",
                    icon: book,
                    link:'/library/issued'
                },
                {
                    name: "Transport Route",
                    status: 0,
                    short_code: "",
                    icon: gitNetwork,
                    link:'/routes'
                },
                {
                    name: "Hostel",
                    status: 0,
                    short_code: "",
                    icon: business,
                    link:'/hostels'
                },
                {
                    name: "About School",
                    status: 0,
                    short_code: "",
                    icon: informationCircle,
                    link:'/about'
                },
                {
                    name: "Logout",
                    status: 0,
                    short_code: "logout",
                    icon: exit,
                    link:'/logout'
                },
            ],
        }
    },
    methods: {
        async logout(){
            const alert = await alertController
            .create({
                cssClass: 'text-dark',
                message: 'You would be logged out of the App',
                header:"Logout",
                buttons: [{
                    text: 'Ok',
                    role: 'OK'
                }, 'Cancel'],
                backdropDismiss: false,
            });
            await alert.present();

            const role = await alert.onDidDismiss();
            console.log('onDidDismiss resolved with role', role);

            if(role.role == "OK") {
                // console.log("looged out")
                this.logMeOut()
                localStorage.clear()
            }
        },
        async logMeOut() {
            openLoading()
            const loggedOut = await logout()
            if(loggedOut) {
                location.href = '/login'
                dismiss()
            }
        },
        openLink(mod){
           if(mod.short_code == 'logout'){
               this.logout()
               return;
           }
            menuController.enable(true, 'sideMenu');
            menuController.close('sideMenu');
            this.$router.push(mod.link)
        },
        async syncUserDetails(){
            if(localStorage.getItem('token')){
                if(localStorage.getItem('user')){
                    const user = JSON.parse(localStorage.getItem('user'))
                    this.user = user
                    console.log("user", this.user);
                    return;
                }
                else {
                    const data = await getProfile()
                    this.user = data.student_result
                    localStorage.setItem('user', JSON.stringify(data.student_result))
                }
            }
        }
    },
    async created() {
        await this.syncUserDetails()
    },
    setup() {
        return {
            arrowBack
        }
    }
}
</script>

<style scoped>
.menu-item ion-icon {
    padding: 10px;
}

.menu-item {
    font-size: .8rem !important;
    --padding-top: .2rem !important;
    --padding-bottom: .2rem !important;
    --padding-start: 20px !important;

    --background-hover: Lightgray !important;
    --border-color: white;
}

.menu-item:hover {
    --background: var(--ion-color-step-550, lightgray) !important;
}

.menu-item:active {
    --background: var(--ion-color-step-550, lightgray) !important;
}
</style>

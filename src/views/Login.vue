<template>
<ion-page>
    <ion-content >
        <div class="h-100 w-100 d-flex align-items-center justify-content-center">
            <form @submit.prevent="login" color="secondary" class="ion-padding-horizontal w-100">
                <ion-input v-model="user.username" class="border w-100 bg-white rounded small px-2 mb-3" placeholder="Username" :required="true"/>
                <ion-input v-model="user.password" type="password" class="border w-100 bg-white rounded small px-2 mb-3" placeholder="******" :required="true" />
                <button class="btn-primary ion-padding-vertical w-100 rounded small" type="submit">
                    Login
                </button>
            </form>
        </div>
    </ion-content>
</ion-page>
</template>

<script>
import { IonInput } from '@ionic/vue'
import { login } from '@/services/student.js'
import { openLoading, dismiss } from '@/functions/widget'

export default {
    name: 'LoginPage',
    components: {
        IonInput
    },
    data() {
        return {
            user: {
                deviceToken: "DEMOTOKEN"
            }
        }
    },
    methods: {
        async login() {
            openLoading()
            const user = await login(this.user)
            if(user) {
                console.log(user)
                localStorage.setItem("user", JSON.stringify(user.record))
                location.href = "/home"
            }
        }
    },
    created() {
        dismiss()
    },
}
</script>

<style lang="less" scoped>
ion-content {
    --background: url('../../public/assets/images/pattern-background.jpg') !important;
}

.btn-primary:active,
.btn-primary:focus,
.btn-primary {
    border: 0px !important;
    box-shadow: none !important;
}
input:focus,input:active {
    background-color: white !important;
}
</style>

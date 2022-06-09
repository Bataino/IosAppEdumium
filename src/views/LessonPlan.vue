<template>
    <ion-page>
        <ion-header>
            <app-header title="Lesson Plan" :backButton="true" />
        </ion-header>
        <ion-content>
            <ion-item class="text-center w-100">
                <input class="form-control w-100 p-2 my-2 mt-3 mx-auto" placeholder="" type="week" v-model="week" @change="getLessonPlan" />
            </ion-item>
            <list-component height="20" bodyWidth="100%" v-for="(plan, key, index) in plans"
                :key="index" :title="key">
                <template v-slot:header-end>
                    <div class="pe-2">
                        {{ plan.date }}
                    </div>
                </template>
                <div class="w-100">
                    <ion-row class="w-100 ion-no-padding">
                        <ion-col>
                            <ion-text class="fw-bold">
                                Subject
                            </ion-text>
                        </ion-col>
                        <ion-col>
                            <ion-text class="fw-bold">
                                Time
                            </ion-text>
                        </ion-col>
                        <ion-col class="ion-text-end">
                            <ion-text class="fw-bold ">
                                Syllabus
                            </ion-text>
                        </ion-col>
                    </ion-row>

                    <ion-row class="w-100 ion-no-padding" v-for="sub in plan.subject" :key="sub">
                        <ion-col>
                            <ion-text class="text-gray">
                                {{ sub.time }}
                            </ion-text>
                        </ion-col>
                        <ion-col>
                            <ion-text class="">
                               {{ sub.title }}
                            </ion-text>
                        </ion-col>
                        <ion-col class="ion-text-end">
                            <ion-text>
                                {{ sub.syllabus }}
                            </ion-text>
                        </ion-col>
                    </ion-row>
                </div>
            </list-component>
        </ion-content>
    </ion-page>
</template>

<script>
import { IonRow, IonCol } from '@ionic/vue';
import { getLessonPlan } from '@/services/student';
import { openLoading, dismiss } from '@/functions/widget';

export default {
    name: 'LessonPlan',
    components: {
        IonRow,
        IonCol,
    },
    data() {
        return {
            plans: [],
            week: ''
        }
    },
    methods: {
        setDefaultWeek(){
            let currentdate = new Date();
            let oneJan = new Date(currentdate.getFullYear(),0,1);
            let numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
            let result = Math.ceil(( currentdate.getDay() + 1 + numberOfDays) / 7);
            this.week= currentdate.getFullYear() + "-W" + result
            console.log(`The week number of the current date (${currentdate}) is ${result}.`);
        },
        setFunctionGetWeek() {
            Date.prototype.getWeek = function () {
                var target = new Date(this.valueOf());
                var dayNr = (this.getDay() + 6) % 7;
                target.setDate(target.getDate() - dayNr + 3);
                var firstThursday = target.valueOf();
                target.setMonth(0, 1);
                if (target.getDay() != 4) {
                    target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
                }
                return 1 + Math.ceil((firstThursday - target) / 604800000);
            }
        },
        getDateRangeOfWeek(weekNo) {
            var d1 = new Date();
            let numOfdaysPastSinceLastMonday = eval(d1.getDay() - 1);
            d1.setDate(d1.getDate() - numOfdaysPastSinceLastMonday);
            var weekNoToday = d1.getWeek();
            var weeksInTheFuture = eval(weekNo - weekNoToday);
            d1.setDate(d1.getDate() + eval(7 * weeksInTheFuture));
            var rangeIsFrom = eval(d1.getMonth() + 1) + "/" + d1.getDate() + "/" + d1.getFullYear();
            d1.setDate(d1.getDate() + 6);
            var rangeIsTo = eval(d1.getMonth() + 1) + "/" + d1.getDate() + "/" + d1.getFullYear();
            return {
                dateFrom: rangeIsFrom,
                dateTo: rangeIsTo
            }
        },
        getLessonPlan() {
            openLoading()
            let date = this.getDateRangeOfWeek(this.week.split("W")[1])
            console.log(date)
            getLessonPlan({
                date_from: date.dateFrom,
                date_to: date.dateTo
            })
            .then((data) => {
                this.plans = data.timetable
                dismiss()

            })
        }
    },
    ionViewDidEnter() {
        this.setDefaultWeek()
        this.setFunctionGetWeek()
        this.getLessonPlan()
    }
};
</script>

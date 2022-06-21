<template>
<ion-page>
    <ion-header>
        <app-header title="Fees" />
    </ion-header>
    <ion-content class="positio-relative" >
        <div slot="fixed" class="bg-white w-100">
            <list-component title="Grand Total"  class="text-center" bodyWidth="100%" height="20">
                <span class="">
                    Amount<br>
                    <b>{{ feesSummary.amount }}</b>
                </span>
                <span>
                    Discount<br>
                    <b>{{ feesSummary.amount_discount }}</b>
                </span>
                <span>
                    Fine<br>
                    <b>{{ feesSummary.amount_fine }}</b>
                </span>
                <span>
                    Paid<br>
                    <b>{{ feesSummary.amount_paid }}</b>
                </span>
                <span>
                    Remaining<br>
                    <b>{{ feesSummary.amount_remaining }}</b>
                </span>
            </list-component>
        </div>
      <ion-list style="margin-top:100px">
        <list-component  v-for="fee in fees" :key="fee" :title="fee.name+'-'+fee.type">
          <template v-slot:header-end>
              <span class="text-primary small px-2 fw-bold" v-if="fee.status =='unpaid'">
                  <span class="fw-6">
                      $
                  </span>
                  Pay
              </span>
              <!-- <span class="small px-2 text-primary">
                  <icon icon="ion:arrow-redo-sharp" class="text-dark" height="15" />
                  view
              </span> -->
          </template>
          <span class="">
                <span>
                    Fees Code
                </span><br>
                <span>
                    Due Date
                </span><br>
                <span>
                    Amount
                </span><br>
                <span>
                    Fine
                </span><br>
                <span>
                    Discount
                </span><br>
                <span>
                    Paid Amount
                </span><br>
                <span>
                    Balance Amount
                </span>
            </span>
            <span class="">
                <span>
                   {{ fee.code }}
                </span><br>
                <span>
                    {{ fee.due_date }}
                </span><br>
                <span>
                    {{fee.amount }}
                </span><br>
                <span>
                    {{fee.fine_amount }}
                </span><br>
                <span>
                    {{fee.total_amount_discount }}
                </span><br>
                <span>
                    {{fee.total_amount_paid }}
                </span><br>
                <span>
                    {{fee.total_amount_remaining }}
                </span>
            </span>
            <template v-slot:body-status>
              <ion-badge color="success" mode="md" v-if="fee.status=='paid'" class=" p-1 text-light text-sm" >Paid</ion-badge>
              <ion-badge color="warning" mode="md" v-else-if="fee.status=='partial'" class=" p-1 text-light text-sm" >Partial</ion-badge>
              <ion-badge color="danger" mode="md" v-else class="small text-light text-sm p-1" >Unpaid</ion-badge>
          </template>
        </list-component>
      </ion-list>
      
      <ion-list>
         <list-component  v-for="fee in discountFees" :key="fee.id" :title="'Discount-'+fee.code" :smalltitle="`Discount of ${this.$currency ?? ''} ${fee.amount} ${fee.status}- ${fee.payment_id}`" height="20">
        </list-component>
      </ion-list>
    </ion-content>
</ion-page>
</template>

<script>
import { IonBadge } from '@ionic/vue';
import { fees } from '@/services/student'
import { dismiss, openLoading } from '@/functions/widget';

export default {
    name: 'StudentFees',
    components: {
      IonBadge
    },
    data() {
        return {
            feesSummary:{},
            fees: [],
            discountFees: []
        }
    },
    methods:{
        openFeeLink(fee){
            this.$router.push({
                name:"WebiVew",
                params: {
                    title:"Pay Fee "+ fee.title,
                    url: this.$host + ""
                }
            })
        }
    },
    ionViewDidEnter(){
        openLoading()
        fees().then((data) => {
            data.student_due_fee.forEach((element) => {
                element.fees.forEach((fee) =>{
                    this.fees.push(fee)
                })
                dismiss()
            });
            this.feesSummary = data.grand_fee;
            this.discountFees = data.student_discount_fee;
        })
    }
};
</script>

<style scoped>

</style>

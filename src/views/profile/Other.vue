<template>
  <ion-page>
      <ion-content class="text-start">
        <div class="text-start" >
            <div class="d-flex justify-content-between text-start text-sm px-3 p-2" v-for="(detail, key, index) in details" :key="detail" :ke="index" style="max-width:400px">
                <div class="w-100 ion-text-capitalize" >
                    <!-- {{ key.replace('_', ' ') }} : -->
                    {{ key.split('_').join(' ') }} :
                </div>
                <div class="text-start text-nowrap fw-bold" style="width:100px" >
                    {{ detail }}
                </div>
            </div>
        </div>
      </ion-content>
  </ion-page>
</template>

<script>

export default {
  name: 'App',
  props:["profile"],
  components: {
  },
  data(){
      return {
        details : { },
        other_fields: ["national_identification_no","local_identification_no","previous_school","nk_name","sc_code","bank_account_no"],
        student_fields: ["blood_group","student_house","roll_no","category","mobile_no","sudent_email","admission_date","lastname","student_photo","student_height","student_weight","measurement_date","current_address","permanent_address","route_list","hostel_id"]
        
      }
  },
  mounted() {
      const user = JSON.parse(localStorage.getItem("user"))
      if(this.$route.path == "/profile/other") {
          for (let key of this.other_fields) {
            this.details[key] = user.student_result[key]
        }
      }
      else {
        for (let key of this.student_fields) {
            this.details[key] = user.student_result[key]
        }
        for (let key in user.custom_fields) {
                this.details[key] = user.custom_fields[key]
        }
      }
      
    // //   this.details = Object.keys(this.details).sort().reduce((acc, key) =>{
    // //       acc[key] = this.details[key]
    // //       return acc
    // //   })
    //   console.log([this.details, user.student_fields])
  },

};
</script>
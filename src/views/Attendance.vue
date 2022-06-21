<template>
  <ion-page>
    <ion-header>
      <app-header title="Attendance" :backButton="true" />
    </ion-header>
    <ion-content>
      <v-calendar
        class="w-100 border-0 shadow-sm"
        :attributes="attrs"
        @update:to-page="assignCalendarAttr"
      />
      <div class="d-flex flex-wrap p-4">
        <div
          v-for="(color, key, index) in colors"
          :key="index"
          class="me-3 mt-2 d-flex align-items-center"
          :style="'color:' + color"
        >
          <icon icon="carbon:dot-mark" class="fs-5" />
          <span class="text-dark ion-text-capitalize ms-2">
            {{ key }}
          </span>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { getAttendance } from "@/services/student";
import { openLoading, dismiss } from "@/functions/widget";

export default {
  name: "AttendancePage",
  components: {},
  data() {
    return {
      colors: {
        present: "green",
        absent: "red",
        late: "purple",
        holiday: "gray",
        "half day": "blue",
      },
      attrs: [
        // {
        //   key: 'present',
        //   dot: 'green',
        //   dates: [new Date(year, month, 23 )],
        // },
        //  {
        //   key: 'absent',
        //   dot: 'red',
        //   dates: [new Date(year, month, 22 )],
        // },
        //  {
        //   key: 'late',
        //   dot: 'purple',
        //   dates: [new Date(year, month, 2 )],
        // },
        //  {
        //   key: 'holiday',
        //   dot: 'gray',
        //   dates: [new Date(year, month, 12 )],
        // },
        //  {
        //   key: 'half day',
        //   dot: 'blue',
        //   dates: [new Date(year, month, 15 )],
        // },
      ],
    };
  },
  methods: {
    assignCalendarAttr(event) {
      openLoading();
      // event.month -= 1;
      console.log("calendar", event)
      getAttendance({
        date: new Date(event.year, event.month, new Date().getDate()),
        year: event.year,
        month: event.month,
      }).then((data) => {
        data.data.forEach((element) => {
          this.attrs.push({
            dot: this.colors[element.type.toLowerCase()],
            dates: new Date(element.date),
          });
        });
        dismiss()
      });
    },
  },
  ionViewDidEnter() {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    openLoading();
    getAttendance({
      date: new Date(year, month, new Date().getDate()),
      year,
      month,
    }).then((data) => {
      data.data.forEach((element) => {
        this.attrs.push({
          dot: this.colors[element.type.toLowerCase()],
          dates: new Date(element.date),
        });
      });
      dismiss();
    });
  },
};
</script>

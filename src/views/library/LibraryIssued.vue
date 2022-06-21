<template>
  <ion-page>
    <ion-header>
      <app-header title="Library" :backButton="true" />
    </ion-header>
    <ion-content>
        <ion-button expand="full fw-bold" @click="this.$router.push('/library')">
            View All Library books
        </ion-button>
      <list-component
        v-for="book in books"
        :key="book.id"
        titleIcon="ion:book"
        bodyWidth="100%;max-width:400px"
        :title="book.book_title"
      >
        <template v-slot:header-sub>
          <div class="small text-muted">
              {{ book.author }}
          </div>
        </template>
        <div class="pt-2">
          <div class="d-flex">
            <icon icon="ion:calendar-outline" class="fs-1 my-auto" />
            <div class="ps-1 small">
              <span class="fw-bold"> Issue date </span><br />
              <span> {{ book.issue_date }} </span>
            </div>
          </div>
          <div class="d-flex pt-3">
            <icon icon="ion:calendar-outline" class="fs-1 my-auto" />
            <div class="ps-1 small">
              <span class="fw-bold"> Return date </span><br />
              <span> {{ book.return_date  }} </span>
            </div>
          </div>
        </div>
        <div class="pt-2">
          <div class="d-flex">
            <icon icon="ion:book-outline" class="fs-1 my-auto" />
            <div class="ps-1 small">
              <span class="fw-bold"> Book No </span><br />
              <span> {{ book.book_no }} </span>
            </div>
          </div>
          <div class="d-flex pt-3">
            <icon icon="ion:book-outline" class="fs-1 my-auto" />
            <div class="ps-1 small">
              <span class="fw-bold"> Status </span><br />
              <ion-badge class="p-1 text-sm" mode="md" v-if="Number(book.is_returned)" color="success">
                Returned
              </ion-badge>
              <ion-badge class="p-1 text-sm" mode="md" v-else color="danger">
                Not Returned
              </ion-badge>
            </div>
          </div>
        </div>
        <div class="pt-2 pe-3">
          <div class="d-flex">
            <icon icon="ion:calendar-outline" class="fs-1 my-auto" />
            <div class="ps-1 small">
              <span class="fw-bold"> Due Return date </span><br />
              <span> {{ book.due_return_date }} </span>
            </div>
          </div>
        </div>
      </list-component>
    </ion-content>
  </ion-page>
</template>

<script>
import {} from "@ionic/vue";
import { getLibraryBookIssued } from "@/services/student";
import { openToast } from "@/functions/widget";

export default {
  name: "LibraryPage",
  components: {},
  data() {
    return {
      books: [],
      // result: [
      //   {
      //     return_date: null,
      //     due_return_date: "2021-10-05",
      //     book_no: "78878",
      //     issue_date: "2021-10-05",
      //     is_returned: "0",
      //     book_title: "Multiplication and Division Grades 3-4",
      //     author: "Barbara Bando",
      //     subject: "",
      //   },
      //   {
      //     return_date: null,
      //     due_return_date: "2021-10-07",
      //     book_no: "145520",
      //     issue_date: "2021-10-05",
      //     is_returned: "0",
      //     book_title: "The Astronomy Book (Big Ideas)",
      //     author: "DK",
      //     subject: "Science ",
      //   },
      // ],
    };
  },
  ionViewDidEnter() {
    getLibraryBookIssued().then((data) => {
      if (!data.success) {
        openToast(data.errorMsg ??"No books found for the user");
      } else {
        this.books = data.data
      }
        // this.books = this.result;
    });
  },
};
</script>

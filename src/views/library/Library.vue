<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title class="small"> Library Books </ion-title>
        <ion-buttons slot="start">
          <ion-back-button mode="md" defaultHref="/library/issued"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <list-component
        v-for="book in books"
        :key="book.id"
        titleIcon="ion:book"
        bodyWidth="100%;max-width:400px"
        :title="book.book_title"
      >
        <template v-slot:header-sub>
          <div class="small text-muted d-flex py-0 mt-0 w-100 justify-content-between" style="min-width:200px">
            <span class="me-3">
              Author: {{ book.author }}
            </span>
            <span>
              Publisher: {{ book.publish }}
            </span>
          </div>
        </template>
        <div class="pt-2">
          <div class="d-flex">
            <icon icon="ion:school-outline" class="fs-1 my-auto" />
            <div class="ps-1 small">
              <span class="fw-bold"> Subject </span><br />
              <span> {{ book.subject }} </span>
            </div>
          </div>
          <div class="d-flex pt-3">
            <icon icon="ion:albums-outline" class="fs-1 my-auto" />
            <div class="ps-1 small">
              <span class="fw-bold"> Rack No </span><br />
              <span> {{ book.rack_no  }} </span>
            </div>
          </div>
        </div>
        <div class="pt-2">
          <div class="d-flex">
            <icon icon="ion:calendar-outline" class="fs-1 my-auto" />
            <div class="ps-1 small">
              <span class="fw-bold"> Added date </span><br />
              <span> {{ book.postdate }} </span>
            </div>
          </div>
          <div class="d-flex pt-3">
            <icon icon="ion:color-filter-outline" class="fs-1 my-auto" />
            <div class="ps-1 small">
              <span class="fw-bold"> Quantity </span><br />
              <span> {{ book.qty }} </span>
            </div>
          </div>
        </div>
        <div class="pt-2 pe-3">
          <div class="d-flex">
            <icon icon="ion:pricetag-outline" class="fs-1 my-auto" />
            <div class="ps-1 small">
              <span class="fw-bold"> Price </span><br />
              <span> {{ book.perunitcost }} </span>
            </div>
          </div>
        </div>
      </list-component>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonToolbar, IonTitle, IonBackButton, IonButtons } from "@ionic/vue";
import { getLibraryBooks } from "@/services/student";
import { openToast, openLoading, dismiss } from "@/functions/widget";

export default {
  name: "LibraryPage",
  components: {
    IonToolbar, 
    IonTitle, 
    IonBackButton,
    IonButtons
  },
  data() {
    return {
      books: [],
    };
  },
  ionViewDidEnter() {
    openLoading()
    getLibraryBooks().then((data) => {
      if (!data.success) {
        openToast(data.errorMsg);
      } else {
        this.books = data.data
      }
        // this.books = this.result;
        dismiss()
    });
  },
};
</script>

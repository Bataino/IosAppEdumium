import { toastController, loadingController } from '@ionic/vue'

var loading
var toast

async function openLoading(message, timeout = 300000, dismiss = false) {
  console.log("isloading", loading)
  loading = await loadingController
    .create({
      cssClass: 'century loading text-12',
      message: message ? message : "Loading...",
      backdropDismiss: dismiss,
      duration: timeout,
    });

  setTimeout(function () {
    loading.dismiss()
  }, timeout);
  await loading.present();

  return loading
}

async function openToast(message, timeout = 5000) {
  dismiss()
  toast = await toastController
    .create({      
      cssClass: 'text-white',
      message: message,
      duration: timeout
    })
  return toast.present();
}

function showError(error) {
    dismiss()
    if (Number(error.response.status) > 400){
        openToast(error.response.data.message)
    }
    else if (error.request) {
      openToast("Network Error")
    }
    else {
      openToast("Unknown error occured")
    }
  
  }
  
async function dismiss() {
  // loading ? loading.dismiss() : ''
  let load = await loadingController.getTop()
  load.dismiss()
  setTimeout(async function() {
    let load = await loadingController.getTop()
    load.dismiss()
  }, 2000)
 

  // loadingController.getTop().then((load) => {
  //   load.dismiss()
  // })
}

export { dismiss, openToast, showError, openLoading }

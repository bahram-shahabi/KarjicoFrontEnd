<template>
  <div v-if="formData.loading" class="centerLoader">
    <p class="spinner-title">
      درحال لود شدن
    </p>
    <img class="header-logo" src="~/assets/img/icons/logo.png" alt="">
    <br>
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <div v-else class="mb-125">
    <!-- Header Area-->
    <Header />
    <!-- PWA Install Alert -->

    <div class="page-content-wrapper">
      <div class="container">
        <div class="pt-3">
          <div class="profile-wrapper-area py-3 direction-rtl margin-150">
            <!-- User Information-->

            <div class="row">
              <div class="col-12">
                <div class="card shopCart">
                  <nuxt-link :to="'/shop/'+formData.tournamentData.id">
                    <div class="align-items-center">
                      <div class="cardImage">
                        <img v-lazy-load class="shopImage" :src="formData.tournamentData.image" alt="">
                        <img class="logo" src="~/assets/img/icons/logo.png" alt="">
                        <div class="city">
                          <i class="lni lni-map-marker" /> {{ formData.tournamentData.city_name }}
                        </div>
                        <div class="city right-btn">
                          کد پذیرنده:{{ formData.tournamentData.id }}
                        </div>
                      </div>
                      <div class="shopInfo">
                        <p class="mb-0">
                          {{ formData.tournamentData.title }}
                        </p>
                        <hr>
                      </div>
                    </div>
                  </nuxt-link>
                  <div class="card-body">
                    <h5 class="mb-0 titleBorder">
                      خرید از پذیرنده
                    </h5>
                    <div class="line" />
                    <div class=" align-items-center justify-content-between">
                      <div class="title align-items-center">
                        <div v-for="item in formData.tournamentData.discounts" :key="item.id" class="row headerTable box-shadow">
                          <div class="d-flex align-items-center justify-content-between">
                            <div class="title align-items-center">
                              <p class="font-bold">
                                {{ item.description }}
                              </p>
                            </div>
                          </div>
                          <div class="row headerTable">
                            <div class="col-4">
                              قیمت(تومان)
                            </div>
                            <div class="col-4">
                              درصد کارمزد تبلیغات
                            </div>
                            <div class="col-4">
                              مبلغ کارمزد تبلیغات
                            </div>
                          </div>
                          <div class="col-4">
                            <input v-model="price[item.id]" class="form-control tableInput" type="number" min="0" @input="showInvoice()">
                          </div>
                          <div class="col-4">
                            <input class="form-control tableInput" type="text" :value="'%'+item.discount" disabled>
                          </div>
                          <div class="col-4">
                            <input class="form-control tableInput" type="number" :value="Math.floor(item.discount*price[item.id]/100)" disabled>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- Edit Profile-->
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="card shopCart">
                  <div class="card user-data-card bg-dark">
                    <div class="card-body">
                      <div v-if="formData.tournamentData.description">
                        <div class="title align-items-center">
                          <h5 class="mb-0 titleBorder">
                            معرفی پذیرنده
                          </h5>
                          <div class="line" />
                          <p class="border2">
                            {{ formData.tournamentData.description }}
                          </p>
                        </div>
                      </div>
                      <div v-if="formData.tournamentData.products">
                        <div class="d-flex align-items-center justify-content-between">
                          <div class="title align-items-center">
                            <h5 class="mb-0 titleBorder">
                              محصولات پذیرنده
                            </h5>
                            <div class="line" />
                            <p class="border2">
                              {{ formData.tournamentData.products }}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div v-if="formData.tournamentData.Possibilities">
                        <div class="title align-items-center">
                          <h5 class="mb-0 titleBorder">
                            امکانات پذیرنده
                          </h5>
                          <div class="line" />
                          <p class="border2">
                            {{ formData.tournamentData.Possibilities }}
                          </p>
                        </div>
                      </div>
                      <div v-if="formData.tournamentData.Conditions">
                        <div class="title align-items-center">
                          <h5 class="mb-0 titleBorder">
                            شرایط پذیرنده
                          </h5>
                          <div class="line" />
                          <p class="border2">
                            {{ formData.tournamentData.Conditions }}
                          </p>
                        </div>
                      </div>
                      <h5 class="mb-0 titleBorder">
                        موقعیت مکانی
                      </h5>
                      <div class="line" />
                      <div class="d-flex align-items-center justify-content-between border2 ">
                        <div class="title align-items-center">
                          <p>آدرس :  {{ formData.tournamentData.state_name }} - {{ formData.tournamentData.city_name }} - {{ formData.tournamentData.address }}</p>
                          <hr>
                          <p>روز و ساعت پشتیبانی : {{ formData.tournamentData.day_support }} - {{ formData.tournamentData.clock_support }}</p>
                          <hr>
                          <p>تلفن تماس : {{ formData.tournamentData.phone }}</p>
                          <hr>
                          <p>مدیریت : {{ formData.tournamentData.phone }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showInvoiceForm" class="invoiceForm">
        <div class="card user-data-card pt-3">
          <div class="row">
            <div class="col-12 mb-3">
              <div class="title mb-2">
                <span>کارمزد تبلیغات : </span><span>{{ Number(userPrice).toLocaleString() }}</span>
              </div>
            </div>
            <div class="col-12 mb-3">
              <div class="title mb-2">
                <span>مبلغ قابل پرداخت : </span><span>{{ Number(totalPrice).toLocaleString() }}</span>
              </div>
            </div>
          </div>
          <button class="btn btn-success pay" @click="invoiceModale = true">
            پرداخت
          </button>
        </div>
      </div>
    </div>
    <div
      v-if="invoiceModale"
      class="modal fade show"
      tabindex="-1"
      aria-labelledby="exampleModalScrollableTitle"
      style="display: block;"
      aria-modal="true"
      role="dialog"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ formData.tournamentData.title }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="invoiceModale = false"
            />
          </div>
          <div class="modal-body">
            <div class="card user-data-card">
              <div class="card-body">
                <form @submit.prevent="">
                  <div class="row">
                    <div class="col-12 mb-3">
                      <div class="title mb-2">
                        <i class="lni lni-pencil" /><span>مبلغ کارمزد تبلیغات</span>
                      </div>
                      <input v-model="userPrice" class="form-control color-black" type="text" disabled>
                    </div>
                    <div class="col-12 mb-3">
                      <div class="title mb-2">
                        <i class="lni lni-pencil" /><span>مبلغ قابل پرداخت به پذیرنده</span>
                      </div>
                      <input v-model="shopPrice" class="form-control color-black" type="text" disabled>
                    </div>
                    <div class="col-12 mb-3">
                      <div class="title mb-2">
                        <i class="lni lni-pencil" /><span>مبلغ نهایی قابل پرداخت</span>
                      </div>
                      <input v-model="totalPrice" class="form-control color-black" type="text" disabled>
                    </div>
                  </div>
                  <button class="btn btn-success w-100" @click="payment">
                    پرداخت
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="resultModale"
      class="modal fade show"
      tabindex="-1"
      aria-labelledby="exampleModalScrollableTitle"
      style="display: block;"
      aria-modal="true"
      role="dialog"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              خرید با موفقیت انجام شد
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="resultModale = false"
            />
          </div>
          <div class="modal-body">
            <div class="card user-data-card">
              <div class="card-body bg-9">
                <form @submit.prevent="">
                  <div class="row">
                    <div class="col-6 mb-3 bg-10 bg-11">
                      <div class="title mb-2">
                        <span>تاریخ : </span> <span>{{ formData.resultData.date }}</span>
                      </div>
                    </div>
                    <div class="col-6 mb-3 bg-10 bg-11">
                      <div class="title mb-2">
                        <span>ساعت : </span> <span>{{ formData.resultData.time }}</span>
                      </div>
                    </div>
                    <div class="col-12 mb-3 bg-10">
                      <div class="title mb-2">
                        <span>نام فروشگاه : </span> <span>{{ formData.resultData.shopName }}</span>
                      </div>
                    </div>
                    <div class="col-12 mb-3 bg-10">
                      <div class="title mb-2">
                        <span>پرداخت کننده : </span> <span>{{ formData.resultData.name }}</span>
                      </div>
                    </div>
                    <div class="col-12 mb-3 bg-10">
                      <div class="title mb-2">
                        <span>کد کاربری : </span> <span>{{ formData.resultData.code }}</span>
                      </div>
                    </div>
                    <div class="col-12 mb-3 bg-10">
                      <div class="title mb-2">
                        <span>کارمزد تبلیغات : </span> <span>{{ formData.resultData.otherPay }}</span>
                      </div>
                    </div>
                    <div class="col-12 mb-3 bg-10">
                      <div class="title mb-2">
                        <span>پرداختی به پذیرنده : </span> <span>{{ formData.resultData.shopPay }}</span>
                      </div>
                    </div>
                    <div class="col-12 mb-3 bg-10">
                      <div class="title mb-2">
                        <span>مبلغ کل پرداختی : </span> <span>{{ formData.resultData.allPay }}</span>
                      </div>
                    </div>
                    <div class="col-12 mb-3 bg-10">
                      <div class="title mb-2">
                        <span>شماره تراکنش : </span> <span>{{ formData.resultData.invoiceId }}</span>
                      </div>
                    </div>
                  </div>
                  <button class="btn btn-success w-100" @click="resultModale = false">
                    بازگشت
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Internet Connection Status-->
  <!--    <Footer />-->
  </div>
</template>

<script>

import axios from 'axios'
import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
//  import router from "../router";
//  import router from "../router";
// import Footer from '../../components/sections/Footer.vue'
import Header from '../../components/sections/Header.vue'
Vue.use(VueSweetalert2)
export default {
  components: {
    // Footer,
    Header
  },
  data () {
    return {
      map: null,
      formData: ({
        loading: true,
        tournamentData: [],
        resultData: []
      }),
      id: this.$route.params.id,
      totalPrice: 0,
      shopPrice: 0,
      userPrice: 0,
      price: [],
      priceWithDiscount: [],
      invoiceModale: false,
      resultModale: false,
      showInvoiceForm: false
    }
  },
  watch: {
    // price (newValue) {
    //   const result = newValue.replace(/\D/g, '')
    //     .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    //   this.price = result
    // }
  },
  created () {
    const formDataInfo = this.formData
    const thisData = this
    const formDataV = new FormData()
    formDataV.append('type_id', 2)
    formDataV.append('shop_id', this.id)
    axios
      .post('https://karjico.ir/api/user/shopDetail', formDataV,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + localStorage.getItem('api_token')
          }
        })
      .then(function (response) {
        formDataInfo.loading = false
        formDataInfo.tournamentData = response.data.data.data
      }, function (error) {
        if (error.response.status === 401) {
          thisData.$router.push({ path: '/login' })
        }
        return Promise.reject(error)
      })
      .catch(function (error) {
        console.log(error)
        formDataInfo.loading = false
      })
  },
  methods: {
    showLogin () {
      Header.methods.loginForm()
      console.log(Header.data().loginModal)
    },
    showInvoice () {
      this.totalPrice = 0
      this.userPrice = 0
      this.shopPrice = 0
      for (let i = 0; i < this.formData.tournamentData.discounts.length; i++) {
        if (this.price[this.formData.tournamentData.discounts[i].id] > 0) {
          this.totalPrice = Math.floor(parseInt(this.totalPrice) + parseInt(this.price[this.formData.tournamentData.discounts[i].id]))
          this.userPrice = Math.floor(parseInt(this.userPrice) + (parseInt(this.price[this.formData.tournamentData.discounts[i].id]) * parseInt(this.formData.tournamentData.discounts[i].discount) / 100))
          this.shopPrice = Math.floor(this.totalPrice - this.userPrice)
        }
      }
      if (this.totalPrice > 0) { this.showInvoiceForm = true } else { this.showInvoiceForm = false }
    },
    payment () {
      const formDataInfo = this.formData
      const thisData = this
      const formDataV = new FormData()
      formDataV.append('type_id', 2)
      formDataV.append('shop_id', this.id)
      formDataV.append('listPrice', this.price)
      formDataV.append('totalPrice', this.totalPrice)
      axios
        .post('https://karjico.ir/api/user/shopPayment', formDataV,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + localStorage.getItem('api_token')
            }
          })
        .then(function (response) {
          console.log(response.data.data.status)
          if (response.data.data.status === 0) {
            thisData.invoiceModale = false
            formDataInfo.loading = false
            thisData.$swal.fire({
              icon: 'danger',
              title: 'اعتبار شما کافی نمی باشد',
              confirmButtonText: 'بستن'
            })
          } else {
            thisData.invoiceModale = false
            thisData.resultModale = true
            formDataInfo.resultData = response.data.data
            formDataInfo.loading = false
            for (let i = 0; i < formDataInfo.tournamentData.discounts.length; i++) {
              thisData.price[formDataInfo.tournamentData.discounts[i].id] = 0
            }
            thisData.showInvoiceForm = false
          }
        }, function (error) {
          if (error.response.status === 401) {
            thisData.$router.push({ path: '/login' })
          }
          return Promise.reject(error)
        })
        .catch(function (error) {
          console.log(error)
          formDataInfo.loading = false
        })
    }
  }

}

</script>
<style>
.cart-title {
  font-size: 12px;
  text-align: center;
}

#accordionExample {

  margin-bottom: 85px;

}
.img-homepage{
  width: 50px;
  padding-bottom: 5px;
}
.invoiceForm{
margin-top: 10px;
  position: fixed;
  bottom: 0px;
  z-index: 999;
  transform: translate(-50%, 0%);
  left: 50%;
  width: -webkit-fill-available;
}
.invoiceForm .pay{
  position: absolute;
  left: 10px;
  top: 30px;
}
.invoiceForm .card {
  background-color: #fff;
  padding: 0 11px;
  border-radius: 10px 10px 0px 0px;
  width: 100%;
}
/*.zoom-in-zoom-out {*/
/*  animation: zoom-in-zoom-out 2s ease-out infinite;*/
/*}*/

/*@keyframes zoom-in-zoom-out {*/
/*  0% {*/
/*    transform: scale(1, 1);*/
/*  }*/
/*  50% {*/
/*    transform: scale(0.5, 0.5);*/
/*  }*/
/*  100% {*/
/*    transform: scale(1, 1);*/
/*  }*/
/*}*/
.margin-150{
  margin-bottom: 0px;
}
</style>
<!--async created () {-->
<!--// const routerData = this.$router-->
<!--this.$axios.setToken('1|hN286uXntAV0Qzpc3A9YSs42cNaI1CwZfAGwhHLa', 'Bearer')-->
<!--const response = await this.$axios.post('https://karjico.ir/api/login', {-->
<!--mobile: '09155001695'-->
<!--})-->
<!--console.log(response)-->
<!--},-->

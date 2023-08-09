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
      <div class="card user-data-card bg-dark">
        <div>
          <div class="title align-items-center">
            <div class="row">
              <div class="col-6">
                <a href="/charge/buy">
                  <p class="chargeBtn chargeBtnDeactive">
                    خرید اینترنت
                  </p>
                </a>
              </div>
              <div class="col-6">
                <a href="/charge/buy">
                  <p class="chargeBtn">
                    خرید شارژ
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="pt-3">
          <div class="profile-wrapper-area py-3 direction-rtl margin-150">
            <!-- User Information-->
            <div class="row">
              <div class="col-12">
                <div class="card shopCart">
                  <div class="card user-data-card bg-dark">
                    <div class="card-body">
                      <div class="chargeTab">
                        <b-tabs content-class="mt-3" justified card>
                          <b-tab red title="شارژ مستقیم" active>
                            <div class="btn-charge-div">
                              <span class="title-div">
                                شماره موبایل
                              </span>
                              <input
                                v-model="mobile"
                                class="form-control mb-3 bg-dar-input"
                                type="number"
                                placeholder="مثلا 09123456789"
                                maxlength="11"
                                @input="checkMobile"
                              >
                              <img class="sim" src="~/assets/img/sim.png" alt="">
                            </div>
                            <p class="m-3">
                              ! اگر ترابرد کرده اید اپراتور خود را تغییر دهید
                            </p>
                            <div class="listSim">
                              <img class="simcard" :class="{active: selected == 1}" src="~/assets/img/sim1.png" alt="" @click="selected = 1">
                              <img class="simcard" :class="{active: selected == 2}" src="~/assets/img/sim3.png" alt="" @click="selected = 2">
                              <img class="simcard" :class="{active: selected == 3}" src="~/assets/img/sim2.png" alt="" @click="selected = 3">
                            </div>
                            <div class="btn-charge-div mt-4 color-white ">
                              <span class="title-div">
                                مبلغ شارژ دلخواه
                              </span>
                              <input
                                v-model="priceInput"
                                class="form-control mb-3 bg-dar-input text-center"
                                type="number"
                                placeholder="مبلغ دلخواه خود را وارد نمایید"
                                @input="setPriceBtn"
                              >
                              <button v-if="setPrice" class="showInvoice" @click="showPreInvoice">
                                تایید
                              </button>
                            </div>
                            <div v-if="selected == 1" class="listChargePrice">

                              <p class="border2 p-0 itemChargePrice" @click="priceInput =5000; setPrice=1">
                                <img class="listIcon" src="~/assets/img/hamrahaval.png" alt="">
                                <span>شارژ همراه اول</span>
                                <span>5,000 تومان</span>
                              </p>
                              <p class="border2 p-0 itemChargePrice" @click="priceInput =10000; setPrice=1">
                                <img class="listIcon" src="~/assets/img/hamrahaval.png" alt="">
                                <span>شارژ همراه اول</span>
                                <span>10,000 تومان</span>
                              </p>
                              <p class="border2 p-0 itemChargePrice" @click="priceInput =20000; setPrice=1">
                                <img class="listIcon" src="~/assets/img/hamrahaval.png" alt="">
                                <span>شارژ همراه اول</span>
                                <span>20,000 تومان</span>
                              </p>
                            </div>
                            <div v-if="selected == 2" class="listChargePrice">
                              <p class="border2 p-0 itemChargePrice colorYellow" @click="priceInput =1000; setPrice=1">
                                <img class="listIcon" src="~/assets/img/irancell.png" alt="">
                                <span>شارژ ایرانسل</span>
                                <span>1,000 تومان</span>
                              </p>
                              <p class="border2 p-0 itemChargePrice colorYellow" @click="priceInput =2000; setPrice=1">
                                <img class="listIcon" src="~/assets/img/irancell.png" alt="">
                                <span>شارژ ایرانسل</span>
                                <span>2,000 تومان</span>
                              </p>
                              <p class="border2 p-0 itemChargePrice colorYellow" @click="priceInput =5000; setPrice=1">
                                <img class="listIcon" src="~/assets/img/irancell.png" alt="">
                                <span>شارژ ایرانسل</span>
                                <span>5,000 تومان</span>
                              </p>
                              <p class="border2 p-0 itemChargePrice colorYellow" @click="priceInput =10000; setPrice=1">
                                <img class="listIcon" src="~/assets/img/irancell.png" alt="">
                                <span>شارژ ایرانسل</span>
                                <span>10,000 تومان</span>
                              </p>
                              <p class="border2 p-0 itemChargePrice colorYellow" @click="priceInput =20000; setPrice=1">
                                <img class="listIcon" src="~/assets/img/irancell.png" alt="">
                                <span>شارژ ایرانسل</span>
                                <span>20,000 تومان</span>
                              </p>
                            </div>
                            <div v-if="selected == 3" class="listChargePrice">
                              <p class="border2 p-0 itemChargePrice colorPink" @click="priceInput =1000; setPrice=1">
                                <img class="listIcon" src="~/assets/img/rightel.png" alt="">
                                <span>شارژ رایتل</span>
                                <span>1,000 تومان</span>
                              </p>
                              <p class="border2 p-0 itemChargePrice colorPink" @click="priceInput =2000; setPrice=1">
                                <img class="listIcon" src="~/assets/img/rightel.png" alt="">
                                <span>شارژ رایتل</span>
                                <span>2,000 تومان</span>
                              </p>
                              <p class="border2 p-0 itemChargePrice colorPink" @click="priceInput =5000; setPrice=1">
                                <img class="listIcon" src="~/assets/img/rightel.png" alt="">
                                <span>شارژ رایتل</span>
                                <span>5,000 تومان</span>
                              </p>
                              <p class="border2 p-0 itemChargePrice colorPink" @click="priceInput =10000; setPrice=1">
                                <img class="listIcon" src="~/assets/img/rightel.png" alt="">
                                <span>شارژ رایتل</span>
                                <span>10,000 تومان</span>
                              </p>
                              <p class="border2 p-0 itemChargePrice colorPink" @click="priceInput =20000; setPrice=1">
                                <img class="listIcon" src="~/assets/img/rightel.png" alt="">
                                <span>شارژ رایتل</span>
                                <span>20,000 تومان</span>
                              </p>
                            </div>
                          </b-tab>
                          <b-tab title="#* کد شارژ">
                            <p>به زودی</p>
                          </b-tab>
                        </b-tabs>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showInvoiceForm" class="invoiceForm invoiceFormCharge">
        <div class="card user-data-card pt-3">
          <p class="header">
            پرداخت
          </p>
          <img class="sim top-13" src="~/assets/img/down-arrow.png" alt="" @click="showInvoiceForm= false">
          <div class="container">
            <div class="container">
              <div class="row">
                <div class="col-12">
                  <div class="title mb-2 invoiceItem pb-1">
                    <div class="right pt-10 operator-span">
                      <span>اپراتور</span>
                    </div>
                    <div class="left">
                      <div v-if="selected==1" class="img-bg-white float-left">
                        <img class="" src="~/assets/img/hamrahaval.png" alt="">
                      </div>
                      <div v-if="selected==2" class="img-bg-white float-left">
                        <img class="" src="~/assets/img/irancell.png" alt="">
                      </div>
                      <div v-if="selected==3" class="img-bg-white float-left">
                        <img class="" src="~/assets/img/rightel.png" alt="">
                      </div>
                      <span v-if="selected==1" class="float-left operator-span">همراه اول</span>
                      <span v-if="selected==2" class="float-left operator-span">ایرانسل</span>
                      <span v-if="selected==3" class="float-left operator-span">رایتل</span>
                    </div>
                    <div class="clearfix" />
                  </div>
                  <div class="title mb-2 invoiceItem">
                    <div class="right pt-10">
                      <span>گیرنده شارژ</span>
                    </div>
                    <div class="left pt-10">
                      <span>{{ mobile }}</span>
                    </div>
                    <div class="clearfix" />
                  </div>

                  <div class="container ">
                    <!--                    <div class="text-center">-->
                    <!--                      <p class="p-1 m-0">-->
                    <!--                        مبلغ شارژ {{ priceInput }} تومان-->
                    <!--                      </p>-->
                    <!--                    </div>-->
                    <!--                    <div class="text-center">-->
                    <!--                      <p class="p-1 ">-->
                    <!--                        مالیات بر ارزش افزوده {{ priceInput*9/100 }} تومان-->
                    <!--                      </p>-->
                    <!--                    </div>-->
                    <div class="text-center">
                      <p class="payPrice">
                        مبلغ نهایی پرداخت : {{ parseInt(priceInput) }} تومان
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="container pt-0">
            <div class="container pt-0">
              <div class="container paymentInvoiceBtn pt-0">
                <div class="col-12 ">
                  <div class="title mb-2">
                    <span>روش پرداخت خود را انتخاب نمایید</span>
                  </div>
                </div>
                <p class="btn btn-success wallet w-100" @click="chargeMobileWithAniCard">
                  <img src="~/assets/img/purse.png" alt="">
                  <span class="font-11">موجودی کیف پول {{ wallet }} تومان</span>
                  <span class="btnPay">پرداخت</span>
                </p>
                <!--                <p class="btn btn-success wallet w-100">-->
                <!--                  <img src="~/assets/img/behpardakht.png" alt="">-->
                <!--                  <span class="font-11">درگاه اینترنتی به پرداخت ملت</span>-->
                <!--                  <span class="btnPay">پرداخت</span>-->
                <!--                </p>-->
                <!--                <p class="btn btn-success wallet w-100">-->
                <!--                  <img src="~/assets/img/behpardakht.png" alt="">-->
                <!--                  <span class="font-11">درگاه اینترنتی به پرداخت ملت</span>-->
                <!--                  <span class="btnPay">پرداخت</span>-->
                <!--                </p>-->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showInvoicePaymentForm" class="invoiceForm invoiceFormCharge showInvoicePaymentForm">
        <div class=" user-data-card pt-3">
          <div class="text-center header">
            <img class="top-13" src="~/assets/img/down-arrow.png" alt="" @click="showInvoicePaymentForm= false">
            <p>{{ resultCharge.message }}</p>
          </div>
          <div class="formBody">
            <div class="">
              <div class="container">
                <div class="row mt-10">
                  <div class="col-12 mb-3">
                    <div class="listChargePrice">
                      <p class="border2 p-2 m-1">
                        <span>شرح تراکنش</span>
                        <span class="float-left">{{ resultCharge.description }}</span>
                      </p>
                      <p class="border2 p-2 m-1">
                        <span>نوع شارژ</span>
                        <span class="float-left">عادی</span>
                      </p>
                      <p class="border2 p-2 m-1">
                        <span>برای شماره</span>
                        <span class="float-left">{{ resultCharge.mobile }}</span>
                      </p>
                      <p class="border2 p-2 m-1">
                        <span>زمان تراکنش</span>
                        <span class="float-left">{{ resultCharge.date }}</span>
                      </p>
                      <p class="border2 p-2 m-1">
                        <span>مبلغ تراکنش</span>
                        <span class="float-left">{{ resultCharge.price }}</span>
                      </p>
                      <p class="border2 p-2 m-1">
                        <span>وضعیت</span>
                        <span class="float-left">{{ resultCharge.message }}</span>
                      </p>
                    </div>
                  </div>
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
                          <span>پرداختی به باشگاه : </span> <span>{{ formData.resultData.otherPay }}</span>
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
        loading: false,
        tournamentData: [],
        resultData: []
      }),
      id: this.$route.params.id,
      totalPrice: 0,
      shopPrice: 0,
      userPrice: 0,
      price: [],
      priceWithDiscount: [],
      resultModale: false,
      showInvoicePaymentForm: false,
      showInvoiceForm: false,
      selected: 0,
      setPrice: 0,
      mobile: null,
      priceInput: null,
      wallet: 0,
      resultCharge: null
    }
  },
  created () {
    const formDataInfo = this.formData
    const thisData = this
    const formDataV = new FormData()
    formDataV.append('type_id', 2)
    formDataV.append('shop_id', this.id)
    axios
      .post('https://karjico.ir/api/user/chargePage', formDataV,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + localStorage.getItem('api_token')
          }
        })
      .then(function (response) {
        thisData.wallet = response.data.data.wallet
        formDataInfo.loading = false
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
    checkMobile () {
      console.log('1')
      if ((this.mobile.length < 4)) {
        this.selected = 0
        console.log('2')
      } else if ((this.mobile.startsWith('0910')) ||
        (this.mobile.startsWith('0911')) ||
        (this.mobile.startsWith('0912')) ||
        (this.mobile.startsWith('0913')) ||
        (this.mobile.startsWith('0914')) ||
        (this.mobile.startsWith('0915')) ||
        (this.mobile.startsWith('0916')) ||
        (this.mobile.startsWith('0917')) ||
        (this.mobile.startsWith('0918')) ||
        (this.mobile.startsWith('0990')) ||
        (this.mobile.startsWith('0991')) ||
        (this.mobile.startsWith('0992')) ||
        (this.mobile.startsWith('0993')) ||
        (this.mobile.startsWith('0994'))) {
        console.log('3')
        this.selected = 1
      } else if ((this.mobile.startsWith('0930')) ||
        (this.mobile.startsWith('0933')) ||
        (this.mobile.startsWith('0935')) ||
        (this.mobile.startsWith('0936')) ||
        (this.mobile.startsWith('0937')) ||
        (this.mobile.startsWith('0938')) ||
        (this.mobile.startsWith('0939')) ||
        (this.mobile.startsWith('0901')) ||
        (this.mobile.startsWith('0902')) ||
        (this.mobile.startsWith('0903')) ||
        (this.mobile.startsWith('0904')) ||
        (this.mobile.startsWith('0905')) ||
        (this.mobile.startsWith('0941'))) {
        this.selected = 2
      } else if ((this.mobile.startsWith('0920')) ||
        (this.mobile.startsWith('0921')) ||
        (this.mobile.startsWith('0922'))) {
        this.selected = 3
      } else {
        console.log('4')
        this.selected = 0
      }
    },
    setPriceBtn () {
      if ((this.priceInput.length > 0)) {
        this.setPrice = 1
      } else {
        this.setPrice = 0
      }
    },
    showPreInvoice () {
      this.showInvoiceForm = true
    },
    walletPayment () {
      this.formData.loading = true
      const formDataInfo = this.formData
      const thisData = this
      const formDataV = new FormData()
      formDataV.append('phone', this.mobile)
      formDataV.append('amount', this.priceInput)
      formDataV.append('operator', this.selected)
      formDataV.append('profit', 10)
      axios
        .post('https://karjico.ir/api/user/buy-charge', formDataV,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + localStorage.getItem('api_token')
            }
          })
        .then(function (response) {
          console.log(response)
          formDataInfo.loading = false
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
    chargeMobileWithAniCard () {
      this.formData.loading = true
      const formDataInfo = this.formData
      const thisData = this
      const formDataV = new FormData()
      formDataV.append('phone', this.mobile)
      formDataV.append('amount', this.priceInput)
      formDataV.append('operator', this.selected)
      axios
        .post('https://karjico.ir/api/user/chargeMobile', formDataV,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + localStorage.getItem('api_token')
            }
          })
        .then(function (response) {
          thisData.resultCharge = response.data.data

          thisData.showInvoiceForm = false
          thisData.showInvoicePaymentForm = true
          thisData.wallet = response.data.data.wallet
          formDataInfo.loading = false
        }, function (error) {
          if (error.response.status === 401) {
            thisData.$router.push({ path: '/login' })
          }
          formDataInfo.loading = false
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
.invoiceFormCharge .card:after {
  position: absolute;
  top: 0; bottom: 0; right: 0; left: 0;
  background: rgba(0,0,0,0.8);
  content: '';
  z-index: -1;
}
.invoiceForm{
  height: auto!important;
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

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
    <div v-if="checkNet===0">
      <Header />
      <!-- PWA Install Alert -->
      <div class="page-content-wrapper">
        <div class="card user-data-card bg-dark">
          <div>
            <div class="title align-items-center">
              <div class="row">
                <div class="col-6">
                  <a href="/charge/buy">
                    <p class="chargeBtn ">
                      خرید اینترنت
                    </p>
                  </a>
                </div>
                <div class="col-6">
                  <a href="/charge/buy">
                    <p class="chargeBtn chargeBtnDeactive">
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
                          <div class="btn-charge-div">
                            <span class="title-div">
                              شماره موبایل
                            </span>
                            <input
                              v-model="mobile"
                              class="form-control mb-3 bg-dar-input"
                              type="text"
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
                            <img class="simcard" :class="{active: selected == 2}" src="~/assets/img/sim1.png" alt="" @click="selected = 2">
                            <img class="simcard" :class="{active: selected == 1}" src="~/assets/img/sim3.png" alt="" @click="selected = 1">
                            <img class="simcard" :class="{active: selected == 3}" src="~/assets/img/sim2.png" alt="" @click="selected = 3">
                          </div>
                          <p class="m-3">
                            نوع سیم کارت خود را انتخاب نمایید
                          </p>
                          <div class="row">
                            <div class="col-6 ">
                              <button class="btn btn-danger w-100  deactiveBtnTypeNet" :class="{ activeBtnTypeNet: simType==1 }" @click="simType=1">
                                اعتباری
                              </button>
                            </div>
                            <div class="col-6">
                              <button class="btn btn-danger w-100 deactiveBtnTypeNet" :class="{ activeBtnTypeNet: simType !== 1 }" @click="simType=2">
                                دائمی
                              </button>
                            </div>
                            <div class="col-12 mt-4">
                              <button class="btn btn-success bg-yellow w-100 " @click="getNetService">
                                جستجو بسته
                              </button>
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
        </div>
      </div>
    </div>
    <div v-if="showInvoiceForm" class="invoiceFormCharge" style="position: fixed;bottom: 0;z-index: 999999; width: 100%">
      <div class="card user-data-card pt-3">
        <p class="header">
          پرداخت
        </p>
        <img class="sim top-13" src="~/assets/img/down-arrow.png" alt="" @click="showInvoiceForm= false">
        <div class="container">
          <div class="container">
            <div class="row">
              <div class="col-12 mb-3">
                <div class="title mb-2 invoiceItem pb-1">
                  <div class="right pt-10 operator-span">
                    <span>اپراتور</span>
                  </div>
                  <div class="left">
                    <div v-if="selected==2" class="img-bg-white float-left">
                      <img class="" src="~/assets/img/hamrahaval.png" alt="">
                    </div>
                    <div v-if="selected==1" class="img-bg-white float-left">
                      <img class="" src="~/assets/img/irancell.png" alt="">
                    </div>
                    <div v-if="selected==3" class="img-bg-white float-left">
                      <img class="" src="~/assets/img/rightel.png" alt="">
                    </div>
                    <span v-if="selected==2" class="float-left operator-span">همراه اول</span>
                    <span v-if="selected==1" class="float-left operator-span">ایرانسل</span>
                    <span v-if="selected==3" class="float-left operator-span">رایتل</span>
                  </div>
                  <div class="clearfix" />
                </div>
                <div class="title mb-2 invoiceItem">
                  <div class="right pt-10">
                    <span>شماره همراه</span>
                  </div>
                  <div class="left pt-10">
                    <span>{{ mobile }}</span>
                  </div>
                  <div class="clearfix" />
                </div>
                <div class="title mb-2 invoiceItem">
                  <div class="right pt-10">
                    <span>نوع بسته</span>
                  </div>
                  <div class="left pt-10" style="width: 70%;">
                    <span>{{ InternetNameSelected }}</span>
                  </div>
                  <div class="clearfix" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="container">
            <div class="container paymentInvoiceBtn">
              <p class="btn btn-success wallet w-100">
                <img src="~/assets/img/purse.png" alt="">
                <span class="font-11">موجودی کیف پول {{ Number(wallet) }} تومان</span>
                <span class="btnPay" @click="chargeNetWithAniCard(ServiceIDSelected,ServicePriceSelected)">پرداخت</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showInvoicePaymentForm" class=" invoiceFormCharge showInvoicePaymentForm" style="position: fixed;bottom: 0;z-index: 999999; width: 100%">
      <div class=" user-data-card pt-3">
        <div class="text-center header">
          <img class="top-13" src="~/assets/img/down-arrow.png" alt="" @click="showInvoicePaymentForm= false">
          <p>{{ resultCharge.message.Note?resultCharge.message.Note : resultCharge.message }}</p>
        </div>
        <div class="formBody">
          <div class="">
            <div class="container">
              <div class="row mt-10">
                <div class="col-12 mb-3">
                  <div class="listChargePrice">
                    <p class="border2 p-2 m-1">
                      <span>شرح تراکنش</span>
                      <span class="float-left">{{ resultCharge?resultCharge.description:"" }}</span>
                    </p>
                    <p class="border2 p-2 m-1">
                      <span>نوع شارژ</span>
                      <span class="float-left">عادی</span>
                    </p>
                    <p class="border2 p-2 m-1">
                      <span>برای شماره</span>
                      <span class="float-left">{{ resultCharge!== null ?resultCharge.mobile:"" }}</span>
                    </p>
                    <p class="border2 p-2 m-1">
                      <span>زمان تراکنش</span>
                      <span class="float-left">{{ resultCharge!== null ?resultCharge.date:"" }}</span>
                    </p>
                    <p class="border2 p-2 m-1">
                      <span>مبلغ تراکنش</span>
                      <span class="float-left">{{ resultCharge!== null ?resultCharge.price:"" }}</span>
                    </p>
                    <p class="border2 p-2 m-1">
                      <span>وضعیت</span>
                      <span class="float-left">{{ resultCharge.message.Note?resultCharge.message.Note : resultCharge.message }}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="checkNet===1">
      <Header />
      <!-- PWA Install Alert -->
      <div class="page-content-wrapper">
        <div class="container">
          <p class="border2 p-0 itemChargePrice border-yellow mobile-bg">
            <img class="listIcon" src="~/assets/img/hamrahaval.png" alt="">
            <span>شارژ همراه اول</span>
            <span>
              {{this.mobile}}
              <img class="pen" src="~/assets/img/pen.png" alt="">
            </span>
          </p>
        </div>
        <p class="m-3 text-center color-white">
          بسته خود را انتخاب کنید
        </p>
        <v-card>
          <v-tabs
            v-model="tab"
            background-color="deep-purple accent-4"
            centered
          >
            <v-tabs-slider />

            <v-tab href="#tab-1">
              همه
            </v-tab>

            <v-tab href="#tab-2">
              چند روزه
            </v-tab>

            <v-tab href="#tab-3">
              یک ماهه
            </v-tab>
            <v-tab href="#tab-4">
              دو ماهه
            </v-tab>
            <v-tab href="#tab-5">
              سه تا شش ماهه
            </v-tab>
            <v-tab href="#tab-6">
              یک ساله
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item
              v-for="i in 6"
              :key="i"
              :value="'tab-' + i"
            >
              <v-card flat>
                <v-card-text>
                  <div class="card user-data-card bg-dark">
                    <div class="card-body">
                      <!--                        -->
                      <div v-for="item in formData.resultData" :key="item.RowID">
                        <div v-if="((selected==2 && simType==2 && item.ProfileTypeID==13) ||(selected==2 && simType==1 && item.ProfileTypeID==13)||(selected==1 && simType==1 && item.ProfileTypeID==1)||(selected==1 && simType==2 && item.ProfileTypeID==2)) && ( (i==1) || (i==2 && (item.DurationKey==='D1' || (item.DurationKey==='W1')) ) || (i==3 && (item.DurationKey==='M1' ))|| (i==4 && (item.DurationKey==='M2' )) || (i==3 && (item.DurationKey==='M1' ))|| (i==5 && (item.DurationKey==='M3' ||item.DurationKey==='M4' || item.DurationKey==='M5' || item.DurationKey==='M6' )) || (i==6 && (item.DurationKey==='Y1' )))" class="border2 p-0 itemChargePrice border-yellow p-2 direction-rtl color-white">
                          <img class="listIcon" src="~/assets/img/hamrahaval.png" alt="">
                          <span>{{ item.ProviderTitle }}</span>
                          <span>{{ item.DurationName }}</span>
                          <p class="internetDescription">
                            {{ item.ServiceName }}
                          </p>
                          <span>مبلغ پرداختی: {{ Number(item.ServicePrice) }} ریال</span>
                          <!--                      @click="chargeNetWithAniCard(item.ServiceID,item.ServicePrice)"-->
                          <button class="btn btn-success bg-yellow" style="float: left;top: -3px;position: relative;padding: 3px 17px;border: none;" @click="ServiceIDSelected= item.ServiceID;ServicePriceSelected = item.ServicePrice;InternetNameSelected = item.ServiceName;showInvoiceForm= true;">
                            خرید
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </div>
    </div>
    <!-- Internet Connection Status-->
  <!--    <Footer />-->
  </div>
</template>

<script>

import axios from 'axios'
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
//  import router from "../router";
//  import router from "../router";
// import Footer from '../../components/sections/Footer.vue'
import Header from '../../components/sections/Header.vue'

Vue.use(VueSweetalert2)
Vue.use(Vuetify)
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
      resultCharge: null,
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
      checkNet: 0,
      simType: 1,
      ServiceIDSelected: 0,
      ServicePriceSelected: 0,
      InternetNameSelected: null,
      tab: null,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  },
  created () {
    const formDataInfo = this.formData
    const thisData = this
    const formDataV = new FormData()
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
      if ((this.mobile.length < 4)) {
        this.selected = 0
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
        this.selected = 2
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
        this.selected = 1
      } else if ((this.mobile.startsWith('0920')) ||
        (this.mobile.startsWith('0921')) ||
        (this.mobile.startsWith('0922'))) {
        this.selected = 3
      } else {
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
    getNetService () {
      this.formData.loading = true
      const formDataInfo = this.formData
      const thisData = this
      const formDataV = new FormData()
      formDataV.append('operationId', this.selected)
      axios
        .post('https://karjico.ir/api/user/getNetService', formDataV,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + localStorage.getItem('api_token')
            }
          })
        .then(function (response) {
          thisData.checkNet = 1
          formDataInfo.resultData = response.data.data
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
    showPreInvoice () {
      this.showInvoiceForm = true
    },
    chargeNetWithAniCard (serviceID, price) {
      console.log(serviceID)
      this.formData.loading = true
      const formDataInfo = this.formData
      const thisData = this
      const formDataV = new FormData()
      formDataV.append('phone', this.mobile)
      formDataV.append('amount', price)
      formDataV.append('operator', this.selected)
      formDataV.append('serviceID', serviceID)
      axios
        .post('https://karjico.ir/api/user/chargeNetService', formDataV,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + localStorage.getItem('api_token')
            }
          })
        .then(function (response) {
          thisData.resultCharge = response.data.data
          if (thisData.resultCharge !== null) {
            thisData.showInvoiceForm = false
            thisData.showInvoicePaymentForm = true
            thisData.wallet = response.data.data.wallet
          } else {
            thisData.showInvoiceForm = false
            thisData.showInvoicePaymentForm = false
            console.log(response.data)
            thisData.$toast.show(response.data, {
              position: 'bottom-center',
              type: 'error',
              theme: 'bubble',
              duration: 7000
            })
          }
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
</style>
<!--async created () {-->
<!--// const routerData = this.$router-->
<!--this.$axios.setToken('1|hN286uXntAV0Qzpc3A9YSs42cNaI1CwZfAGwhHLa', 'Bearer')-->
<!--const response = await this.$axios.post('https://karjico.ir/api/login', {-->
<!--mobile: '09155001695'-->
<!--})-->
<!--console.log(response)-->
<!--},-->

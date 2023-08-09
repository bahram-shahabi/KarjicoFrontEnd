<template>
  <div v-if="formData.loading">
    <p class="spinner-title">
      درحال لود شدن
    </p>
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <div v-else class="mb-125">
    <!-- Header Area-->
    <Header />
    <!-- PWA Install Alert -->

    <div class="page-content-wrapper direction-rtl">
      <div class="container">
        <!-- Profile Wrapper-->
        <div class="profile-wrapper-area py-3">
          <!-- User Information-->
          <div style="text-align: center">
            <button class="btn btn-warning btn-lg bg-4">
              امتیاز های استفاده شده {{ getScore }} امتیاز از {{ allScore }} امتیاز
            </button>
          </div>
          <div class="row g-3 mt-2">
            <!-- Single Catagory Card -->
            <div class="col-6">
              <div class="card catagory-card bg-1">
                <div class="card-body">
                  <a class="text-danger" href="/advPlan/showAdv">

                    <span>بازدید تبلیغات و دریافت درآمد</span>
                  </a>
                </div>
              </div>
            </div>
            <!-- Single Catagory Card -->
            <div class="col-6">
              <div class="card catagory-card bg-2">
                <div class="card-body">
                  <a href="/advPlan/userList">
                    <span>نمایش گروه تبلیغاتی</span></a>
                </div>
              </div>
            </div>
            <!-- Single Catagory Card -->
          </div>

          <div class="card user-info-card mt-3 text-center">
            <div class="card-body p-3 d-flex align-items-center ">
              <div class="user-info w-100">
                <h5 class="mb-0 ">
                  مشارکت در استخر تبلیغاتی
                </h5>
              </div>
            </div>
          </div>
          <div class="card user-data-card mb-3 ">
            <div class="card-body">
              <div class="row">
                <div class="col-md-12 col-12 mb-3 text-center">
                  <p>قبل از فعال سازی راهنما را مطالعه فرمایید</p>
                  <button class="btn btn-success " @click="upgradeVip">
                    راهنما
                  </button>
                  <p class="mt-2">
                    20 امتیاز
                  </p>
                  <p class="pb-2">
                    پرداختی به استخر {{ vipLevel }} امتیاز از 20 امتیاز
                  </p>
                  <input
                    v-if="vip === 1"
                    v-model="vipPrice"
                    class="form-control mb-3 bg-dar-input mt-2"
                    type="number"
                    placeholder="مبلغ مورد نظر"
                  >
                  <button v-if="vip === 1" class="btn btn-success w-100 mt-0" @click="upgradeVip">
                    ارتقا استخر تبلیغاتی
                  </button>
                  <button v-if="vip === 0" class="btn btn-success btn-red w-100 mt-0" @click="joinVip">
                    فعال نمودن استخر تبلیغاتی
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="card user-info-card mt-3 text-center">
            <div class="card-body p-3 d-flex align-items-center ">
              <div class="user-info w-100">
                <h5 class="mb-0 ">
                  ارتقا محدوده
                </h5>
              </div>
            </div>
          </div>
          <div class="card user-data-card mb-3 ">
            <div class="card-body">
              <div class="row">
                <div class="col-md-12 col-12 mb-3 text-center">
                  <p>محدوده فعلی شما : محدوده {{ formData.userPlan }}</p>
                </div>
              </div>
              <a href="/advPlan/upgradePlan" class="btn btn-success w-100" type="submit">
                ارتقا
              </a>
            </div>
          </div>
          <div class="card user-data-card mb-3 ">
            <div class="card-body">
              <div class="row">
                <div class="col-md-12 col-12 mb-3 text-center">
                  <div v-if="selectPosition == 0" class="row g-3 mt-0">
                    <p>انتخاب باشکاه تبلیغاتی</p>
                    <p>معرف : {{ parent.username }}</p>
                    <div class="col-12 mt-0">
                      <button class="btn btn-success  w-100 mt-1 " @click="nextLevel(1)">
                        باشگاه تبلیغاتی 1
                      </button>
                    </div>
                    <div class="col-12 mt-0">
                      <button class="btn btn-success btn-dark w-100 mt-1 bg-1" @click="nextLevel(2)">
                        باشگاه تبلیغاتی 2
                      </button>
                    </div>
                  </div>
                  <div v-else>
                    <p>باشکاه تبلیغاتی</p>
                    <div v-if="userPlan.plan2_level==0">
                      <button class="btn btn-success btn-red w-100 mt-1" @click="upgradePlan2(1)">
                        سهام1 : 25 امتیاز (غیر فعال)
                      </button>
                      <button class="btn btn-success btn-red w-100 mt-1 ">
                        سهام2 : 50 امتیاز (غیر فعال)
                      </button>
                      <button class="btn btn-success btn-red w-100 mt-1">
                        سهام3 : 50 امتیاز (غیر فعال)
                      </button>
                      <button class="btn btn-success btn-red w-100 mt-1">
                        سهام4 : 50 امتیاز (غیر فعال)
                      </button>
                    </div>
                    <div v-if="userPlan.plan2_level==1">
                      <button class="btn btn-success w-100 mt-1">
                        سهام1 : 25 امتیاز (فعال)
                      </button>
                      <button class="btn btn-success btn-red w-100 mt-1" @click="upgradePlan2(2)">
                        سهام2 : 50 امتیاز (غیر فعال)
                      </button>
                      <button class="btn btn-success btn-red w-100 mt-1">
                        سهام3 : 50 امتیاز (غیر فعال)
                      </button>
                      <button class="btn btn-success btn-red w-100 mt-1">
                        سهام4 : 50 امتیاز (غیر فعال)
                      </button>
                    </div>
                    <div v-if="userPlan.plan2_level==2">
                      <button class="btn btn-success w-100 mt-1">
                        سهام1 : 25 امتیاز (فعال)
                      </button>
                      <button class="btn btn-success  w-100 mt-1">
                        سهام2 : 50 امتیاز (فعال)
                      </button>
                      <button class="btn btn-success btn-red w-100 mt-1" @click="upgradePlan2(3)">
                        سهام3 : 50 امتیاز (غیر فعال)
                      </button>
                      <button class="btn btn-success btn-red w-100 mt-1">
                        سهام4 : 50 امتیاز (غیر فعال)
                      </button>
                    </div>
                    <div v-if="userPlan.plan2_level==3">
                      <button class="btn btn-success w-100 mt-1">
                        سهام1 : 25 امتیاز (فعال)
                      </button>
                      <button class="btn btn-success  w-100 mt-1">
                        سهام2 : 50 امتیاز (فعال)
                      </button>
                      <button class="btn btn-success  w-100 mt-1">
                        سهام3 : 50 امتیاز (فعال)
                      </button>
                      <button class="btn btn-success btn-red w-100 mt-1" @click="upgradePlan2(4)">
                        سهام4 : 50 امتیاز (غیر فعال)
                      </button>
                    </div>
                    <div v-if="userPlan.plan2_level==4">
                      <button class="btn btn-success w-100 mt-1">
                        سهام1 : 25 امتیاز (فعال)
                      </button>
                      <button class="btn btn-success  w-100 mt-1">
                        سهام2 : 50 امتیاز (فعال)
                      </button>
                      <button class="btn btn-success w-100 mt-1">
                        سهام3 : 50 امتیاز (فعال)
                      </button>
                      <button class="btn btn-success w-100 mt-1">
                        سهام4 : 50 امتیاز (فعال)
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card user-info-card mt-3 text-center">
            <div class="card-body p-3 d-flex align-items-center ">
              <div class="user-info w-100">
                <h5 class="mb-0 ">
                  درآمد از تبلیغات
                </h5>
              </div>
            </div>
          </div>
          <div class="card user-data-card mb-3 ">
            <div class="card-body">
              <div class="row">
                <div class="col-md-12 col-12 mb-3 text-center">
                  <p>مجموع درامد شما از تبلیغات :</p>
                  <p>{{ commissionTotal }} تومان</p>
                </div>
              </div>
              <button class="btn btn-success w-100" type="submit">
                نمایش جزئیات
              </button>
            </div>
          </div>

          <div class="card user-info-card mt-3 text-center">
            <div class="card-body p-3 d-flex align-items-center ">
              <div class="user-info w-100">
                <h5 class="mb-0 ">
                  درآمد قابل برداشت
                </h5>
              </div>
            </div>
          </div>
          <div class="card user-data-card mb-3 ">
            <div class="card-body">
              <div class="row">
                <div class="col-md-12 col-12 mb-3 text-center">
                  <p>درآمد قابل برداشت شما : </p>
                  <p>{{ commissionPay }} تومان </p>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <a href="javascript:;" class="btn btn-success col-12" @click="requestPayment=true">
                    درخواست برداشت
                  </a>
                </div>
                <div class="col-6">
                  <a href="javascript:;" class="btn btn-success col-12" @click="getRequestPaymentList">
                    لیست درخواست ها
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="card user-info-card mt-3 text-center">
            <div class="card-body p-3 d-flex align-items-center ">
              <div class="user-info w-100">
                <h5 class="mb-0 ">
                  موجودی ارتقا
                </h5>
              </div>
            </div>
          </div>
          <div class="card user-data-card mb-3 ">
            <div class="card-body">
              <div class="row">
                <div class="col-md-12 col-12 mb-3 text-center">
                  <p>موجودی فعلی جهت ارتقا :</p>
                  <p>0 تومان</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="requestPayment"
          class="modal fade show"
          tabindex="-1"
          aria-labelledby="exampleModalScrollableTitle"
          style="display: block;"
          aria-modal="true"
          role="dialog"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content bg-dark">
              <div class="modal-header">
                <h5 class="modal-title">
                  درخواست برداشت
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  @click="requestPayment = false"
                />
              </div>
              <div class="modal-body bg-dark">
                <div class="">
                  <div class="container">
                    <div class="row mt-10">
                      <div class="col-12 mb-3">
                        <div class="listChargePrice mt-0">
                          <p class="border2 border-yellow color-white p-2 m-1 mb-2">
                            <span>مبلغ قابل برداشت</span>
                            <span class="float-left">{{ commissionPay }}</span>
                          </p>
                          <p class="color-white p-2 m-1 mb-2">
                            <input
                              v-model="requestPaymentPrice"
                              class="form-control mb-3 bg-dar-input mt-2 border2 border-yellow"
                              type="number"
                              placeholder="مبلغ مورد نظر"
                              step="1000"
                            >
                          </p>
                          <button class="btn btn-success w-100" @click="requestPaymentForm">
                            ثبت درخواست برداشت
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
        <div
          v-if="requestPaymentList"
          class="modal fade show"
          tabindex="-1"
          aria-labelledby="exampleModalScrollableTitle"
          style="display: block;"
          aria-modal="true"
          role="dialog"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content bg-dark">
              <div class="modal-header">
                <h5 class="modal-title">
                  درخواست برداشت
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  @click="requestPaymentList = false"
                />
              </div>
              <div class="modal-body bg-dark">
                <div class="">
                  <div class="container">
                    <div class="row mt-10">
                      <div class="col-12 mb-3">
                        <div class="cart-table card mb-3">
                          <div class="table-responsive card-body">
                            <table class="table mb-0">
                              <tbody>
                                <tr>
                                  <td>
                                    ردیف
                                  </td>
                                  <td>شماره حساب</td>
                                  <td>مبلغ درخواستی</td>
                                  <td>مبلغ قابل پرداخت</td>
                                  <td>تاریخ درخواست</td>
                                  <td>تاریخ درخواست - شمسی</td>
                                  <td>تاریخ پرداخت</td>
                                  <td>تاریخ پرداخت - شمسی</td>
                                  <td>وضعیت</td>
                                </tr>
                                <tr v-for="(item , count) in formData.requestList" :key="item.id">
                                  <td>
                                    <div class="quantity">
                                      <a href="#">{{ count+1 }}</a>
                                    </div>
                                  </td>
                                  <td style="min-width: 200px;">
                                    <a href="#">{{ item.account_number }}</a>
                                  </td>
                                  <td style="min-width: 200px;">
                                    <a href="#">{{ item.real_price }}</a>
                                  </td>
                                  <td style="min-width: 200px;">
                                    <a href="#">{{ item.price }}</a>
                                  </td>
                                  <td style="min-width: 200px;">
                                    <a href="#">{{ item.MDataCreatedAt }}</a>
                                  </td>
                                  <td style="min-width: 200px;">
                                    <a href="#">{{ item.JDataCreatedAt }}</a>
                                  </td>
                                  <td style="min-width: 200px;">
                                    <a href="#">{{ item.MDataPaidAt }}</a>
                                  </td>
                                  <td style="min-width: 200px;">
                                    <a href="#">{{ item.JDataPaidAt }}</a>
                                  </td>
                                  <td style="min-width: 200px;">
                                    <a v-if="item.paid_date" href="#" style="color: green">پرداخت شده</a>
                                    <a v-else href="#" style="color: red"> پرداخت نشده</a>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
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

    <!-- Internet Connection Status-->
    <Footer />
  </div>
</template>

<script>

import axios from 'axios'
import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
//  import router from "../router";
//  import router from "../router";
import Header from '../../components/sections/Header.vue'
import Footer from '../../components/sections/Footer.vue'

Vue.use(VueSweetalert2)
export default {
  components: {
    Header,
    Footer
  },
  data () {
    return {
      map: null,
      formData: ({
        loading: true,
        userPlan: null,
        user: null,
        wallet: null,
        requestList: []
      }),
      commissionTotal: null,
      commissionPay: null,
      allScore: null,
      getScore: null,
      vip: null,
      vipLevel: null,
      type: null,
      requestPaymentPrice: null,
      requestPayment: false,
      requestPaymentList: false,
      vipPrice: 0,
      userPlan: null,
      selectPosition: 0,
      parent: null
    }
  },
  watch: {
    price (newValue) {
      const result = newValue.replace(/\D/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      this.price = result
    }
  },
  created () {
    const formDataInfo = this.formData
    const thisData = this
    const formDataV = new FormData()
    axios
      .post('https://karjico.ir/api/user/getUserPlanInfo', formDataV,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + localStorage.getItem('api_token')
          }
        })
      .then(function (response) {
        thisData.type = response.data.data.type
        if (thisData.type === 0) {
          thisData.$router.push({ path: 'advPlan/loginPlan' })
        } else {
          thisData.formData.userPlan = response.data.data.userPlan
          thisData.commissionTotal = response.data.data.commissionTotal
          thisData.commissionPay = response.data.data.commissionPay
          thisData.allScore = response.data.data.allScore
          thisData.getScore = response.data.data.getScore
          thisData.vip = response.data.data.vip
          thisData.vipLevel = response.data.data.vipLevel
          thisData.userPlan = response.data.data.userPlan2
          thisData.parent = response.data.data.parent
          thisData.selectPosition = response.data.data.userPlan2.plan2_position
        }
        thisData.formData.loading = false
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
    joinVip () {
      this.$swal.fire({
        title: 'آیا از فعال سازی استخر تبلیغاتی مطمئن هستید؟',
        showCancelButton: true,
        confirmButtonText: 'بلی',
        cancelButtonText: 'خیر'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          const formDataInfo = this.formData
          const thisData = this
          const formDataV = new FormData()
          axios
            .post('https://karjico.ir/api/user/joinVip', formDataV,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: 'Bearer ' + localStorage.getItem('api_token')
                }
              })
            .then(function (response) {
              thisData.vip = 1
              thisData.vipLevel = response.data.data.vipLevel
              thisData.$swal.fire({
                icon: 'success',
                title: 'استخر تبلیغاتی برای شما فمال گردید',
                confirmButtonText: 'بستن'
              })
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
      })
    },
    upgradeVip () {
      const message = 'آیا از پرداخت' + this.vipPrice * 10000 + 'معادل ' + this.vipPrice + 'امتیاز مطمئن هستید؟'
      this.$swal.fire({
        title: message,
        showCancelButton: true,
        confirmButtonText: 'بلی',
        cancelButtonText: 'خیر'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          const formDataInfo = this.formData
          const thisData = this
          const formDataV = new FormData()
          formDataV.append('vipPrice', this.vipPrice * 10000)
          axios
            .post('https://karjico.ir/api/user/payPriceVip', formDataV,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: 'Bearer ' + localStorage.getItem('api_token')
                }
              })
            .then(function (response) {
              thisData.vipLevel = response.data.data.vipLevel
              thisData.vip = 1
              thisData.$swal.fire({
                icon: 'success',
                title: response.data.data.message,
                confirmButtonText: 'بستن'
              })
              this.created()
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
      })
    },
    requestPaymentForm () {
      const formDataInfo = this.formData
      const thisData = this
      const formDataV = new FormData()
      if (this.requestPaymentPrice % 1000 > 0) {
        thisData.$toast.show('مبلغ باید ضریبی از 1000 باشد', {
          position: 'bottom-center',
          type: 'error',
          theme: 'bubble',
          duration: 7000
        })
      } else {
        formDataV.append('price', this.requestPaymentPrice)
        formDataV.append('typeRequest', 'userPayment')
        axios
          .post('https://karjico.ir/api/user/requestPayment', formDataV,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + localStorage.getItem('api_token')
              }
            })
          .then(function (response) {
            if (response.data.data.result === 1) {
              thisData.requestPayment = false
              thisData.requestPaymentPrice = 0
              thisData.commissionPay = response.data.data.commissionPay
              thisData.$toast.show('درخواست شما با موفقیت ثبت شد', {
                position: 'bottom-center',
                type: 'success',
                theme: 'bubble',
                duration: 7000
              })
            }
            if (response.data.data.result === 2) {
              thisData.requestPayment = false
              thisData.requestPaymentPrice = 0
              thisData.$toast.show('مبلغ مورد نظر بیشتر از موجودی شما می باشد', {
                position: 'bottom-center',
                type: 'error',
                theme: 'bubble',
                duration: 7000
              })
            }
            if (response.data.data.result === 3) {
              thisData.requestPayment = false
              thisData.requestPaymentPrice = 0
              thisData.$toast.show('ابتدا از قسمت پروفایل اطلاعات حساب کاربری خود را تکمیل نمایید', {
                position: 'bottom-center',
                type: 'error',
                theme: 'bubble',
                duration: 7000
              })
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
    },
    getRequestPaymentList () {
      const formDataInfo = this.formData
      const thisData = this
      const formDataV = new FormData()
      axios
        .post('https://karjico.ir/api/user/getRequestPaymentList', formDataV,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + localStorage.getItem('api_token')
            }
          })
        .then(function (response) {
          thisData.formData.requestList = response.data.data.requestPayment
          thisData.requestPaymentList = true
        })
        .catch(function (error) {
          console.log(error)
          formDataInfo.loading = false
        })
    },
    upgradePlan2 (level) {
      let message = ''
      if (level === 1) {
        message = 'آیا از فعال سازی 25 امتیاز معادل 250 هزار تومان مطمئن هستید؟ '
      } else {
        message = 'آیا از فعال سازی 50 امتیاز معادل 500 هزار تومان مطمئن هستید؟ '
      }
      this.$swal.fire({
        title: message,
        showCancelButton: true,
        confirmButtonText: 'بلی',
        cancelButtonText: 'خیر'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          const formDataInfo = this.formData
          const thisData = this
          const formDataV = new FormData()
          formDataV.append('level', level)
          formDataV.append('position', this.selectPosition)
          axios
            .post('https://karjico.ir/api/user/plan2Upgrade', formDataV,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: 'Bearer ' + localStorage.getItem('api_token')
                }
              })
            .then(function (response) {
              thisData.userPlan = response.data.data.userPlan
              thisData.formData.loading = false
              thisData.$swal.fire({
                icon: 'success',
                title: response.data.data.message,
                confirmButtonText: 'بستن'
              })
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
      })
    },
    nextLevel (position) {
      this.selectPosition = position
    }
  }

}

</script>
<style>
.cart-title {
  font-size: 12px;
  text-align: center;
}
.swal2-title{
  direction: rtl;
  font-size: 20px!important;
}
.btn-red{
  background-color: red;
}
#accordionExample {

  margin-bottom: 85px;

}

</style>

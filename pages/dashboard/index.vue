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
          <div class="row g-3 mt-2">
            <!-- Single Catagory Card -->
            <div class="col-12">
              <div class="card catagory-card bg-1">
                <div class="card-body">
                  <a class="text-danger" href="/advPlan">
                    <span>کسب درآمد از تبلیغات</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="card user-info-card mt-3 text-center">
            <div class="card-body p-3 d-flex align-items-center ">
              <div class="user-info w-100">
                <h5 class="mb-0 ">
                  کیف پول
                </h5>
              </div>
            </div>
          </div>
          <div class="card user-data-card mb-3 ">
            <div class="card-body">
              <div class="row">
                <div class="col-md-12 col-12 text-center">
                  <p>موجودی : {{ wallet }} تومان</p>
                  <input
                    v-model="chargePrice"
                    class="form-control bg-dar-input"
                    type="number"
                    placeholder="مبلغ شارژ به تومان"
                  >
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <a href="javascript:;" class="btn btn-success col-12" type="submit" @click="chargeWallet">
                    شارژ کیف پول
                  </a>
                </div>
                <div class="col-6">
                  <a href="javascript:;" class="btn btn-success col-12" type="submit">
                    درخواست برداشت
                  </a>
                </div>
                <div class="col-12">
                  <a href="/dashboard/anicart" class="btn btn-success col-12" type="submit">
                    تراکنش ها
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="card user-info-card mt-3 text-center">
            <div class="card-body p-3 d-flex align-items-center ">
              <div class="user-info w-100">
                <h5 class="mb-0 ">
                  Wallet
                </h5>
              </div>
            </div>
          </div>
          <div class="card user-data-card mb-3 ">
            <div class="card-body">
              <div class="row">
                <div class="col-md-12 col-12  text-center">
                  <p>TNGJqG4Rknmqw9wMoAo7PKm5wcawkAuKYJ</p>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <a href="javascript:;" class="btn btn-success col-12" type="submit" @click="copy">
                    کپی آدرس ولت
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="card user-info-card mt-3 text-center">
            <div class="card-body p-3 d-flex align-items-center ">
              <div class="user-info w-100">
                <h5 class="mb-0 ">
                  درآمد پذیرنده
                </h5>
              </div>
            </div>
          </div>
          <div class="card user-data-card mb-3 ">
            <div class="card-body">
              <div class="row">
                <div class="col-md-12 col-12 text-center">
                  <p>مجموع درآمد : {{ shopWallet }} تومان</p>
<!--                  <p>درآمد قابل برداشت : {{ PaymentShopPrice }} تومان</p>-->
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <a href="javascript:;" class="btn btn-success col-12" @click="requestPayment=true" type="submit">
                    برداشت درامد
                  </a>
                </div>
                <div class="col-6">
                  <a href="/dashboard/report" class="btn btn-success col-12" type="submit">
                    تراکنش ها
                  </a>
                </div>
                <div class="col-12">
                  <a href="/dashboard/requestPaymentShop" class="btn btn-success col-12" type="submit">
                    درخواست ها
                  </a>
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
                            <span class="float-left">{{ shopWallet }}</span>
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
      </div>
    </div>

    <!-- Internet Connection Status-->
    <Footer />
  </div>
</template>

<script>

import axios from 'axios'
//  import router from "../router";
//  import router from "../router";
import Header from '../../components/sections/Header.vue'
import Footer from '../../components/sections/Footer.vue'
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
        wallet: null
      }),
      chargePrice: null,
      commissionTotal: null,
      commissionPay: null,
      allScore: null,
      getScore: null,
      vip: null,
      vipLevel: null,
      type: null,
      wallet: null,
      requestPayment: false
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
          thisData.wallet = response.data.data.virtualCardAmount
          thisData.shopWallet = response.data.data.shopWallet
          // thisData.vip = response.data.data.vip
          // thisData.vipLevel = response.data.data.vipLevel
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
    chargeWallet () {
      const formDataInfo = this.formData
      // const thisData = this
      axios
        .post('https://dbsa.ir/api/chargeAnicard', {
          user_id: localStorage.userId,
          token: localStorage.token,
          amount: this.chargePrice
        })
        .then(function (response) {
          if (response.data.data.type === 3) {
            window.location = response.data.data.message
            // window.open(response.data.data.message)
          }
          formDataInfo.loading = false
        })
        .catch(function (error) {
          console.log(error)
          formDataInfo.loading = false
        })
    },
    requestPaymentForm () {
      const formDataInfo = this.formData
      const thisData = this
      const formDataV = new FormData()
      formDataV.append('price', this.requestPaymentPrice)
      formDataV.append('typeRequest', 'shopPayment')
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
            thisData.shopWallet = response.data.data.shopWallet
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
    },
    copy () {
      const tmpTextField = document.createElement('textarea')
      tmpTextField.textContent = 'TNGJqG4Rknmqw9wMoAo7PKm5wcawkAuKYJ'
      document.body.appendChild(tmpTextField)
      tmpTextField.select()
      tmpTextField.setSelectionRange(0, 99999) /* For mobile devices */
      document.execCommand('copy')
      tmpTextField.remove()
      this.$toast.show('کپی انجام شد', {
        position: 'bottom-center',
        type: 'success',
        theme: 'bubble',
        duration: 7000
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

</style>

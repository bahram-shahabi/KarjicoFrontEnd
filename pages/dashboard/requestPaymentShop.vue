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
    <Header />
    <div class="page-content-wrapper direction-rtl">
      <div class="container">
        <!-- Cart Wrapper-->
        <div class="cart-wrapper-area py-3">
          <div class="card cart-amount-area mb-3">
            <div class="card-body d-flex align-items-center justify-content-between">
              <strong class="total-price mb-0">لیست درخواست های برداشت</strong>
              <p>جمع کل درخواست :{{totalPrice}}</p>
            </div>
          </div>
          <div class="card cart-amount-area mb-3">
            <div class="card-body d-flex align-items-center justify-content-between">
              <nav aria-label="...">
                <ul class="pagination pagination-sm">
                  <li v-if="formData.current_page !== 1" class="page-item">
                    <a class="page-link" href="#" @click="getData(1)">1</a>
                  </li>
                  <li v-if="formData.current_page !== 1" class="page-item ">
                    <a class="page-link" href="#" @click="getData(formData.current_page-1)">
                      قبلی
                    </a>
                  </li>
                  <li class="page-item active">
                    <a class="page-link" href="#">{{ formData.current_page }}</a>
                  </li>
                  <li v-if="formData.last_page !== formData.current_page" class="page-item ">
                    <a class="page-link" href="#" @click="getData(formData.current_page+1)">
                      بعدی
                    </a>
                  </li>
                  <li v-if="formData.last_page !== formData.current_page" class="page-item ">
                    <a class="page-link" href="#" @click="getData(formData.last_page)">{{ formData.last_page }}</a>
                  </li>
                </ul>
              </nav>
              تعداد کل آیتم ها {{ formData.total }}
            </div>
          </div>
          <div class="cart-table card mb-3">
            <div class="table-responsive card-body">
              <table class="table mb-0">
                <tbody>
                  <tr>
                    <td>
                      ردیف
                    </td>
                    <td>کد کاربری</td>
                    <td>نام کاربری</td>
                    <td>نام و نام خانوادگی</td>
                    <td>مبلغ قابل پرداخت</td>
                    <td>شماره کارت</td>
                    <td>شماره حساب</td>
                    <td>شماره شبا</td>
                    <td>تاریخ درخواست</td>
                    <td>تاریخ درخواست- شمسی</td>
                    <td>تاریخ پرداخت</td>
                    <td>تاریخ پرداخت - شمسی</td>
                  </tr>
                  <tr v-for="item in formData.requestData" :key="item.id" :class="{ backgroundGreen: item.paid_date }">
                    <td>
                      <div class="quantity">
                        <a href="#">{{ item.id }}</a>
                      </div>
                    </td>
                    <td style="min-width: 200px;">
                      <a href="#">{{ item.user_id }}</a>
                    </td>
                    <td style="min-width: 200px;">
                      <a href="#">{{ item.username }}</a>
                    </td>
                    <td style="min-width: 200px;">
                      <a href="#">{{ item.name }}</a>
                    </td>
                    <td style="min-width: 200px;">
                      <a href="#">{{ item.price }}</a>
                    </td>
                    <td style="min-width: 200px;">
                      <a href="#">{{ item.card_number }}</a>
                    </td>
                    <td style="min-width: 200px;">
                      <a href="#">{{ item.account_number }}</a>
                    </td>
                    <td style="min-width: 200px;">
                      <a href="#">{{ item.shaba_number }}</a>
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
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- Coupon Area-->
          <!-- Cart Amount Area-->
          <div class="card cart-amount-area">
            <div class="card-body d-flex align-items-center justify-content-between">
              <nav aria-label="...">
                <ul class="pagination pagination-sm">
                  <li v-if="formData.current_page !== 1" class="page-item">
                    <a class="page-link" href="#" @click="getData(1)">1</a>
                  </li>
                  <li v-if="formData.current_page !== 1" class="page-item ">
                    <a class="page-link" href="#" @click="getData(formData.current_page-1)">
                      قبلی
                    </a>
                  </li>
                  <li class="page-item active">
                    <a class="page-link" href="#">{{ formData.current_page }}</a>
                  </li>
                  <li v-if="formData.last_page !== formData.current_page" class="page-item ">
                    <a class="page-link" href="#" @click="getData(formData.current_page+1)">
                      بعدی
                    </a>
                  </li>
                  <li v-if="formData.last_page !== formData.current_page" class="page-item ">
                    <a class="page-link" href="#" @click="getData(formData.last_page)">{{ formData.last_page }}</a>
                  </li>
                </ul>
              </nav>
              تعداد کل آیتم ها {{ formData.total }}
            </div>
          </div>
        </div>
      </div>
    </div>

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
// import FlipCountdown from 'vue2-flip-countdown'
import Header from '../../components/sections/Header.vue'
import Footer from '../../components/sections/Footer.vue'
Vue.use(VueSweetalert2)
export default {
  components: {
    // FlipCountdown,
    Footer,
    Header
  },
  data () {
    return {
      map: null,
      formData: ({
        loading: true,
        requestData: [],
        perPage: 10,
        page: 1,
        current_page: 1,
        total: 1,
        last_page: 1
      }),
      totalPrice: null,
      description: null,
      showModal: false,
      pageData: null,
      itemId: null

    }
  },
  created () {
    const formDataInfo = this.formData
    const thisData = this
    const formDataV = new FormData()
    formDataV.append('per_page', formDataInfo.perPage)
    formDataV.append('page', formDataInfo.page)
    axios
      .post('https://karjico.ir/api/user/requestPaymentShop', formDataV,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + localStorage.getItem('api_token')
          }
        })
      .then(function (response) {
        formDataInfo.requestData = response.data.data.requestPayment.data
        formDataInfo.loading = false
        formDataInfo.current_page = response.data.data.requestPayment.current_page
        formDataInfo.per_page = response.data.data.requestPayment.per_page
        formDataInfo.total = response.data.data.requestPayment.total
        formDataInfo.last_page = response.data.data.requestPayment.last_page
        thisData.totalPrice = response.data.data.totalPrice
        console.log(response.data.data.requestPayment)
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
    getData (pageData) {
      const formDataInfo = this.formData
      const thisData = this
      const formDataV = new FormData()
      formDataV.append('per_page', formDataInfo.perPage)
      formDataV.append('page', pageData)
      axios
        .post('https://karjico.ir/api/user/requestPaymentShop', formDataV,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + localStorage.getItem('api_token')
            }
          })
        .then(function (response) {
          formDataInfo.requestData = response.data.data.requestPayment.data
          formDataInfo.loading = false
          formDataInfo.current_page = response.data.data.requestPayment.current_page
          formDataInfo.per_page = response.data.data.requestPayment.per_page
          formDataInfo.total = response.data.data.requestPayment.total
          formDataInfo.last_page = response.data.data.requestPayment.last_page
          console.log(response.data.data.slider)
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
input{
  color: #000;
}
textarea{
  color: #000
}
.backgroundGreen{
  background-color: #40ff40!important;
}
</style>

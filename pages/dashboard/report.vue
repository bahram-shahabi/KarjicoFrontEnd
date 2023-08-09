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
              <strong class="total-price mb-0">لیست تراکنش ها</strong>
              <p>
                جمع مبلغ خرید  {{paymentCustomerPrice}}
                ---
                جمع مبلغ دریافتی {{paymentToShop}}
              </p>
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
                    <td>شماره تراکنش</td>
                    <td>زمان</td>
                    <td>خریدار</td>
                    <td> کاربری خریدار</td>
                    <td>مبلغ خرید</td>
                    <td>مبلغ تخفیف</td>
                    <td>مبلغ دریافتی</td>
                  </tr>
                  <tr v-for="(item , count) in formData.shopData" :key="item.id">
                    <td>
                      <div class="quantity">
                        <a href="#">{{ count+1 }}</a>
                      </div>
                    </td>
                    <td>
                      <div class="quantity">
                        <a href="#">{{ item.id }}</a>
                      </div>
                    </td>
                    <td style="min-width: 200px;">
                      <a href="#">{{ item.j_date }}</a>
                    </td>
                    <td style="min-width: 200px;">
                      <a href="#">{{ item.buyer_name }}</a>
                    </td>
                    <td style="min-width: 200px;">
                      <a href="#">{{ item.buyer_username }}</a>
                    </td>
                    <td style="min-width: 200px;">
                      <a href="#">{{ item.amount }}</a>
                    </td>
                    <td style="min-width: 200px;">
                      <a href="#">{{ item.amount-item.pay_shop }}</a>
                    </td>
                    <td style="min-width: 200px;">
                      <a href="#">{{ item.pay_shop }}</a>
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
import Footer from '../../components/sections/Footer.vue'
import Header from '../../components/sections/Header.vue'
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
        shopData: [],
        perPage: 10,
        page: 1,
        current_page: 1,
        total: 1,
        last_page: 1
      }),
      paymentCustomerPrice: 0,
      discountPrice: 0,
      paymentToShop: 0,
      id: this.$route.params.shop
    }
  },
  created () {
    const formDataInfo = this.formData
    const thisData = this
    const formDataV = new FormData()
    formDataV.append('per_page', formDataInfo.perPage)
    formDataV.append('page', formDataInfo.page)
    // const routerData = this.$router

    axios
      .post('https://karjico.ir/api/user/shopReport', formDataV,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + localStorage.getItem('api_token')
          }
        })
      .then(function (response) {
        formDataInfo.shopData = response.data.data.shop.data
        thisData.paymentCustomerPrice = response.data.data.paymentCustomerPrice
        thisData.discountPrice = response.data.data.discountPrice
        thisData.paymentToShop = response.data.data.paymentToShop
        formDataInfo.loading = false
        formDataInfo.current_page = response.data.data.shop.current_page
        formDataInfo.per_page = response.data.data.shop.per_page
        formDataInfo.total = response.data.data.shop.total
        formDataInfo.last_page = response.data.data.shop.last_page
        console.log(response.data.data.shop)
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
      const routerData = this.$router
      axios
        .post('https://dbsa.ir/api/admin/shop/index', {
          token: localStorage.token,
          per_page: formDataInfo.perPage,
          page: pageData
        })
        .then(function (response) {
          formDataInfo.shopData = response.data.data.shop.data
          formDataInfo.loading = false
          formDataInfo.current_page = response.data.data.shop.current_page
          formDataInfo.per_page = response.data.data.shop.per_page
          formDataInfo.total = response.data.data.shop.total
          formDataInfo.last_page = response.data.data.shop.last_page
          console.log(response.data.data.slider)
        })
        .catch(function (error) {
          routerData.push({ name: 'login' })
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

</style>

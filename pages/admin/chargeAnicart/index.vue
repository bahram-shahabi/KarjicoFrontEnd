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
              <strong class="total-price mb-0">لیست شارژها</strong>
              <div class="card-body">
                <div class="row">
                  <div class="col-12 mb-3">
                    <input v-model="search" class="form-control" type="text" @input="getData(1)">
                  </div>
                </div>
              </div>
              <a class="btn btn-warning" href="/admin/chargeAnicart/create">جدید</a>
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
                    <td>نام و نام خانوادکی</td>
                    <td>نام کاربری</td>
                    <td>موبایل</td>
                    <td>کد کاربری</td>
                    <td>مبلغ</td>
                    <td>تاریخ</td>
                    <td>تاریخ-شمسی</td>
                    <th scope="row">
                      عملیات
                    </th>
                  </tr>
                  <tr v-for="item in formData.walletData" :key="item.id">
                    <td>
                      <div class="quantity">
                        <a href="#">{{ item.id }}</a>
                      </div>
                    </td>
                    <td style="min-width: 200px;">
                      <a href="#">{{ item.user.name }} {{ item.user.last_name }}</a>
                    </td>
                    <td style="min-width: 200px;">
                      <a href="#">{{ item.user.username }}</a>
                    </td>
                    <td style="min-width: 200px;">
                      <a href="#">{{ item.user.phone }}</a>
                    </td>
                    <td style="min-width: 200px;">
                      <a href="#">{{ item.user.id }}</a>
                    </td>
                    <td style="min-width: 200px;">
                      <a href="#">{{ item.amount }}</a>
                    </td>
                    <td style="min-width: 200px;">
                      <a href="#">{{ item.MDataCreatedAt }}</a>
                    </td>
                    <td style="min-width: 200px;">
                      <a href="#">{{ item.JDataCreatedAt }}</a>
                    </td>
                    <th scope="row">
                      <a class="remove-product" href="#" @click="remove(formData.current_page,item.id)"><i class="lni lni-close" /></a>
                      <nuxt-link class="remove-product edit" :to="'/wallet/'+item.id">
                        <i class="lni lni-pencil" />
                      </nuxt-link>
                    </th>
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
import Header from '../../../components/sections/admin/Header.vue'
import Footer from '../../../components/sections/admin/Footer.vue'
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
      search: null,
      formData: ({
        loading: true,
        walletData: [],
        perPage: 10,
        page: 1,
        current_page: 1,
        total: 1,
        last_page: 1
      })

    }
  },
  created () {
    const formDataInfo = this.formData
    const thisData = this
    const formDataV = new FormData()
    formDataV.append('per_page', formDataInfo.perPage)
    formDataV.append('page', formDataInfo.page)
    formDataV.append('search', this.search)
    axios
      .post('https://karjico.ir/api/admin/report/listChargeAnicard', formDataV,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + localStorage.getItem('api_token')
          }
        })
      .then(function (response) {
        formDataInfo.walletData = response.data.data.wallet.data
        formDataInfo.loading = false
        formDataInfo.current_page = response.data.data.wallet.current_page
        formDataInfo.per_page = response.data.data.wallet.per_page
        formDataInfo.total = response.data.data.wallet.total
        formDataInfo.last_page = response.data.data.wallet.last_page
        console.log(response.data.data.wallet)
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
      formDataV.append('search', this.search)
      axios
        .post('https://karjico.ir/api/admin/report/listChargeAnicard', formDataV,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + localStorage.getItem('api_token')
            }
          })
        .then(function (response) {
          formDataInfo.walletData = response.data.data.wallet.data
          formDataInfo.current_page = response.data.data.wallet.current_page
          formDataInfo.per_page = response.data.data.wallet.per_page
          formDataInfo.total = response.data.data.wallet.total
          formDataInfo.last_page = response.data.data.wallet.last_page
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

    remove (pageData, itemId) {
      const routerData = this.$router
      this.$swal.fire({
        title: 'از حذف این آیتم مطمئن هستید',
        showCancelButton: true,
        confirmButtonText: 'بلی',
        cancelButtonText: 'خیر'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          const formDataInfo = this.formData
          // const routerData = this.$router
          if (localStorage.token === undefined || localStorage.userId === undefined) {
            this.$router.push({ name: 'login' })
          }
          axios
            .post('https://dbsa.ir/api/admin/slider/destroy', {
              id: localStorage.getItem('userId'), // localStorage.userId,
              api_token: localStorage.getItem('token'), // localStorage.token
              per_page: formDataInfo.perPage,
              page: pageData,
              slider_id: itemId
            })
            .then(function (response) {
              formDataInfo.sliderData = response.data.data.slider.data
              formDataInfo.loading = false
              formDataInfo.current_page = response.data.data.slider.current_page
              formDataInfo.per_page = response.data.data.slider.per_page
              formDataInfo.total = response.data.data.slider.total
              formDataInfo.last_page = response.data.data.slider.last_page
              console.log(response.data.data.slider)
            })
            .catch(function (error) {
              routerData.push({ name: 'login' })
              console.log(error)
              formDataInfo.loading = false
            })
          this.$swal.fire({
            icon: 'success',
            title: 'حذف با موفقیت انجام شد',
            confirmButtonText: 'بستن'
          })
        }
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

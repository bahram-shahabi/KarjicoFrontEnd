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
              <strong class="total-price mb-0">لیست تبلیغات</strong>
              <a class="btn btn-warning" href="/admin/adv/create">جدید</a>
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
                    <td>عنوان</td>
                    <th scope="row">
                      عملیات
                    </th>
                  </tr>
                  <tr v-for="item in formData.advData" :key="item.id">
                    <td>
                      <div class="quantity">
                        <a href="#">{{ item.id }}</a>
                      </div>
                    </td>
                    <td style="min-width: 200px;">
                      <a href="#">{{ item.title }}</a>
                    </td>
                    <th scope="row">
                      <a class="remove-product" href="#" @click="remove(formData.current_page,item.id)"><i class="lni lni-close" /></a>
                      <nuxt-link class="remove-product edit" :to="'/admin/adv/'+item.id">
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
      formData: ({
        loading: true,
        advData: [],
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
    axios
      .post('https://karjico.ir/api/admin/adv/index', formDataV,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + localStorage.getItem('api_token')
          }
        })
      .then(function (response) {
        formDataInfo.advData = response.data.data.adv.data
        formDataInfo.loading = false
        formDataInfo.current_page = response.data.data.adv.current_page
        formDataInfo.per_page = response.data.data.adv.per_page
        formDataInfo.total = response.data.data.adv.total
        formDataInfo.last_page = response.data.data.adv.last_page
        console.log(response.data.data.adv)
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
      formDataV.append('page', formDataInfo.page + 1)
      axios
        .post('https://karjico.ir/api/admin/adv/index', formDataV,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + localStorage.getItem('api_token')
            }
          })
        .then(function (response) {
          formDataInfo.advData = response.data.data.adv.data
          formDataInfo.loading = false
          formDataInfo.current_page = response.data.data.adv.current_page
          formDataInfo.per_page = response.data.data.adv.per_page
          formDataInfo.total = response.data.data.adv.total
          formDataInfo.last_page = response.data.data.adv.last_page
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
    },

    remove (pageData, itemId) {
      this.$swal.fire({
        title: 'از حذف این آیتم مطمئن هستید',
        showCancelButton: true,
        confirmButtonText: 'بلی',
        cancelButtonText: 'خیر'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          const formDataInfo = this.formData
          const thisData = this
          const formDataV = new FormData()
          formDataV.append('per_page', formDataInfo.perPage)
          formDataV.append('page', formDataInfo.page)
          formDataV.append('adv_id', itemId)
          axios
            .post('https://karjico.ir/api/admin/adv/destroy', formDataV,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  Authorization: 'Bearer ' + localStorage.getItem('api_token')
                }
              })
            .then(function (response) {
              formDataInfo.advData = response.data.data.adv.data
              formDataInfo.loading = false
              formDataInfo.current_page = response.data.data.adv.current_page
              formDataInfo.per_page = response.data.data.adv.per_page
              formDataInfo.total = response.data.data.adv.total
              formDataInfo.last_page = response.data.data.adv.last_page
              this.$swal.fire({
                icon: 'success',
                title: 'حذف با موفقیت انجام شد',
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

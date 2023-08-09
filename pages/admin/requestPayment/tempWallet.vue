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
              <strong class="total-price mb-0">لیست کاربران واجد شرایط</strong>
              <input v-model="minShareMony" class="btn btn-warning">
              <a class="btn btn-warning" @click="shareMony">تقسیم</a>
            </div>
            <div class="col-12 ">
              <div class="row">
                <div class="col-4  ">
                  <span>جمع پرداختی تا کنون:</span><span>{{ payPrice }}</span>
                </div>
                <div class="col-4  ">
                  <span>جمع پول قابل پرداخت:</span><span>{{ activePrice - payPrice }}</span>
                </div>
                <div class="col-4  ">
                  <span>تعداد کاربران:</span><span>{{ userCount }}</span>
                </div>
              </div>
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
                    <td>نام کاربری</td>
                    <td>نام</td>
                    <td>نام خانوادگی</td>
                  </tr>
                  <tr v-for="item in formData.requestData" :key="item.id" :class="{ backgroundGreen: item.paid_date }">
                    <td>
                      <div class="quantity">
                        <a href="#">{{ item.id }}</a>
                      </div>
                    </td>
                    <td>
                      <a href="#">{{ item.username }}</a>
                    </td><td>
                      <a href="#">{{ item.name }}</a>
                    </td>
                    <td>
                      <a href="#">{{ item.last_name }}</a>
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

        <div
          v-if="showModal"
          class="modal fade show"
          tabindex="-1"
          aria-labelledby="exampleModalScrollableTitle"
          style="display: block;"
          aria-modal="true"
          role="dialog"
        >
          <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">
                  توضیحات
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  @click="showModal = false"
                />
              </div>
              <div class="modal-body">
                <div class="card user-data-card">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-md-12 col-12 mb-3">
                        <div class="title mb-2">
                          <i class="lni lni-pencil" /><span>توضیحات</span>
                        </div>
                        <textarea v-model="description" class="form-control" cols="4" />
                      </div>
                    </div>
                    <div class="separator-small" />
                    <button class="btn btn-success w-100" @click="setDescription1()">
                      ثبت اطلاعات
                    </button>
                  </div>
                </div>
              </div>
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
        requestData: [],
        perPage: 10,
        page: 1,
        current_page: 1,
        total: 1,
        last_page: 1
      }),
      description: null,
      showModal: false,
      pageData: null,
      itemId: null,
      payPrice: 0,
      activePrice: 0,
      userCount: 0,
      minShareMony: 0
    }
  },
  created () {
    const formDataInfo = this.formData
    const thisData = this
    const formDataV = new FormData()
    formDataV.append('per_page', formDataInfo.perPage)
    formDataV.append('page', formDataInfo.page)
    axios
      .post('https://karjico.ir/api/admin/report/tempWallet', formDataV,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + localStorage.getItem('api_token')
          }
        })
      .then(function (response) {
        formDataInfo.requestData = response.data.data.users.data
        formDataInfo.loading = false
        formDataInfo.current_page = response.data.data.users.current_page
        formDataInfo.per_page = response.data.data.users.per_page
        formDataInfo.total = response.data.data.users.total
        formDataInfo.last_page = response.data.data.users.last_page
        thisData.payPrice = response.data.data.payPrice
        thisData.activePrice = response.data.data.activePrice
        thisData.userCount = response.data.data.userCount
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
        .post('https://karjico.ir/api/admin/report/tempWallet', formDataV,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + localStorage.getItem('api_token')
            }
          })
        .then(function (response) {
          formDataInfo.requestData = response.data.data.users.data
          formDataInfo.loading = false
          formDataInfo.current_page = response.data.data.users.current_page
          formDataInfo.per_page = response.data.data.users.per_page
          formDataInfo.total = response.data.data.users.total
          formDataInfo.last_page = response.data.data.users.last_page
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
          formDataV.append('page', pageData)
          formDataV.append('request_id', itemId)
          axios
            .post('https://karjico.ir/api/admin/report/removePayDate', formDataV,
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
          this.$swal.fire({
            icon: 'success',
            title: 'حذف با موفقیت انجام شد',
            confirmButtonText: 'بستن'
          })
        }
      })
    },
    setPayDate (pageData, itemId) {
      this.$swal.fire({
        title: 'از ثبت پرداخت این آیتم مطمئن هستید',
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
          formDataV.append('page', pageData)
          formDataV.append('request_id', itemId)
          axios
            .post('https://karjico.ir/api/admin/report/setPayDate', formDataV,
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
          this.$swal.fire({
            icon: 'success',
            title: 'ثبت پرداختی انجام شد',
            confirmButtonText: 'بستن'
          })
        }
      })
    },
    setDescription (pageData, itemId, description) {
      this.showModal = true
      this.description = description
      this.pageData = pageData
      this.itemId = itemId
    },
    setDescription1 () {
      const formDataInfo = this.formData
      const thisData = this
      const formDataV = new FormData()
      formDataV.append('per_page', formDataInfo.perPage)
      formDataV.append('page', this.pageData)
      formDataV.append('request_id', this.itemId)
      formDataV.append('description', this.description)
      axios
        .post('https://karjico.ir/api/admin/report/setDescriptionPayment', formDataV,
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
          thisData.showModal = false
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
    shareMony () {
      const formDataInfo = this.formData
      const thisData = this
      const formDataV = new FormData()
      formDataInfo.loading = true
      formDataV.append('minShareMony', this.minShareMony)
      axios
        .post('https://karjico.ir/api/admin/report/shareMonyTempWallet', formDataV,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + localStorage.getItem('api_token')
            }
          })
        .then(function (response) {
          if (response.data.data.status !== 200) {
            thisData.$toast.show(response.data.data.message, {
              position: 'bottom-center',
              type: 'error',
              theme: 'bubble',
              duration: 7000
            })
          } else {
            thisData.payPrice = response.data.data.payPrice
            thisData.activePrice = response.data.data.activePrice
            thisData.userCount = response.data.data.userCount
            thisData.$toast.show(response.data.data.message, {
              position: 'bottom-center',
              type: 'success',
              theme: 'bubble',
              duration: 7000
            })
          }
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
  color: #000!important;
}
.backgroundGreen{
  background-color: #40ff40!important;
}
</style>

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
              <strong class="total-price mb-0">لیست کاربران</strong>

              <div class="card-body">
                <div class="row">
                  <div class="col-12 mb-3">
                    <input v-model="search" class="form-control" type="text" @input="getData(1)">
                  </div>
                </div>
              </div>
              <a class="btn btn-warning" @click ="chargAdv=true">شارژ لیست کاربر</a>
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
                  <li v-if="formData.last_page !== formData.current_page" class="page-item ">
                    <input class="searchPage" v-model="current_page" @change="getData(current_page)">

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
                      انتخاب
                    </td>
                    <td>
                      ردیف
                    </td>
                    <td>نام</td>
                    <td>نام خانوادگی</td>
                    <td>نام کاربری</td>
                    <td>موبایل</td>
                    <td>باشگاه</td>
                    <td>استخر</td>
                    <td>سهام</td>
                    <td>تاریخ ایجاد</td>
                    <td>تاریخ ایجاد-شمسی</td>
                    <td>موجودی کیف پول</td>
                    <td>امتیاز</td>
                    <td>دیده شده</td>
                    <td>معرف</td>
                    <th scope="row" style="width: 250px">
                      عملیات
                    </th>
                  </tr>
                  <tr v-for="item in formData.userData" :key="item.id" :class="{ backgroundRed: item.is_active===0 }">
                    <td>
                      <div class="quantity">
                        <input type="checkbox" @click="selectUser(item.id)">
                      </div>
                    </td>
                    <td>
                      <div class="quantity">
                        <a href="#">{{ item.id }}</a>
                      </div>
                    </td>
                    <td style="min-width: 140px;">
                      <a href="#">{{ item.name }}</a>
                    </td>
                    <td style="min-width: 140px;">
                      <a href="#">{{ item.last_name }}</a>
                    </td>
                    <td style="min-width: 140px;">
                      <a href="#">{{ item.username }}</a>
                    </td>
                    <td style="min-width: 100px;">
                      <a href="#">{{ item.phone }}</a>
                    </td>
                    <td style="min-width: 100px;">
                      <a v-if="item.user_plan_info.plan2_position===1" href="#">باشگاه A</a>
                      <a v-else href="#">باشگاه B</a>
                    </td>
                    <td style="min-width: 40px;">
                      <a href="#">{{ item.user_plan_info.vip_share_level }}</a>
                    </td>
                    <td style="min-width: 40px;">
                      <a href="#">{{ item.user_plan_info.plan2_level }}</a>
                    </td>
                    <td style="min-width: 150px;">
                      <a href="#">{{ item.MDataCreatedAt }}</a>
                    </td>
                    <td style="min-width: 150px;">
                      <a href="#">{{ item.JDataCreatedAt }}</a>
                    </td>
                    <td style="min-width: 150px;">
                      <a href="#">{{ item.TotalPriceWallet }}</a>
                    </td>
                    <td style="min-width: 100px;">
                      <a href="#">{{ item.AllScore }}</a>
                    </td>
                    <td style="min-width: 100px;">
                      <a href="#">{{ item.AllVisitScore }}</a>
                    </td>
                    <td style="min-width: 200px;">
                      <a href="#">{{ item.user_plan_info.user_parent_info.username }}</a>
                    </td>
                    <th scope="row" style="min-width: 140px;" >
                      <a class="remove-product" href="#" @click="login(item.id)">ورود</a>
                      <a v-if="item.is_active===1" class="remove-product" style="width: 50px" href="#" @click="logoutUser(item.id)">غیر فعال</a>
                      <a v-if="item.is_active===0" class="remove-product" href="#" @click="activeUser(item.id)">فعال</a>
                      <nuxt-link class="remove-product edit" :to="'/admin/user/'+item.id">
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
                  <li v-if="formData.last_page !== formData.current_page" class="page-item ">
                    <input class="searchPage" v-model="current_page" @change="getData(current_page)">

                  </li>
                </ul>
              </nav>
              تعداد کل آیتم ها {{ formData.total }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="chargAdv"
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
              شارژ کاربر های انتخاب شده
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="chargAdv = false"
            />
          </div>
          <div class="modal-body bg-dark">
            <div class="">
              <div class="container">
                <div class="row mt-10">
                  <div class="col-12 mb-3">
                    <div class="listChargePrice mt-0">
                      <p class="color-white p-2 m-1 mb-2">
                        <input
                          v-model="priceAdv"
                          class="form-control mb-3 bg-dar-input mt-2 border2 border-yellow"
                          type="number"
                          placeholder="مبلغ هر تبلیغ"
                        >
                      </p>
                      <p class="color-white p-2 m-1 mb-2">
                        <input
                          v-model="numAdv"
                          class="form-control mb-3 bg-dar-input mt-2 border2 border-yellow"
                          type="number"
                          placeholder="تعداد تبلیغ"
                        >
                      </p>
                      <button class="btn btn-success w-100" @click="chargUserAdv">
                        شارژ لیست کاربران
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
      chargAdv: false,
      priceAdv: 0,
      numAdv: 0,
      map: null,
      search: null,
      current_page: 1,
      selectedUser: [],
      formData: ({
        loading: true,
        userData: [],
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
      .post('https://karjico.ir/api/admin/user/index', formDataV,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + localStorage.getItem('api_token')
          }
        })
      .then(function (response) {
        formDataInfo.userData = response.data.data.user.data
        formDataInfo.loading = false
        formDataInfo.current_page = response.data.data.user.current_page
        formDataInfo.per_page = response.data.data.user.per_page
        formDataInfo.total = response.data.data.user.total
        formDataInfo.last_page = response.data.data.user.last_page
        thisData.current_page = response.data.data.user.current_page
        console.log(response.data.data.user)
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
        .post('https://karjico.ir/api/admin/user/index', formDataV,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + localStorage.getItem('api_token')
            }
          })
        .then(function (response) {
          formDataInfo.userData = response.data.data.user.data
          formDataInfo.loading = false
          formDataInfo.current_page = response.data.data.user.current_page
          formDataInfo.per_page = response.data.data.user.per_page
          formDataInfo.total = response.data.data.user.total
          formDataInfo.last_page = response.data.data.user.last_page
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
    login (itemId) {
      const formDataInfo = this.formData
      // const routerData = this.$router
      this.formData.loading = true
      const thisData = this
      const formDataV = new FormData()
      formDataV.append('user_id', itemId)
      axios
        .post('https://karjico.ir/api/admin/user/login', formDataV,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + localStorage.getItem('api_token')
            }
          })
        .then(function (response) {
          if (response.data.data.code === 200) {
            localStorage.setItem('admin_api_token', localStorage.getItem('api_token'))
            localStorage.setItem('api_token', response.data.data.token)
            thisData.token = localStorage.api_token
            thisData.receivedCode = 0

            if (response.data.data.roles.includes(1)) {
              localStorage.setItem('admin', 1)
              thisData.admin = 1
            }
            if (response.data.data.roles.includes(2)) {
              localStorage.setItem('user', 1)
              thisData.coach = 1
            }
            if (response.data.data.roles.includes(3)) {
              localStorage.setItem('shop', 1)
              thisData.place = 1
            }
            localStorage.name = response.data.data.name
            localStorage.lastName = response.data.data.last_name
            localStorage.mobile = response.data.data.mobile
            localStorage.username = response.data.data.username
            thisData.$router.push({ name: 'index' })
          } else {
            thisData.formData.loading = false
          }
        })
        .catch(function (error) {
          formDataInfo.loading = false
          console.log(error)
        })
    },
    logoutUser (itemId) {
      const formDataInfo = this.formData
      // const routerData = this.$router
      this.formData.loading = true
      const thisData = this
      const formDataV = new FormData()
      formDataV.append('user_id', itemId)
      formDataV.append('per_page', formDataInfo.perPage)
      formDataV.append('page', formDataInfo.page)
      formDataV.append('search', this.search)
      axios
        .post('https://karjico.ir/api/admin/user/logoutUser', formDataV,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + localStorage.getItem('api_token')
            }
          })
        .then(function (response) {
          if (response.data.data.code === 200) {
            formDataInfo.userData = response.data.data.user.data
            formDataInfo.loading = false
            formDataInfo.current_page = response.data.data.user.current_page
            formDataInfo.per_page = response.data.data.user.per_page
            formDataInfo.total = response.data.data.user.total
            formDataInfo.last_page = response.data.data.user.last_page
            thisData.$toast.show(response.data.data.message, {
              position: 'bottom-center',
              type: 'success',
              theme: 'bubble',
              duration: 7000
            })
          } else {
            thisData.formData.loading = false
          }
        })
        .catch(function (error) {
          formDataInfo.loading = false
          console.log(error)
        })
    },
    activeUser (itemId) {
      const formDataInfo = this.formData
      // const routerData = this.$router
      this.formData.loading = true
      const thisData = this
      const formDataV = new FormData()
      formDataV.append('user_id', itemId)
      formDataV.append('per_page', formDataInfo.perPage)
      formDataV.append('page', formDataInfo.page)
      formDataV.append('search', this.search)
      axios
        .post('https://karjico.ir/api/admin/user/activeUser', formDataV,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + localStorage.getItem('api_token')
            }
          })
        .then(function (response) {
          if (response.data.data.code === 200) {
            thisData.formData.loading = false
            formDataInfo.userData = response.data.data.user.data
            formDataInfo.loading = false
            formDataInfo.current_page = response.data.data.user.current_page
            formDataInfo.per_page = response.data.data.user.per_page
            formDataInfo.total = response.data.data.user.total
            formDataInfo.last_page = response.data.data.user.last_page
            thisData.$toast.show(response.data.data.message, {
              position: 'bottom-center',
              type: 'success',
              theme: 'bubble',
              duration: 7000
            })
          } else {
            thisData.formData.loading = false
          }
        })
        .catch(function (error) {
          formDataInfo.loading = false
          console.log(error)
        })
    },
    selectUser (UserId) {
      if (!this.selectedUser.includes(UserId)) {
        this.selectedUser.push(UserId)
      } else {
        this.selectedUser.splice(this.selectedUser.indexOf(UserId), 1)
      }
    },
    chargUserAdv () {
      this.formData.loading = true
      const thisData = this
      // const routerData = this.$router
      const formDataV = new FormData()

      if (this.numAdv === 0 || this.priceAdv === 0 || this.numAdv === '' || this.priceAdv === '') {
        console.log(this.priceAdv)
        thisData.$toast.show('مقادیر را بررسی نمایید', {
          position: 'bottom-center',
          type: 'error',
          theme: 'bubble',
          duration: 7000
        })
        this.formData.loading = false
        return false
      }

      formDataV.append('numAdv', this.numAdv)
      formDataV.append('priceAdv', this.priceAdv)
      formDataV.append('userListId', this.selectedUser)
      axios
        .post('https://karjico.ir/api/admin/user/ChargeAdvFroUserList', formDataV,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + localStorage.getItem('api_token')
            }
          })
        .then(function (response) {
          // const id = response.data.data.requestInfo
          thisData.formData.loading = false
          thisData.numAdv = 0
          thisData.priceAdv = 0
          thisData.$toast.show('تبلیغ اعمال گردید', {
            position: 'bottom-center',
            type: 'success',
            theme: 'bubble',
            duration: 7000
          })
          // routerData.push({ name: 'slider-id', params: { id } })
        })
        .catch(function (error) {
          console.log(error)
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
.backgroundRed{
  background-color: #ffc8c8 !important;
}
</style>

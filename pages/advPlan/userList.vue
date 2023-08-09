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
              <strong class="total-price mb-0">لیست کاربران شما</strong>
              <a class="btn btn-warning" href="#">انتشار لینک دعوت</a>
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
                    <td>
                      نام کاربری
                    </td>
                    <td>نام و نام خانوادگی</td>
                    <td>محدوده فعلی</td>
                    <td>استخر تبلیغاتی</td>
                    <td>تاریخ عضویت</td>
                    <th>
                      شماره تماس
                    </th>
                  </tr>
                  <tr v-for="(item, count) in formData.userList" :key="item.id">
                    <td>
                      <div class="quantity">
                        <a href="#">{{ count+1 }}</a>
                      </div>
                    </td>
                    <td style="min-width: 100px;">
                      <div class="quantity">
                        <a href="#">--</a>
                      </div>
                    </td>
                    <td style="min-width: 100px;">
                      <a href="#">--</a>
                    </td>
                    <td style="min-width: 100px;">
                      <a href="#">{{ item.level }}</a>
                    </td>
                    <td style="min-width: 100px;">
                      <a href="#">{{ item.vip }}</a>
                    </td>
                    <td style="min-width: 100px;">
                      <a href="#">--</a>
                    </td>
                    <td style="min-width: 100px;">
                      <a href="#">--</a>
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
              تعداد کل گروه تبلیغاتی {{ formData.total }}
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
//  import router from "../router";
//  import router from "../router";
// import FlipCountdown from 'vue2-flip-countdown'
import Footer from '../../components/sections/Footer.vue'
import Header from '../../components/sections/Header.vue'
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
        userList: [],
        auctionData: [],
        perPage: 10,
        page: 1,
        current_page: 1,
        total: 1
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
      .post('https://karjico.ir/api/user/userList', formDataV,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + localStorage.getItem('api_token')
          }
        })
      .then(function (response) {
        formDataInfo.userList = response.data.data.user.data
        formDataInfo.loading = false
        formDataInfo.current_page = response.data.data.user.current_page
        formDataInfo.per_page = response.data.data.user.per_page
        formDataInfo.total = response.data.data.user.total
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
    getData () {
      const formDataInfo = this.formData
      const thisData = this
      const formDataV = new FormData()
      formDataV.append('per_page', formDataInfo.perPage)
      formDataV.append('page', formDataInfo.page)
      axios
        .post('https://karjico.ir/api/user/userList', formDataV,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + localStorage.getItem('api_token')
            }
          })
        .then(function (response) {
          formDataInfo.userList = response.data.data.user.data
          formDataInfo.loading = false
          formDataInfo.current_page = response.data.data.user.current_page
          formDataInfo.per_page = response.data.data.user.per_page
          formDataInfo.total = response.data.data.user.total
          console.log(response.data.data.auction)
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

</style>

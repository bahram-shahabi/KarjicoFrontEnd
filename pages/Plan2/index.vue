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
          <div class="card user-info-card mt-3 text-center">
            <div class="card-body p-3 d-flex align-items-center ">
              <div class="user-info w-100">
                <h5 class="mb-0 ">
                  باشگاه تبلیغاتی
                </h5>
              </div>
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
                      <button class="btn btn-success btn-red w-100 mt-1" @click="upgradeVip(1)">
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
                      <button class="btn btn-success btn-red w-100 mt-1" @click="upgradeVip(2)">
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
                      <button class="btn btn-success btn-red w-100 mt-1" @click="upgradeVip(3)">
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
                      <button class="btn btn-success btn-red w-100 mt-1" @click="upgradeVip(4)">
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
      .post('https://karjico.ir/api/user/plan2Status', formDataV,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + localStorage.getItem('api_token')
          }
        })
      .then(function (response) {
        thisData.userPlan = response.data.data.userPlan
        thisData.parent = response.data.data.parent
        thisData.selectPosition = response.data.data.userPlan.plan2_position
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
    upgradeVip (level) {
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

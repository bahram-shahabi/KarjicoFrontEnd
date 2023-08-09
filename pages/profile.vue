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
          <!--          <div class="card user-info-card">-->
          <!--            <div class="card-body p-4 d-flex align-items-center">-->
          <!--              <div class="user-info">-->
          <!--                <p class="mb-0 text-dark">بهرام شهابی</p>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </div>-->
          <!-- User Meta Data-->
          <!-- User Meta Data-->
          <div class="card user-data-card">
            <div class="card-body">
              <div class="mb-3">
                <div class="title mb-2">
                  <i class="lni lni-envelope" /><span>ایمیل</span>
                </div>
                <input v-model="formData.userData.email" style="color: #000" class="form-control" type="email" required>
              </div>
              <div class="mb-3">
                <div class="title mb-2">
                  <i class="lni lni-user" /><span>شماره حساب</span>
                </div>
                <input v-model="formData.userInfo.account_number" style="color: #000" class="form-control" type="text">
              </div>
              <div class="mb-3">
                <div class="title mb-2">
                  <i class="lni lni-user" /><span>شماره کارت</span>
                </div>
                <input v-model="formData.userInfo.card_number" style="color: #000" class="form-control" type="text">
              </div>
              <div class="mb-3">
                <div class="title mb-2">
                  <i class="lni lni-money-protection" /><span>شماره شبا</span>
                </div>
                <input v-model="formData.userInfo.shaba_number" style="color: #000" class="form-control" type="text">
              </div>
              <button class="btn btn-success w-100" @click="updateUserInfo">
                ثبت
              </button>
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
import Header from '../components/sections/Header.vue'
import Footer from '../components/sections/Footer.vue'
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
        userInfo: null,
        userData: null
      })
    }
  },

  created () {
    const formDataInfo = this.formData
    const thisData = this
    const formDataV = new FormData()
    axios
      .post('https://karjico.ir/api/user/getUserInfo', formDataV,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + localStorage.getItem('api_token')
          }
        })
      .then(function (response) {
        thisData.formData.userInfo = response.data.data.userInfo
        thisData.formData.userData = response.data.data.user
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
    updateUserInfo () {
      const formDataInfo = this.formData
      const thisData = this
      const formDataV = new FormData()
      console.log(formDataInfo.userInfo)
      formDataV.append('userInfo', JSON.stringify(formDataInfo.userInfo))
      formDataV.append('email', this.formData.userData.email)
      axios
        .post('https://karjico.ir/api/user/updateUserInfo', formDataV,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + localStorage.getItem('api_token')
            }
          })
        .then(function (response) {
          thisData.$toast.show('اطلاعات شما با موفقیت ثبت شد', {
            position: 'bottom-center',
            type: 'success',
            theme: 'bubble',
            duration: 7000
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

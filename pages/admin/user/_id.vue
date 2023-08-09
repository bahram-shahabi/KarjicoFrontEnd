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
          <div class="card user-info-card">
            <div class="card-body p-4 d-flex align-items-center">
              <div class="user-info">
                <p class="mb-0 text-dark">
                  ویرایش کاربران
                </p>
              </div>
            </div>
          </div>
          <!-- User Meta Data-->
          <!-- User Meta Data-->
          <div class="card user-data-card">
            <div class="card-body">
              <form @submit.prevent="validateData">
                <div class="row">
                  <div class="col-12 mb-3">
                    <div class="title mb-2">
                      <i class="lni lni-pencil" /><span>نام کاربری</span>
                    </div>
                    <input v-model="username" class="form-control" type="text">
                  </div>
                  <div class="col-12 mb-3">
                    <div class="title mb-2">
                      <i class="lni lni-pencil" /><span>نام</span>
                    </div>
                    <input v-model="firstName" class="form-control" type="text">
                  </div>
                  <div class="col-12 mb-3">
                    <div class="title mb-2">
                      <i class="lni lni-pencil" /><span>نام خانوادگی</span>
                    </div>
                    <input v-model="lastName" class="form-control" type="text">
                  </div>
                </div>
                <button class="btn btn-success w-100" type="submit">
                  ثبت اطلاعات
                </button>
              </form>
            </div>
          </div>

          <div class="card user-info-card mt-10">
            <div class="card-body p-4 d-flex align-items-center">
              <div class="user-info">
                <p class="mb-0 text-dark">
                  ویرایش رمز عبور
                </p>
              </div>
            </div>
          </div>
          <!-- User Meta Data-->
          <!-- User Meta Data-->
          <div class="card user-data-card">
            <div class="card-body">
              <form @submit.prevent="changePass">
                <div class="row">
                  <div class="col-12 mb-3">
                    <div class="title mb-2">
                      <i class="lni lni-pencil" /><span>رمز جدید</span>
                    </div>
                    <input v-model="password" class="form-control" type="text">
                  </div>
                </div>
                <button class="btn btn-success w-100" type="submit">
                  تغییر رمز
                </button>
              </form>
            </div>
          </div>
          <div class="card user-info-card mt-10">
            <div class="card-body p-4 d-flex align-items-center">
              <div class="user-info">
                <p class="mb-0 text-dark">
                  اعمال تبلیغ برای کاربر
                </p>
              </div>
            </div>
          </div>
          <div class="card user-data-card">
            <div class="card-body">
              <form @submit.prevent="ChargeAdvFroUser">
                <div class="row">
                  <div class="col-12 mb-3">
                    <div class="title mb-2">
                      <i class="lni lni-pencil" /><span>تعداد تبلیغ</span>
                    </div>
                    <input v-model="numAdv" class="form-control" type="text">
                  </div>
                  <div class="col-12 mb-3">
                    <div class="title mb-2">
                      <i class="lni lni-pencil" /><span>مبلغ تبلیغ</span>
                    </div>
                    <input v-model="priceAdv" class="form-control" type="text">
                  </div>
                </div>
                <button class="btn btn-success w-100" type="submit">
                  اعمال تبلیغ
                </button>
              </form>
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
import Header from '../../../components/sections/admin/Header.vue'
import Footer from '../../../components/sections/admin/Footer.vue'
export default {
  components: {
    Header,
    Footer
  },
  data () {
    return {
      map: null,
      password: null,
      formData: ({
        loading: true,
        slider: null,
        user: null
      }),
      priceAdv: 0,
      numAdv: 0,
      username: null,
      firstName: null,
      lastName: null,
      id: this.$route.params.id
    }
  },
  watch: {
  },
  created () {
    this.formData.loading = true
    const thisData = this
    const formDataInfo = this.formData
    // const routerData = this.$router
    const formDataV = new FormData()
    formDataV.append('id', this.id)
    axios
      .post('https://karjico.ir/api/admin/user/edit', formDataV,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + localStorage.getItem('api_token')
          }
        })
      .then(function (response) {
        // const id = response.data.data.requestInfo
        thisData.formData.loading = false
        thisData.firstName = response.data.data.user.name
        thisData.lastName = response.data.data.user.last_name
        thisData.username = response.data.data.user.username
        // routerData.push({ name: 'slider-id', params: { id } })
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
    handleImage1Upload (e) {
      this.image = e.target.files[0]
    },
    validateData () {
      this.registerRequest()
    },
    registerRequest () {
      this.formData.loading = true
      const thisData = this
      // const routerData = this.$router
      const formDataV = new FormData()
      formDataV.append('username', this.username)
      formDataV.append('name', this.firstName)
      formDataV.append('last_name', this.lastName)
      formDataV.append('id', this.id)
      axios
        .post('https://karjico.ir/api/admin/user/update', formDataV,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + localStorage.getItem('api_token')
            }
          })
        .then(function (response) {
          // const id = response.data.data.requestInfo
          thisData.formData.loading = false
          thisData.firstName = response.data.data.user.name
          thisData.lastName = response.data.data.user.last_name
          thisData.username = response.data.data.user.username
          // routerData.push({ name: 'slider-id', params: { id } })
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    changePass () {
      this.formData.loading = true
      const thisData = this
      // const routerData = this.$router
      const formDataV = new FormData()
      formDataV.append('password', this.password)
      formDataV.append('id', this.id)
      axios
        .post('https://karjico.ir/api/admin/user/changePass', formDataV,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + localStorage.getItem('api_token')
            }
          })
        .then(function (response) {
          // const id = response.data.data.requestInfo
          thisData.formData.loading = false
          thisData.firstName = response.data.data.user.name
          thisData.lastName = response.data.data.user.last_name
          thisData.username = response.data.data.user.username
          // routerData.push({ name: 'slider-id', params: { id } })
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    ChargeAdvFroUser () {
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
      formDataV.append('userId', this.id)
      axios
        .post('https://karjico.ir/api/admin/user/ChargeAdvFroUser', formDataV,
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
input{
  color: #000!important;
}

</style>

<template>
  <div v-if="formData.loading">
    <p class="spinner-title">
      درحال لود شدن
    </p>
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <div v-else class="login-wrapper d-flex align-items-center justify-content-center text-center">
    <!-- Background Shape-->
    <div class="background-shape"></div>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-sm-9 col-md-7 col-lg-6 col-xl-5">
          <img class="big-logo" src="~/assets/img/icons/logo.png" alt="">
          <!-- Register Form-->
          <div class="register-form mt-5 px-4">
            <form v-on:submit.prevent="onSubmit">
              <div class="form-group text-start mb-4"><span>کد دریافتی</span>
                <label ><i class="lni lni-mobile"></i></label>
                <input class="form-control" v-model.lazy="formData.verificationCode" placeholder="">
              </div>
              <button class="btn btn-warning btn-lg w-100" @click="validateData">دریافت کد</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'default',
  data () {
    return {
      map: null,
      formData: ({
        verificationCode: '',
        titleErrorText: '',
        loading: false
      })
    }
  },
  methods: {
    validateData () {
      if ((this.formData.verificationCode.length === 5)) {
        this.checkVerification()
      } else {
        this.formData.titleErrorText = 'کد معتبر نمی باشد'
      }
    },
    async checkVerification () {
      this.formData.loading = true
      const formDataInfo = this.formData
      console.log(localStorage.getItem('userId'))
      const routerData = this.$router
      await this.$axios
        .post('https://api.rumbamarket.ir/api/verification', {
          id: localStorage.getItem('userId'),
          verification_code: this.formData.verificationCode
        })
        .then(function (response) {
          if (response.data.data.userInfo.id) {
            localStorage.setItem('token', response.data.data.userInfo.api_token)
            formDataInfo.titleErrorText = 'کد معتبر درست'
            formDataInfo.loading = false
            routerData.push({ path: '/' })
          } else {
            formDataInfo.titleErrorText = 'کد معتبر درست'
            formDataInfo.loading = false
          }
        })
        .catch(function (error) {
          formDataInfo.loading = false
          formDataInfo.titleErrorText = 'کد معتبر نمی باشد'
          console.log(error)
        })
    },
    async sendSms  () {
      const response = await this.$axios.post('https://mohandes.app/api/account/login', {
        mobile: this.formData.mobile
      })
      localStorage.setItem('token', response.data.data.token)
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<template>
  <div class="login-wrapper d-flex align-items-center justify-content-center text-center">
    <!-- Background Shape-->
    <div class="background-shape" />
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-sm-9 col-md-7 col-lg-6 col-xl-5">
          <img class="big-logo login-logo" src="~/assets/img/icons/logo.png" alt="">
          <!-- Register Form-->
          <div class="register-form mt-5 px-4">
            <form @submit.prevent="validateData">
              <div class="form-group text-start mb-4">
                <span>نام کاربری</span>
                <label><i class="lni lni-user" /></label>
                <input v-model.lazy="username" class="form-control" placeholder="">
              </div>
              <div class="form-group text-start mb-4">
                <span>کلمه عبور</span>
                <label><i class="lni lni-key" /></label>
                <input v-model.lazy="password" class="form-control" placeholder="">
              </div>
              <button class="btn btn-warning btn-lg w-100">
                ورود
              </button>
              <a class="link-register btn btn-warning btn-danger btn-lg w-100" href="/register">ثبت نام<i class="lni lni-user" /></a>
              <a class="link-register btn  btn-link  btn-lg w-100" href="/remember">کلمه عبور خود را فراموش کرده ام<i class="lni lni-user" /></a>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  layout: 'default',
  data () {
    return {
      map: null,
      formData: ({
        email: '',
        password: '',
        titleErrorText: '',
        loading: false
      }),
      username: '',
      password: ''
    }
  },
  methods: {
    validateData () {
      this.login()
    },
    login  () {
      // const router = this.$router
      const thisData = this
      axios
        .post('https://karjico.ir/api/login', {
          username: this.username,
          password: this.password
        })
        .then(function (response) {
          if (response.data.data.code === 200) {
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
            console.log('333')
            thisData.$router.push({ name: 'index' })
            console.log('444')
          } else {
            thisData.$toast.show('نام کاربری یا رمز ورود اشتباه است', {
              position: 'bottom-center',
              type: 'error',
              theme: 'bubble',
              duration: 7000
            })
            thisData.formData.loading = false
          }
        })
        .catch(function (error) {
          thisData.$toast.show('نام کاربری یا رمز ورود اشتباه است', {
            position: 'bottom-center',
            type: 'error',
            theme: 'bubble',
            duration: 7000
          })
          console.log(error)
        })
    }
  }
}
</script>
<style>
.link-register{
  color:#fff!important;
  margin-top:10px ;

}
.link-register i{
  margin-left: 5px;
}
</style>

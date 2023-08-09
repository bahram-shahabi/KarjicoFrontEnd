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
            <form  @submit.prevent="" v-if="sendCodeItem<3">
              <div class="form-group text-start mb-4">
                <span>نام کاربری</span>
                <label><i class="lni lni-user" /></label>
                <input v-model.lazy="username" class="form-control" placeholder="" :readonly="sendCodeItem > 0">
              </div>
              <div class="form-group text-start mb-4" v-if="sendCodeItem===1" readonly="sendCodeItem > 1">
                <span>کد ارسالی به ایمیل</span>
                <label><i class="lni lni-user" /></label>
                <input v-model.lazy="code" class="form-control" placeholder="">
              </div>
              <div class="form-group text-start mb-4" v-if="sendCodeItem===2" readonly="sendCodeItem > 1">
                <span>کلمه عبور جدید</span>
                <label><i class="lni lni-user" /></label>
                <input v-model.lazy="password" class="form-control" placeholder="">
              </div>
              <button class="btn btn-warning btn-lg w-100" @click="sendCode"  v-if="sendCodeItem===0">
                دریافت کد ورود
              </button>
              <button class="btn btn-warning btn-lg w-100" @click="verifyCode"  v-if="sendCodeItem===1">
                تایید کد
              </button>
              <button class="btn btn-warning btn-lg w-100" @click="acceptCode"  v-if="sendCodeItem===2">
                تایید کلمه عبور جدید
              </button>
            </form>
            <div v-else>
              <p>رمز شما با موفقط تغییر پیدا کرد</p>
              <p>برای ورود با رمز جدید بر روی لینک زیر کلیک نمایید</p>
              <a class="link-register btn btn-warning btn-success btn-lg w-100" href="/login">ورود<i class="lni lni-user" /></a>
            </div>
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
      sendCodeItem: 0,
      code: null,
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
    sendCode  () {
      // const router = this.$router
      const thisData = this
      axios
        .post('https://karjico.ir/api/sendEmailCode', {
          username: this.username
        })
        .then(function (response) {
          if (response.data.data.code === 200) {
            thisData.sendCodeItem = 1
            thisData.$toast.show(response.data.data.message, {
              position: 'bottom-center',
              type: 'success',
              theme: 'bubble',
              duration: 7000
            })
          } else {
            console.log(response.data.data)
            thisData.$toast.show(response.data.data.message, {
              position: 'bottom-center',
              type: 'error',
              theme: 'bubble',
              duration: 7000
            })
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
    },
    verifyCode  () {
      // const router = this.$router
      const thisData = this
      axios
        .post('https://karjico.ir/api/verifyCode', {
          username: this.username,
          code: this.code
        })
        .then(function (response) {
          if (response.data.data.code === 200) {
            thisData.sendCodeItem = 2
            thisData.$toast.show(response.data.data.message, {
              position: 'bottom-center',
              type: 'success',
              theme: 'bubble',
              duration: 7000
            })
          } else {
            thisData.formData.loading = false
            thisData.sendCodeItem = 0
            thisData.$toast.show(response.data.data.message, {
              position: 'bottom-center',
              type: 'error',
              theme: 'bubble',
              duration: 7000
            })
          }
        })
        .catch(function (error) {
          thisData.sendCodeItem = 0
          thisData.$toast.show('خطایی در عملیات رخ داده است', {
            position: 'bottom-center',
            type: 'error',
            theme: 'bubble',
            duration: 7000
          })
          console.log(error)
        })
    },
    acceptCode  () {
      // const router = this.$router
      const thisData = this
      axios
        .post('https://karjico.ir/api/acceptCode', {
          username: this.username,
          code: this.code,
          password: this.password
        })
        .then(function (response) {
          if (response.data.data.code === 200) {
            thisData.sendCodeItem = 3
          } else {
            thisData.sendCodeItem = 0
            thisData.formData.loading = false
            thisData.$toast.show(response.data.data.message, {
              position: 'bottom-center',
              type: 'error',
              theme: 'bubble',
              duration: 7000
            })
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
.toasted.bubble.error{
  text-align: center!important;
  display: initial;
  padding-top: 9px;
}
.toasted.bubble.success{
  text-align: center!important;
  display: initial;
  padding-top: 9px;
}
</style>

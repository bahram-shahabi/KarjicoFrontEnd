<template>
  <div class="container">
    <div class="row justify-content-center">
      <img class="big-logo login-logo" src="~/assets/img/icons/logo.png" alt="">
    </div>
    <div class="register-form rtl mt-5 px-4 direction-rtl">
      <form @submit.prevent="validateData">
        <div class="form-group text-start mb-4">
          <span>نام</span>
          <label><i class="lni lni-user" /></label>
          <input v-model.lazy="name" class="form-control" type="text" placeholder="">
        </div>
        <div class="form-group text-start mb-4">
          <span>نام خانوادگی</span>
          <label><i class="lni lni-user" /></label>
          <input v-model.lazy="last_name" class="form-control" type="text" placeholder="">
        </div>
        <div class="form-group text-start mb-4">
          <span>نام کاربری(حروف انگلیسی)</span>
          <label><i class="lni lni-user" /></label>
          <input
            v-model.lazy="username"
            class="form-control"
            type="text"
            placeholder=""
            pattern="[A-Za-z0-9]+"
            @blur="onInputUsername"
          >
        </div>
        <div class="form-group text-start mb-4" pattern="[a-zA-Z]+">
          <span>  کد معرف </span><span style="color: #5cfa5c">{{ referenceName }}</span>
          <label><i class="lni lni-user" /></label>
          <input v-model.lazy="reference_code" class="form-control" type="text" placeholder="" @blur="onInput">
        </div>
        <div class="form-group text-start mb-4">
          <span>تلفن همراه</span>
          <label><i class="lni lni-mobile" /></label>
          <input
            v-model="phone"
            class="form-control"
            type="number"
            placeholder=""
            pattern="[0-9]+"
          >
        </div>
        <div class="form-group text-start mb-4">
          <span>ایمیل</span>
          <label><i class="lni lni-envelope" /></label>
          <input
            v-model="email"
            class="form-control"
            type="text"
            placeholder=""
          >
        </div>
        <div class="form-group text-start mb-4">
          <span>رمز ورود (حداقل 6 کاراکتر)</span>
          <label><i class="lni lni-lock" /></label>
          <input v-model.lazy="password" class="input-psswd form-control" type="password" placeholder="">
        </div>
        <div class="form-group text-start mb-4">
          <span>تکرار رمز ورود</span>
          <label><i class="lni lni-lock" /></label>
          <input v-model.lazy="repassword" class="input-psswd form-control" type="password" placeholder="">
        </div>
        <div class="form-group text-start mb-4">
          <span>باشگاه مشتریان</span>
          <label><i class="lni lni-grid-alt" /></label>
          <select v-model.lazy="plan" class="form-control ">
            <option value="1" style="color: #000">
              باشگاه A
            </option>
            <option value="2" style="color: #000">
              باشگاه B
            </option>
          </select>
        </div>
        <div class="form-group text-start mb-4">
          <span>کد یکبارمصرف</span>
          <label><i class="lni lni-user" /></label>
          <input
            v-model.lazy="codeVerify"
            class="form-control"
            type="text"
            placeholder=""
            pattern="[A-Za-z0-9]+"
          >
        </div>
<!--        <div>-->
<!--          <div class="title mb-2 checkbox-title">-->
<!--            <input ref="rolesSelected" type="checkbox" class="checkbox">تمامی <a href="/auction"> قوانین و مقررات </a> را مطالعه کرده و با شرایط موافق می باشم-->
<!--          </div>-->
<!--        </div>-->
        <button class="btn btn-warning btn-lg w-100" type="submit">
          ثبت نام
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
Vue.use(VueSweetalert2)
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
      name: null,
      last_name: null,
      phone: null,
      username: '',
      email: '',
      reference_code: null,
      password: null,
      repassword: null,
      referenceName: '',
      checkReference: 0,
      checkUsername: 0,
      plan: null,
      codeVerify: null
    }
  },
  methods: {
    validateData () {
      // if (!this.$refs.rolesSelected.checked) {
      //   this.$swal.fire({
      //     icon: 'warning',
      //     title: 'لطفا قوانین و مقررات را تایید نمایید',
      //     confirmButtonText: 'بستن'
      //   })
      // } else
      if (this.name === '' || this.last_name === '' || this.phone === '' || this.reference_code === '' || this.password === '' || this.repassword === '' || this.username === '' || this.email === '' || this.codeVerify === '' ||
        this.name === null || this.last_name === null || this.phone === null || this.reference_code === null || this.password === null || this.repassword === null || this.username === null || this.email === null || this.codeVerify === null) {
        this.$swal.fire({
          icon: 'warning',
          title: 'لطفا تمامی مقادیر را پر نمایید',
          confirmButtonText: 'بستن'
        })
      } else if (this.plan === '' || this.plan === null) {
        this.$swal.fire({
          icon: 'warning',
          title: 'لطفا باشگاه تبلیغاتی را انتخاب نمایید',
          confirmButtonText: 'بستن'
        })
      } else if (this.password !== this.repassword) {
        this.$swal.fire({
          icon: 'warning',
          title: 'پسورد و تکرار آن یکسان نمی باشد',
          confirmButtonText: 'بستن'
        })
      } else if ((!(this.phone.length === 11)) || (!this.phone.startsWith('09'))) {
        this.$swal.fire({
          icon: 'warning',
          title: 'تلفن همراه صحیح نمی باشد',
          confirmButtonText: 'بستن'
        })
      } else if (this.password.length < 6) {
        this.$swal.fire({
          icon: 'warning',
          title: 'حداقل طول پسورد 6 کاراکتر می باشد',
          confirmButtonText: 'بستن'
        })
      } else if (this.checkReference === 0) {
        this.$swal.fire({
          icon: 'warning',
          title: 'کد معرف معتبر نمی باشد',
          confirmButtonText: 'بستن'
        })
      } else if (this.checkUsername === 0) {
        this.$swal.fire({
          icon: 'warning',
          title: 'نام کاربری تکراری می باشد',
          confirmButtonText: 'بستن'
        })
      } else {
        this.register()
      }
    },
    register  () {
      this.formData.loading = true
      const thisData = this
      const router = this.$router
      this.formData.loading = true
      axios
        .post('https://karjico.ir/api/register-user', {
          name: this.name,
          last_name: this.last_name,
          username: this.username,
          password: this.password,
          reference_code: this.reference_code,
          phone: this.phone,
          plan: this.plan,
          email: this.email,
          codeVerify: this.codeVerify
        })
        .then(function (response) {
          if (response.data.data.code === 200) {
            localStorage.setItem('api_token', response.data.data.token)
            thisData.token = localStorage.api_token
            thisData.receivedCode = 0

            if (response.data.data.roles.includes(1)) {
              localStorage.setItem('admin', 1)
              thisData.admin = 1
              console.log(this.admin)
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
            router.push({ path: '/' })
          } else if (response.data.data.code === 201) {
            thisData.formData.loading = false
            thisData.$swal.fire({
              icon: 'warning',
              title: 'کد معرف اشتباه است',
              confirmButtonText: 'بستن'
            })
          } else if (response.data.data.code === 202) {
            thisData.formData.loading = false
            thisData.$swal.fire({
              icon: 'warning',
              title: 'نام کاربری تکراری می باشد',
              confirmButtonText: 'بستن'
            })
          } else if (response.data.data.code === 203) {
            thisData.formData.loading = false
            thisData.$swal.fire({
              icon: 'warning',
              title: 'نام کاربری باید شامل حروف انگلیسی باشد',
              confirmButtonText: 'بستن'
            })
          } else if (response.data.data.code === 204) {
            thisData.formData.loading = false
            thisData.$swal.fire({
              icon: 'warning',
              title: 'کد یکبار مصرف صحیح نمی باشد',
              confirmButtonText: 'بستن'
            })
          } else if (response.data.data.code === 205) {
            thisData.formData.loading = false
            thisData.$swal.fire({
              icon: 'warning',
              title: response.data.data.message,
              confirmButtonText: 'بستن'
            })
          } else {
            thisData.formData.loading = false
            thisData.$swal.fire({
              icon: 'warning',
              title: 'خطایی در سیستم رخ داده است',
              confirmButtonText: 'بستن'
            })
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    onInput () {
      const thisData = this
      axios
        .post('https://karjico.ir/api/check-username', {
          username: this.reference_code
        })
        .then(function (response) {
          if (response.data.data.code === 200) {
            thisData.referenceName = response.data.data.data.name + ' ' + response.data.data.data.last_name
            thisData.checkReference = 1
          } else {
            thisData.referenceName = 'کد معرف نامعتبر'
            thisData.checkReference = 0
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    onInputUsername () {
      const thisData = this
      axios
        .post('https://karjico.ir/api/check-username', {
          username: this.username
        })
        .then(function (response) {
          if (response.data.data.code === 200) {
            thisData.$swal.fire({
              icon: 'warning',
              title: 'نام کاربری تکراری می باشد',
              confirmButtonText: 'بستن'
            })
            thisData.checkUsername = 0
          } else {
            thisData.checkUsername = 1
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>
<style>
.checkbox-title{
  color: #fff!important;
}
select:focus {
  background-color: blue;
  color: white;
}
select {
  background-color: blue;
  color: white;
}
</style>

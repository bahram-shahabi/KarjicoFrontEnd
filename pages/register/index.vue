<template>
  <div class="login-wrapper d-flex align-items-center justify-content-center text-center">
    <!-- Background Shape-->
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-sm-9 col-md-7 col-lg-6 col-xl-5">
          <img class="big-logo login-logo" src="~/assets/img/icons/logo.png" alt="karjico">
          <div class="mt-5 px-4">
            <div class="row">
              <div class="col-12">
                <div class="card shopCart">
                  <div class="card user-data-card bg-dark">
                    <div class="card-body">
                      <div class="user-icon ">
                          <div class="text-white">
                            <img src="~/assets/img/icons/person-fill-add.svg" alt="">
                          </div>
                          <p>عضویت در کارجیکو</p>
                        </div>
                      <div class="nav nav-tabs card-header-tabs nav-justified mb-3">
                        <a class="nav-link active" href="/register">ثبت نام</a>
                        <a class="nav-link" href="/login">ورود</a>
                      </div>
                      <div class="register-form rtl direction-rtl">
                        <form @submit.prevent="validateData">
                          <div class="btn-charge-div form-group text-start mb-4">
                            <span class="title-div">تلفن همراه</span>
                            <div class="user">
                              <i class="lni lni-phone text-white"></i>
                            </div>
                            <input
                              v-model="phone"
                              class="form-control mb-3 bg-dar-input"
                              type="number"
                              placeholder="تفن همراه خود را وارد کنید"
                              pattern="[0-9]+"
                            >
                          </div>
                          <div class="btn-charge-div form-group text-start mb-4">
                            <span class="title-div">نام</span>
                            <input v-model.lazy="name" class="form-control mb-3 bg-dar-input" type="text" placeholder="نام خود را وارد کنید">
                          </div>
                          <div class="btn-charge-div form-group text-start mb-4">
                            <span class="title-div">نام خانوادگی</span>
                            <input v-model.lazy="last_name" class="form-control mb-3 bg-dar-input" type="text" placeholder="نام خانوادگی خود را وارد کنید">
                          </div>
                          <!-- <div class="btn-charge-div form-group text-start mb-4">
                            <span class="title-div">نام کاربری(حروف انگلیسی)</span>
                            <input
                              v-model.lazy="username"
                              class="form-control mb-3 bg-dar-input"
                              type="text"
                              placeholder="نام کاربری خود را وارد کنید (حروف انگلیسی)"
                              pattern="[A-Za-z0-9]+"
                              @blur="onInputUsername"
                            >
                          </div> -->
                          <!-- <div class="btn-charge-div form-group text-start mb-4">
                            <span class="title-div">ایمیل</span>
                            <input
                              v-model="email"
                              class="form-control mb-3 bg-dar-input"
                              type="text"
                              placeholder=""
                            >
                          </div> -->
                          <div class="btn-charge-div form-group text-start mb-4">
                            <span class="title-div">رمز ورود (حداقل 6 کاراکتر)</span>
                            <div class="user">
                                <i class="lni lni-key"></i>
                              </div>
                            <input v-model.lazy="password" class="input-psswd form-control mb-3 bg-dar-input" type="password" placeholder="رمز ورود خود را وارد کنید">
                            <img id="eye" @click="toggleEye" src="~/assets/img/icons/eye-fill.svg" alt="">
                          </div>
                          <div class="btn-charge-div form-group text-start mb-4">
                            <span class="title-div">تکرار رمز ورود</span>
                            <div class="user">
                                <i class="lni lni-key"></i>
                              </div>
                            <input v-model.lazy="repassword" class="input-psswd form-control mb-3 bg-dar-input" type="password" placeholder="رمز ورود خود را مجدد وارد کنید">
                            <img id="eye" @click="toggleEye" src="~/assets/img/icons/eye-fill.svg" alt="">
                          </div>
                          <div class="btn-charge-div mb-4 form-group text-start" pattern="[a-zA-Z]+">
                            <span class="title-div"> کد معرف <i class="lni lni-question-circle text-success"></i></span>
                            <div class="user">
                                <img src="~/assets/img/icons/person-fill.svg" alt="">
                              </div>
                            <span class="text-danger position-absolute">{{ referenceName }}</span>
                            <input v-model.lazy="reference_code" class="form-control bg-dar-input" type="text" placeholder="کد معرف را وارد کنید" @blur="onInput">
                            <div class="row mb-4 pr-3">
                              <p class="fit"> کد معرف ندارید ؟ </p><span class="text-warning fit"> معرف انتخاب  کنید <i class="lni font-15 lni-question-circle text-success"></i></span>
                            </div>
                          </div>
                          <!-- <div class="btn-charge-div form-group text-start mb-4">
                            <span class="title-div">باشگاه مشتریان</span>
                            <select v-model.lazy="plan" class="form-control mb-3 bg-dar-input">
                              <option value="1" style="color: #000">
                                باشگاه A
                              </option>
                              <option value="2" style="color: #000">
                                باشگاه B
                              </option>
                            </select>
                          </div>
                          <div class="btn-charge-div form-group text-start mb-4">
                            <span class="title-div">کد یکبارمصرف</span>
                            <input
                              v-model.lazy="codeVerify"
                              class="form-control mb-3 bg-dar-input"
                              type="text"
                              placeholder=""
                              pattern="[A-Za-z0-9]+"
                            >
                          </div> -->
<!--                          <div>-->
<!--                            <div class="title mb-2 checkbox-title">-->
<!--                              <input ref="rolesSelected" type="checkbox" class="checkbox">تمامی <a href="/auction"> قوانین و مقررات </a> را مطالعه کرده و با شرایط موافق می باشم-->
<!--                            </div>-->
<!--                          </div>-->
                          <button class="btn btn-warning border-0 bg-warning mt-4 btn-lg w-100" type="submit">
                            ثبت نام
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
.login-logo{
  width: 180px !important;
}
.lni-phone{
  transform: rotate(260deg);
}
.user-data-card .card-body {
    padding: 0.75rem;
}
.user-icon img{
  width: 50px;
}
.user-icon{
  margin-bottom: 35px;
}
#eye{
  position: absolute;
  bottom: 25%;
  left: 5%;
}
.login-wrapper{
  background: linear-gradient(to left, #000000, #303030) !important;
}
.checkbox-title{
  color: #fff!important;
}
.font-15{
  font-size: 15px;
}
.user img{
  position: absolute;
  z-index: 1;
  left: 88%;
  bottom: 27%;
  width: 20px;
}
.user i{
  color: #fff;
  position: absolute;
  z-index: 1;
  left: 88%;
  bottom: 27%;
  width: 20px;
}
select:focus {
  background-color: blue;
  color: white;
}
select {
  background-color: blue;
  color: white;
}
.link-register{
  color:#fff!important;
  margin-top:10px ;
}
.bg-dark{
  border-radius: 6px !important;
}

.nav-link{
  color: #fff;
  padding: 0px;
}
.nav-link:hover{
  color: #ffaf00;
}
.fit{
  max-width: fit-content;
  padding: 0;
  margin: 0;
}
.nav-tabs .nav-link.active{
  background-color: #ffaf00;
  border: none;
  border-radius: 100px;
}

.nav-tabs .nav-link{
  border-radius: 100px !important;
}

.link-register i{
  margin-left: 5px;
}
.bg-dar-input {
    border: none !important;
    border-radius: 26px !important;
    text-align: center !important;
}
.btn-charge-div .title-div{
  left: 70%;
  width: fit-content;
  right: 0;
}
.card-header-tabs{
  background-color: #8d8d8d;
  padding: 5px;
  border-radius: 100px !important;
}

.register-form span{
  top: 50px;
  left: 5%;
}
.btn-charge-div {
  height: 42px;
}
.card{
  border-radius: 25px !important;
}

@media only screen and (min-width: 576px) and (max-width: 767px) {
  .container {
    max-width: 600px;
  }
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
/* Firefox */
input[type=number] {
    -moz-appearance: textfield;
}
</style>

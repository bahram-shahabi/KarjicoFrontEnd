<template>
  <div>
    <div id="headerArea" class="header-area">
      <div class="container h-100 d-flex align-items-center justify-content-between">
        <!-- Logo Wrapper-->
        <div class="logo-wrapper">
          <a href="/"><img class="logo" src="~/assets/img/icons/logo.png" alt=""></a>
        </div>
        <!-- Search Form-->

        <!-- Navbar Toggler-->
        <div
          class="suha-navbar-toggler"
          data-bs-toggle="offcanvas"
          data-bs-target="#suhaOffcanvas"
          aria-controls="suhaOffcanvas"
        >
          <span /><span /><span />
        </div>
      </div>
    </div>
    <div
      id="suhaOffcanvas"
      class="offcanvas offcanvas-start suha-offcanvas-wrap"
      tabindex="-1"
      aria-labelledby="suhaOffcanvasLabel"
    >
      <!-- Close button-->
      <button
        class="btn-close btn-close-white text-reset"
        type="button"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      />
      <!-- Offcanvas body-->
      <div class="offcanvas-body">
        <div class="sidenav-profile">
          <div class="user-profile">
            <img src="~/assets/img/user.png" alt="">
          </div>
          <div class="user-info">
            <h6 class="user-name mb-1">
              {{ name }} {{ lastname }}
            </h6>
            <h6 class="user-name mb-1">
              {{ username }}
            </h6>
          </div>
        </div>
        <!-- Sidenav Profile-->
        <!-- Sidenav Nav-->
        <ul class="sidenav-nav ps-0">
          <li v-if="isAdmin == 1">
            <a href="/admin/user"><i class="lni lni-user" />پنل مدیریت</a>
          </li>
          <li v-if="isLoginWithAdmin !== 'null'">
            <a href="#" @click="backAdmin"><i class="lni lni-user" />بازگشت به پنل مدیریت</a>
          </li>
          <li><a href="/profile"><i class="lni lni-user" />پروفایل من</a></li>
          <!--          <li><a href="/"><i class="lni lni-user" />خرید شارژ</a></li>-->
          <!--          <li><a href="/"><i class="lni lni-user" />خرید اینترنت</a></li>-->
          <!--          <li><a href="/"><i class="lni lni-user" />پذیرنده ها</a></li>-->
          <!--          <li><a href="/"><i class="lni lni-user" />فورشگاه آنلاین</a></li>-->
          <!--          <li><a href="/"><i class="lni lni-user" />بیمه</a></li>-->
          <!--          <li><a href="/"><i class="lni lni-user" />پلن درامدی</a></li>-->
          <!--          <li><a href="/"><i class="lni lni-user" />پلن درآمدی 2</a></li>-->
          <!--          <li><a href="/"><i class="lni lni-user" />آموزش</a></li>-->
          <li><a href="/chart"><i class="lni lni-user" />چارت</a></li>
          <li><a href="/chart/index11"><i class="lni lni-user" />چارت2</a></li>
          <li><a href=" /chart/genealogy"><i class="lni lni-user" />ژنولوژی</a></li>
          <li><a href="/dashboard/anicart"><i class="lni lni-user" />آنی کارت</a></li>
          <li><a href="/"><i class="lni lni-user" />درباره ما</a></li>
          <li><a href="/"><i class="lni lni-user" />ارتباط با ما</a></li>
          <li><a href="/ticket"><i class="lni lni-user" />تیکت</a></li>
          <li>
            <a href="/message"><i class="lni lni-alarm lni-tada-effect" />پیام ها</a>
          </li>
          <li><a href="javascript:;" @click="logout"><i class="lni lni-power-switch" />خروج</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Header',
  data () {
    return {
      formData: ({
        loading: true,
        userData: [],
        perPage: 10,
        page: 1,
        current_page: 1,
        total: 1,
        last_page: 1
      }),
      name: null,
      lastname: null,
      username: null,
      image: null,
      isAdmin: 0,
      isLoginWithAdmin: null
    }
  },
  created () {
    this.name = localStorage.name
    this.lastname = localStorage.lastName
    this.username = localStorage.username
    this.isAdmin = localStorage.admin
    this.isLoginWithAdmin = localStorage.admin_api_token
    console.log('111111111111')
    console.log(this.isLoginWithAdmin)
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    backAdmin () {
      localStorage.setItem('api_token', localStorage.admin_api_token)
      localStorage.setItem('admin_api_token', null)
      this.login(1)
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
            thisData.$router.push({ path: '/admin/user' })
          } else {
            thisData.formData.loading = false
          }
        })
        .catch(function (error) {
          formDataInfo.loading = false
          console.log(error)
        })
    },
    logout () {
      localStorage.userId = null
      localStorage.token = null
      localStorage.api_token = null
      localStorage.admin = 0
      localStorage.admin_api_token = null
      this.$router.push({ path: '/login' })
    }
  }
}
</script>

<style scoped>
.router-link-active {
  color: rgba(0, 0, 0, 0.9) !important;
  border-bottom: 2px solid rgba(0, 0, 0, 0.9) !important;
}
</style>

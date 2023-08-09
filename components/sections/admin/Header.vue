<template>
  <div>
  <div id="headerArea" class="header-area">
    <div class="container h-100 d-flex align-items-center justify-content-between">
      <!-- Logo Wrapper-->
      <div class="logo-wrapper">
        <a href="/"><img src="~/assets/img/icons/logo.png" alt="" style="width: 85px"></a>
      </div>

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
      <!-- Sidenav Profile-->
      <!-- Sidenav Nav-->
      <ul class="sidenav-nav ps-0">
        <li><a href="/"><i class="lni lni-user" />پنل کاربری</a></li>
        <li><a href="/admin/adv"><i class="lni lni-user" />تبلیغات</a></li>
        <li><a href="/admin/shop"><i class="lni lni-user" />فروشگاه ها</a></li>
        <li><a href="/admin/shopReport"><i class="lni lni-user" />گزارش فروش فروشگاه ها</a></li>
        <li><a href="/admin/requestPayment/adv"><i class="lni lni-user" />درخواست برداشت تبلیغات</a></li>
        <li><a href="/admin/requestPayment/shop"><i class="lni lni-user" />درخواست برداشت پذیرنده</a></li>
        <li><a href=" /admin/requestPayment/tempWallet"><i class="lni lni-user" />کیف پول پروسانت</a></li>
        <li><a href=" /admin/chargeAnicart"><i class="lni lni-user" />شارژ آنی کارت</a></li>
        <li><a href=" /admin/user"><i class="lni lni-user" />لیست کاربران</a></li>
        <li><a href=" /admin/chart"><i class="lni lni-user" />چارت</a></li>
        <li><a href=" /admin/chart/indexX"><i class="lni lni-user" />چارت جدید</a></li>
        <li><a href=" /admin/ticket"><i class="lni lni-user" />تیکت</a></li>
        <li><a href=" /admin/report/code"><i class="lni lni-user" />لیست رمزها</a></li>
        <li><a href="" @click="logout"><i class="lni lni-power-switch" />خروج</a></li>
      </ul>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    back () {
      this.$router.go(-1)
    },
    logout () {
      localStorage.userId = null
      localStorage.token = null
      localStorage.api_token = null
      localStorage.admin = 0
      localStorage.admin_api_token = null
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style scoped>
.router-link-active {
  color: rgba(0, 0, 0, 0.9) !important;
  border-bottom: 2px solid rgba(0, 0, 0, 0.9) !important;
}
input{
  color: #000!important;
}
</style>

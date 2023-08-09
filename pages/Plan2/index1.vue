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
          <div class="card user-info-card ">
            <div class="card-body p-4 d-flex align-items-center">
              <div class="user-info">
                <p class="mb-0 text-dark">
                  بهرام شهابی
                </p>
                <h5 class="mb-0">
                  کاربر سطح : 1
                </h5>
              </div>
            </div>
          </div>
          <!-- User Meta Data-->
          <!-- User Meta Data-->
          <div class="card user-data-card mb-3">
            <div class="card-body">
              <div class="row">
                <div class="col-md-6 col-12 mb-3">
                  <div class="title mb-2">
                    <i class="lni lni-money-protection" /><span>میزان درامد شما تا این لحظه(تومان):</span>
                  </div>
                  <input class="form-control" type="text" readonly :value="commissionTotal">
                </div>
                <div class="col-md-6 col-12 mb-3">
                  <div class="title mb-2">
                    <i class="lni lni-money-protection" /><span>درآمد قابل برداشت(تومان):</span>
                  </div>
                  <input class="form-control" type="text" readonly :value="commissionPay">
                </div>
              </div>
              <button class="btn btn-success w-100" type="submit">
                درخواست برداشت
              </button>
            </div>
          </div>
          <div class="shipping-method-choose mb-3">
            <div class="card shipping-method-choose-title-card bg-success">
              <div class="card-body">
                <h6 class="text-center mb-0 text-white">
                  امکانات
                </h6>
              </div>
            </div>
            <div class="card shipping-method-choose-card">
              <div class="card-body">
                <div class="shipping-method-choose">
                  <div class="product-catagory-wrap direction-rtl">
                    <div class="row g-3">
                      <!-- Single Catagory Card -->
                      <div class="col-6">
                        <div class="card catagory-card bg-1">
                          <div class="card-body">
                            <a class="text-danger" href="/advPlan/upgradePlan">

                              <span>ارتقا پلن</span>
                            </a>
                          </div>
                        </div>
                      </div>
                      <!-- Single Catagory Card -->
                      <div class="col-6">
                        <div class="card catagory-card bg-2">
                          <div class="card-body">
                            <a href="/advPlan/userList">
                              <span>لیست کاربران شما</span></a>
                          </div>
                        </div>
                      </div>
                      <!-- Single Catagory Card -->
                      <div class="col-12">
                        <div class="card catagory-card bg-3">
                          <div class="card-body">
                            <a class="text-warning" href="/advPlan/showAdv">
                              <span>کسب درامد از طریق تبلیغات</span></a>
                          </div>
                        </div>
                      </div>
                      <div class="col-6">
                        <div class="card catagory-card bg-4">
                          <div class="card-body p-lr-0">
                            <a class="text-danger" href="#">

                              <span>درخواست های برداشت</span>
                            </a>
                          </div>
                        </div>
                      </div>
                      <!-- Single Catagory Card -->
                      <div class="col-6">
                        <div class="card catagory-card bg-5">
                          <div class="card-body">
                            <a href="#">
                              <span>درخواست ثبت تبلیغ</span></a>
                          </div>
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="card catagory-card bg-6">
                          <div class="card-body ">
                            <a href="#">
                              <span>درباره پلن درآمدی</span></a>
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
    </div>

    <!-- Internet Connection Status-->
    <Footer />
  </div>
</template>

<script>

import axios from 'axios'
//  import router from "../router";
//  import router from "../router";
import Header from '../../components/sections/Header.vue'
import Footer from '../../components/sections/Footer.vue'
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
        wallet: null
      }),
      commissionTotal: null,
      commissionPay: null,
      type: null
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
    const thisData = this
    if (localStorage.token === undefined || localStorage.userId === undefined) {
      this.$router.push({ name: 'login' })
    }
    axios
      .post('https://dbsa.ir/api/getUserPlanInfo', {
        user_id: localStorage.userId,
        token: localStorage.token
      })
      .then(function (response) {
        thisData.type = response.data.data.type
        if (thisData.type === 0) {
          thisData.$router.push({ path: 'advPlan/loginPlan' })
        } else {
          thisData.userPlan = response.data.data.userPlan
          thisData.commissionTotal = response.data.data.commissionTotal
          thisData.commissionPay = response.data.data.commissionPay
        }
        thisData.formData.loading = false
      })
      .catch(function (error) {
        console.log(error)
        thisData.formData.loading = false
      })
  },
  methods: {
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

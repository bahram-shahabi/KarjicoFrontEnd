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
          <!-- User Meta Data-->
          <!-- User Meta Data-->
          <div class="shipping-method-choose mb-3">
            <div class="card shipping-method-choose-title-card bg-success">
              <div class="card-body">
                <h6 class="text-center mb-0 text-white">
                  محدوده تبلیغاتی خود را فعال نمایید
                </h6>
              </div>
            </div>
            <div class="card shipping-method-choose-card">
              <div class="card-body">
                <div class="shipping-method-choose">
                  <ul class="ps-0">
                    <li>
                      <input
                        id="id1"
                        type="radio"
                        name="level"
                        value="1"
                        disabled
                        checked
                      >
                      <label for="id1">ورودی سطح یک - <span>50 هزار تومان</span></label>
                      <div class="check" />
                    </li>
                    <li>
                      <input id="id2" type="radio" name="level" value="2" checked>
                      <label for="id2">ورودی سطح دو -<span>100 هزار تومان</span></label>
                      <div class="check" />
                    </li>
                    <li>
                      <input id="id4" type="radio" name="level" value="3">
                      <label for="id4">ورودی سطح سه -<span>200 هزار تومان</span></label>
                      <div class="check" />
                    </li>
                    <li>
                      <input id="id5" type="radio" name="level" value="4">
                      <label for="id5">ورودی سطح چهار -<span>400 هزار تومان</span></label>
                      <div class="check" />
                    </li>
                    <li>
                      <input id="id6" type="radio" name="level" value="5">
                      <label for="id6">ورودی سطح پنج -<span>800 هزار تومان</span></label>
                      <div class="check" />
                    </li>
                    <li>
                      <input id="id8" type="radio" name="level" value="6">
                      <label for="id8">ورودی سطح شش -<span>1 میلیون و 200 هزار تومان</span></label>
                      <div class="check" />
                    </li>
                    <li>
                      <input id="id8" type="radio" name="level" value="6">
                      <label for="id8">ورودی سطح شش -<span>1 میلیون و 200 هزار تومان</span></label>
                      <div class="check" />
                    </li>
                    <li>
                      <input id="id8" type="radio" name="level" value="6">
                      <label for="id8">ورودی سطح شش -<span>1 میلیون و 200 هزار تومان</span></label>
                      <div class="check" />
                    </li>
                    <li>
                      <input id="id8" type="radio" name="level" value="6">
                      <label for="id8">ورودی سطح شش -<span>1 میلیون و 200 هزار تومان</span></label>
                      <div class="check" />
                    </li>
                    <li>
                      <input id="id8" type="radio" name="level" value="6">
                      <label for="id8">ورودی سطح شش -<span>1 میلیون و 200 هزار تومان</span></label>
                      <div class="check" />
                    </li>
                    <li>
                      <input id="id8" type="radio" name="level" value="6">
                      <label for="id8">ورودی سطح شش -<span>1 میلیون و 200 هزار تومان</span></label>
                      <div class="check" />
                    </li>
                    <li>
                      <input id="id8" type="radio" name="level" value="6">
                      <label for="id8">ورودی سطح شش -<span>1 میلیون و 200 هزار تومان</span></label>
                      <div class="check" />
                    </li>
                    <li>
                      <input id="id8" type="radio" name="level" value="6">
                      <label for="id8">ورودی سطح شش -<span>1 میلیون و 200 هزار تومان</span></label>
                      <div class="check" />
                    </li>
                    <li>
                      <input id="id8" type="radio" name="level" value="6">
                      <label for="id8">ورودی سطح شش -<span>1 میلیون و 200 هزار تومان</span></label>
                      <div class="check" />
                    </li>
                    <li>
                      <input id="id8" type="radio" name="level" value="6">
                      <label for="id8">ورودی سطح شش -<span>1 میلیون و 200 هزار تومان</span></label>
                      <div class="check" />
                    </li>
                    <li>
                      <input id="id8" type="radio" name="level" value="6">
                      <label for="id8">ورودی سطح شش -<span>1 میلیون و 200 هزار تومان</span></label>
                      <div class="check" />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="shipping-method-choose mb-3">
            <div class="card shipping-method-choose-title-card bg-success">
              <div class="card-body">
                <h6 class="text-center mb-0 text-white">
                  مبلغ قابل پرداخت
                </h6>
              </div>
            </div>
            <div class="card shipping-method-choose-card">
              <div class="card-body">
                <div class="shipping-method-choose">
                  <ul class="ps-0 pb-3">
                    <li>
                      <label>مبلغ قابل پرداخت : <span> 1000000 تومان</span></label>
                    </li>
                  </ul>
                  <button class="btn btn-success w-100" @click="joinPlan()">
                    پرداخت
                  </button>
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
        referencer: [],
        user: [],
        wallet: null
      })
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
    const formDataInfo = this.formData
    const priceData = this
    if (localStorage.token === undefined || localStorage.userId === undefined) {
      this.$router.push({ name: 'login' })
    }
    axios
      .post('https://dbsa.ir/api/getJoinToPlanInfo', {
        user_id: localStorage.userId,
        token: localStorage.token
      })
      .then(function (response) {
        console.log(response.data.data.user)
        formDataInfo.user = response.data.data.user
        formDataInfo.referencer = response.data.data.referencer
        formDataInfo.wallet = response.data.data.virtualCardAmount
        formDataInfo.loading = false
        priceData.price = response.data.data.price
      })
      .catch(function (error) {
        console.log(error)
        formDataInfo.loading = false
      })
  },
  methods: {
    joinPlan () {
      const thisData = this
      axios
        .post('https://dbsa.ir/api/joinPlan', {
          user_id: localStorage.userId,
          token: localStorage.token
        })
        .then(function (response) {
          thisData.type = response.data.data.type
          if (thisData.type === 1) {
            thisData.$router.push({ path: '/advPlan' })
          }
          thisData.formData.loading = false
        })
        .catch(function (error) {
          console.log(error)
          thisData.formData.loading = false
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

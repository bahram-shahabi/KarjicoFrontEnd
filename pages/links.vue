<template>
  <div v-if="formData.loading" class="centerLoader">
    <p class="spinner-title">
      درحال لود شدن
    </p>
    <img class="header-logo" src="~/assets/img/icons/logo.png" alt="">
    <br>
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <div v-else class="mb-125">
    <!-- Header Area-->
    <Header />
    <!-- PWA Install Alert -->

    <div class="page-content-wrapper">
      <div class="container">
        <div class="pt-3">
          <div class="profile-wrapper-area py-3 direction-rtl margin-150">
            <!-- User Information-->
            <div class="row">
              <div class="col-12">
                <div class="card shopCart">
                  <div class="card user-data-card bg-dark">
                    <div class="card-body">
                      <div>
                        <div class="title align-items-center">
                          <h5 class="mb-0 titleBorder">
                            لینک های مفید
                          </h5>
                          <div class="line" />
                          <a href="https://tracking.post.ir" target="_blank">
                            <p class="border2 border-yellow color-yellow">
                              رهگیری مرسوله پستی
                            </p>
                          </a>
                          <a href="https://www.samanese.ir/start" target="_blank">
                            <p class="border2 border-yellow color-yellow">
                              استعلام وضعیت سهام عدالت
                            </p>
                          </a>
                          <a href="https://my.ssaa.ir/portal/executive/inquery-exitban" target="_blank">
                            <p class="border2 border-yellow color-yellow">
                              استعلام ممنوع الخروجی
                            </p>
                          </a>
                          <a href="https://adliran.ir/Home/SelectLink/2" target="_blank">
                            <p class="border2 border-yellow color-yellow">
                              دریافت ابلاغیه الکترونیکی
                            </p>
                          </a>
                          <a href="https://sana.adliran.ir/Sana/Index#/Main" target="_blank">
                            <p class="border2 border-yellow color-yellow">
                              ثبتنام ثنا
                            </p>
                          </a>
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
    <!--    <Footer />-->
  </div>
</template>

<script>

// import axios from 'axios'
import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
//  import router from "../router";
//  import router from "../router";
// import Footer from '../../components/sections/Footer.vue'
import Header from '../components/sections/Header.vue'
Vue.use(VueSweetalert2)
export default {
  components: {
    // Footer,
    Header
  },
  data () {
    return {
      map: null,
      formData: ({
        loading: false,
        tournamentData: [],
        resultData: []
      }),
      totalPrice: 0,
      shopPrice: 0,
      userPrice: 0,
      price: [],
      priceWithDiscount: [],
      invoiceModale: false,
      resultModale: false,
      showInvoiceForm: false
    }
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
.img-homepage{
  width: 50px;
  padding-bottom: 5px;
}
.invoiceForm{
  margin-top: 10px;
  position: fixed;
  bottom: 0px;
  z-index: 999;
  transform: translate(-50%, 0%);
  left: 50%;
  width: -webkit-fill-available;
}
.invoiceForm .pay{
  position: absolute;
  left: 10px;
  top: 30px;
}
.invoiceForm .card {
  background-color: #fff;
  padding: 0 11px;
  border-radius: 10px 10px 0px 0px;
  width: 100%;
}
p.color-yellow{
  color: #ffc200  !important;
}
.border-yellow{
  border: 1px solid #ffaf00;
  padding: 0 10px;
}
.sim-img{
  width: 40px;
  margin-left: 10px;
}
/*.zoom-in-zoom-out {*/
/*  animation: zoom-in-zoom-out 2s ease-out infinite;*/
/*}*/

/*@keyframes zoom-in-zoom-out {*/
/*  0% {*/
/*    transform: scale(1, 1);*/
/*  }*/
/*  50% {*/
/*    transform: scale(0.5, 0.5);*/
/*  }*/
/*  100% {*/
/*    transform: scale(1, 1);*/
/*  }*/
/*}*/
.margin-150{
  margin-bottom: 0px;
}
</style>
<!--async created () {-->
<!--// const routerData = this.$router-->
<!--this.$axios.setToken('1|hN286uXntAV0Qzpc3A9YSs42cNaI1CwZfAGwhHLa', 'Bearer')-->
<!--const response = await this.$axios.post('https://karjico.ir/api/login', {-->
<!--mobile: '09155001695'-->
<!--})-->
<!--console.log(response)-->
<!--},-->

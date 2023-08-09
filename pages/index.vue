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
          <!-- Hero Slides-->

          <div>
            <b-carousel
              id="carousel-2"
              :interval="4000"
              controls
              indicators
              img-width="1024"
              img-height="480"
              style="text-shadow: 1px 1px 2px #333;"
              items="3"
              multi
            >
              <!-- Text slides with image -->
              <b-carousel-slide
                v-for="item in formData.sliderData"
                id="carouselExampleControls"
                :key="item.id"
                class="sliderImage"
                :img-src="item.image"
              />
            </b-carousel>
          </div>
          <div class="row ">
            <!-- Single Weekly Product Card -->
          </div>
        </div>
      </div>
      <div class="product-catagories-wrapper py-3 ">
        <div class="container mb-3">
          <div class="row g-3 mb-3">
            <!-- Single Catagory Card -->
            <div class="col-6">
              <div class="card catagory-card bg-8">
                <div class="card-body ">
                  <a class="text-info" href="/">
                    <span>راهنمای اپلیکیشن</span></a>
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="card catagory-card bg-7">
                <div class="card-body ">
                  <a class="text-info" href="/dashboard">
                    <span>پنل کاربری</span></a>
                </div>
              </div>
            </div>
          </div>
          <!--          <div class="section-heading text-center">-->
          <!--            <h6>خدمات ما</h6>-->
          <!--          </div>-->
          <div class="product-catagory-wrap direction-rtl">
            <div class="row g-3">
              <div class="col-12">
                <div class="card catagory-card">
                  <div class="card-body">
                    <a class="text-danger" href="/advPlan/showAdv">
                      <img src="~/assets/img/logo/social-media-marketing.png" class="img-homepage zoom-in-zoom-out">
                      <span>تبلیغات</span></a>
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div class="card catagory-card">
                  <div class="card-body">
                    <a class="text-warning" href="/shop">
                      <img src="~/assets/img/logo/store (1).png" class="img-homepage">
                      <span>پذیرنده ها</span></a>
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div class="card catagory-card">
                  <div class="card-body p-lr-0">
                    <a class="text-success" href="#" target="_blank">
                      <img src="~/assets/img/logo/shopping-cart.png" class="img-homepage">
                      <span>فروشگاه آنلاین</span></a>
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div class="card catagory-card">
                  <div class="card-body">
                    <a class="text-danger" href="#">
                      <img src="~/assets/img/logo/charity.png" class="img-homepage">
                      <span>نیکوکاری</span></a>
                  </div>
                </div>
              </div>
              <!-- Single Catagory Card -->
              <div class="col-4">
                <div class="card catagory-card">
                  <div class="card-body">
                    <a class="text-danger" href="/charge/sim">
                      <img src="~/assets/img/logo/sim (1).png" class="img-homepage">
                      <span>خرید شارژ</span>
                    </a>
                  </div>
                </div>
              </div>
              <!-- Single Catagory Card -->
              <div class="col-4">
                <div class="card catagory-card">
                  <div class="card-body">
                    <a href="/charge/net">
                      <img src="~/assets/img/logo/internet.png" class="img-homepage">
                      <span>خرید اینترنت</span></a>
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div class="card catagory-card">
                  <div class="card-body">
                    <a class="text-danger" href="#">
                      <img src="~/assets/img/logo/cashless-payment.png" class="img-homepage">
                      <span>پرداخت قبض</span></a>
                  </div>
                </div>
              </div>
              <div class="col-12">
                <div class="card catagory-card">
                  <div class="card-body">
                    <a class="text-danger" href="/links">
                      <span>لینک های مفید</span></a>
                  </div>
                </div>
              </div>
              <!-- Single Catagory Card -->
              <!-- Single Catagory Card -->

              <!-- Single Catagory Card -->
              <!--              <div class="col-4">-->
              <!--                <div class="card catagory-card">-->
              <!--                  <div class="card-body">-->
              <!--                    <a class="text-danger" href="#">-->
              <!--                      <img src="~/assets/img/logo/insurance.png" class="img-homepage">-->
              <!--                      <span>بیمه</span></a>-->
              <!--                  </div>-->
              <!--                </div>-->
              <!--              </div>-->
              <!--              <div class="col-4">-->
              <!--                <div class="card catagory-card">-->
              <!--                  <div class="card-body">-->
              <!--                    <a class="text-danger" href="#">-->
              <!--                      <img src="~/assets/img/logo/earning.png" class="img-homepage">-->
              <!--                      <span>سرمایه گذاری</span></a>-->
              <!--                  </div>-->
              <!--                </div>-->
              <!--              </div>-->
              <!--              <div class="col-4">-->
              <!--                <div class="card catagory-card">-->
              <!--                  <div class="card-body">-->
              <!--                    <a class="text-danger" href="#">-->
              <!--                      <img src="~/assets/img/logo/flight.png" class="img-homepage">-->
              <!--                      <span>گردشگری</span></a>-->
              <!--                  </div>-->
              <!--                </div>-->
              <!--              </div>-->
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

import Footer from '../components/sections/Footer.vue'
import Header from '../components/sections/Header.vue'
export default {
  components: {
    Footer,
    Header
  },
  data () {
    return {
      map: null,
      formData: ({
        loading: true,
        sliderData: [],
        auctionData: []
      })

    }
  },
  created () {
    const formDataInfo = this.formData
    const thisData = this
    const formDataV = new FormData()

    axios
      .post('https://karjico.ir/api/user/index', formDataV,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + localStorage.getItem('api_token')
          }
        })
      .then(function (response) {
        formDataInfo.sliderData = response.data.data.slider.data
        formDataInfo.loading = false
      }, function (error) {
        if (error.response.status === 401) {
          thisData.$router.push({ path: '/login' })
        }
        return Promise.reject(error)
      })
      .catch(function (error) {
        console.log(error)
        formDataInfo.loading = false
      })
  },
  methods: {
    // serviceItem(){

    //    this.$router.push({name:'serviceItem', params: { serviceId: 13 } });
    // }

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
.zoom-in-zoom-out {
  animation: zoom-in-zoom-out 2s ease-out infinite;
}

@keyframes zoom-in-zoom-out {
  0% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(0.5, 0.5);
  }
  100% {
    transform: scale(1, 1);
  }
}

</style>

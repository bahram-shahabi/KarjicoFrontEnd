<template>
  <div v-if="formData.loading">
    <p class="spinner-title">
      درحال لود شدن
    </p>
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <div v-else>
    <Header />
    <div class="page-content-wrapper">
      <!-- Google Maps-->
      <div class="container">
        <div class="  card p-3 section-heading mt-3 direction-rtl">
          <div class="mt-3 direction-rtl">
            <h5 class="mb-1">
              ارتباط با ما
            </h5>
<!--            <p class="mb-4">-->
<!--              آدرس :شاندیز - بلوار صيادشيرازي بين صياد 29و31 پلاک 250-->
<!--            </p>-->
            <p class="mb-4">
              پاسخ گویی به شکایات: 05134528123
            </p>
            <p class="mb-4">
              ایمیل: info@karjico.ir
            </p>
            <p class="mb-4">
              پشتیبانی (تماس از طریق واتس آپ): : 09109101105
            </p>
          </div>
          <div class="row">
            <div class="col-3" style="text-align: center">
              <a href="#">
                <img src="~/assets/img/email.png" style="width: 56px"/>
              </a>
            </div>
            <div class="col-3" style="text-align: center">
              <a href="#">
                <img src="~/assets/img/whatsapp.png" style="width: 56px" />
              </a>
            </div>
            <div class="col-3" style="text-align: center">
              <a href="#">
                <img src="~/assets/img/telegram.png" style="width: 56px"/>
              </a>
            </div>
            <div class="col-3" style="text-align: center">
              <a href="#">
                <img src="~/assets/img/instagram.png" style="width: 56px"/>
              </a>
            </div>
          </div>
        </div>
        <!-- Contact Form-->
        <div class="contact-form mt-3 pb-3">
          <form action="#" method="" class="formData">
            <input class="form-control mb-3" type="text" placeholder="نام و نام خانودگی">
            <input id="username" class="form-control mb-3" type="text" placeholder="عنوان">
            <textarea
              id="message"
              class="form-control mb-3"
              name=""
              cols="30"
              rows="10"
              placeholder="متن پیام شما..."
            />
            <button class="btn btn-success btn-lg w-100">
              ثبت پیام
            </button>
          </form>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
// import axios from 'axios'
//  import router from "../../router";
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
        loading: false
      })
    }
  },

  methods: {

  }
}
</script>

<style>

</style>

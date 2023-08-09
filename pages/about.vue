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
    <Header />
    <div class="page-content-wrapper">
      <!-- Google Maps-->
      <div class="container">
        <div class="row">
          <div class="col-12 pt-2">
            <div class="card p-3">
              <div class=" mt-3 direction-rtl">
                <img src="~/assets/img//about.jpg" alt="">
                <h5 class="mb-1">
                    درباره آنی سود
                </h5>
                <p class="mb-4">
                  گروه استارتاپ آنیسود با عنایت به لطف پروردگار متعال و منویات مقام معظم رهبری در راستای ایجاد بستری سالم و راهبردی در اقتصاد کشور ، با هدف اشتغال و درآمدزایی برای تمامی اقشار جامعه  در هر سن و جنسیتی و همچنین کاهش هزینه های خانواده و رونق تولید و کسب و کار بازار سنتی ، دستیابی به بازارهای روزدنیا در تجارت الکترونیک ، حضوری پویا  و خلاق در کسب و کارهای فضای مجازی و رقابت با استارتاپ های برند و بروز ایران و جهان با موازین قانونی با یک طرح و ایده کاملا نوین و خلاقانه و در عین حال ساده و کارآمد پس از سالها تحقیق و بررسی با همکاری و همفکری اساتید و متخصصین این حوزه عملیاتی و اجراشد و در این راستا چندین طرح دیگر توسط تیم های متخصص در حال برنامه ریزی و اجرا می باشد . امیدواریم به یاری پروردگار بزرگ بتوانیم در مسیری صحیح خدمتگذار مفید و لایقی برای ملت عزیم الشأن ایران باشیم .
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form-->
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

  methods: {}
}
</script>

<style>

</style>

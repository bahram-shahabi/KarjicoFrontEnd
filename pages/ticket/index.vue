<template>
  <div v-if="formData.loading">
    <p class="spinner-title">
      درحال لود شدن
    </p>
    <div class="spinner-border" role="status">
      <span class="visually-hidden"></span>
    </div>
  </div>
  <div v-else>
    <Header/>

    <div class="page-content-wrapper">
      <div class="container">
        <div class="pt-3">
          <div class="profile-wrapper-area py-3 direction-rtl">
            <a href="/ticket/create" ><div class="totalPrice">ایحاد تیکت جدید</div></a>
            <div
              v-for="item in formData.ticketData"
              :key="item.id"
              class="content content-box pb50 border-1"
            >
              <nuxt-link  :to="'/ticket/'+item.id"><div class="service-title">
                <p>کد پیگیری : {{ item.id }}</p>
                <p>{{ item.title }}</p>
              </div>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer/>
  </div>
</template>

<script>
import axios from 'axios'

import Footer from '../../components/sections/Footer.vue'
import Header from '../../components/sections/Header.vue'

export default {
  components: {
    Header,
    Footer
  },

  data () {
    return {
      map: null,
      totalPrice: 0,
      formData: ({
        loading: true,
        ticketData: []

      })

    }
  },
  created () {
    const formDataInfo = this.formData
    const formDataV = new FormData()
    //  console.log(this.$route.params.serviceId);
    axios
      .post('https://karjico.ir/api/user/listMessage', formDataV,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + localStorage.getItem('api_token')
          }
        })
      .then(function (response) {
        formDataInfo.ticketData = response.data.data.message
        formDataInfo.loading = false
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  methods: {}
}
</script>

<style>
.totalPrice {
  text-align: center;
  background: green;
  margin-bottom: 10px;
  border-radius: 10px;
  padding: 5px;
  color: #fff;
}
.service-title{
  color: #fff;
  border: 1px solid #fff;
  border-radius: 10px;
  padding: 10px;
}
.service-title p{
  color: #fff;
}
</style>

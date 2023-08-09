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
    <div class="page-content-wrapper direction-rtl">
      <div class="container">
        <!-- Profile Wrapper-->
        <div class="profile-wrapper-area py-3 ">
          <!-- User Information-->
          <div class="card user-info-card">
            <div class="card-body p-4 d-flex align-items-center">
              <div class="user-info">
                <p class="mb-0 text-dark">
                  چارت
                </p>
              </div>
            </div>
          </div>
          <!-- User Meta Data-->
          <!-- User Meta Data-->
          <div class="card user-data-card">
            <div class="card-body">
              <div class="row">
                <div class="col-12 mb-3">
                  <div class="title mb-2">
                    <i class="lni lni-pencil" /><span>نام کاربری</span>
                  </div>
                  <input v-model="username" class="form-control" type="text">
                </div>
                <button class="btn btn-success w-100" type="submit" @click="getData()">
                  جستجو
                </button>
                </div>
            </div>
          </div>
          <div v-if="formData.type===1" class="card user-data-card">
            <div class="card-body">
              <div class="m_wrap">
                <div class="col-12 mb-3">
                  <div class="title mb-2">
                    <i class="lni lni-pencil" /><span>{{formData.userData.name}} {{formData.userData.last_name}}</span>
                  </div>
                </div>
                <div class="dx">
                <div class="chartItem xc" v-for="item in formData.userListData" :key="item.id" @click="getDataClick(item.user_info.username)">
                  <div class="title mb-2">
                    <span>{{item.user_info.username}}</span>
                    <br>
                    <span>{{item.user_info.name}} {{item.user_info.last_name}}</span>
                    <br>
                    <span v-if="item.plan2_position === 1 " >  باشگاه :A </span>
                    <span v-else >  باشگاه :B </span>
                    <br>
                    <span>استخر: {{item.vip_share_level}}</span>
                    <br>
                    <span>سهام : {{item.plan2_level}}</span>
                    <br>
                    <span>محدوده : {{item.level}}</span>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>

import axios from 'axios'
import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

//  import router from "../router";
//  import router from "../router";
// import FlipCountdown from 'vue2-flip-countdown'
import Header from '../../../components/sections/admin/Header.vue'
import Footer from '../../../components/sections/admin/Footer.vue'
Vue.use(VueSweetalert2)
export default {
  components: {
    // FlipCountdown,
    Footer,
    Header
  },
  data () {
    return {
      username: null,
      map: null,
      search: null,
      formData: ({
        loading: false,
        userData: [],
        userListData: [],
        type: [],
        perPage: 10,
        page: 1,
        current_page: 1,
        total: 1,
        last_page: 1
      })

    }
  },
  methods: {
    getData () {
      const formDataInfo = this.formData
      const thisData = this
      const formDataV = new FormData()
      formDataV.append('username', this.username)
      axios
        .post('https://karjico.ir/api/admin/report/genealogy', formDataV,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + localStorage.getItem('api_token')
            }
          })
        .then(function (response) {
          formDataInfo.type = response.data.data.type
          formDataInfo.userData = response.data.data.user
          formDataInfo.userListData = response.data.data.userList
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
    getDataClick (username) {
      const formDataInfo = this.formData
      const thisData = this
      const formDataV = new FormData()
      formDataV.append('username', username)
      axios
        .post('https://karjico.ir/api/admin/report/genealogy', formDataV,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + localStorage.getItem('api_token')
            }
          })
        .then(function (response) {
          formDataInfo.type = response.data.data.type
          formDataInfo.userData = response.data.data.user
          formDataInfo.userListData = response.data.data.userList
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
input{
  color: #000!important;
}
.chartItem
{

  background: green;
  border-radius: 10px;
  text-align: center;
  color: #fff;
}
.chartItem span{
  color: #fff;
}

.m_wrap{
  width:100%;
  height:200px;
}
.dx {
  height: 200px;
  overflow-y: hidden;
  white-space: nowrap;
  width: 100%;
}
.xc{
  display:inline-block;
  width:200px;
  height:200px;
  border:1px solid;
  line-height:20px;
  text-align:center;
  margin-bottom:4px;
}
</style>

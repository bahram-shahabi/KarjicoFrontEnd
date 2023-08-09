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
                <div style="direction: ltr">
                  <organization-chart :datasource="ds" :zoom="true" :pan="true" @node-click="selectNode" >
                    <template slot-scope="{ nodeData }">
                      <div :class="['node-box', nodeData.id == '1' ? 'parent' : '']">
                        <div class="node-title">{{ nodeData.name }}</div>
                        <div class="node-content color">
                          <div>{{ nodeData.title }} {{ nodeData.id }}</div>
                          <div v-if="nodeData.position === '1'">باشگاه A</div>
                          <div v-if="nodeData.position === '2'">باشگاه B</div>
                          <div>استخر: {{ nodeData.plan_level }}</div>
                          <div>سهام : {{ nodeData.plan2_level }}</div>
                          <div>محدوده : {{ nodeData.level }}</div>
                        </div>
                      </div>
                    </template>
                  </organization-chart>
                </div>
              </div>
            </div>
          </div>
          <div v-if="formData.type===1" class="card user-data-card">
            <div class="card-body">
              <div class="row">
                <div class="col-12 mb-3">
                  <div class="title mb-2">
                    <i class="lni lni-pencil" /><span>{{ formData.userData.name }} {{ formData.userData.last_name }}</span>
                  </div>
                </div>
                <div v-for="item in formData.userListData" :key="item.id" class="col-3 mb-3 chartItem" @click="getDataClick(item.user_info.username)">
                  <div class="title mb-2">
                    <span>{{ item.user_info.username }}</span>
                    <br>
                    <span>{{ item.user_info.name }} {{ item.user_info.last_naem }}</span>
                    <br>
                    <span>سهام : {{ item.plan2_level }} ** موقعیت :{{ item.plan2_position }}</span>
                    <br>
                    <span>سطح استخر: {{ item.plan2_level }}</span>
                    <br>
                    <span>سطح : {{ item.level }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
import OrganizationChart from 'vue-organization-chart'
import Header from '../../components/sections/Header.vue'
import 'vue-organization-chart/dist/orgchart.css'
Vue.use(VueSweetalert2)
export default {
  components: {
    // FlipCountdown,
    Header,
    OrganizationChart
  },
  data () {
    return {
      ds: [],
      username: null,
      selectUser: null,
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
  created () {
    const formDataInfo = this.formData
    const thisData = this
    const formDataV = new FormData()
    formDataV.append('per_page', formDataInfo.perPage)
    formDataV.append('page', formDataInfo.page)
    formDataV.append('selectUser', this.selectUser)
    axios
      .post('https://karjico.ir/api/user/chartUser', formDataV,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + localStorage.getItem('api_token')
          }
        })
      .then(function (response) {
        thisData.ds = response.data.data.userList
        thisData.selectUser = response.data.data.selectUser
        console.log(thisData.ds)
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
    selectNode (nodeData) {
      const formDataInfo = this.formData
      const thisData = this
      const formDataV = new FormData()
      this.selectUser = this.selectUser + ',' + nodeData.id
      formDataV.append('per_page', formDataInfo.perPage)
      formDataV.append('page', formDataInfo.page)
      formDataV.append('selectUser', this.selectUser)
      axios
        .post('https://karjico.ir/api/user/chartUser', formDataV,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + localStorage.getItem('api_token')
            }
          })
        .then(function (response) {
          thisData.ds = response.data.data.userList
          console.log(thisData.ds)
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
    getData () {
      const formDataInfo = this.formData
      const thisData = this
      const formDataV = new FormData()
      formDataV.append('username', this.username)
      axios
        .post('https://karjico.ir/api/chartUser', formDataV,
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
<style lang="scss">
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
  height: 130px;
  background: green;
  border-radius: 10px;
  text-align: center;
  color: #fff;
}
.chartItem span{
  color: #fff;
}
text-center {
  text-align: center;
  margin-bottom: 32px;
}
.node-title{
  background-color: #ff6565;
}
.node-content{
  background-color: #7cff7c;
  direction: rtl;
}
.custom-card {
  display: flex;
  align-items: center;
  width: 220px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-sizing: border-box;
  background-color: #fff;
  cursor: pointer;
  box-shadow: 0 0 6px 2px rgba(#000, 0);
  transition: box-shadow .2s ease;

  &:hover {
    box-shadow: 0 0 6px 2px rgba(#000, .1);
  }

  &__image {
    flex: 0 0 auto;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #dedede;
    background-size: cover;
    background-position: 50%;
  }

  &__info {
    padding-left: 16px;
  }

  &__name {
    font-weight: 600;
  }

  &__age {
    margin-top: 4px;
    font-size: 12px;
  }
}
</style>

import Vue from 'vue'
import Router from 'vue-router'
import login from '@/page/login.vue'
import content from '@/page/content.vue'
import creatDoll from '@/components/creatDoll.vue'
import dollList from '@/components/dollList.vue'
import editDoll from '@/components/editDoll.vue'
import machineManage from '@/components/machineManage.vue'
import machineList from '@/components/machineList.vue'
import editMachine from '@/components/editMachine.vue'
import getDollManageList from '@/components/getDollManageList.vue'
import userGetRecordList from '@/components/userGetRecordList.vue'
import PaymentList  from  '@/components/PaymentList.vue'
import Statistics  from  '@/components/Statistics.vue'
import grabDollList  from  '@/components/grabDollList.vue'
import creatChannel  from  '@/components/creatChannel.vue'
import editChannel  from  '@/components/editChannel.vue'
import channelManageList  from  '@/components/channelManageList.vue'





import bedRequest from '@/page/404.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/content',
      name: 'content',
      component: content,
      children:[
        {
          path: 'creatDoll',
          name: 'creatDoll',
          component: creatDoll,
        },
        {
          path: 'dollList',
          name: 'dollList',
          component: dollList,
        },
        {
          path: 'editDoll/:giftId',
          name: 'editDoll',
          component: editDoll,
        },
        {
          path: 'machineManage',
          name: 'machineManage',
          component: machineManage,
        },
        {
          path: 'machineList',
          name: 'machineList',
          component: machineList,
        },
        {
          path: 'editMachine/:editMachine',
          name: 'editMachine',
          component: editMachine,
        },
        {
          path: 'getDollManageList',
          name: 'getDollManageList',
          component: getDollManageList,
        },
        {
          path: 'userGetRecordList',
          name: 'userGetRecordList',
          component: userGetRecordList,
        },
        {
          path: 'PaymentList',
          name: 'PaymentList',
          component: PaymentList,
        },
        {
          path: 'Statistics',
          name: 'Statistics',
          component: Statistics,
        },
        {
          path: 'grabDollList',
          name: 'grabDollList',
          component: grabDollList,
        },
        {
          path: 'creatChannel',
          name: 'creatChannel',
          component: creatChannel,
        },
        {
          path: 'editChannel',
          name: 'editChannel',
          component: editChannel,
        },
        {
          path: 'channelManageList',
          name: 'channelManageList',
          component: channelManageList,
        }

      ]
    },
    {
      path: '/bedRequest',
      name: 'bedRequest',
      component: bedRequest,
    }
  ]
})

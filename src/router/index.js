import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home';
import ManageActivity from '@/components/manageActivity'
import QuestionBank from '@/components/questionBank'
import QuestioManage from '@/components/questionManage'
import Detail from '@/components/detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/manageActivity',
      name: 'manageActivity',
      component: ManageActivity,
    },
    {
      path: '/questionBank',
      name: 'questionBank',
      component: QuestionBank,
    },
    {
      path: '/questionManage',
      name: 'questionManage',
      component: QuestioManage,
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail,

    }
  ]
})

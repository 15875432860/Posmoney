import Vue from 'vue'
import Router from 'vue-router'
import pos from '@/components/Pos'
import leftnav from '@/components/common/leftNav'
import right from '@/components/common/rightNav'
import pos2 from '@/components/pos2'
import pos3 from '@/components/pos3'

Vue.use(Router)

export default new Router({
  routes: [
		{
			path:'/',
			name:'pos',
			component:pos
		},
		{
			path:'/pos2',
			name:'pos2',
			component:pos2
		},
		{
			path:'/pos3',
			name:'pos3',
			component:pos3
		},
  ]
})

/*
 * @Author: tarn.tianrun 
 * @Date: 2018-02-07 16:26:48 
 * @Last Modified by:   tarn.tianrun 
 * @Last Modified time: 2018-02-07 16:26:48 
 */

import Main from '@/views/Main.vue';
import Other from '@/views/otherLayout/Other.vue';

export const appRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/panoramic',
    component: Main,
    children: [
		{ path: 'panoramic', title: 'panoramic', name: 'panoramic', component: resolve => { require(['@/views/index/panoramic/panoramic.vue'], resolve); } },
		{ path: 'information', title: 'information', name: 'information', component: resolve => { require(['@/views/information/information.vue'], resolve); } },
        { path: 'find', title: 'find', name: 'find', component: resolve => { require(['@/views/find/find.vue'], resolve); } },
		{ path: 'mine', title: 'mine', name: 'mine', component: resolve => { require(['@/views/mine/mine.vue'], resolve); } },
    ]
};

export const preview = {
    path: '/panoramicView',
    name: 'panoramicView',
	// component: () => import('@/views/index/panoramic/panoramic-components/panoramic-detail.vue')
	// component: () => import('@/views/test.vue')
	component: resolve => { require(['@/views/index/panoramic/panoramic-components/panoramic-detail.vue'], resolve)},
	// component: resolve => { require(['@/views/test.vue'], resolve)},

};

export const otherRouter = [
    // {
    //     path: '/preview',
    //     name: 'preview',
    //     title: '全景',
    //     component: Other,
    //     children: [
    //         { path: 'index', title: '全景', name: 'panoramic_view', component: () => import('../views/index/panoramic/panoramic-components/panoramic-detail.vue') }
    //     ]
	// },
	{
        path: '/informationView',
        name: 'informationView',
        title: '资讯详情',
        component: Other,
        children: [
            { path: 'index', title: '资讯详情', name: 'information_view', component: () => import('@/views/information/information-detail/information-detail.vue') }
        ]
	},
	{
        path: '/blessingView',
        name: 'blessingView',
        title: '福主页',
        component: Other,
        children: [
            { path: 'index', title: '福主页', name: 'blessing_view', component: () => import('@/views/index/panoramic/panoramic-components/blessing-home.vue') }
        ]
    },
];

export const routers = [
	appRouter,
	preview,
	...otherRouter
];
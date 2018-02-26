/*
 * @Author: tarn.tianrun 
 * @Date: 2018-02-07 16:26:48 
 * @Last Modified by: tarn.tianrun
 * @Last Modified time: 2018-02-24 10:34:42
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
	component: resolve => { require(['@/views/index/panoramic/panoramic-components/panoramic-detail.vue'], resolve)},
};

export const otherRouter = [
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
	{
		path: '/findDynamic',
		name: 'findDynamic',
		title: '动态',
		component: Other,
		children: [
			{ path: 'index', title: '动态', name: 'find_dynamic', component: () => import('@/views/find/dynamic/dynamic.vue') }
		]
	},
	{
		path: '/follow',
		name: 'follow',
		title: '关注',
		component: Other,
		children: [
			{ path: 'index', title: '关注', name: 'follow_view', component: () => import('@/views/mine/follow/follow.vue') }
		]
	},
	{
		path: '/topic',
		name: 'topic',
		title: '话题',
		component: Other,
		children: [
			{ path: 'index', title: '话题', name: 'topic_view', component: () => import('@/views/mine/topic/topic.vue') }
		]
	},
	{
		path: '/collection',
		name: 'collection',
		title: '收藏',
		component: Other,
		children: [
			{ path: 'index', title: '收藏', name: 'collection_view', component: () => import('@/views/mine/collection/collection.vue') }
		]
	},
];

export const routers = [
	appRouter,
	preview,
	...otherRouter
];
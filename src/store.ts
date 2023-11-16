// import Vue from 'vue';
// import Vuex from 'vuex';
// import api from '@/api';
// import {Module, UserData, Banner} from '@/api/user_interface';
import _ from 'lodash';
import type { Module, UserData, Banner } from '@/api/user_interface';

// Vue.use(Vuex);

const DEFAULT_TITLE = '林舍';
const DEFAULT_MODULE = {display: false, anchor: {id: '', icon: '', name: ''}, header: {title: '', subtitle: ''}};

function find(modules: Module[], id: string) {
    return _.find(modules, (module: any) => module.anchor.id === id) || DEFAULT_MODULE;
}

// export default new Vuex.Store<UserData>({
//     state: {
//         title: DEFAULT_TITLE,
//         social: {},
//         banner: {
//             anchor: {
//                 id: 'banner',
//                 icon: 'home',
//                 name: 'Home',
//             },
//         },
//         modules: [],
//     },
//     getters: {
//         title(state): string {
//             return state.title || DEFAULT_TITLE;
//         },
//         social(state): object {
//             return state.social || {};
//         },
//         menus(state): object[] {
//             // 找到可展示的模块
//             const modules = _.concat([state.banner], _.filter(state.modules, (module) => module.display));
//             // 将模块中用于menu的字段抽出
//             return _.map(modules, (module) => module.anchor);
//         },
//         moduleIds(state): string[] {
//             // 找到可展示的模块
//             const modules = _.filter(state.modules, (module) => module.display);
//             // 将模块中用于menu的字段抽出
//             return _.map(modules, (module) => module.anchor.id);
//         },
//         banner(state): Banner {
//             return state.banner || {};
//         },
//         getModule: (state: UserData) => (id: string) => {
//            return find(state.modules, id);
//         },
//     },
//     mutations: {
//         init(state, userData) {
//             state.title = userData.title || DEFAULT_TITLE;
//             state.social = userData.social;
//             state.banner = userData.banner;
//             state.modules = userData.modules;

//             if (DEFAULT_TITLE === document.title) {
//                 document.title = state.title;
//             }
//         },
//     },
//     actions: {
//         init({commit}) {
//             api.init((userData: UserData) => {
//                 commit('init', userData);
//             });
//         },
//     },
// });

// stores/counter.js
import { defineStore } from 'pinia'

// export const useCounterStore = defineStore('counter', {
//   state: () => {
//     return { count: 0 }
//   },
//   // could also be defined as
//   // state: () => ({ count: 0 })
//   actions: {
//     increment() {
//       this.count++
//     },
//   },
// })

export const useCounterStore = defineStore('counter', {
    state: () => ({
        title: DEFAULT_TITLE,
        social: {},
        banner: {
            anchor: {
                id: 'banner',
                icon: 'home',
                name: 'Home',
            },
        },
        modules: [
            {display: true, anchor: {id: 'banner', icon: 'home', name: 'Home'}, header: {title: 'Home', subtitle: 'Home'}},
            {
                display: true,
                anchor: {
                  id: "about",
                  icon: "user",
                  name: "关于"
                },
                header: {
                  title: "information",
                  subtitle: "about me",
                },
                content: {
                  name: "林舍",
                  desc: [
                    "林中通幽静",
                    "深山藏小舍",
                  ],
                  md: "鄙人林舍，生于河北，纯北方汉子，苦读十二载，后求学于西安~\
                  \n『**厚德、求真、砺学、笃行**』这是母校给予的八字真言，四年本科生涯、三年研究生涯，良师益友收获颇多~\
                  \n求学之际偶遇佳人，毕业之后终成正果，小窝一间、少爷一个，平平淡淡、快快乐乐~\
                  \n前有微波天线、后学电磁黑障，本非科班出身，出于热情投身猿类大军~\
                  \n工作五六载，两域三城奔波，累哉累哉，自知其中快乐~",
                },
                // key - value 数量及内容完全自定义，链接自动识别
                keys: {
                  "主页": "http://cv.manerfan.com",
                  "博客": "http://blog.manerfan.com",
                  "专栏": "http://zhuanlan.manerfan.com",
                  "公众号": "林中小舍"
                },
            }
        ],
    }),
    getters: {
        title(state): string {
            return state.title || DEFAULT_TITLE;
        },
        social(state): object {
            return state.social || {};
        },
        menus(state): object[] {
            // 找到可展示的模块
            console.log(state.modules)
            const modules = _.concat([state.banner], _.filter(state.modules, (module: any) => module.display));
            // 将模块中用于menu的字段抽出
            console.log(modules)
            return _.map(modules, (module: any) => module.anchor);
        },
        moduleIds(state): string[] {
            // 找到可展示的模块
            const modules = _.filter(state.modules, (module: any) => module.display);
            console.log(modules)
            // 将模块中用于menu的字段抽出
            return _.map(modules, (module: any) => module.anchor.id);
        },
        banner(state): Banner {
            return state.banner || {
                anchor: {
                  id: "banner",
                  icon: "home",
                  name: "首页",
                },
                title: "林中小舍",
                desc: [
                  "北方汉子",
                  "宝爸一颗",
                  "码农一枚",
                  "花名林舍",
                  "工作五六载",
                ],
            }
        },
        getModule: (state: UserData) => (id: string) => {
           return find(state.modules, id);
        },
    },
  })

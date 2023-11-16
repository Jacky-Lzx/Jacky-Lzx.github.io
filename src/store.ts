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
        modules: [{display: true, anchor: {id: 'banner', icon: 'home', name: 'Home'}, header: {title: 'Home', subtitle: 'Home'}}],
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

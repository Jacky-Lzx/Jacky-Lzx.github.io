// import Vue from 'vue';
// import Vuex from 'vuex';
import api from '@/api';
import _ from 'lodash';
import type { Module, UserData, Banner } from '@/api/user_interface';

// Vue.use(Vuex);

const DEFAULT_TITLE = 'Zexi Li';
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
            // {display: true, anchor: {id: 'banner', icon: 'home', name: 'Home'}, header: {title: 'Home', subtitle: 'Home'}},
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
                  name: "Zexi Li",
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
            },
            {
                display: true,
                anchor: {
                  id: "experience",
                  icon: "idcard",
                  name: "经历"
                },
                header: {
                  title: "experience",
                  subtitle: "my experience",
                },
                cards: [
                  {
                    title: "阿里巴巴（中国）网络技术有限公司",
                    //subtitle: "2018-08 至 今",
                    md: "<!--**<u>高级开发工程师</u>**-->\
                    \n\
                    \nAli的包容性带来更广的舞台与更大的成长空间，身为Alier，很荣幸能在这样的一家公司共同奋斗、发展",
                  },
                  {
                    title: "海航科技有限公司",
                    //subtitle: "2016-12 至 2018-08",
                    md: "<!--**<u>高级Java工程师</u>**-->\
                    \n\
                    \n海航是将我引向'互联网'的一艘船\
                    \n做为HNAer，很感谢HNA以及各位同仁能够提供这样一个舞台，来接触如此纷繁的、更为'互联网化'的技术，在HNA认识如此之多优秀的同仁尤为庆幸\
                    \n很遗憾HNA的一些变故影响到了很多事情，也带来了很多不愉快"
                  },
                  {
                    title: "北京数码视讯有限公司",
                    //subtitle: "2013-04 至 2016-12",
                    md: "<!--**<u>技术经理</u>**-->\
                    \n\
                    \n由于专业和课题的原因并未进入'理想'中的体制内，凭借着对coding的一腔热情，一头扎进了猿类大军\
                    \n做为数码人，很感激数码在职场专业化成长上给予的空间",
                  },
                  {
                    title: "西安电子科技大学",
                    subtitle: "2010-09 至 2013-04",
                    md: "**<u>研究生</u>**\
                    \n\
                    \n<!--**专业**：电路与系统-->\
                    \n\
                    \n惧怕过早接触社会选择了读研\
                    \n三年研究生涯对于(课题)研究的 **<u>意义</u>** 有了更深层次的理解\
                    \n由于自己的原因并没有继续读博，虽向往，但无悔",
                  },
                  {
                    title: "西安电子科技大学",
                    subtitle: "2016-09 至 2010-09",
                    md: "**<u>本科生</u>**\
                    \n\
                    \n<!--**专业**：电子信息工程-->\
                    \n\
                    \n第一次背井离乡，站了一个晚上的火车，远赴千里之外求学\
                    \n踏进校园的一刻很激动，第一天晚上心口刺痛的时候就开始想家了\
                    \n四年象牙塔生活很充实，也第一次感受到了四年同寝离别时的伤感之情",
                  },
                ],
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
                title: "Zexi Li",
                desc: [
                  "You've been on this page for so long, aren't you?"
                  // "北方汉子",
                  // "宝爸一颗",
                  // "码农一枚",
                  // "花名林舍",
                  // "工作五六载",
                ],
            }
        },
        getModule: (state: UserData) => (id: string) => {
           return find(state.modules, id);
        },
    },
    // actions: {
    //     init({commit}) {
    //         api.init((userData: UserData) => {
    //             commit('init', userData);
    //         });
    //     },
    // }
  })

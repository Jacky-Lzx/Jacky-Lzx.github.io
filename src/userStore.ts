import api from '@/api';
import _ from 'lodash';
import type { Module, UserData, Banner, Social, Anchor } from '@/api/user_interface';

const DEFAULT_TITLE = 'Template';
const DEFAULT_MODULE = {display: false, anchor: {id: '', icon: '', name: ''}, header: {title: '', subtitle: ''}};

import { defineStore } from 'pinia'
import { reactive, ref, computed } from 'vue';

export const useUserStore = defineStore('user', () => {
    const title_f = ref(DEFAULT_TITLE);
    const social_f: Social = ref({});
    const banner_f: Banner = ref({});
    const modules_f = ref({});

    init()

    const title = computed(() => {
        return title_f.value || DEFAULT_TITLE;
    });
    const social = computed(() => {
        return social_f.value || {};
    });
    const banner = computed(() => {
        return banner_f.value || {};
    });

    const menus = computed(() => {
       // 找到可展示的模块
       console.log("modules_f: ", modules_f.value)
       const modules = _.concat([banner_f.value], _.filter(modules_f.value, (module: any) => module.display));
       // 将模块中用于menu的字段抽出
       const modules_final = _.map(modules, (module: any) => module.anchor)
       console.log("modules_final: ", modules_final)

       const modules_t = _.map(modules_f.value, (module: any) => module.anchor);
       console.log("modules_t: ", modules_t)

       // Don't know why modules_final doesn't work...
       return modules_t;
    })

    const moduleIds = computed(() => {
        console.log("moduleIds() executed.")
        // 找到可展示的模块
        const modules = _.filter(modules_f.value, (module: any) => module.display);
        console.log(modules)
        // 将模块中用于menu的字段抽出
        return _.map(modules, (module: any) => module.anchor.id);
    })

    function init() {
        api.init((userData: UserData) => {
            console.log("userData:", userData)
            title_f.value = userData.title;
            social_f.value = userData.social;
            banner_f.value = userData.banner;
            modules_f.value = userData.modules;

            if (DEFAULT_TITLE === document.title) {
                document.title = title_f.value;
            }
            console.log("after update: ", {title_f, social_f})
        });
    }

    function getModule(id: string) {
        console.log("id: ", id);
        console.log("modules: ", modules_f);
        return _.find(modules_f.value, (module: any) => module.anchor.id === id) || DEFAULT_MODULE;
    }

    return {title, social, banner, menus, moduleIds, getModule}
  })

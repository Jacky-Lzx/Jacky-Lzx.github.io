<!-- 菜单 -->

<template>
    <a-layout class="layout-menu">
        <!-- 头像 -->
        <div class="header">
            <!-- <span class="avatar ant-avatar ant-avatar-circle ant-avatar-image">
                <img draggable="false" src="../assets/avatar.jpg">
            </span> -->
            <a-avatar :size="120" class="avatar ant-avatar ant-avatar-circle ant-avatar-image">
                <template #icon>
                    <img src="../assets/avatar.jpg">
                </template>
            </a-avatar>
            <span>{{store.banner.title || '林中小舍'}}</span>
        </div>
        <!-- 菜单 -->
        <a-layout-content class="menu">
            <a-menu>
                <!-- 根据配置动态模块的内容和顺序 -->
                <a-menu-item class="testlzx" v-for="m in store.menus" v-bind:key="m.id">
                    <!-- <a-icon :type="m.icon" /> -->
                    <a v-smooth-scroll :href="'#' + m.id" @click="closeMenuDrawer">{{m.name}}</a>
                    <!-- <a-divider dashed /> -->
                </a-menu-item>
            </a-menu>
        </a-layout-content>
        <!-- 菜单页脚 -->
        <a-layout-footer class="footer">
            <!-- 社交 -->
            <a-row type="flex" justify="center" align="middle" :gutter="2">
                <a-col span="24"><Social color="rgb(136,136,136)" :size="1.2"/></a-col>
            </a-row>
            <!-- 版权 -->
            <a-row type="flex" justify="center" align="middle" :gutter="2">
                <a-col span="24"><Copyrights color="rgb(136,136,136)" :size=".6"/></a-col>
            </a-row>
        </a-layout-footer>
    </a-layout>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-facing-decorator';
    import Copyrights from '@/components/footer/Copyrights.vue';
    import Social from '@/components/footer/Social.vue';
    // import {mapGetters} from 'vuex';
    // import { useCounterStore } from '@/store';

    import { useUserStore } from '@/userStore';

    import { h, ref } from 'vue';
    import {
      MailOutlined,
      CalendarOutlined,
      AppstoreOutlined,
      SettingOutlined,
      StarOutlined,
    } from '@ant-design/icons-vue';
    import type { MenuProps } from 'ant-design-vue';

    @Component({
        components: {
            MailOutlined,
            StarOutlined,
            Copyrights,
            Social,
        },
        // computed: {
        //     ...mapGetters(['banner', 'menus']),
        // },
    })
    export default class Menu extends Vue {
        store = useUserStore()
        // menus = this.store.menus
        public closeMenuDrawer() {
            this.$emit('menuClick');
        }
        public handleClick(e: any) {
          console.log('click ', e);
        };
    }
</script>

<style scoped lang="scss">
    @import '../styles/variable';

    .testlzx {
        border-bottom: 1px dotted #888;
    }
    .layout-menu {
        width: 100%;
        height: 100vh;
        text-align: center;
        background-color: white !important;

        .header, .menu, .footer {
            background-color: white !important;
        }

        .header {
            margin: 2rem auto;
            .avatar {
                width: 80px;
                height: 80px;
                line-height: 80px;
            }
            span {
                display: block;
                margin-top: .5rem;
                font-size: 1.2em;
                font-weight: 500;
                color: $--color-gray;
            }
        }

        .menu {
            * {
                font-size: 1em;
            }

            a {
                display: inline;
            }
        }

        .footer {
            padding: 10px;
            margin-bottom: 1rem;
            * {
                color: $--color-gray;
            }

            & > div {
                margin: .5rem auto;
            }
        }
    }
</style>

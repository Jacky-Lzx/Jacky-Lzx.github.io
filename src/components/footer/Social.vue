<!-- 社交 -->

<template>
    <div class="social" :style="{'font-size': size + 'em'}">
        <!-- github -->
        <a :style="{color: color}" href="https://github.com/Jacky-Lzx" target="_blank"><GithubOutlined /></a>
        <!-- 微信 -->
        <a-popover arrowPointAtCenter>
            <template slot="content"><img style="width: 360px; max-width: 80vw; height: auto;"  alt="林中小舍" src="../../assets/wechat.jpg"/></template>
            <a :style="{color: color}"><WechatOutlined /></a>
        </a-popover>
        <!-- twitter -->
        <!-- <a :style="{color: color}" :href="social['twitter'] || 'https://twitter.com/manerfan_china'" target="_blank"><TwitterOutlined /></a> -->
        <!-- linkedin -->
        <a :style="{color: color}" href="https://www.linkedin.com/in/zexi-li-25b85a299" target="_blank"><LinkedinOutlined /></a>
    </div>
</template>

<script lang="ts">
    import {Prop, Component, Vue} from 'vue-facing-decorator';
    import {GithubOutlined, WechatOutlined, TwitterOutlined, LinkedinOutlined} from '@ant-design/icons-vue';
    import { useUserStore } from '@/userStore';
    // import {mapGetters} from 'vuex';

    @Component({
        components: {
            GithubOutlined,
            WechatOutlined,
            // TwitterOutlined,
            LinkedinOutlined
        }
        // components: {
        // },
        // props: {
        //     color: String,
        //     size: Number,
        // },
        // computed: {
            // ...mapGetters(['social']),
        // },
    })
    export default class Social extends Vue {
        @Prop
        color?: string;
        @Prop
        size?: number;

        social = useUserStore().social;
    }
</script>

<style scoped lang="scss">
    .social {
        &>* {
            margin: 0.5em;
        }
    }
</style>


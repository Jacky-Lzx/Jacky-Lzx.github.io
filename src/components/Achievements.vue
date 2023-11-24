<!-- 经历 -->

<template>
    <div class="content" id="experience">
        <ModuleHeader :title="experience.header.title" :sub-title="experience.header.subtitle"/>
        <!-- <ModuleHeader sub-title="My Experience" /> -->
        <a-timeline>
            <a-timeline-item data-aos="fade-in" v-for="card in experience.cards" v-bind:key="card.title + card.subtitle">
                <a-card class="experience-card" :bordered="true" style="width: 100%">
                    <!-- <template slot="title"> -->
                        <h1 class="title">{{card.title}}</h1>
                        <span v-if="!!card.subtitle" class="sub-title">{{card.subtitle}}</span>
                    <!-- </template> -->
                    <div v-html="mdit.render(card.md)"></div>
                    <!-- <vue-markdown>{{card.md}}</vue-markdown> -->
                </a-card>
            </a-timeline-item>
        </a-timeline>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-facing-decorator';
    import ModuleHeader from '@/components/module/ModuleHeader.vue';
    import type {Module} from '@/api/user_interface';
    // tslint:disable-next-line:no-var-requires
    // import VueMarkdown from 'vue-markdown';
    // import { useCounterStore } from '@/store';
    import { useUserStore } from '@/userStore';

    import MarkdownIt from 'markdown-it';

    @Component({
        components: {
            ModuleHeader,
            // VueMarkdown,
        },
        // computed: {
        //     experience(): Module {
        //         return this.$store.getters.getModule('experience');
        //     },
        // },
    })
    export default class Achievements extends Vue {
        experience =useUserStore().getModule('experience')

        mdit = new MarkdownIt()
    }
</script>

<style scoped lang="scss">
    @import '../styles/variable';

    .experience-card {
        .title {
            width: 100%;
            font-size: 1rem;
            overflow: scroll;
            margin: 0;
        }

        .sub-title {
            width: 100%;
            font-size: .5rem;
            display: block;
            margin-top: .5rem;
        }
    }
</style>

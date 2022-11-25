<template lang="html">
    <div class="actions">
        <div class="actions-title">
            List of actions commited
        </div>

        <div class="card-wrapper">
            <template v-if="commitActions.length">
                <div v-for="commit, index in commitActions" :key="index" class="card">
                    <p class="card-text">{{ commit.action }} </p>
                    <button class="card-btn" @click.prevent="undoAction(commit.id)">Time Travel</button>
                </div>
            </template>

            <template v-else>
                <small>There are no actions at the moment. Move the cards on the left to see actions history.</small>
            </template>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    data() {
        return {
            
        }
    },
    computed: {
        ...mapState(['commitActions'])
    },
    methods: {
        undoAction(id) {
            this.$store.dispatch('timeTravel', id);
        }
    }
}
</script>
<style lang="scss" scoped>
.actions {
    background: grey;
    color: #333;
    width: 100%;
    border-radius: 4px;
    box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;


    &-title {
        background: #fff;
        color: #333;
        font-weight: bold;
        display: block;
        padding: 1rem;
        text-align: left;
    }

    .card-wrapper {
        padding: 1rem;
        background-color: #f5f5f5;

        .card {
            box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
            background: #fff;
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1rem;

            &-btn {
                background-color: #0014FF;
                color: #fff;
                outline: none;
                padding: 8px 16px;
                border-radius: 8px;
                border: none;
                cursor: pointer;
            }
        }
    }
}
</style>
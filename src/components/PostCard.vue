<template lang="html">
    <div class="card">
        <div class="card-text">
            Post {{ post.id }}
        </div>

        <div class="card-controls">
            <img v-if="currentKey > 0" src="@/assets/icons/caret-up.svg" class="arrow" alt="move up"
                @click="$emit('moveCard', { action: 'up', id: post.id })">
            <img v-if="currentKey < 4" src="@/assets/icons/caret-down.svg" class="arrow" alt="move down"
                @click="$emit('moveCard', { action: 'down', id: post.id })">
        </div>
    </div>
</template>

<script>

export default {
    props: {
        post: {
            type: Object,
            required: true,
            default: () => { }
        },
        currentKey: {
            type: Number,
            required: false
        }
    }
}
</script>
<style lang="scss" scoped>
.card {
    padding: 1.5rem 1rem;
    background: #fff;
    color: #333;
    border-radius: 4px;
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-controls {
        .arrow {
            cursor: pointer;
        }
    }
}
</style>
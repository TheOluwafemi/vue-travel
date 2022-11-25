<template>
  <main class="home">
    <section class="home-cards">
      <div class="posts">
        <PostCard v-for="post, index in posts" :key="index" :post="post" :currentKey="index" @moveCard="moveCard" />
      </div>

      <div class="actions">
        <ActionsCard />
      </div>
    </section>

  </main>
</template>

<script>
import { mapState } from 'vuex';
import PostCard from '@/components/PostCard.vue';
import ActionsCard from '@/components/ActionsCard.vue';

export default {
  name: "HomeView",
  components: {
    PostCard, ActionsCard
  },
  mounted() {
    this.$store.dispatch("getPosts");
  },
  computed: {
    ...mapState(['posts'])
  },
  methods: {
    moveCard(payload) {
      this.$store.dispatch("moveCard", payload)
    }
  }
};
</script>

<style scoped lang="scss">
.home {
  min-height: 100vh;
  padding: 2rem;

  @media only screen and (max-width: 600px) {
    padding: 1rem;
  }

  &-cards {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 4rem;
    margin-top: 4rem;
    flex-wrap: wrap;

    .posts {
      flex-basis: 30%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      gap: 1rem;
    }

    .actions {
      flex-basis: 30%;
    }
  }
}
</style>

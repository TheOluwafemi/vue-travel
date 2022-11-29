<template>
  <main class="home">
    <section class="home-cards">
      <div v-if="posts.length" class="posts">
        <PostCard v-for="post, index in posts" :key="index" :post="post" :currentKey="index"
          @moveCard="handleMoveCard" />
      </div>

      <div class="actions">
        <ActionsCard @undoCommit="undoCommit" />
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
    handleMoveCard(payload) {
      this.$store.dispatch("moveCard", payload)
    },
    undoCommit(id) {
      this.$store.dispatch('timeTravel', id);
    }
  }
};
</script>

<style scoped lang="scss">
.home {
  min-height: 100vh;
  margin: 4rem;

  @media only screen and (max-width: 600px) {
    margin: 2rem;
  }

  &-cards {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 4rem;
    margin-top: 4rem;
    flex-wrap: wrap;
    position: relative;

    .posts {
      flex: 0 0 30%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      gap: 1rem;

      @media only screen and (max-width: 1024px) {
        flex: 0 0 40%;
      }

      @media only screen and (max-width: 768px) {
        flex: 0 0 45%;
      }

      @media only screen and (max-width: 600px) {
        flex: 0 0 90%;
      }
    }

    .actions {
      flex: 0 0 30%;

      @media only screen and (max-width: 1024px) {
        flex: 0 0 40%;
      }

      @media only screen and (max-width: 768px) {
        flex: 0 0 45%;
      }

      @media only screen and (max-width: 600px) {
        flex: 0 0 90%;
      }
    }
  }
}
</style>

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function moveArray(array, from, to) {
  const arrayLength = array.length
  if (to === from) return array // return same array if the to-position is same from-postion
  if (to < 0 || to > arrayLength - 1) return array // return same array if new position is out of array bounds

  let currentIndex = array[from]
  let movement = to < from ? -1 : 1

  for (let i = from; i !== to; i += movement) {
    array[i] = array[i + movement]
  }

  array[to] = currentIndex
  return array
}

const state = {
  posts: [],
  commitActions: [],
}

export const getters = {
  postsLength(state) {
    return state.posts.length
  },
}

export const mutations = {
  updatePosts(state, payload) {
    state.posts = [...payload]
  },
  updatePostMovement(state, payload) {
    const currentPostsState = [...state.posts]
    const payloadPosition = state.posts
      .map((item) => item.id)
      .indexOf(payload.id)

    state.posts = [
      ...moveArray(
        state.posts,
        payloadPosition,
        payload.action === 'up' ? payloadPosition - 1 : payloadPosition + 1,
      ),
    ]
    const newCommit = {
      id: Date.now(),
      action:
        payload.action === 'up'
          ? `Moved post from index ${payloadPosition} to index ${
              payloadPosition - 1
            }`
          : `Moved post from index ${payloadPosition} to index ${
              payloadPosition + 1
            }`,
      postsState: currentPostsState,
    }
    state.commitActions = [newCommit, ...state.commitActions]
  },
  updateTimeTravel(state, payload) {
    const activeCommit = state.commitActions.filter(
      (item) => item.id === payload,
    )
    const commitPosition = state.commitActions
      .map((item) => item.id)
      .indexOf(payload)
    state.posts = [...activeCommit[0]['postsState']]
    state.commitActions.splice(0, commitPosition + 1)
  },
}

export const actions = {
  async getPosts({ commit }) {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts?_start=0&_limit=5',
      )
      let posts = await response.json()
      commit('updatePosts', posts)
    } catch (error) {
      console.error(error.message)
      throw error
    }
  },
  moveCard({ commit }, payload) {
    commit('updatePostMovement', payload)
  },
  timeTravel({ commit }, payload) {
    commit('updateTimeTravel', payload)
  },
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {},
})

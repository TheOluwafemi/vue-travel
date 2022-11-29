import { createLocalVue, shallowMount, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import storeConfig from '../../src/store/index'
import { actions, mutations } from '../../src/store/index'
const cloneDeep = require('lodash.cloneDeep')

const newPosts = [
  {
    userId: 1,
    id: 1,
    title: 'post title',
    body: 'post body',
  },
  {
    userId: 2,
    id: 2,
    title: 'post title',
    body: 'post body',
  },
  {
    userId: 3,
    id: 3,
    title: 'post title',
    body: 'post body',
  },
  {
    userId: 4,
    id: 4,
    title: 'post title',
    body: 'post body',
  },
]

describe('Store Mutations', () => {
  it('posts get updated', async () => {
    const state = { posts: [] }
    const { updatePosts } = mutations

    updatePosts(state, newPosts)
    expect(state.posts).toHaveLength(4)
  })

  it('posts get moved', async () => {
    const state = { posts: newPosts, commitActions: [] }
    const { updatePostMovement } = mutations

    updatePostMovement(state, { action: 'up', id: 2 })
    const newPositionOfPost = newPosts.findIndex((post) => post.id === 2)
    const positionOfPostSwapped = newPosts.findIndex((post) => post.id === 1)

    expect(state.commitActions).toHaveLength(1)
    expect(newPositionOfPost).toBe(0)
    expect(positionOfPostSwapped).toBe(1)
  })

  it('time travels to an earlier commit', async () => {
    jest.useFakeTimers()
    const state = { posts: newPosts, commitActions: [] }
    const { updateTimeTravel, updatePostMovement } = mutations

    const oldPostsState = state.posts

    setTimeout(() => {
      updatePostMovement(state, { action: 'up', id: 2 })
    }, 500)
    jest.runAllTimers()
    expect(state.commitActions).toHaveLength(1)

    setTimeout(() => {
      updatePostMovement(state, { action: 'down', id: 3 })
    }, 2000)
    jest.runAllTimers()
    expect(state.commitActions).toHaveLength(2)

    setTimeout(() => {
      updatePostMovement(state, { action: 'up', id: 4 })
    }, 4000)
    jest.runAllTimers()
    expect(state.commitActions).toHaveLength(3)

    updateTimeTravel(
      state,
      state.commitActions[state.commitActions.length - 1].id,
    )

    expect(state.commitActions).toHaveLength(0)
    expect(oldPostsState).toEqual(state.posts)
  })
})

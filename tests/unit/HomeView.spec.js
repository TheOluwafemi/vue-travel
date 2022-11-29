import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import HomeView from '../../src/views/HomeView.vue'
import PostCard from '@/components/PostCard.vue'
import ActionsCard from '@/components/ActionsCard.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
const posts = [
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
]

describe('HomeView', () => {
  let actions
  let store
  let state

  beforeEach(() => {
    state = { posts, commitActions: [] }
    actions = {
      moveCard: jest.fn(),
      timeTravel: jest.fn(),
      getPosts: jest.fn(),
    }
    store = new Vuex.Store({ state, actions })
  })

  it('component fetches the posts when mounted by dispatching getPosts action in Vuex', () => {
    wrapper = shallowMount(HomeView, { localVue, store })
    expect(actions.getPosts).toHaveBeenCalled()
  })

  it('does not renders PostCard component when there are no posts', () => {
    state = {
      posts: [],
    }
    store = new Vuex.Store({ state, actions })
    const wrapper = shallowMount(HomeView, { store, localVue })

    const postCards = wrapper.findAllComponents(PostCard)
    expect(postCards.exists()).toBeFalsy()
    expect(postCards.length).toEqual(0)
  })

  it('renders PostCard component for as many posts we have in the store', () => {
    state = {
      posts,
    }
    store = new Vuex.Store({ state, actions })
    const wrapper = shallowMount(HomeView, { store, localVue })
    const postCards = wrapper.findAllComponents(PostCard)

    expect(postCards.exists()).toBeTruthy()
    expect(postCards.length).toEqual(posts.length)
  })

  it('HomeView receives a moveCard event when arrow on PostCard component is clicked', async () => {
    const spyHandleMoveCard = jest.spyOn(HomeView.methods, 'handleMoveCard')
    const wrapper = shallowMount(HomeView, {
      store,
      localVue,
      stubs: {
        PostCard
      },
      mocks: {
        $store: {
          getters: {
            postsLength: 5,
          },
        },
      },
    })
    const payload = { action: 'down', id: 1 }

    wrapper.findComponent(PostCard).vm.$emit('moveCard')
    wrapper.findComponent(PostCard).vm.$emit('moveCard', payload)
    await wrapper.vm.$nextTick()

    expect(spyHandleMoveCard).toHaveBeenCalled()
    expect(actions.moveCard).toHaveBeenCalled()

    expect(spyHandleMoveCard).toHaveBeenCalledWith(payload)
    expect(actions.moveCard).toHaveBeenCalled()

    spyHandleMoveCard.mockReset()
  })

  it('HomeView received an undoCommit event when the time travel button is clicked', async () => {
    const spyUndoCommit = jest.spyOn(HomeView.methods, 'undoCommit')
    const wrapper = shallowMount(HomeView, {
      store,
      localVue,
      stubs: {
        ActionsCard,
      },
    })
    const payload = { id: 1 }

    wrapper.findComponent(ActionsCard).vm.$emit('undoCommit')
    wrapper.findComponent(ActionsCard).vm.$emit('undoCommit', payload)
    await wrapper.vm.$nextTick()

    expect(spyUndoCommit).toHaveBeenCalled()
    expect(actions.timeTravel).toHaveBeenCalled()

    expect(spyUndoCommit).toHaveBeenCalledWith(payload)
    expect(actions.timeTravel).toHaveBeenCalled()

    spyUndoCommit.mockReset()
  })
})

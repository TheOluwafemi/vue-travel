import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import ActionsCard from '@/components/ActionsCard.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('ActionsCard component', () => {
  let store
  let state

  it('test component state on initial render', () => {
    state = {
      commitActions: [],
    }
    store = new Vuex.Store({ state })
    const wrapper = shallowMount(ActionsCard, { store, localVue })
    const commitCards = wrapper.findAll('.card')
    const emptyMsg = wrapper.find('.empty-msg')

    expect(store.state.commitActions.length).toBe(0)
    expect(commitCards).toHaveLength(0)
    expect(emptyMsg.text()).toBe(
      'There are no actions at the moment. Move the cards on the left to see actions history.',
    )
  })

  it('tests a commit card is rendered for each action a user performs on the items in the list', () => {
    state = {
      commitActions: commits,
    }
    store = new Vuex.Store({ state })
    const wrapper = shallowMount(ActionsCard, { store, localVue })
    const commitCards = wrapper.findAll('.card')

    expect(store.state.commitActions.length).toEqual(commitCards.length)
  })

  it('tests clicking the button on a commit card emits an undo-commit event', async () => {
    state = {
      commitActions: commits,
    }
    store = new Vuex.Store({ state })
    const wrapper = shallowMount(ActionsCard, { store, localVue })
    const commitCards = wrapper.findAll('.card')
    const undoBtn = wrapper.find('.card-btn')

    await undoBtn.trigger('click')
    await wrapper.vm.$nextTick()

    expect(store.state.commitActions.length).toEqual(commitCards.length)
    expect(wrapper.emitted().undoCommit).toBeTruthy()
    expect(wrapper.emitted('undoCommit').length).toBe(1)
  })
})

const commits = [
  {
    id: 1669639111044,
    action: 'Moved post from index 1 to index 0',
    postsState: [
      {
        userId: 1,
        id: 2,
        title: 'qui est esse',
        body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
      },
      {
        userId: 1,
        id: 1,
        title:
          'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
      },
      {
        userId: 1,
        id: 3,
        title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
        body: 'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut',
      },
      {
        userId: 1,
        id: 4,
        title: 'eum et est occaecati',
        body: 'ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit',
      },
      {
        userId: 1,
        id: 5,
        title: 'nesciunt quas odio',
        body: 'repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque',
      },
    ],
  },
]

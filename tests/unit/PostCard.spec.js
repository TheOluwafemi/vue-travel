import { shallowMount, createLocalVue } from '@vue/test-utils'
import PostCard from '../../src/components/PostCard.vue'

let wrapper

const post = {
  userId: 1,
  id: 1,
  title: 'post title',
  body: 'post body',
}

beforeEach(() => {
  wrapper = shallowMount(PostCard, {
    propsData: {
      post,
      currentKey: 1,
    },
    mocks: {
      $store: {
        getters: {
          postsLength: () => 5,
        },
      },
    },
    computed: {
      postsLength: () => 5,
    },
  })
})

describe('PostCard component', () => {
  it('accepts props and renders component based on props passed to it', () => {
    const postCardElement = wrapper.findAll('.card')
    const postText = wrapper.find('.card-text')

    expect(postCardElement.length).toEqual(1)
    expect(postText.text()).toBe('Post ' + post.id)
  })

  describe('test if arrows on the card are displayed, depending on the current key', () => {
    it('test that both arrows are displayed when currentKey is less than length of post and greater than 0', () => {
      // currentKey is 1
      const arrowUp = wrapper.findComponent('.arrow-up')
      const arrowDown = wrapper.findComponent('.arrow-down')
      expect(arrowUp.exists()).toBe(true)
      expect(arrowDown.exists()).toBe(true)
    })

    it('test that only down arrows is displayed on card when currentKey is 0', async () => {
      // currentKey is 0
      wrapper.setProps({ currentKey: 0 })
      await wrapper.vm.$nextTick()

      const arrowUp = wrapper.findComponent('.arrow-up')
      const arrowDown = wrapper.findComponent('.arrow-down')
      expect(arrowUp.exists()).toBe(false)
      expect(arrowDown.exists()).toBe(true)
    })

    it('test that only up arrow  is displayed on card when currentKey is equal to length of all posts', async () => {
      // currentKey is 5
      await wrapper.setProps({ currentKey: 5 })
      await wrapper.vm.$nextTick()

      const arrowUp = wrapper.findComponent('.arrow-up')
      const arrowDown = wrapper.findComponent('.arrow-down')
      expect(arrowUp.exists()).toBe(true)
      expect(arrowDown.exists()).toBe(false)
    })
  })

  describe('arrow buttons on cards', () => {
    it('test that clicking on the arrow-up element emit moveCard event with the right payload', async () => {
      const arrowUp = wrapper.findComponent('.arrow-up')

      await arrowUp.trigger('click')
      await wrapper.vm.$nextTick()

      expect(wrapper.emitted().moveCard).toBeTruthy()
      expect(wrapper.emitted().moveCard[0][0]).toEqual({
        action: 'up',
        id: post.id,
      })
    })

    it('test that clicking on the arrow-down element emit moveCard event with the right payload', async () => {
      const arrowDown = wrapper.findComponent('.arrow-down')

      await arrowDown.trigger('click')
      await wrapper.vm.$nextTick()

      expect(wrapper.emitted().moveCard).toBeTruthy()
      expect(wrapper.emitted().moveCard[0][0]).toEqual({
        action: 'down',
        id: post.id,
      })
    })
  })
})

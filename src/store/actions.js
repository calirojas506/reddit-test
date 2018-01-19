import axios from 'axios'

export default {
  loadTopPosts (context) {
    axios.get('https://www.reddit.com/top.json').then(res => {
      let response = res.data.data.children

      for (let post of response) {
        post.read = false
      }
      context.commit('setTopPosts', {
        posts: res.data.data.children
      })
    }, err => {
      console.log(err)
    })
  },
  setActivePost (context, payload) {
    context.commit('setActivePost', payload)
  },
  setPostRead (context, payload) {
    context.commit('setPostRead', payload)
  },
  dismissPost (context, payload) {
    context.commit('dismissPost', payload)
  },
  dismissAll (context) {
    context.commit('dismissAll')
  }
}

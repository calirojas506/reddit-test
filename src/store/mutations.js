export default {
  setTopPosts (state, payload) {
    state.topPosts = payload.posts
  },
  setActivePost (state, payload) {
    state.activePost = payload.post
  },
  setPostRead (state, payload) {
    let index = state.topPosts.indexOf(payload.post)

    state.topPosts[index].read = true
  },
  dismissPost (state, payload) {
    let index = state.topPosts.indexOf(payload.post)

    state.topPosts.splice(index, 1)
  },
  dismissAll (state) {
    state.topPosts = []
  }
}

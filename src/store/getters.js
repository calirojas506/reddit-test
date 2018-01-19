export default {
  getUnreadPosts (state) {
    return state.topPosts.filter(el => {
      return !el.read
    })
  },
  getReadPosts (state) {
    return state.topPosts.filter(el => {
      return el.read && el.read === true
    })
  }
}

<template lang="pug">
  .c-posts
    .row
      .col-sm-12
        h1 Posts
    .row(
      v-if="posts.length"
    )
      .col-sm-2
        ul.list-group
          li.list-group-item(
            v-for="post in posts"
          ) {{post.title}}
      .col-sm-10
    .row(
      v-else
    )
      .col-sm-12
        .alert.alert-info.small No posts to show
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      posts: []
    }
  },
  computed: {
    ...mapGetters([
    ])
  }
}
</script>

<style lang="scss">
  .c-posts{

  }
</style>

<template lang="pug">
  .c-posts
    transition-group(
      name="fadeLeft"
    )
      .row(
        v-if="topPosts.length"
        key="a"
      )
        .col-sm-5
          .text-left
            button.btn.btn-danger(
              type="button"
              @click="dismissAll"
            ) &times; Dismiss all
            .pull-right
              span.label.label-success Read: {{getReadPosts.length}}
              |&nbsp;
              span.label.label-success Unread: {{getUnreadPosts.length}}
          transition-group.list-group(
            name="zoomLeft"
            tag="ul"
          )
            li.list-group-item(
              v-for="(post, index) in paginatedPosts"
              :key="index"
            )
              a(
                href="#"
                @click.prevent="setActivePost(post)"
              )
                span.text-muted.small {{formatDate(post.data.created)}}
                p {{post.data.title}}
              p.text-right
                button.btn.btn-danger.btn-xs(
                  type="button"
                  @click="dismissPost(post)"
                ) &times; Dismiss
          p.text-right
            ul.pagination(
              v-show="topPosts.length"
            )
              li(
                v-for="page in paginationTotalPages"
                :class="{'active': page === pagination.currentPage}"
              )
                a(
                  href="#"
                  @click.prevent="pagination.currentPage = page"
                ) {{page}}

        .col-sm-7
          .right-side(
            v-if="activePost.data"
          )
            .panel.panel-default
              .panel-body
                h2 {{activePost.data.title}}
                h3 Author: {{activePost.data.author}}
                  span.label.label-success.pull-right {{activePost.data.num_comments}} comments
                hr
                a(
                  :href="activePost.data.url"
                  target="_blank"
                )
                  img.img-rounded(
                    :src="activePost.data.thumbnail"
                    v-if="activePost.data.thumbnail !== 'default' && activePost.data.thumbnail !== 'nsfw'"
                    align="left"
                  )
                p.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fringilla orci justo,
                  nec finibus purus consequat vel. Nullam facilisis ligula a tempor feugiat. Nam pulvinar
                  turpis eget magna ullamcorper venenatis. Ut feugiat purus vel quam ultrices egestas.
                  Etiam magna urna, semper et pretium vel, egestas eget turpis. Mauris ullamcorper augue
                  eu elit tincidunt egestas. Praesent posuere mi velit, in pulvinar arcu faucibus a. Sed
                  vel consequat neque, quis interdum risus. Integer ut risus magna. Nulla quis metus id
                  neque iaculis commodo. Donec porta aliquam purus vitae consectetur. Quisque venenatis
                  arcu ut feugiat mattis. Quisque non nulla ut risus varius ultricies. Nunc maximus porttitor
                  rutrum. Maecenas id finibus magna. Nunc sit amet tempus dui, ut pretium orci.
                p.
                  Ut ipsum sapien, consequat sit amet venenatis non, feugiat id purus. Nam at posuere
                  lectus, id gravida augue. Aenean lacinia ultrices ante, sit amet viverra velit tempus ut.
                  Morbi ultricies pulvinar nisi malesuada faucibus. Duis viverra porta pretium. Mauris at
                  feugiat diam. Nulla facilisi. Integer hendrerit tellus vel enim pretium luctus. Duis in diam
                  mauris. Aliquam felis nibh, vestibulum ut gravida sit amet, pulvinar non nibh. Nulla mauris
                  tortor, ornare id egestas vel, congue nec orci.
                p.text-right
                  a(
                    :href="'https://www.reddit.com' + activePost.data.permalink"
                    target="_blank"
                  ) Permalink
                hr
                form(
                  @submit.prevent=""
                )
                  .form-group
                    label.control-label Comment:
                    textarea.form-control(
                      rows="4"
                    )
                  .text-right
                    button.btn.btn-success(
                      type="submit"
                    ) Submit
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import moment from 'moment'

export default {
  data () {
    return {
      pagination: {
        currentPage: 1,
        postsPerPage: 5
      }
    }
  },
  computed: {
    ...mapState([
      'topPosts',
      'activePost'
    ]),
    ...mapGetters([
      'getUnreadPosts',
      'getReadPosts'
    ]),
    paginationTotalPages () {
      let totalPages = Math.ceil(this.topPosts.length / this.pagination.postsPerPage)

      return totalPages
    },
    paginatedPosts () {
      let start = (this.pagination.currentPage * this.pagination.postsPerPage) - this.pagination.postsPerPage

      return this.topPosts.slice(start, this.pagination.currentPage * this.pagination.postsPerPage)
    }
  },
  methods: {
    formatDate (theDate) {
      return moment(new Date(theDate * 1000), 'YYYYMMDD').fromNow()
    },
    setActivePost (post) {
      this.$store.dispatch('setActivePost', {
        post
      })
      this.$store.dispatch('setPostRead', {
        post
      })
    },
    dismissAll () {
      this.$store.dispatch('dismissAll')
    },
    dismissPost (post) {
      this.$store.dispatch('dismissPost', {
        post
      })

      if (!this.paginatedPosts.length) {
        let currentPage = this.pagination.currentPage

        if (currentPage !== 1) {
          if (currentPage - 1 !== 0) {
            this.pagination.currentPage = currentPage - 1
          }
        }
      }
    }
  },
  mounted () {
    this.$store.dispatch('loadTopPosts')
  }
}
</script>

<style lang="scss">
  $vue-primary: #35495E;
  $vue-secondary: #41B883;

  .c-posts{
    .list-group{
      .list-group-item{
        // transition: all ease .3s;

        a{
          color: $vue-secondary;
          text-decoration: none;
        }

        &:hover{
          background: #333;

          a{
            color: #fff;
            text-decoration: none;
          }
        }
      }
    }

    .panel-body{
      img{
        margin: 0 15px 2px 0;
      }
    }
  }
</style>

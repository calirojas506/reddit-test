<template lang="pug">
  .c-posts
    .row(
      v-if="topPosts.length"
    )
      .col-sm-5
        .text-right
          span.label.label-default Read: {{getReadPosts.length}}
          span.label.label-default Unread: {{getUnreadPosts.length}}
        ul.list-group
          li.list-group-item(
            v-for="post in topPosts"
          )
            a(
              href="#"
              @click.prevent="setActivePost(post)"
            ) {{post.data.title}}
            p.text-right
              button.btn.btn-danger.btn-xs(
                type="button"
                @click="dismissPost(post)"
              ) &times; Dismiss
      .col-sm-7
        .right-side(
          v-if="activePost.data"
        )
          .panel.panel-default
            .panel-heading
              h4.panel-title {{activePost.data.title}}
            .panel-body
              h4 Author: {{activePost.data.author}}
                span.label.label-success.pull-right {{activePost.data.num_comments}} comments
              hr
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
    .row(
      v-else
    )
      .col-sm-12
        .alert.alert-info.small No posts to show
</template>
<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState([
      'topPosts',
      'activePost'
    ]),
    ...mapGetters([
      'getUnreadPosts',
      'getReadPosts'
    ])
  },
  methods: {
    aboutThis () {
      alert('Mr. Reddit\nVue.js Test Application\n\nCali Rojas, Costa Rica')
    },
    setActivePost (post) {
      this.$store.dispatch('setActivePost', {
        post
      })
      this.$store.dispatch('setPostRead', {
        post
      })
    },
    dismissPost (post) {
      this.$store.dispatch('dismissPost', {
        post
      })
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
        transition: all ease .3s;

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

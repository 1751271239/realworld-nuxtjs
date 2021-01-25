<template>
  <div>
    <form class="card comment-form">
      <div class="card-block">
        <textarea
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
          v-model="comment.body"
        ></textarea>
      </div>
      <div class="card-footer">
        <img :src="user.image" class="comment-author-img" />
        <button
          class="btn btn-sm btn-primary"
          @click="postComment()"
          :disabled="postCommentDis"
        >
          Post Comment
        </button>
      </div>
    </form>
    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">
          {{ comment.body }}
        </p>
      </div>
      <div class="card-footer">
        <nuxt-link
          class="comment-author"
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username,
            },
          }"
        >
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link
          class="comment-author"
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username,
            },
          }"
        >
          {{ comment.author.username }}
        </nuxt-link>
        <span class="date-posted">{{
          comment.createdAt | date("MMM DD, YYYY")
        }}</span>
        <span
          class="mod-options"
          v-if="comment.author.username == user.username"
        >
          <!-- <i class="ion-edit"></i> -->
          <i class="ion-trash-a" @click="deleteComment(comment)"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { getComments, addComments, deleteComments } from "@/api/article";
import { mapState } from "vuex";

export default {
  name: "ArticleComments",
  computed: {
    ...mapState(["user"]),
  },
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      comments: [], // 文章列表
      comment: {
        body: "",
      },
      postCommentDis: false,
    };
  },
  async mounted() {
    this.getCommentsList();
  },
  methods: {
    async getCommentsList() {
      const { data } = await getComments(this.article.slug);
      this.comments = data.comments;
    },
    async postComment() {
      console.log(this.comment.body);
      if (!this.comment.body) {
        this.getCommentsList();
        return;
      }
      this.postCommentDis = true;
      await addComments({
        comment: this.comment,
        slug: this.article.slug,
      });
      this.postCommentDis = false;
      this.comment.body = "";

      this.getCommentsList();
    },
    async deleteComment(comment) {
      await deleteComments({
        slug: this.article.slug,
        id: comment.id,
      });
      this.getCommentsList();
    },
  },
};
</script>

<style>
</style>
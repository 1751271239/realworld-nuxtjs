<template>
  <div class="article-meta">
    <nuxt-link
      :to="{
        name: 'profile',
        params: {
          username: article.author.username,
        },
      }"
      ><img :src="article.author.image" />
    </nuxt-link>
    <div class="info">
      <nuxt-link
        class="author"
        :to="{
          name: 'profile',
          params: {
            username: article.author.username,
          },
        }"
        >{{ article.author.username }}
      </nuxt-link>
      <span class="date">
        {{ article.createdAt | date("MMM DD, YYYY") }}
      </span>
    </div>
    <template v-if="user.username !== article.author.username">
      <button
        class="btn btn-sm btn-outline-secondary"
        :class="{
          active: article.author.following,
        }"
        @click="onFollow(article.author)"
        :disabled="followDis"
      >
        <i class="ion-plus-round"></i>
        &nbsp; {{ article.author.following ? "unFollow" : "Follow" }}
        {{ article.author.username }}
      </button>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm btn-outline-primary"
        :class="{
          active: article.favorited,
        }"
        @click="onFavorite(article)"
        :disabled="favoriteDis"
      >
        <i class="ion-heart"></i>
        &nbsp; Favorite Post
        <span class="counter">({{ article.favoritesCount }})</span>
      </button>
    </template>

    <template v-else>
      <button
        class="btn btn-sm btn-outline-secondary"
        @click="editArticle(article)"
      >
        <i class="ion-edit"></i>
        &nbsp;Edit Article
      </button>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm btn-outline-primary"
        @click="deleteArticle(article)"
        :disabled="deleteArticleDis"
      >
        <i class="ion-trash-a"></i>
        &nbsp;Delete Article
      </button>
    </template>
  </div>
</template>

<script>
import {
  addFollow,
  deleteFollow,
  addFavorite,
  deleteFavorite,
  deleteArticle,
} from "@/api/article";
import { mapState } from "vuex";

export default {
  name: "ArticleMeta",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      followDis: false,
      favoriteDis: false,
      // author: article.author,
      deleteArticleDis: false,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    // 关注用户或者取消关注用户
    async onFollow(author) {
      this.followDis = true;
      if (author.following) {
        await deleteFollow(author.username);
        author.following = false;
      } else {
        await addFollow(author.username);
        author.following = true;
      }
      this.followDis = false;
    },
    // 点赞文章或者取消点赞文章
    async onFavorite(article) {
      this.favoriteDis = true;
      if (article.favorited) {
        await deleteFavorite(article.slug);
        article.favorited = false;
        article.favoritesCount += -1;
      } else {
        await addFavorite(article.slug);
        article.favorited = true;
        article.favoritesCount += 1;
      }
      this.favoriteDis = false;
    },
    //编辑文章
    editArticle(article) {
      this.$router.push(`/editorarticle/${article.slug}`);
    },
    //删除文章
    async deleteArticle() {
      this.deleteArticleDis = true;
      await deleteArticle(this.article.slug);
      this.deleteArticleDis = false;
      this.$router.push("/");
    },
  },
};
</script>

<style>
</style>
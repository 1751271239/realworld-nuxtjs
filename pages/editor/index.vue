<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form @submit.prevent="onsubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="article.title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="article.description"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="article.body"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  v-model="tempTag"
                  @keyup.enter="tempTagChange()"
                />
                <div class="tag-list" v-for="tag in article.tagList" :key="tag">
                  {{ tag }}
                </div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click="onsubmit()"
              >
                {{
                  this.$route.params.slug ? "Update Article" : "Publish Article"
                }}
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addArticle, getArticle, updateArticle } from "@/api/article";

export default {
  middleware: "authenticated",
  name: "EditorIndex",
  data() {
    return {
      tempTag: "",
      article: {
        title: "",
        description: "",
        body: "",
        tagList: [],
        slug: this.$route.params.slug,
      },
      divLoading: false,
    };
  },
  async mounted() {
    const slug = this.$route.params.slug;
    if (slug) {
      const { data } = await getArticle(slug);
      // console.log(data);
      const { article } = data;
      this.article = article;
    }
  },
  methods: {
    async onsubmit() {
      // this.divLoading = true;
      const slug = this.$route.params.slug;
      const submitArticle = slug ? updateArticle : addArticle;
      const { data } = await submitArticle({
        article: this.article,
      });
      // this.divLoading = true;
      this.$router.push(`/article/${data.article.slug}`);
    },
    async tempTagChange() {
      this.article.tagList.push(this.tempTag);
      this.tempTag = "";
    },
  },
};
</script>

<style>
</style>
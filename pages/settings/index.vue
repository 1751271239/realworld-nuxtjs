<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                  v-model="user.image"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  v-model="user.username"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                  v-model="user.bio"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  v-model="user.email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="New Password"
                  v-model="user.password"
                />
              </fieldset>
              <button
                class="btn btn-lg btn-primary pull-xs-right"
                @click="updateSettings()"
                :disabled="updateSettingsDis"
              >
                Update Settings
              </button>
            </fieldset>
            <button
              class="btn btn-lg btn-primary button-logoout"
              @click="logout()"
            >
              logout
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.button-logoout {
  float: right;
  margin-top: 0.5rem;
}
</style>
<script>
import { getCurrentUser, updateCurrentUser } from "@/api/user";
import { mapState, mapActions, mapMutations } from "vuex";
// 仅在客户端加载 js-cookie 包
const Cookie = process.client ? require("js-cookie") : undefined;

export default {
  middleware: "authenticated",
  name: "SettingsIndex",
  data() {
    return {
      user: {
        image: "",
        username: "",
        bio: "",
        email: "",
        password: "",
      },
      updateSettingsDis: false,
    };
  },
  async mounted() {
    const { data } = await getCurrentUser();
    console.log(data);
    const { user } = data;
    this.user = user;
  },
  methods: {
    //更新用户信息
    async updateSettings() {
      this.updateSettingsDis = true;
      let model = {
        email: this.user.email,
        bio: this.user.bio,
        image: this.user.image,
      };
      console.log(this.user);
      // 保存用户的登录状态
      this.$store.commit("setUser", this.user);

      //防止刷新页面数据丢失，我们需要吧数据持久化
      Cookie.set("user", this.user);

      const { user } = await updateCurrentUser({
        user: this.user,
      });
      this.updateSettingsDis = false;

      console.log(user);

      // this.$router.push(`/profile/${data.user.username}`);
      // this.$router.push("/login");
    },
    //登出
    async logout() {
      // 保存用户的登录状态
      this.$store.commit("setUser", null);

      //防止刷新页面数据丢失，我们需要吧数据持久化
      Cookie.set("user", null);
      this.$router.push("/login");
    },
  },
};
</script>

<style>
</style>
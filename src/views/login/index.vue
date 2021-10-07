<template>
  <div class="mui-content">
    <div class="mui-content-padded">
      <div class="login-title">
        AtomV可视化平台
        <span />
      </div>
      <form class="mui-input-groups">
        <div class="mui-input-rows row-user">
          <label><i />用户名：</label>
          <input
            v-model="loginForm.username"
            type="text"
            class="mui-input-clear"
            placeholder="请输入工号"
          >
        </div>
        <div class="mui-input-rows row-password">
          <label><i />密码：</label>
          <input
            v-model="loginForm.password"
            type="password"
            class="mui-input-clear mui-input-password"
            placeholder="请输入密码"
          >
        </div>
        <div class="mui-button-row">
          <button
            type="button"
            class="mui-btn mui-btn-primary mui-btn-save"
            @click="handleLogin"
          >
            <span>
              登录
            </span>
          </button
          >&nbsp;&nbsp;
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { formValidation } from "@/utils/validate";
export default {
  name: "Login",
  components: {},
  data() {
    return {
      showHide: true,
      changePWD: {},
      realConfig: [
        {
          key: "username",
          validate: "isEmpty",
          msg: "用户名"
        },
        {
          key: "password",
          validate: "isEmpty",
          msg: "密码"
        }
      ],
      loginForm: {
        username: "admin",
        password: "123456"
      },
      loading: false
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {
  },
  mounted() {
  },
  destroyed() {
    clearTimeout(this.timer);
  },
  methods: {
    handleLogin() {
      // eslint-disable-next-line new-cap
      const valid = new formValidation(
        this.realConfig,
        this.loginForm
      ).verify();
      if (typeof valid !== 'object' && !valid) {
        this.$store
          .dispatch("user/login", this.loginForm)
          .then(response => {
            if (Boolean(response.success) === true) {
              this.$router.push({ path: "/" });
            }
            if (response.success === true && response.result === "2") {
              this.$message({
                type: "info",
                message: "您的密码不复合复杂度要求，请及时修改!"
              });
              this.loading = true;
              // this.$store.dispatch("tpridmp_common_user/getInfo");
              this.$router.push({ path: "/" });
            }
            if (response.success === true && response.result === "3") {
              this.$message({
                type: "info",
                message: "您的密码是初始密码，请重置!"
              });
            }
            if (response.success === true && response.result === "4") {
              this.$message({
                type: "info",
                message: "您的密码已过期，请重置!"
              });
            }
            this.loading = false;
          })
          .catch(err => {
            console.log(err);
            this.loading = false;
          });
      } else {
        this.$message({
          type: "info",
          message: valid.message
        });
      }
    },
    async logout() {
      await this.$store.dispatch("tpridmp_common_user/logout");
      this.$store.state.tagsView.visitedViews.splice(1, 1000);
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.mui-content {
  width: 100%;
  background-color: #FFFFFF;
  position: relative;

  .login-title {
    width: auto;
    height: auto;
    position: absolute;
    top: 177px;
    right: 254px;
    font-size: 44px;
    font-weight: 300;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #FFFFFF;
    text-align: center;
    font-family: AlibabaPuHuiTiM;

    span {
      display: inline-block;
      width: 64%;
      height: 3px;
      background-color: #FFFFFF;
      position: absolute;
      top: 53px;
      left: 0;
      right: 0;
      margin: 0 auto;
    }
  }

  .mui-input-groups {
    width: 350px;
    height: 300px;
    position: absolute;
    top: 0;
    right: 250px;
    bottom: 0;
    margin: auto 0;
    background-color: #fff;
    -webkit-box-shadow: 0px 0px 8px 1PX #ffffff;
    box-shadow: 0px 0px 6px 0PX #ffffff;
    padding: 30px 35px;

    .mui-input-rows {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      padding-bottom: 5px;
      margin-bottom: 10px;

      label {
        width: 100%;
        height: 20px;
        line-height: 20px;
        font-size: 15px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #515151;
        display: flex;

        i {
          margin-right: 10px;
        }

      }

      &.row-user {
        i{
          display: inline-block;
          width: 17px;
          height: 20px;
          background: url(~@/assets/images/users.png) no-repeat;
          background-position: center;
          margin-left: -2PX;
          background-size: 100%;
        }
      }

      &.row-password {
        i{
          display: inline-block;
          width: 14px;
          height: 20px;
          background: url(~@/assets/images/密码.png) no-repeat;
          background-position: center;
          background-size: 100%;
        }
      }

      input {
        width: 100%;
        height: 32px;
        line-height: 32px;
        margin-top: 10px;
        border: 0 none;
        font-size: 16px;
        background-color: transparent;
        padding: 0 27px;
      }

        &::after{
          position: absolute;
          bottom: 0;
          right: 0;
          left: 0;
          height: 1px;
          content: '';
          -webkit-transform: scaleY(.5);
          transform: scaleY(.5);
          background-color: #eaeaea;
        }
    }

    .mui-button-row {
      margin: 20px 0;
      text-align: center;

      button {
        width: 104px;
        height: 42px;
        border-radius: 21px;
        background-color: transparent;
        position: relative;

        span {
          display: inline-block;
          width: 94px;
          height: 32px;
          line-height: 32px;
          font-size: 15px;
          color: #FFFFFF;
          border-radius: 21px;
          background-color: #7872F9;
          position: absolute;
          top: 4px;
          left: 0;
          right: 0;
          bottom: 0;
          margin: 0 auto;
        }
      }
    }
  }

}
.mui-content-padded {
  height: 100%;
  overflow: auto;
  background: url(~@/assets/images/bg_01.png) no-repeat;
  background-position: center;
  background-size: cover;

  .mui-input-group {
    height: 200px;
    padding: 20px 10px;
    margin-top: calc(50%);
  }

}

</style>

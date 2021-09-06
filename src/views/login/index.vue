<template>
  <Row type="flex" justify="center" align="middle" class="row-full">
    <Col span="8">
    <Card>
      <router-link class="item" tag="div" to="prepare/synthManagement">
        <Button type="primary">跳跳</Button>
      </router-link>
      <router-link :to="{name: 'startBoot'}">
        <Button type="primary">开场动画</Button>
      </router-link>
      <Button @click="test" type="primary">请求</Button>
      <p slot="title" style="text-align:center">登陆系统</p>
      <Form :model="user" :label-width="80">
        <FormItem label="用户名: ">
          <i-input v-model="user.name" placeholder="请输入用户名"></i-input>
        </FormItem>
        <FormItem label="密  码: ">
          <i-input v-model="user.password" placeholder="请输入密码"></i-input>
        </FormItem>
        <FormItem>
          <Button type="primary" long @click="login()">登录</Button>
        </FormItem>
      </Form>
    </Card>
    </Col>
  </Row>
</template>

<script>
import api from '@/api/index'
export default {
  name: 'login',
  data() {
    return {
      user: {
        name: 'mboss',
        password: '123456',
      },
    }
  },
  computed: {
    name() {
      return ''
    },
  },
  methods: {
    async test () {
      console.log(await api.user.getSecret())
    },
    async login() {
      // let res = await this.$api.token()
      // console.log(res)
      this.$router.push('/main')
    },
  },
  mounted() {
    if (this.$store.state.user.islogin) {
      // this.$router.push('/main')
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.row-full {
  height: 100%;
}
</style>

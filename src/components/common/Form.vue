<!--  -->
<template>

  <el-form ref="form" :model="form" label-width="80px" :inline="inline">
    <el-form-item v-for="item in formLabel" :key="item.model" style="margin-right: 0px;">
      <el-input v-model="form[item.model]" :placeholder="item.label" v-if="!item.label" style="width: 200px;">
      </el-input>

      <el-select v-model="form[item.model]" placeholder="请选择" style="width: 90px;">
        <el-option v-for="item in item.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-select v-model="form[item.model]" placeholder="请选择" style="width: 90px;">
        <el-option v-for="item in item.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <slot></slot>
      <!-- <el-select v-model="form[item.model]" placeholder="请选择" style="width: 90px;" v-if="item.type === 'select'">
        <el-option v-for="item in item.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select> -->
    </el-form-item>

    <!-- <el-form-item>
      <slot></slot>
      卡槽，看看输入什么按钮 
      <slot></slot>
    </el-form-item> -->

  </el-form>

</template>


<script>
export default {
  props: {//接收父组件传递过来的值:绑定的表单字段、表单描述文本
    form: Object,
    formLabel: Array,
    inline: Boolean//横向分布
  },
  data () {
    return {
    };
  },

  components: {},

  computed: {},

  methods: {}
}
</script>


<style lang="scss" scoped>
.el-input {
}
</style>
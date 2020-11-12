<template>
  <div class="tags-view-container">
    <div class="tags">
      <el-tag
          :key="tag.name"
          size="small"
          v-for="tag in tags"
          :closable="tag.name !== 'home'"
          :disable-transitions="false"
          @close="handleClose(tag)">
        {{tag.label}}
      </el-tag>
    </div>
  </div>

<!--  <div data-v-1ab21ee1="" -->
<!--       data-v-c1f1971a="" -->
<!--       class="tags">-->
<!--    <span data-v-1ab21ee1="" class="el-tag el-tag&#45;&#45;small el-tag&#45;&#45;light"> 首页 </span>-->
<!--  </div>-->

<!--  <div data-v-fac8ca64=""-->
<!--       data-v-13877386=""-->
<!--       id="tags-view-container"-->
<!--       class="tags-view-container">-->
<!--    <div data-v-be6b7bae=""-->
<!--         data-v-fac8ca64=""-->
<!--         class="scroll-container tags-view-wrapper el-scrollbar">-->
<!--      <div class="el-scrollbar__wrap"-->
<!--           style="margin-bottom: -15px; margin-right: -15px;">-->
<!--        <div class="el-scrollbar__view">-->
<!--          <span data-v-fac8ca64="" class="tags-view-item"> Dashboard &lt;!&ndash;&ndash;&gt;</span>-->
<!--          <span data-v-fac8ca64="" class="tags-view-item"> Documentation &lt;!&ndash;&ndash;&gt;</span>-->
<!--          <span data-v-fac8ca64="" class="tags-view-item"> Guide-->
<!--            <span data-v-fac8ca64="" class="el-icon-close"></span>-->
<!--          </span>-->
<!--          <span data-v-fac8ca64="" class="tags-view-item router-link-exact-active router-link-active active"> Page Permission-->
<!--            <span data-v-fac8ca64="" class="el-icon-close"></span>-->
<!--          </span>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="el-scrollbar__bar is-horizontal">-->
<!--        <div class="el-scrollbar__thumb" style="transform: translateX(0%);">-->

<!--        </div>-->
<!--      </div>-->
<!--      <div class="el-scrollbar__bar is-vertical">-->
<!--        <div class="el-scrollbar__thumb" style="transform: translateY(0%);"></div>-->
<!--      </div>-->
<!--    </div>-->
<!--    <ul data-v-fac8ca64="" class="contextmenu" style="left: 0px; top: 0px; display: none;">-->
<!--      <li data-v-fac8ca64="">Refresh</li>-->
<!--      <li data-v-fac8ca64="">Close</li>-->
<!--      <li data-v-fac8ca64="">Close Others</li>-->
<!--      <li data-v-fac8ca64="">Close All</li>-->
<!--    </ul>-->
<!--  </div>-->
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: "tab",
  data() {
    return {
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: ''
    };
  },
  methods: {
    ...mapMutations({
      close: 'closeTabs'
    }),
    handleClose(tag) {
      this.close(tag);
    },
  },
  computed: {
    ...mapState({
      tags: state => state.tab.tabsList
    }),

  }
}
</script>

<style scoped>
  /*.tags{*/
  /*  padding: 0px;*/
  /*}*/
  /*.tags .el-tag{*/
  /*  margin-right: 1px;*/
  /*  padding: 0px;*/
  /*}*/




   .tags-view-container {
     height: 34px;
     width: 100%;
     background: #ffffff;
     border-bottom: 1px solid #d8dce5;
     -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
     box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

   }
  .tags-view-container .el-tag {
    margin-right: 2px;

  }
  .tags{
    display: flex;
    height: 100%;
    align-items: center;
  }


</style>
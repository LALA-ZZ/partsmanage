<template>
  <div class="tags-view-container">
    <div class="tags">
      <el-tag :key="tag.name" size="small" hit v-for="tag in tags" :closable="tag.name !== 'home'"
        :disable-transitions="false" @close="handleClose(tag)" @click="linkMain(tag)" style="margin-left: 5px;"
        :effect="$route.name ===tag.name ? 'dark' : 'plain'">
        <!--根据effect来判断标签的主题-->
        {{tag.label}}
      </el-tag>
    </div>
  </div>

</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: "tab",
  data () {
    return {
    };
  },
  methods: {
    ...mapMutations({
      close: 'closeTabs'
    }),
    handleClose (tag) {
      this.close(tag);
    },
    linkMain (tag) {
      this.$router.push({ name: tag.name });
      this.$store.commit('selectMenu', tag);
    }
  },
  computed: {
    ...mapState({
      tags: state => state.tab.tabsList
    }),

  }
}
</script>

<style scoped>
.tags {
  margin-left: 15px;
}
/*.tags .el-tag{*/
/*  margin-right: 1px;*/
/*  padding: 0px;*/
/*}*/

.tags-view-container {
  height: 34px;
  width: 100%;
  /* background: #ecf5ff; */
  border-bottom: 1px solid #d8dce5;
  -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12),
    0 0 3px 0 rgba(0, 0, 0, 0.04);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
}
.tags-view-container .el-tag {
  margin-right: 2px;
  cursor: pointer;
}
.tags {
  display: flex;
  height: 100%;
  align-items: center;
}
</style>
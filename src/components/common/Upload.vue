<!--  -->
<template>
  <div>
    <upload-excel ref="upload" :action="uploadUrl" :name="excelFile" :on-preview="handlePreview"
      :on-remove="handleRemove" :file-list="fileList" :on-error="uploadFalse" :on-success="handleSuccess"
      :before-upload="beforeUpload" />
    <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
      <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
    </el-table>
  </div>
</template>


<script>
import UploadExcel from '@/components/common/UploadExcel/index.vue';
export default {
  props: { excelFile: String },
  data () {
    return {
      fileList: [],
      tableData: [],
      tableHeader: [],
    };
  },

  components: { UploadExcel },

  computed: {},

  methods: {
    uploadUrl () {
      this.$emit('uploadUrl')//触发父组件的自定义事件（edit事件)
    },
    beforeUpload (file) {
      const extension = file.name.split(".")[1] === "xls";
      const extension2 = file.name.split(".")[1] === "xlsx";
      const extension3 = file.name.split(".")[1] === "csv";
      const isLt2M = file.size / 1024 / 1024 < 1024;
      if (!extension && !extension2 && !extension3) {
        this.$message.error("上传文件只能是 xls、xlsx、csv格式!");
      }
      // const isLt1M = file.size / 1024 / 1024 < 1
      if (isLt2M) {
        return true
      }

      this.$message({
        message: '请不要上传超过1G大小的文件。',
        type: 'warning'
      })
      // return false
      return extension || extension2 || extension3;

    },
    handleSuccess ({ results, header }) {
      this.tableData = results
      this.tableHeader = header
      //触发组件的action
      this.$refs.upload.submit();
      this.$message.success('文件上传成功！')
    },
    // handleSuccess (response, file, fileList) {
    //   console.log(response.status)
    //   console.log(response, file, fileList)
    //   if (response.code == "SUCCESS") {
    //     alert("文件上传成功！");

    //   } else {
    //     alert("文件上传失败！");
    //   }
    // },
    uploadFalse (response, file, fileList) {
      console.log(response, file, fileList)
      this.$message.error("文件上传失败！");
    },

    handlePreview (file) {
      console.log(file.response)
      if (file.response.status) {
        alert("此文件导入成功");
      } else {
        alert("此文件导入失败");
      }
    },
    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
  }
}
</script>


<style lang="scss" scoped>
</style>

<template>
  <div class="common-content">
    <!-- query region -->

    <el-tabs type="border-card">
      <el-tab-pane label="仓库管理"
                   v-if="wareLevel == 1">
        <warehouse-info message="noEnter"></warehouse-info>

      </el-tab-pane>
      <el-tab-pane label="库存状态">
        <el-table :data="inventoryList"
                  border
                  stripe
                  highlight-current-row
                  v-loading="loading"
                  style="margin-top:15px"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading"
                  :row-class-name="tableRowClassName">
          <div slot="empty"
               class="emptyBg">
            <img src="@/assets/box.jpg"
                 alt="">
            <p style="margin: 0px;">没有记录哦~</p>
          </div>
          <el-table-column type="index"
                           label="序号"
                           align="center"
                           width="60px"></el-table-column>
          <el-table-column label="配件编号"
                           prop="pid"
                           align="center"></el-table-column>
          <el-table-column label="配件名称"
                           prop="pname"
                           align="center"></el-table-column>
          <el-table-column label="库存状态"
                           align="center"
                           width="100px">
            <el-table-column label="在库数量"
                             prop="pamount"
                             width="100px"
                             align="center"></el-table-column>
            <el-table-column label="配送中数量"
                             prop="dispatchNum"
                             width="100px"
                             align="center"></el-table-column>
            <el-table-column label="待收货数量"
                             prop="waitInNum"
                             width="100px"
                             align="center"></el-table-column>
          </el-table-column>
          <el-table-column label="本月需求数量"
                           prop=""
                           align="center"></el-table-column>
          <el-table-column label="库存警戒线"
                           prop=""
                           align="center"></el-table-column>
          <el-table-column label="库存上限"
                           prop=""
                           align="center"></el-table-column>
          <el-table-column label="预警信息"
                           prop=""
                           align="center">
            <template slot-scope="scope">
              <el-tag type="warning"
                      v-if="scope.row.state === 0">库存不足</el-tag>
              <el-tag type="danger"
                      v-else>库存过量</el-tag>
            </template>
          </el-table-column>
          <!-- <el-table-column label="操作"
                           align="center">、
            <template slot-scope="scope">
              <el-button size="mini"
                         @click="showDetailsDialog(scope.row.id)">详情</el-button>
            </template>
          </el-table-column> -->

        </el-table>

        <!-- pagination region -->
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="queryinfo.currentpage"
                       :page-sizes="[5, 8, 10, 20]"
                       :page-size="queryinfo.pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="inventoryTotal">
        </el-pagination>
        <el-badge :value="200"
                  :max="10"
                  class="item"
                  style="margin: 10px 20px 10px 20px;float:left">
          <el-button size="small">库存预警</el-button>
        </el-badge>
      </el-tab-pane>

      <!-- v-if="wareLevel == 2 || wareLevel == 3" -->
      <el-tab-pane :label="wareLevel == 1 ? '采购申请' : '调拨申请'">
        <div style="margin-top:15px">
          <el-alert title="点击申请按钮系统自动生成配件方案！"
                    type="warning"
                    center
                    show-icon
                    v-if="wareLevel == 2 || wareLevel == 3"
                    style="margin-bottom:15px">
          </el-alert>

          <el-button size='mini'
                     plain
                     type='primary'
                     icon="el-icon-plus"
                     @click="addLine">新增</el-button>
          <el-button size='mini'
                     plain
                     type='danger'
                     icon="el-icon-delete"
                     @click="batchDelete">批量删除</el-button>
          <el-button size='mini'
                     plain
                     type='info'
                     icon="el-icon-bell"
                     @click="toggleSelection(multipleSelection )">取消选择
          </el-button>
          <el-button size='mini'
                     plain
                     type='success'
                     icon="el-icon-check"
                     @click="confirmSave()">申请</el-button>
          <div style="margin-right:20px;float:right">
            <el-button size='mini'
                       type='primary'
                       icon="el-icon-tickets"
                       @click="turnApplyList">申请单列表</el-button>
            <!-- <el-button size='mini'
                       type='success'
                       icon="el-icon-collection-tag"
                       v-if="wareLevel == 2 || wareLevel == 3"
                       @click="turnDispatchingList">配送方案</el-button> -->
          </div>
        </div>

        <el-table :data="applyList"
                  ref="applyListListRef"
                  border
                  stripe
                  highlight-current-row
                  @selection-change='handleSelectChange'>
          <div slot="empty"
               class="emptyBg">
            <img src="@/assets/box.jpg"
                 alt="">
            <p style="margin: 0px;">没有记录哦~</p>
          </div>
          <el-table-column type="selection"
                           width="55"
                           align="center">
          </el-table-column>
          <el-table-column type="index"
                           label="序号"
                           width="60"></el-table-column>
          <el-table-column label="配件编号"
                           prop="partsid"
                           align="center">
            <template slot-scope="scope">
              <el-input v-show='scope.row.edit'
                        size="mini"
                        v-model="scope.row.partsid"></el-input>
              <span v-show='!scope.row.edit'>{{scope.row.partsid}}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column label="配件编号"
                         prop="partsid"
                         align="center">
          <template slot-scope="scope">
            <el-input v-show='scope.row.edit'
                      size="mini"
                      v-model="scope.row.partsid"></el-input>
            <span v-show='!scope.row.edit'>{{scope.row.partsid}}</span>
          </template>
        </el-table-column> -->
          <el-table-column label="配件名称"
                           prop="partsname"
                           align="center">
            <template slot-scope="scope">
              <!-- <el-input v-show='scope.row.edit'
                        size="mini"
                        v-model="scope.row.partsname"></el-input> -->
              <el-autocomplete v-show='scope.row.edit'
                               :fetch-suggestions="querySearchAsync"
                               @select="handleSelect"
                               size="mini"
                               placeholder="请输入配件名称"
                               v-model="scope.row.partsname"></el-autocomplete>
              <span v-show='!scope.row.edit'>{{scope.row.partsname}}</span>
            </template>
          </el-table-column>
          <el-table-column label="申请数量"
                           prop="partsamount"
                           align="center">
            <template slot-scope="scope">
              <el-input v-show='scope.row.edit'
                        size="mini"
                        v-model="scope.row.partsamount"></el-input>
              <span v-show='!scope.row.edit'>{{scope.row.partsamount}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作"
                           min-width="170px"
                           align="center">
            <template slot-scope="scope">
              <el-button v-show="!scope.row.edit"
                         size="mini"
                         @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button v-show="scope.row.edit"
                         type="success"
                         size="mini"
                         @click="handleCancle(scope.$index, scope.row)">取消</el-button>
              <el-button v-show="scope.row.edit"
                         type="warning"
                         size="mini"
                         @click="save(scope.$index,scope.row)">确定
              </el-button>
              <el-button size="mini"
                         type="danger"
                         @click="handleDelete(scope.$index)">删除</el-button>
            </template>
          </el-table-column>

        </el-table>

      </el-tab-pane>

      <!-- <el-tab-pane label="申请列表">
        <el-input size="small"
                  v-model="queryParams.applyid"
                  placeholder="请搜索输入申请单编号"
                  clearable
                  @clear="getallotApplyList"
                  style="width: 250px;">
        </el-input>
        <el-button size="small"
                   type="primary"
                   icon="el-icon-search"
                   @click="getallotApplyList">搜索</el-button>
        <el-table :data="allotApplyList"
                  border
                  stripe
                  highlight-current-row
                  v-loading="allotApplyloading"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading"
                  :row-class-name="tableRowClassName">
          <div slot="empty"
               class="emptyBg">
            <img src="@/assets/box.jpg"
                 alt="">
            <p style="margin: 0px;">没有记录哦~</p>
          </div>

          <el-table-column type="expand"
                           width="60px">
            <template slot-scope="scope">
              <div v-for="(item,index) in scope.row.partsList"
                   :key="index">
                <el-form label-width="110px">

                  <el-form-item label="配件编号"
                                style="width:25%">{{scope.row.partsid}}</el-form-item>
                  <el-form-item label="配件名称"
                                style="width:25%">{{scope.row.partsname}}</el-form-item>
                  <el-form-item label="申请数量"
                                style="width:25%">{{scope.row.partsamount}}</el-form-item>
                </el-form>
              </div>
            </template>
          </el-table-column>
          <el-table-column type="index"
                           label="序号"
                           align="center"
                           width="60px"></el-table-column>
          <el-table-column label="申请单编号"
                           prop="applyId"
                           align="center"></el-table-column>
          <el-table-column label="申请时间"
                           prop="applytime"
                           align="center"></el-table-column>
          <el-table-column label="申请仓库"
                           prop="wareid"
                           align="center"></el-table-column>
          <el-table-column label="申请配件编号"
                           prop="partsid"
                           align="center"></el-table-column>
          <el-table-column label="申请配件名称"
                           prop="partsname"
                           align="center"></el-table-column>
          <el-table-column label="申请数量"
                           prop="partsamount"
                           align="center"></el-table-column>
          <el-table-column label="操作"
                           align="center">、
            <template slot-scope="scope">
              <el-button size="mini"
                         @click="showpApplyDialog(scope.row.id)">详情</el-button>
            </template>
          </el-table-column>

        </el-table>

        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="queryinfo.page"
                       :page-sizes="[5, 8, 10, 20]"
                       :page-size="queryinfo.pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="inventoryTotal">
        </el-pagination>
      </el-tab-pane> -->
      <el-tab-pane label="订单管理">
        <div style="margin:15px 0px;float:left">
          <el-button size='mini'
                     type='primary'
                     icon="el-icon-tickets"
                     @click="turnOutList">调拨配送单</el-button>
          <el-button size='mini'
                     type='warning'
                     icon="el-icon-receiving"
                     @click="getLocalOutList">现场申请单</el-button>
          <el-button size='mini'
                     type='danger'
                     icon="el-icon-collection-tag"
                     v-show="wareLevel == 1"
                     @click="turnStockOutList">缺货单</el-button>
          <el-button size='mini'
                     type='success'
                     icon="el-icon-collection-tag"
                     v-show="wareLevel == 1"
                     @click="getPurchaseList">采购入库单</el-button>
          <el-button size='mini'
                     type='success'
                     icon="el-icon-collection-tag"
                     v-show="wareLevel == 2 || wareLevel == 3"
                     @click="turnInList">调拨入库单</el-button>

        </div>
        <!-- <div style="margin:15px 0px;float:left">
          <el-input size="small"
                    v-model="queryDispatching.applyId"
                    :placeholder="placeholderDisplay"
                    clearable
                    @clear="getOrderList"
                    style="width: 250px;">
          </el-input>
          <el-button size="small"
                     type="primary"
                     icon="el-icon-search"
                     @click="getOrderList">搜索</el-button>
        </div> -->
        <!-- v-if="orderType === 'out' || orderType === 'in' || orderType === 'stockout'" -->
        <el-table v-show="orderType === 'out' || orderType === 'in' || orderType === 'stockout'"
                  :data="orderList"
                  ref='orderListRef'
                  border
                  stripe
                  highlight-current-row
                  v-loading="orderListLoading"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading"
                  :row-class-name="tableRowClassName">
          <div slot="empty"
               class="emptyBg">
            <img src="@/assets/box.jpg"
                 alt="">
            <p style="margin: 0px;">没有记录哦~</p>
          </div>
          <el-table-column type="index"
                           label="序号"
                           align="center"
                           width="60px"></el-table-column>
          <el-table-column label="订单编号"
                           prop="applyId"
                           align="center"></el-table-column>
          <el-table-column label="配送仓库编号"
                           prop="startWare"
                           align="center"></el-table-column>
          <el-table-column label="接收仓库名称"
                           prop="endWare"
                           align="center"></el-table-column>
          <el-table-column label="配件编号"
                           prop="partId"
                           align="center"></el-table-column>
          <!-- <el-table-column label="配件名称"
                           prop=""
                           align="center"></el-table-column> -->
          <el-table-column label="配送数量"
                           prop="num"
                           align="center"></el-table-column>
          <el-table-column label="配送状态"
                           v-if="orderType === 'out'"
                           prop="dispatch"
                           align="center">
            <template slot-scope="scope">
              <el-tag size="mini"
                      type="danger"
                      v-if="scope.row.dispatch === 0">未配送</el-tag>
              <el-tag type="success"
                      size="mini"
                      v-else>已配送</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="入库状态"
                           v-if="orderType === 'in'"
                           prop="waitInStatus"
                           align="center">
            <template slot-scope="scope">
              <el-tag size="mini"
                      type="danger"
                      v-if="scope.row.waitInStatus === 0">未入库</el-tag>
              <el-tag type="success"
                      size="mini"
                      v-else>已入库</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作"
                           v-if="wareLevel == 2 || wareLevel == 3"
                           align="center"
                           width="300px">
            <template slot-scope="scope">
              <el-button v-if="orderType == 'out'"
                         size="mini"
                         type="primary"
                         :disabled="scope.row.dispatch === 1"
                         @click="confirmDispatch(scope.row)">确认配送</el-button>

              <!-- :class="disable?'click-disable':''" -->
              <el-button v-if="orderType == 'in'"
                         size="mini"
                         type="success"
                         :disabled="scope.row.waitInStatus === 1"
                         @click="ConfirmAccept(scope.row)">确认收货</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-table v-show="orderType === 'localout'"
                  :data="localList"
                  ref='localListRef'
                  border
                  stripe
                  highlight-current-row
                  v-loading="localListLoading"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading"
                  :row-class-name="tableRowClassName">
          <div slot="empty"
               class="emptyBg">
            <img src="@/assets/box.jpg"
                 alt="">
            <p style="margin: 0px;">没有记录哦~</p>
          </div>
          <el-table-column type="index"
                           label="序号"
                           align="center"
                           width="60px"></el-table-column>
          <el-table-column label="出库订单编号"
                           prop="applyId"
                           align="center"></el-table-column>
          <el-table-column label="申请人"
                           prop="staffId"
                           align="center"></el-table-column>
          <!-- <el-table-column label="配送仓库名称"
                           prop=""
                           align="center"></el-table-column> -->
          <!-- <el-table-column label="接收仓库编号"
                           prop="wareId"
                           align="center"></el-table-column> -->
          <el-table-column label="配件编号"
                           prop="partId"
                           align="center"></el-table-column>
          <!-- <el-table-column label="配件名称"
                           prop=""
                           align="center"></el-table-column> -->
          <el-table-column label="出库数量"
                           prop="partNum"
                           align="center"></el-table-column>
          <el-table-column label="出库状态"
                           prop="outStatus"
                           align="center">
            <template slot-scope="scope">
              <el-tag size="mini"
                      type="danger"
                      v-if="scope.row.outStatus === 0">未出库</el-tag>
              <el-tag type="success"
                      size="mini"
                      v-if="scope.row.outStatus === 1">已出库</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作"
                           align="center"
                           width="300px">
            <template slot-scope="scope">
              <el-button size="mini"
                         type="warning"
                         :disabled="scope.row.outStatus === 1"
                         @click="ConfirmLocalOut(scope.row)">确认出库</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-table v-if="wareLevel == 1 && orderType == 'purchasein'"
                  ref='purchaseinRef'
                  :data="purchaseInList"
                  border
                  stripe
                  highlight-current-row
                  v-loading="purchaseInListloading"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading"
                  :row-class-name="tableRowClassName">
          <div slot="empty"
               class="emptyBg">
            <img src="@/assets/box.jpg"
                 alt="">
            <p style="margin: 0px;">没有记录哦~</p>
          </div>
          <el-table-column type="index"
                           label="序号"
                           align="center"
                           width="60px"></el-table-column>
          <el-table-column label="申请单编号"
                           prop="id"
                           align="center"></el-table-column>
          <el-table-column label="申请时间"
                           prop="date"
                           align="center"></el-table-column>

          <el-table-column label="申请配件编号"
                           prop="partId"
                           align="center"></el-table-column>
          <el-table-column label="申请配件名称"
                           prop="partName"
                           align="center"></el-table-column>
          <el-table-column label="申请数量"
                           prop="partNum"
                           align="center"></el-table-column>

          <el-table-column label="入库状态"
                           prop="inputStatus"
                           align="center">
            <template slot-scope="scope">
              <el-tag size="mini"
                      type="danger"
                      v-if="scope.row.inputStatus === 0">未到货</el-tag>
              <el-tag type="success"
                      size="mini"
                      v-if="scope.row.inputStatus === 1">已入库</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作"
                           align="center"
                           width="300px">
            <template slot-scope="scope">
              <el-button size="mini"
                         type="success"
                         :disabled="scope.row.inputStatus === 1"
                         @click="ConfirmPurchaseIn(scope.row)">确认入库</el-button>
            </template>
          </el-table-column>

        </el-table>

        <!-- 分页 -->
        <el-pagination v-if="orderType == 'out' || orderType == 'in' || orderType == 'stockout'"
                       @size-change="orderSizeChange"
                       @current-change="orderCurrentChange"
                       :current-page="queryDispatching.currentpage"
                       :page-sizes="[5, 10, 15, 20]"
                       :page-size="queryDispatching.pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="dispatchingtotal"
                       background>
        </el-pagination>
        <el-pagination v-if="orderType == 'localout'"
                       @size-change="localSizeChange"
                       @current-change="localCurrentChange"
                       :current-page="queryLocalOut.currentpage"
                       :page-sizes="[5, 10, 15, 20]"
                       :page-size="queryLocalOut.pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="localOutTotal"
                       background>
        </el-pagination>
        <el-pagination v-if=" orderType === 'purchasein'"
                       @size-change="purchaseinSizeChange"
                       @current-change="purchaseinCurrentChange"
                       :current-page="queryPurchaseInList.currentpage"
                       :page-sizes="[5, 10, 15, 20]"
                       :page-size="queryPurchaseInList.pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="PurchaseInListTotal"
                       background>
        </el-pagination>
        <!-- 详情对话框 -->
        <el-dialog title="待处理订单详情"
                   :visible.sync="detailVisible"
                   width="50%">
          <el-table ref="detailListRef"
                    :data="detailList"
                    border
                    stripe
                    highlight-current-row
                    v-loading="detialLoading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading">
            <el-table-column type="index"
                             label="序号"
                             align="center"
                             width="60px"></el-table-column>
            <el-table-column label="当前仓库"
                             prop=""
                             align="center"></el-table-column>
            <el-table-column label="目标仓库"
                             prop=""
                             align="center"></el-table-column>
            <el-table-column label="配件编号"
                             prop=""
                             align="center"></el-table-column>
            <el-table-column label="配件名称"
                             prop=""
                             align="center"></el-table-column>
            <el-table-column label="配送数量"
                             prop=""
                             align="center"></el-table-column>
          </el-table>
          <span slot="footer"
                class="dialog-footer">
            <el-button @click="detailVisible = false">取 消</el-button>
            <el-button type="primary"
                       @click="detailVisible = false">确 定</el-button>
          </span>
        </el-dialog>

      </el-tab-pane>

      <el-tab-pane label="配送方案">
        <el-table :data="inList"
                  border
                  stripe
                  highlight-current-row
                  v-loading="transferPlanLoading"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading">
          <div slot="empty"
               class="emptyBg">
            <img src="@/assets/box.jpg"
                 alt="">
            <p style="margin: 0px;">没有记录哦~</p>
          </div>
          <el-table-column type="index"
                           label="序号"
                           align="center"
                           width="60px"></el-table-column>
          <el-table-column label="配送方案编号"
                           prop="applyId"
                           align="center"></el-table-column>
          <el-table-column label="配送仓库编号"
                           prop="startWare"
                           align="center"></el-table-column>
          <!-- <el-table-column label="配送仓库名称"
                           prop=""
                           align="center"></el-table-column> -->
          <el-table-column label="接收仓库编号"
                           prop="endWare"
                           align="center"></el-table-column>
          <el-table-column label="配件编号"
                           prop="partId"
                           align="center"></el-table-column>
          <!-- <el-table-column label="配件名称"
                           prop=""
                           align="center"></el-table-column> -->
          <el-table-column label="配送数量"
                           prop="num"
                           align="center"></el-table-column>
        </el-table>
        <el-pagination @size-change="planSizeChange"
                       @current-change="planCurrentChange"
                       :current-page="queryDispatch.currentpage"
                       :page-sizes="[5, 10, 15, 20]"
                       :page-size="queryDispatch.pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="dispatchtotal"
                       background>
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
    <!-- 调拨申请对话框 -->
    <el-dialog title="调拨申请"
               :visible.sync="detailVisible"
               width="70%">
      <el-button size='mini'
                 plain
                 type='primary'
                 icon="el-icon-plus"
                 @click="addLine">新增</el-button>
      <el-button size='mini'
                 plain
                 type='danger'
                 icon="el-icon-delete"
                 @click="batchDelete">批量删除</el-button>
      <el-button size='mini'
                 plain
                 type='info'
                 icon="el-icon-bell"
                 @click="toggleSelection(multipleSelection )">取消选择
      </el-button>
      <!-- <el-button size='mini'
                 plain
                 type='success'
                 icon="el-icon-check"
                 @click="confirmSave()">保存</el-button> -->
      <el-table :data="allotApplyList"
                ref="allotApplyList"
                border
                stripe
                highlight-current-row
                @selection-change='handleSelectChange'>
        <div slot="empty"
             class="emptyBg">
          <img src="@/assets/box.jpg"
               alt="">
          <p style="margin: 0px;">没有记录哦~</p>
        </div>
        <el-table-column type="selection"
                         width="55"
                         align="center">
        </el-table-column>
        <el-table-column type="index"
                         label="序号"
                         width="60"></el-table-column>
        <el-table-column label="配件编号"
                         prop="partsid"
                         align="center">
          <template slot-scope="scope">
            <el-input v-show='scope.row.edit'
                      size="mini"
                      v-model="scope.row.partsid"></el-input>
            <span v-show='!scope.row.edit'>{{scope.row.partsid}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="配件编号"
                         prop="partsid"
                         align="center">
          <template slot-scope="scope">
            <el-input v-show='scope.row.edit'
                      size="mini"
                      v-model="scope.row.partsid"></el-input>
            <span v-show='!scope.row.edit'>{{scope.row.partsid}}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="配件名称"
                         prop="partsname"
                         align="center">
          <template slot-scope="scope">
            <el-input v-show='scope.row.edit'
                      size="mini"
                      v-model="scope.row.partsname"></el-input>
            <span v-show='!scope.row.edit'>{{scope.row.partsname}}</span>
          </template>
        </el-table-column>
        <el-table-column label="申请数量"
                         prop="partsamount"
                         align="center">
          <template slot-scope="scope">
            <el-input v-show='scope.row.edit'
                      size="mini"
                      v-model="scope.row.partsamount"></el-input>
            <span v-show='!scope.row.edit'>{{scope.row.partsamount}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         min-width="170px"
                         align="center">
          <template slot-scope="scope">
            <el-button v-show="!scope.row.edit"
                       size="mini"
                       @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button v-show="scope.row.edit"
                       type="success"
                       size="mini"
                       @click="handleCancle(scope.$index, scope.row)">取消</el-button>
            <el-button v-show="scope.row.edit"
                       type="warning"
                       size="mini"
                       @click="save(scope.$index,scope.row)">确定
            </el-button>
            <el-button size="mini"
                       type="danger"
                       @click="handleDelete(scope.$index)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>

      <!-- <el-form :model="transferApply"
               :rules="transferApplyRules"
               ref="transferApplyRef"
               label-width="100px">
        <el-form-item label="发出仓库"
                      prop="sendware">
          <el-input v-model="transferApply.sendware"></el-input>
        </el-form-item>
        <el-form-item label="接收仓库"
                      prop="receiveware">
          <el-input v-model="transferApply.receiveware"></el-input>
        </el-form-item>
        <el-form-item label="配件编号"
                      prop="pid">
          <el-input v-model="transferApply.pid"></el-input>
        </el-form-item>
        <el-form-item label="配件名称"
                      prop="pname">
          <el-input v-model="transferApply.pname"></el-input>
        </el-form-item>
        <el-form-item label="数量"
                      prop="pamount">
          <el-input v-model="transferApply.pamount"></el-input>
        </el-form-item>
      </el-form> -->
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="detailVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="confirmSave">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>


<script>
import Qs from 'qs'
import WarehouseInfo from '../../views/WarehouseInfo/WarehouseInfo';
export default {
  data () {
    return {
      //
      dispatchStatus: '确认配送',
      dispatchStatusType: 'warning',
      // 记录当前仓库的编号
      wareId: '',
      // 记录当前仓库的等级
      wareLevel: '',

      // -------------------------------------------------------------------------------------

      queryinfo: {
        wareId: '',
        currentpage: 1,
        pageSize: 10,
      },
      total: 100,
      // 库存数据
      inventoryList: [],
      inventoryTotal: 0,
      loading: false,

      partsList: [],
      // 当前仓库编号
      applywareid: null,
      // 调拨申请表单
      transferApply: {
        sendware: '',
        receiveware: '',
        pid: '',
        pname: '',
        pamount: ''

      },
      transferApplyRules: {
        sendware: [
          { required: true, message: '请输入发出仓库', trigger: 'blur' },

        ],
        receiveware: [
          { required: true, message: '请输入接收仓库', trigger: 'blur' },

        ],
        pid: [
          { required: true, message: '请输入配件编号', trigger: 'blur' },

        ],
        pname: [
          { required: true, message: '请输入配件名称', trigger: 'blur' },

        ],
        pamount: [
          { required: true, message: '请输入数量', trigger: 'blur' },

        ],
      },
      //  配件申请表
      applyList: [],

      // 先前值
      preValue: {},
      // 被选中的记录数据-----对应“批量删除”传的参数值
      multipleSelection: [],
      //批量删除id
      selectIds: [],

      // 配件申请表
      allotApplyList: [],
      allotApplyloading: false,
      // 查询参数
      queryParams: {
        wareid: '',
        applyid: '',
        currentpage: 1,
        pageSize: 10
      },
      allotApplyListTotal: 100,

      // purchaseApplyList: [],

      // ------------------------------------------订单管理---------------------------------------
      // 配送订单列表数据
      orderList: [],
      orderType: 'out',
      orderListLoading: false,
      queryStockout: {
        endWare: '',
        currentpage: 1,
        pageSize: 10,
      },

      // placeholderDisplay: '请搜索输入接受仓库编号',

      // 待处理订单详情对话框显示
      detailVisible: false,
      // 详情对话框中的数据
      detailList: [],
      // 列表加载
      detialLoading: false,

      //查现场申请
      queryLocalOut: {
        wareId: '',
        applyId: '',
        currentpage: 1,
        pageSize: 10,
      },
      localListLoading: false,
      localOutTotal: 0,
      localList: [],
      //查采购入库
      queryPurchaseInList: {
        wareId: '',
        // applyid: '',
        partId: '',
        partName: '',
        currentpage: 1,
        pageSize: 10
      },
      PurchaseInListTotal: 0,
      purchaseInList: [],
      purchaseInListloading: false,


      // ------------------------------------------配送方案---------------------------------------

      inList: [],
      queryDispatching: {
        applyId: '',
        wareId: '',
        currentpage: 1,
        pageSize: 10

      },
      dispatchingtotal: 0,

      queryDispatch: {
        applyId: '',
        wareId: '',
        currentpage: 1,
        pageSize: 10

      },
      dispatchtotal: 0,



      transferPlanLoading: false,


    };
  },

  components: { WarehouseInfo },

  computed: {},
  created () {
    // this.wareId = this.$route.query.wareid
    // // 获取参数(申请仓库id)
    // this.queryinfo.wareId = this.$route.query.wareid
    // this.queryParams.wareid = this.$route.query.wareid
    // console.log(this.queryinfo.wareId)

    this.wareId = this.$route.params.wareid
    this.wareLevel = this.$route.params.warelevel
    this.queryinfo.wareId = this.$route.params.wareid
    this.queryParams.wareid = this.$route.params.wareid
    this.queryDispatching.wareId = this.$route.params.wareid
    this.queryLocalOut.wareId = this.$route.params.wareid
    this.getInventoryList()//库存
    this.getallotApplyList()//调拨申请单
    this.getTransferPlanList()//配送方案
    this.getOrderList()

    // this.getLocalOutList()
    // this.getPurchaseList()
    // this.getWareList()
    // 获取参数(申请仓库id)
    // const applywareid = this.$route.query.id
    // this.$router.push({ path: '/warehouse', query: { setid: applywareid } });
  },

  methods: {
    // -----------------------------------------------库存状态--------------------------------------


    // 获取数据库存数据
    getInventoryList () {
      this.loading = true
      console.log(this.queryinfo.wareId)
      var data = Qs.stringify(this.queryinfo)
      this.$axios.post('/api/ch10//part/selectPartByWareId', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(res => {
        if (res.data.status !== 'success') {
          return this.$message.error('获取信息失败！')
        }
        this.inventoryList = res.data.inventoryList
        this.inventoryTotal = res.data.total
      })
      this.loading = false

    },
    // 根据配件类别id查询某类配件的所有配件
    // showDetailsDialog (partsId) {
    //   this.detailVisible = true
    //   this.detialLoading = true
    //   this.$axios.get(partsId).then(res => {
    //     if (res.data.meta.status !== 200) {
    //       return this.$message.error('获取信息失败！')
    //     }
    //     this.partsList = res.data.list
    //   })
    //   this.detialLoading = false
    // },
    // 监听  页码大小 改变的事件,将新的页码大小更新到data中
    handleSizeChange (newSize) {
      console.log(newSize)
      this.queryinfo.pageSize = newSize //更新页码大小
      this.getInventoryList()
    },
    // 监听 当前页 变动时候触发的事件
    handleCurrentChange (newPage) {
      console.log(newPage)
      this.queryinfo.page = newPage //更新当前页码
      this.getInventoryList()
    },

    // -----------------------------------------------调拨申请--------------------------------------

    // 添加一行
    addLine () {
      this.applyList.push({
        partsid: '',
        partsname: '',
        partsamount: '',
        edit: true
      })
    },
    // 监听表格的选择项发生变化事件
    handleSelectChange (val) {

      this.multipleSelection = val;
      console.log("multipleSelection--", this.multipleSelection)
    },

    // 批量删除
    batchDelete () {
      if (this.multipleSelection.length == 0) {
        this.$message.error('未选中选项！')
      }
      console.log(this.multipleSelection.length)
      console.log(this.applyList.length)
      let multData = this.multipleSelection;
      let tableData = this.applyList;
      let multDataLen = multData.length;
      let tableDataLen = tableData.length;
      for (let i = 0; i < multDataLen; i++) {
        for (let y = 0; y < tableDataLen; y++) {
          if (JSON.stringify(tableData[y]) == JSON.stringify(multData[i])) {  //判断是否相等，相等就删除
            this.applyList.splice(y, 1)
            console.log(y + '删除成功！')
          }
        }
      }
    },
    // 取消选择
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.applyListRef.toggleRowSelection(row);
        });
      } else {
        this.$refs.applyListRef.clearSelection();
      }
    },
    // 单击保存，保存表格数据
    confirmSave () {
      if (this.applyList.length == 0) {
        return this.$alert('申请数据不能为空，请重新填写！', {
          confirmButtonText: '确定'
        });
      }
      if (this.wareLevel == 1) {
        console.log(this.applyList)
        var purchaseList = JSON.stringify(this.applyList)
        var requestParams = {
          "wareid": this.wareId,
          "purchaseList": purchaseList
        }
        requestParams = Qs.stringify(requestParams)
        this.$axios.post('/api/ch10/part/purchasePart', requestParams, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        ).then(res => {
          console.log(res.data)
          if (res.data.status !== 'success') {
            return this.$alert('创建采购申请失败！', {
              confirmButtonText: '确定'
            });
          }
          this.$alert('创建采购申请成功！', {
            confirmButtonText: '确定'
          });
        })
        this.getallotApplyList()
        this.getTransferPlanList()
      } else {
        console.log(this.applyList)
        // console.log(JSON.stringify(this.applyList))
        var partsList = JSON.stringify(this.applyList)
        var data = {
          "wareid": this.queryinfo.wareId,
          "partsList": partsList
        }
        data = Qs.stringify(data)
        this.$axios.post('/api/ch10/applyParts/creatApply', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        ).then(res => {
          console.log(res.data)
          if (res.data !== 'success') {
            return this.$alert('创建调拨申请失败！', {
              confirmButtonText: '确定'
            });
          }
          this.$alert('创建调拨申请成功！', {
            confirmButtonText: '确定'
          });
        })
        this.getallotApplyList()
        this.getTransferPlanList()
      }
    },

    // 监听编辑按钮
    handleEdit (index, row) {
      row.edit = true
      console.log(index)
      // ①.JSON.stringify是从一个对象中解析出字符串
      // ②.JSON.parse是从一个字符串中解析出json(键值对)
      this.preValue = JSON.parse(JSON.stringify(row));
      console.log(this.preValue)
    },
    // 取消
    handleCancle (index, row) {
      row.edit = false
      console.log(index)
      this.$set(row, 'partsid', this.preValue.partsid)
      this.$set(row, 'partsname', this.preValue.partsname)
      this.$set(row, 'partsamount', this.preValue.partsamount)
      // 将this.preValue中的所有对象属性设置为null
      for (let key in this.preValue)
        this.preValue[key] = null
      // 若partsid，partsname，partsamount为空，则删除此行
      if (row.partsid == null || row.partsname == null || row.partsamount == null) {
        this.applyList.splice(index, 1)
      }
    },
    // 确认
    save (index, row) {
      // 若partsid，partsname，partsamount为空,则删除此行
      if (row.partsid == '' || row.partsname == ' ' || row.partsamount == '') {
        this.$message.error('内容为空，请重新添加！')
        this.applyList.splice(index, 1)
      }
      row.edit = false
      console.log(this.applyList)

    },
    // 删除一行
    handleDelete (index) {
      console.log(index)
      this.applyList.splice(index, 1)////从index位置删除1个元素
    },
    // 监听表格追加内容
    // getPartsList (row, expandedRows) {
    //   if (expandedRows.length !== 0) {

    //   }
    // },



    // 监听获取申请单数据
    getallotApplyList () {
      this.allotApplyloading = true

      var data = Qs.stringify(this.queryParams)
      this.$axios.post('/api/ch10/applyParts/selectApply', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(res => {
        console.log(res.data)

        if (res.data.status !== 'success') {
          return this.$alert('获取数据失败', {
            confirmButtonText: '确定'
          });
        }
        this.allotApplyList = res.data.applyList
        this.allotApplyListTotal = res.data.total
      })
      this.allotApplyloading = false
    },

    // 点击跳转到申请列表
    turnApplyList () {
      console.log(this.wareId)
      this.$router.push({ path: '/applylist', query: { wareid: this.wareId, wareLevel: this.wareLevel } })
    },
    turnDispatchingList () {
      this.$router.push({ path: '/dispatchlist', query: { wareid: this.wareId } });
    },


    // -----------------------------------------------订单管理--------------------------------------
    getOrderList () {
      let queryParams = Qs.stringify(this.queryDispatching)
      if (this.orderType == 'out') {
        this.orderListLoading = true
        this.$axios.post('/api/ch10/transferPlan/selectPlanByOut', queryParams, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(res => {
          if (res.data.status !== 'success') {
            return this.$alert('获取数据失败', {
              confirmButtonText: '确定'
            });
          }
          this.orderList = res.data.outList
          this.dispatchingtotal = res.data.total
        })
        this.orderListLoading = false
      } else if (this.orderType == 'in') {
        this.orderListLoading = true
        this.$axios.post('/api/ch10/transferPlan/selectPlanByIn', queryParams, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(res => {
          if (res.data.status !== 'success') {
            return this.$alert('获取数据失败', {
              confirmButtonText: '确定'
            });
          }
          this.orderList = res.data.inList
          this.dispatchingtotal = res.data.total
          console.log(this.orderList)
        })
        this.orderListLoading = false
      } else {
        this.queryDispatching.wareId = ''
        let queryParams = Qs.stringify(this.queryDispatching)
        this.orderListLoading = true
        this.$axios.post('/api/ch10/transferPlan/selectStockout', queryParams, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(res => {
          if (res.data.status !== 'success') {
            return this.$alert('获取数据失败', {
              confirmButtonText: '确定'
            });
          }
          this.orderList = res.data.outList
          this.dispatchingtotal = res.data.total
        })
        this.orderListLoading = false
      }
    },
    //仓库里的现场申请出库订单
    getLocalOutList () {
      this.orderType = 'localout'
      let queryParams = Qs.stringify(this.queryLocalOut)
      this.localListLoading = true
      this.$axios.post('/api/ch10/applyParts/findWareApplyResult', queryParams, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(res => {
        if (res.data.status !== 'success') {
          return this.$alert('获取数据失败', {
            confirmButtonText: '确定'
          });
        }
        this.localList = res.data.offlineApplyList
        this.localOutTotal = res.data.total
      })
      this.localListLoading = false
    },
    //中心库采购入库单
    getPurchaseList () {
      this.orderType = 'purchasein'
      this.queryPurchaseInList.wareId = this.wareId
      let queryParams = Qs.stringify(this.queryPurchaseInList)
      this.purchaseInListloading = true

      this.$axios.post('/api/ch10/part/selectPartPurchase', queryParams, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(res => {
        if (res.data.status !== 'success') {
          return this.$alert('获取数据失败', {
            confirmButtonText: '确定'
          });
        }
        this.purchaseInList = res.data.partInputList
        this.PurchaseInListTotal = res.data.total
      })
      this.purchaseInListloading = false

    },

    turnOutList () {
      this.orderType = 'out'
      this.getOrderList()
    },
    turnInList () {
      this.orderType = 'in'
      this.getOrderList()
    },
    //缺货
    turnStockOutList () {
      this.orderType = 'stockout'
      this.getOrderList()
    },
    // turnLocalApplyList () {
    //   console.log(this.wareId)
    //   this.$router.push({ path: '/localApplylist', query: { wareId: this.wareId } })
    // },
    //确认调拨配送
    confirmDispatch (row) {
      let queryParams = Qs.stringify(row)
      console.log(row.dispatch)
      this.$axios.post('/api/ch10/transferPlan/agree', queryParams, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(res => {
        if (res.data.status !== 'success') {
          return this.$alert('失败！', {
            confirmButtonText: '确定'
          });
        }
        console.log(row.dispatch)
        this.$alert('已同意配送！', {
          confirmButtonText: '确定'
        });
        this.disable = true
        this.getInventoryList()
        this.getOrderList()

      })


    },
    //确认收货
    ConfirmAccept (row) {

      //配送仓库配送成功后，收货仓库才可以确认入库
      if (row.dispatch === 1) {
        let queryParams = Qs.stringify(row)
        this.$axios.post('/api/ch10/transferPlan/confirm', queryParams, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(res => {
          if (res.data.status !== 'success') {
            return this.$alert('失败！', {
              confirmButtonText: '确定'
            });
          }
          this.$alert('已确认收货！', {
            confirmButtonText: '确定'
          });
          this.disable = true
          this.getInventoryList()
          this.getOrderList()
        })
      } else {
        this.$alert('配送仓库未确认配送！', {
          confirmButtonText: '确定'
        });
      }
    },
    // 确认现场需求出库
    ConfirmLocalOut (row) {
      let queryParams = Qs.stringify(row)
      this.$axios.post('/api/ch10/applyParts/agreeOut', queryParams, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(res => {
        if (res.data.status !== 'success') {
          return this.$alert('出库失败！', {
            confirmButtonText: '确定'
          });
        }
        this.$alert('出库成功！', {
          confirmButtonText: '确定'
        });
        this.disable = true
        this.getLocalOutList()
        this.getInventoryList()

      })
    },
    //确认采购入库
    ConfirmPurchaseIn (row) {
      let queryParams = Qs.stringify(row)
      this.$axios.post('/api/ch10/part/ConfirmReceipt', queryParams, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(res => {
        if (res.data.status !== 'success') {
          return this.$alert('入库失败！', {
            confirmButtonText: '确定'
          });
        }
        this.$alert('入库成功！', {
          confirmButtonText: '确定'
        });
        this.disable = true
        this.getPurchaseList()
        this.getInventoryList()

      })
    },
    orderSizeChange (newSize) {
      console.log(newSize)
      this.queryDispatching.pageSize = newSize //更新页码大小

      this.getOrderList()

    },
    // 监听 当前页 变动时候触发的事件
    orderCurrentChange (newPage) {
      console.log(newPage)
      this.queryDispatching.currentpage = newPage //更新当前页码

      this.getOrderList()

    },
    localSizeChange (newSize) {
      this.queryLocalOut.pageSize = newSize
      this.getTransferPlanList()
      this.getOutList()
    },
    localCurrentChange (newPage) {
      this.queryLocalOut.currentpage = newPage
      this.getOutList()
    },
    purchaseinSizeChange (newSize) {
      this.queryPurchaseInList.pageSize = newSize
      this.getPurchaseList()
    },
    purchaseinCurrentChange (newPage) {
      this.queryPurchaseInList.currentpage = newPage
      this.getPurchaseList()
    },


    //监听详情页对话框（根据待处理订单id打开详情对话框）
    showDetailsDialog (id) {
      console.log(id)
      this.detailVisible = true

      //根据id查询当前单子里的数据



    },
    // 监听审核（根据待处理订单id修改待处理订单状态）
    approvalSet (orderid) {
      console.log(orderid)
    },
    // -----------------------------------------------配送方案--------------------------------------
    // 获取配送列表数据
    getTransferPlanList () {
      this.transferPlanLoading = true
      this.queryDispatch.wareId = this.wareId
      let queryParams = Qs.stringify(this.queryDispatch)
      this.$axios.post('/api/ch10/transferPlan/selectPlanByIn', queryParams, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(res => {
        if (res.data.status !== 'success') {
          return this.$message.error('获取数据失败！')
        }
        this.inList = res.data.inList
        this.dispatchtotal = res.data.total
      })
      this.transferPlanLoading = false
    },
    planSizeChange (newSize) {
      console.log(newSize)
      this.queryDispatch.pageSize = newSize //更新页码大小

      this.getTransferPlanList()

    },
    // 监听 当前页 变动时候触发的事件
    planCurrentChange (newPage) {
      console.log(newPage)
      this.queryDispatch.currentpage = newPage //更新当前页码

      this.getTransferPlanList()

    },


    // 表格行的样式显示
    tableRowClassName ({ row }) {
      if (row.approvalstatus === 0) {
        return 'error-row';
      } else if (row.approvalstatus === 1) {
        return 'success-row';
      }
      return '';
    },

    // 远程搜索
    //queryString 为在框中输入的值
    //cb回调函数,将处理好的数据推回
    querySearchAsync (queryString, callback) {
      this.getSearchData(queryString)
      var groupArr = this.groupArr
      // console.log(queryString + callback)
      setTimeout(() => {
        callback(groupArr)
      }, 2000)

    },
    getSearchData (queryString) {
      this.groupList = []
      this.groupArr = []
      var data = {
        "partname": queryString,
      }
      var requestParams = Qs.stringify(data)
      //调用远程接口 将返回数据封装成 [{value:xxx,key2:value2},{value:xxx,key2:value2}]这样的形式，其中value关键字是必须的，检索框要根据该字段显示，其余的根据需求而定
      this.$axios.post('/api/ch10/partType/selectPartName', requestParams, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(res => {
        console.log(res.data)
        if (res.data.status !== 'success') {
          return this.$message.error('请求失败！')
        }

        this.groupList = res.data.partTypeList
        for (let item of this.groupList) {
          this.groupArr.push({
            value: item.pname,
            partsid: item.pid
          })

        }
        console.log('jajajaj')
        console.log(this.groupArr)
      })
    },

    //@select="handleSelect"  是选中某一列触发的事件,在这里item为选中字段所在的对象
    handleSelect (item) {
      console.log(item)
      console.log(this.applyList)
      // 根据对象属性获取对象在数组中的下标
      var index = (this.applyList || []).findIndex((profile) => profile.partsname === item.value);
      this.$set(this.applyList[index], 'partsid', item.partsid)
    },
  }
}
</script>


<style lang="scss" scoped>
@import "@/assets/scss/common";

.click-disable {
  pointer-events: none;
}
</style>
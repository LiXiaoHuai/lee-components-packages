<template>
  <!-- 查询结果的表格 -->
  <div class="clearfix table">
    <el-table
      class="compentable"
      :class="{ dataPage: isDataPage }"
      :data="tableArr"
      :border="border"
      v-loading="loading"
      :header-row-class-name="'headerClassName'"
      element-loading-text="加载中"
      element-loading-spinner="el-icon-loading"
      highlight-current-row
      @row-click="selectOneRow"
      @selection-change="getSelectData"
      @sort-change="sortChange"
      @expand-change="expandChange"
      :size="tableSize"
      :lazy="lazy"
      :load="load"
      :row-key="rowKey"
      :tree-props="treeProps"
    >
      <!-- :row-key="rowKey" -->
      <el-table-column type="expand" v-if="extendRow">
        <template slot-scope="scope">
          <slot name="children" :rowdata="scope.row"></slot>
        </template>
      </el-table-column>
      <el-table-column
        v-if="selection"
        type="selection"
        align="center"
        fixed="left"
        width="55"
      ></el-table-column>
      <el-table-column
        v-if="needNo"
        label="No."
        type="index"
        align="center"
        fixed="left"
        :index="indexMethod"
      ></el-table-column>
      <el-table-column
        v-for="column in tableColumns"
        :key="column.field"
        :prop="column.field"
        :width="column.width"
        :label="column.title"
        :formatter="column.format"
        :sortable="column.sort"
        :fixed="column.fix"
        :align="column.align || 'left'"
        :type="column.expand"
        :minWidth="setMinWidth(column.minWidth)"
      >
        <template slot-scope="scope">
          <slot name="edit" :rowdata="scope.row" v-if="isEdit && !column.solt">
            <input
              v-if="column.type == 'input' || !column.type"
              v-model.lazy="tableArr[scope.$index][column.field]"
              clearable
              :placeholder="'请输入' + column.title"
              :disabled="column.disabled"
              :maxlength="column.maxLen"
              class="editInput"
            />
            <el-select
              v-if="column.type == 'select' && !column.change"
              v-model="tableArr[scope.$index][column.field]"
              :placeholder="'请选择' + column.title"
              :filterable="column.filterable"
              :multiple="column.multiple"
              :disabled="column.disabled"
            >
              <el-option
                v-for="row of column.data"
                :key="row.value"
                :label="row.label"
                :value="row.value"
              ></el-option>
            </el-select>
          </slot>
          <slot name="noEdit" :rowdata="scope" v-if="!isEdit && !column.solt">
            <span
              v-if="column.type != 'img' && column.type != 'previewSrcList'"
              >{{ columnValue(scope.row, column) }}</span
            >
            <img
              v-if="column.type == 'img' && scope.row[column.field]"
              :src="baseUrl + scope.row[column.field]"
              min-width="70"
              height="70"
            />
            <el-image
              v-if="column.type == 'previewSrcList' && scope.row[column.field]"
              :src="baseUrl + scope.row[column.field]"
              min-width="70"
              height="70"
              :preview-src-list="getSrcList(scope.row, column)"
            ></el-image>
          </slot>
          <slot
            v-if="column.solt"
            :name="column.field"
            :text="scope.row[column.field]"
            :rowdata="scope.row"
          ></slot>
        </template>
      </el-table-column>
      <el-table-column
        v-if="needOperate"
        :label="operateLabel"
        :width="operateWidth"
        :align="operateAlign"
        :fixed="operateFixed"
      >
        <template slot-scope="scope">
          <slot name="operate" :rowdata="scope.row"></slot>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="noPagination"
      :background="true"
      :current-page="pageNum"
      :page-size.sync="pageSize"
      :page-sizes="pageSizes"
      :layout="pageLayout"
      :total="counts"
      @size-change="pageSizeChange"
      @current-change="pageCurrentChange"
      :style="{ textAlign: paginationAlign }"
    />
    <slot name="bottomBtn"> </slot>
  </div>
</template>

<script>
export default {
    name: "lee-tableplus",
    props: {
        tableSize: {
            // 表格的尺寸
            type: String,
            default: ""
        },
        tableData: {
            // 表格数据
            type: Array,
            required: true
        },
        counts: {
            // 数据条数
            type: Number,
            required: true
        },
        tableColumns: {
            // 表格字段
            type: Array,
            required: true
        },
        border: {
            // 是否显示表格边框
            type: Boolean,
            default: true
        },
        selection: {
            // 是否显示多选
            type: Boolean,
            default: false
        },
        needOperate: {
            // 是否需要操作列
            type: Boolean,
            default: true
        },
        needNo: {
            // 是否显示行数
            type: Boolean,
            default: true
        },
        isDataPage: {
            // 是否大屏展示
            type: Boolean,
            default: false
        },
        noPagination: {
            // 是否需要分页
            type: Boolean,
            default: true
        },
        operateWidth: {
            // 操作列宽度
            type: Number,
            default: 130
        },
        operateLabel: {
            // 操作列名称
            type: String,
            default: "操作"
        },
        operateAlign: {
            // 操作列对齐方式
            type: String,
            default: "align"
        },
        operateFixed: {
            // 操作列固定位置
            type: String,
            default: "right"
        },
        columnWidth: {
            // 设置所有列宽
            type: String,
            default: "140px"
        },
        isEdit: {
            // 是否编辑模式
            type: Boolean,
            default: false
        },
        lazy: {
            // 是否懒加载子节点数据
            type: Boolean,
            default: false
        },
        load: {
            // 加载子节点数据的函数
            type: Function,
            default: () => {
                return function() {};
            }
        },
        treeProps: {
            // 渲染嵌套数据的配置选项
            type: Object,
            default: () => {
                return {};
            }
        },
        rowKey: {
            // 行标识，用来优化 Table 的渲染
            type: String
        },
        extendRow: {
            // 是否开启展开行，
            type: Boolean,
            default: false
        },
        paginationAlign: {
            // 分页组件对齐方式
            type: String,
            default: "right"
        }
    },
    data() {
        return {
            baseUrl: "",
            pageLayout: "total,sizes,prev,pager,next,jumper",
            pageSizes: [10, 20, 30, 40, 50],
            pageNum: 1, // 当前页
            pageSize: 10, // 每页条数
            loading: false,
            tableArr: []
        };
    },
    watch: {
        tableData: {
            handler(val, oldval) {
                if (!this.isEdit) {
                    this.tableArr = [];
                    this.loading = true;
                    setTimeout(() => {
                        this.loading = false;
                        this.tableArr = this.tableData;
                    }, 300);
                } else {
                    this.tableArr = this.tableData;
                }
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        columnValue(row, column) {
            if (typeof column.defaultVal !== "undefined") {
                return column.defaultVal;
            }
            if (typeof column.format == "function" && column.format !== null) {
                return column.format(row);
            }
            return row[column.field];
        },
        selectOneRow(row) {
            this.$emit("tableClick", "row", row);
        },
        getSelectData(data) {
            this.$emit("tableClick", "select", data);
        },
        expandChange(data) {
            this.$emit("tableClick", "expand", data);
        },
        indexMethod(index) {
            return (this.pageNum - 1) * this.pageSize + index + 1;
        },
        pageSizeChange(size) {
            this.pageSize = size;
            let param = {
                pageNum: this.pageNum,
                pageSize: this.pageSize
            };
            this.$emit("tableClick", "pagination", param);
        },
        pageCurrentChange(current) {
            this.tableArr = [];
            let param = {
                pageNum: current,
                pageSize: this.pageSize
            };
            this.$emit("tableClick", "pagination", param);
            this.pageNum = current;
        },
        sortChange(column, prop, order) {
            if (column.order) {
                let sortOrder = column.order == "ascending" ? "ASC" : "DESC";
                this.$emit("changeSort", {
                    sortOrder,
                    sortField: column.prop
                });
            } else {
                this.$emit("changeSort", {
                    sortOrder: "",
                    sortField: ""
                });
            }
        },
        imgClick(rowdata) {
            this.$emit("imgClick", rowdata);
        },
        getSrcList(rowdata, column) {
            let row = JSON.parse(JSON.stringify(rowdata));
            let imgList = row[column.imgList];
            if (imgList.length > 0) {
                if (typeof column.imgIndex != "undefined") {
                    return imgList
                        .slice(column.imgIndex)
                        .concat(imgList.slice(0, column.imgIndex));
                }
            }
            return imgList;
        },
        setMinWidth(width) {
            if (width) {
                return width + "px";
            }
            return this.columnWidth;
        }
    }
};
</script>
<style lang="scss" scoped>
/*清除浮动*/
.clearfix {
    &:after {
        visibility: hidden;
        display: block;
        font-size: 0;
        content: " ";
        clear: both;
        height: 0;
    }
}
.clearfix {
    *zoom: 1;
}
.table {
    width: 100%;
    /* 表格 */
    ::v-deep .el-table {
        .headerClassName {
            background: #f3f8f4;
        }
        table td,
        table th {
            padding: 6px 0;
        }
        table th {
            background-color: #fafafa;
        }
        table .el-button--mini,
        table .el-button--mini.is-round {
            padding: 4px 8px;
        }
        .el-button i {
            color: #15395b;
        }
        .el-button + .el-button {
            margin-left: 3px;
        }
        .el-table__fixed::before,
        .el-table__fixed-right::before {
            background: none;
        }
        .eltable-wrp {
            padding: 0 15px;
        }
        .eltable-wrp,
        .eltable-double {
            .el-row {
                margin-bottom: 20px;
            }
        }

        .el-input__inner {
            height: 36px;
            line-height: 36px;
        }
        .eltable {
            margin-bottom: 15px;
        }

        /*编辑文本框*/
        .editInput {
            -webkit-appearance: none;
            background-color: #ffffff;
            background-image: none;
            border-radius: 4px;
            border: 1px solid #dcdfe6;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            color: #606266;
            display: inline-block;
            font-size: inherit;
            height: 34px;
            line-height: 34px;
            outline: none;
            padding: 0 30px 0 15px;
            -webkit-transition: border-color 0.2s
                cubic-bezier(0.645, 0.045, 0.355, 1);
            transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
            width: 100%;
        }
        .editInput::-webkit-input-placeholder {
            color: #c0c4cc;
        }
        .editInput::-moz-placeholder {
            /* Mozilla Firefox 19+ */
            color: #c0c4cc;
        }
        .editInput:-moz-placeholder {
            /* Mozilla Firefox 4 to 18 */
            color: #c0c4cc;
        }
        .editInput:-ms-input-placeholder {
            /* Internet Explorer 10-11 */
            color: #c0c4cc;
        }

        /* 数据大屏下表格样式修改 */
        .dataPage.headerClassName {
            background: transparent;
        }
        .dataPage.headerClassName {
            color: #b0f0f9;
        }
        .dataPage.th.is-leaf,
        .dataPagetd,
        .dataPagetr,
        .dataPage.dataPage.el-table--border th,
        .dataPage.el-table--border td {
            border-color: #b0f0f9;
        }
        .dataPage .el-table__empty-text {
            color: #b0f0f9;
        }
    }

    .dataPage.el-table {
        background: transparent;
    }
}
// 分页
::v-deep .el-pagination {
    padding: 12px 5px 0;
}
</style>


<template>
    <div class="container" >
        <lee-tableplus 
            ref="tableplus"
            :tableData="tableData.pageList"
            :counts="tableData.pageList.length"
            :tableColumns="columns"
            :border="true"
            :operateWidth="160" 
            :tableSize="'mini'"
        >
            <div slot="operate">
                <el-button size="mini" icon="el-icon-edit"></el-button>
                <el-button size="mini" icon="el-icon-delete"></el-button>
            </div>
        </lee-tableplus>
    </div>
</template>
<script>
export default {
    data() {
        return {
            //表格数据
            tableData: {
               pageList: [
                    {
                        certOrg: '认证类型',
                        dictTitle: '认证机构名称',    
                    },
                    {
                        certOrg: '认证类型',
                        dictTitle: '认证机构名称',    
                    }
                ],
                counts: 0
            },
            // 表格列
            columns: [
                {
                    field: "certOrg",
                    title: "认证类型"
                },
                {
                    field: "dictTitle",
                    title: "认证机构名称"
                },
            ]
        };
    },
    methods: {},
    mounted() {}
};
</script>
<style lang="scss" scoped>
.table {
    width: 100%;
    /* 表格 */
    
    .el-table .headerClassName {
        background: #96104e;
    }
}
</style>
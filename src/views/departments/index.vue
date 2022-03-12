/* eslint-disable vue/no-parsing-error */
<template>
  <div v-loading="loading" class="dashboard-container">
    <div class="app-container">
      <!-- 实现页面的基本布局 -->
      <el-card class="tree-card">
        <!-- 用了一个行列布局 -->
        <!-- 缺少treeNode -->
        <tree-tools :tree-node="company" :is-root="true" @addDepts="addDepts" />
        <!--放置一个属性   这里的props和我们之前学习的父传子 的props没关系-->
        <el-tree :data="departs" :props="defaultProps" default-expand-all>
          <!-- 说明el-tree里面的这个内容 就是插槽内容 => 填坑内容  => 有多少个节点循环多少次 -->
          <!-- scope-scope 是 tree组件传给每个节点的插槽的内容的数据 -->
          <!-- 顺序一定是 执行slot-scope的赋值 才去执行 props的传值 -->
          <tree-tools slot-scope="obj" :tree-node="obj.data" @addDepts="addDepts" @delDepts="getDepartments" @editDepts="editDept" />

        </el-tree>
      </el-card>
    </div>
    <add-dept ref="addDepts" :show-dialog.sync="showDialog" :tree-node="node" @addDepts="getDepartments" />

  </div>
</template>

<script>
import AddDept from './components/add-dept' // 引入新增部门组件
import TreeTools from './components/tree-tools'
import { getDepartments } from '@/api/departments'
import { transListToTreeData } from '@/utils/index.js'
export default {
  components: {
    TreeTools,
    AddDept
  },
  data() {
    return {
      loading: false,
      showDialog: false, // 显示窗体
      company: { }, // 就是头部的数据结构
      departs: [],
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      }

    }
  },
  created() {
    this.getDepartments() // 调用自身的方法
  },
  methods: {
    editDepts(node) {
      // 首先打开弹层
      this.showDialog = true
      this.node = node // 赋值操作的节点
    },
    async getDepartments() {
      this.loading = true
      const result = await getDepartments()
      this.departs = transListToTreeData(result.depts, '')
      this.company = { name: result.companyName, manager: '负责人', id: '' }
      this.loading = false
    },
    addDepts(node) {
      this.showDialog = true // 显示弹层
      // 因为node是当前的点击的部门， 此时这个部门应该记录下来,
      this.node = node
    },
    // eslint-disable-next-line vue/no-dupe-keys
    editDept(node) {
      this.showDialog = true // 显示新增组件弹层
      this.node = node // 存储传递过来的node数据
      // 我们需要在这个位置 调用子组件的方法
      // 父组件 调用子组件的方法
      this.$refs.addDepts.getDepartDetail(node.id) // 直接调用子组件中的方法 传入一个id
    }

  }
}
</script>

<style>

</style>

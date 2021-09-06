/*
* 签名管理
* @author xk
* @date 2018.3.5
*/
<template>
  <div class='personnel-admin'>
    <div class="container contentBg">
        <div class="table-wrapper"
             slot="right">
          <!-- header --> 
          <div class="header">
            <content-header :showTitle="showTitle">
              <div slot="title">医生签名列表</div>
              <!-- <div slot="other">123</div> -->
              <div slot="contents"
                   class="header-content-wrapper paddingR20">
                <search-input searText="请输入搜索内容"
                              @on-enter="headerSearchEnter"
                              @on-Icon="headerSearchEnter"
                              @on-cancel="headerSearchCancel"
                              :searchWidth="220">
                </search-input>
                <template v-if="!isSelectMode">
                  <Button type="ghost"
                            class="marginR10"
                            @click="headerAdd">新 增</Button>
                            <Button type="ghost"
                            class="marginR10"  @click="exportBtn">导 出</Button>
                  <Button type="ghost"
                            @click="toSelectMode">选 择</Button>
                </template>
                <template v-else>
                  <!-- :disabled="selectionData.length===0" -->
                  <Button type="success"
                            class="marginR10"
                            disabled
                            @click="headerDelete">删 除</Button>
                  
                  <Button type="primary"
                            @click="exitSelectMode">取 消</Button>
                </template>
              </div>
            </content-header>
          </div>
          <!-- body -->
          <div class="body"
               ref="body">
            <q-table ref="table"
                     :ifEdit="true"
                     :selectMode="isSelectMode"
                     :height="tableHeight"
                     :columns="tableColumns"
                     :data="tableData"
                     :params="tableParams"
                     :pageInfo="tableInfo"
                     :requestDataApi="getSigns"
                     :initReq="false"
                     @edit="tableEdit"
                     :width="700"
                     @edit-row="tableRowEdit"
                     @delete="tableDelete"
                     @delete-row="tableRowDelete"
                     @on-select="tableSelectRow"
                     @on-select-cancel="tableCancelSelectRow"
                     @on-select-all="tableSelectAll"
                     @all-selection="tableAllSelection"
                     @on-selection-change="tableSelectionChange"
                     @on-row-click="tableClickRow"
                     @on-row-dbClick="tableRowEdit" @getRequestParams="getRequestParams">
            </q-table>
          </div>
        </div>
    </div>
    <!-- add -->
    <Modal v-model="add.showModal"
           v-if="add.showModal"
           width="390"
           :transition-names='[]'
           :mask-closable="false"
           :transfer='false'
           :closable="false">
      <div slot="header">
        <alert-header headerText="新增签名"
                      :headerVal="sortValue"
                      @alert-retrun-num="addSortCtrl" :showInput="false"></alert-header>
      </div>
      <Form :model="add.formData"
            :rules="formRules"
            class="fmm-modal-content paddingL20 paddingR20"
            ref="addForm">
            
        <div class="fmm-form-row">
          <span class="fmm-item-label">医生信息</span>
          <FormItem class="fmm-flex1 marginL10" prop="staff_id">
            <Select  v-model="add.formData.staff_id" @on-change="addSelectChange">
                  <Option :value="item.id"
                          v-for="item in doneStaffsAll.items"
                          :key="item.id"
                          :label="item.label"></Option>
                </Select>
          </FormItem>
        </div>
        <div class="fmm-form-row">
          <span class="fmm-item-label">所在科室</span>
          <FormItem class="fmm-flex1 marginL10">
            <Input v-model="inDept" disabled></input>
          </FormItem>
        </div>
        <div class="fmm-form-row-height marginB20">
          <span class="fmm-item-label fmm-form-row-height-label">备注</span>
          <Input type="textarea"
                 v-model="add.formData.remark"
                 class="fmm-flex1 marginL10"></Input>
        </div>
        <div class="fmm-img-loader marginB20">
          <div class="img-wrapper">
            <img :src="imgSrc" v-show="imgSrc">
          </div>
          <div class="btn-wrapper">
            <div>
              <span>手绘签名</span>
            </div>
            <div>
              <span>上传图片</span>
               <input ref="addInput" style="opacity:0" type="file" :accept="acceptFileTypes" @change="addFileChange('addInput')">              
            </div>
            <div>
              <span @click="delImage">删除签名</span>
            </div>
          </div>
          <!-- <image-load @getImg="getImg"></image-load>  -->
        </div>
      </Form>
      <div slot="footer"
           class="">
        <div class="fmm-modal-footer">
          <Checkbox v-model="add.formData.status">启用</Checkbox>
          <Button @click="addFormSave"
                    type="primary"
                    class="marginR20">保 存</Button>
          <Button @click="addFormCancel"
                    type="ghost">取 消</Button>
        </div>
      </div>
    </Modal>
    <!-- edit -->
    <Modal v-model="edit.showModal"
           v-if="edit.showModal"
           width="390"
           :transition-names='[]'
           :mask-closable="false"
           :transfer='false'
           :closable="false">
      <div slot="header">
        <alert-header headerText="编辑签名"
                      :headerVal="edit.sort"
                      @alert-retrun-num="addSortCtrl" :showInput="false"></alert-header>
      </div>
      <Form :model="edit.formData"
            :rules="formRules"
            class="fmm-modal-content paddingL20 paddingR20"
            ref="addForm">
        <div class="fmm-form-row">
          <span class="fmm-item-label">医生信息</span>
          <FormItem class="fmm-flex1 marginL10" prop="staff_id">
            <Input v-model="editPinfo" disabled></Input>
            <!-- <Select  v-model="edit.formData.staff_id" @on-change="editSelectChange">
                  <Option :value="item.id"
                          v-for="item in doneStaffsAll.items"
                          :key="item.id"
                          :label="item.label"></Option>
                </Select> -->
          </FormItem>
        </div>
        <div class="fmm-form-row">
          <span class="fmm-item-label">所在科室</span>
          <FormItem class="fmm-flex1 marginL10">
            <Input v-model="inDeptEdit" disabled></input>
          </FormItem>
        </div>
        <div class="fmm-form-row-height marginB20">
          <span class="fmm-item-label fmm-form-row-height-label">备注</span>
          <Input type="textarea"
                 v-model="edit.formData.remark"
                 class="fmm-flex1 marginL10"></Input>
        </div>
        <div class="fmm-img-loader marginB20">
          <div class="img-wrapper">
            <img :src="imgSrc" v-show="imgSrc">
          </div>
          <div class="btn-wrapper">
            <div>
              <span>手绘签名</span>
            </div>
            <div>
              <span>上传图片</span>
               <input ref="editInput" style="opacity:0" type="file" :accept="acceptFileTypes" @change="editFileChange('editInput')">                            
            </div>
            <div>
              <span @click="delImage">删除签名</span>
            </div>
          </div>
        </div>
         <div class="fmm-operator marginT10 marginB20">
          <span>最后修改人：</span>
          <span>{{edit.formData.operater}}</span>
          <span class="marginL10">最后修改时间：</span>
          <span>{{edit.formData.updated_at|timeFilter}}</span>
         </div>
      </Form>
      <div slot="footer"
           class="">
        <div class="fmm-modal-footer">
          <Checkbox v-model="edit.formData.status">启用</Checkbox>
          <Button @click="editFormSave"
                    type="primary"
                    class="marginR20">保 存</Button>
          <Button @click="editFormCancel"
                    type="ghost">取 消</Button>
        </div>
      </div>
    </Modal>
    <!-- 删除 -->
    <affirm-del-modal :controlModal="deleteModal"
                      :delCounts="selectionData.length"
                      @delCancel="deleteModal=false"
                      @affirmDel="deleteAffirm">
    </affirm-del-modal>
    <!-- 删除多级 -->
    <!-- <affirm-del-modal :controlModal="deleteModalHasChild"
                      @delCancel="deleteModalHasChild=false"
                      @affirmDel="deleteAffirm" :rests="false" :content="haveChildText">
    </affirm-del-modal> -->
  </div>
</template>

<script>
import contentHeader from '@/components/contentHeader'
import imageLoad from '@/components/img/imageLoad'
import { mapState, mapActions, mapGetters } from 'vuex'
import _ from 'lodash'
import fifters from '@/utils/fifters'
import api from '@/api'
import exportXlsx from '@/service/export-xlsx.js'
export default {
  // TODO:
  name: 'signatureManager',
  components: {
    contentHeader,
    imageLoad,
  },
  data() {
    let editBanIcon = '/static/icons/public/table-hover-edit.svg'
    let editIcon = '/static/icons/public/table-edit.svg' // 编辑
    let that = this
    return {
      // page
      imgSrc: '',
      inDept: '',
      inDeptEdit: '',
      editPinfo: '',
      acceptFileTypes: {
        type: RegExp,
        default: function() {
          return /(\.|\/)(gif|jpe?g|png|bmp)$/i
        },
      },
      treeSelectSingle: {},
      // tree
      tree: {
        width: 22,
        data: [],
      },
      // header
      showTitle: true,
      exportParams: {
        reqParams: {},
        columns: [
          {
            title: '人员编号',
            key: 'staff',
            ellipsis: true,
            render: (data) => {
              return data.code
            },
          },
          {
            title: '姓名',
            key: 'staff',
            render: (data) => {
              return data.name
            },
          },
          {
            title: '性别',
            key: 'staff',
            render: (data) => {
              return data.sex === 1 ? '男' : data.sex === 2 ? '女' : ''
            },
          },
          {
            title: '职称',
            key: 'staff',
            render(p) {
              let text = ''
              switch (p.pro_title) {
              case 1:
                text = '医师'
                break
              case 2:
                text = '主治医师'
                break
              case 3:
                text = '副主任医师'
                break
              case 4:
                text = '主任医师'
                break
              case 5:
                text = '护士'
                break
              case 6:
                text = '护师'
                break
              case 7:
                text = '主管护师'
                break
              case 8:
                text = '副主任护师'
                break
              case 9:
                text = '主任护师'
                break
              }

              return text
            },
          },
          {
            title: '所在科室',
            key: 'staff',
            render(p) {
              let text = []
              console.log('===', p)
              if (!p.depts && !p.depts.length) {
                return ''
              }
              p.depts.map(item => {
                if (item.dept) {
                  text.push(item.dept.name)
                }
              })
              return text.join(',')
            },
          },
          {
            title: '有无签名',
            key: 'img',
            render: (data) => {
              if (data) {
                return data
              }
            },
          },
          {
            title: '备注',
            key: 'remark',
          },
          {
            title: '启用',
            key: 'status',
            ellipsis: 'true',
            render: (value) => {
              return value === 1 ? '启用' : '未启用'
            },
          },
          {
            title: '显示顺序',
            key: 'sort',
          },
          {
            title: '最后修改人',
            key: 'operater',
          },
          {
            title: '最后修改时间',
            key: 'updated_at',
            render: (data) => {
              if (data) {
                return fifters.timeFilter(
                  data,
                  'YYYY-MM-DD HH:mm'
                )
              } else {
                return ''
              }
            },
          },
        ],
      },
      // table
      isSelectMode: false,
      tableHeight: 568,
      selectionData: [],
      tableParams: {},
      tableColumns: [
        {
          title: '人员编号',
          key: 'staff',
          ellipsis: true,
          // minWidth: 68,
          render(h, p) {
            return h('span', p.row.staff.code)
          },
          titleRender: (data) => {
            return data.staff.code
          },
        },
        {
          title: '姓名',
          key: 'staff',
          ellipsis: true,
          // minWidth: 100,
          render(h, p) {
            return h('span', p.row.staff.name)
          },
          titleRender: (data) => {
            return data.staff.name
          },
        },
        {
          title: '性别',
          key: 'staff',
          ellipsis: true,
          // minWidth: 44,
          render(h, p) {
            return h('span', p.row.staff.sex === 1 ? '男' : p.row.staff.sex === 2 ? '女' : '')
          },
          titleRender: (data) => {
            return data.staff.sex === 1 ? '男' : data.staff.sex === 2 ? '女' : ''
          },
        },
        {
          title: '职称',
          key: 'staff',
          ellipsis: true,
          // minWidth: 68,
          render(h, p) {
            let text = ''
            switch (p.row.staff.pro_title) {
            case 1:
              text = '医师'
              break
            case 2:
              text = '主治医师'
              break
            case 3:
              text = '副主任医师'
              break
            case 4:
              text = '主任医师'
              break
            case 5:
              text = '护士'
              break
            case 6:
              text = '护师'
              break
            case 7:
              text = '主管护师'
              break
            case 8:
              text = '副主任护师'
              break
            case 9:
              text = '主任护师'
              break
            }

            return h('span', text)
            // return h('span', p.row.staff.pro_title)
          },
          titleRender(p) {
            let text = ''
            switch (p.staff.pro_title) {
            case 1:
              text = '医师'
              break
            case 2:
              text = '主治医师'
              break
            case 3:
              text = '副主任医师'
              break
            case 4:
              text = '主任医师'
              break
            case 5:
              text = '护士'
              break
            case 6:
              text = '护师'
              break
            case 7:
              text = '主管护师'
              break
            case 8:
              text = '副主任护师'
              break
            case 9:
              text = '主任护师'
              break
            }

            return text
            // return h('span', p.row.staff.pro_title)
          },

        },
        {
          title: '所在科室',
          key: 'staff',
          ellipsis: true,
          // minWidth: 116,
          render(h, p) {
            let text = []
            if (!p.row.staff.depts && !p.row.staff.depts.length) {
              return
            }
            p.row.staff.depts.map(item => {
              if (item.dept) {
                text.push(item.dept.name)
              }
            })
            return h('span', text.join(','))
          },
          titleRender(p) {
            let text = []
            console.log('===', p)
            if (!p.staff.depts && !p.staff.depts.length) {
              return ''
            }
            p.staff.depts.map(item => {
              if (item.dept) {
                text.push(item.dept.name)
              }
            })
            return text.join(',')
          },
        },
        {
          title: '有无签名',
          key: 'has_sign',
          ellipsis: true,
          // minWidth: 116,
          render(h, p) {
            if (p.row.has_sign) {
              return h('div', {
                style: {
                  position: 'relative',
                  height: '30px',
                },
              }, [
                h('img', {
                  attrs: {
                    src: p.row.img,
                    // src: '/static/icons/public/rect_push.png',
                  },
                  style: {
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    margin: 'auto',
                    maxHeight: '100%',
                    maxWidth: '100%',
                  },
                }),
              ])
            } else {
              return h('span', '/')
            }
          },
          titleRender: (data) => {
            return ''
          },
        },
        {
          title: '备注',
          key: 'remark',
          ellipsis: true,
          width: 60,
          render: (h, params) => {
            let val = params.row.remark
            if (val) {
              return h('remark-in-table', {
                props: {
                  text: val,
                },
              })
            }
          },
        },
        {
          title: '启用',
          width: 60,
          align: 'center',
          key: 'status',
          filterType: 'type',
          filterOptions: [
            {
              label: '启用',
              value: 1,
            },
            {
              label: '未启用',
              value: 0,
            },
          ],
          ellipsis: 'true',
          render: (h, params) => {
            if (params.row.status === 1) {
              return h('status-in-table')
            }
          },
          titleRender: (data) => {
            return ''
          },
        },
        {
          title: '最后修改人',
          width: 90,
          key: 'operater',
          align: 'center',
          ellipsis: 'true',
          // render: (h, p) => {
          //   return h('span', {}, [p.row.operater.realname])
          // },
        },
        {
          title: '最后修改时间',
          filterType: 'date',
          key: 'updated_at',
          ellipsis: 'true',
          width: 130,
          render: (h, p) => {
            if (p.row.updated_at) {
              return h('span', {}, [
                fifters.timeFilter(p.row.updated_at, 'YYYY-MM-DD HH:mm'),
              ])
            }
          },
          titleRender: (data) => {
            if (data.updated_at) {
              return fifters.timeFilter(
                  data.updated_at,
                  'YYYY-MM-DD HH:mm'
                )
            } else {
              return ''
            }
          },
        },
        {
          title: '操作',
          fixedRightWidth: 70,
          width: 70,
          fixed: 'right',
          render(h, p) {
            return h('div', {
            }, [
              h('span', {
                style: {
                  display: 'inline-block',
                  width: '12px',
                  height: '13px',
                  'margin-right': '10px',
                  'margin-left': '5px',
                  background: `url(${that.isSelectMode === true ? editIcon : editBanIcon}) no-repeat`,
                  // background: 'url(' + editIcon + ') no-repeat',
                },
                on: {
                  click: function(event) {
                    event.stopPropagation()
                    if (that.isSelectMode) {
                      return
                    }
                    console.log('编辑', that.isSelectMode)
                    that.tableEdit(p.row, p.index, p.column)
                    // this.$emit('edit', p.row, p.index, p.column)
                  },
                },
              }),
            ])
          },
        },
      ],
      // form
      sortValue: 0,
      // add
      add: {
        showModal: false,
        formData: {
          status: true,
          staff_id: 0,
        },
      },
      // edit
      edit: {
        showModal: false,
        formData: {
          status: true,
          staff_id: 0,

        },
      },
      formRules: {
        staff_id: [
          // TODO:
          {
            // validator: nameValidator,
            required: true,
            type: 'number',
            message: '医生信息为必填',
            trigger: 'blur',
          },
        ],
      },
      // delete
      deleteModal: false,
      deleteModalHasChild: false,
    }
  },
  watch: {
    windowHeight(val) {
      this.$nextTick(function() {
        this.setTableHeight()
      })
    },
  },
  computed: {
    ...mapState(['windowHeight']),
    // TODO:
    ...mapState('signatureManagerModule', ['signs']),
    ...mapGetters('signatureManagerModule', ['doneStaffsAll']),
    // table
    tableData() {
      return this.signs.items
    },
    tableInfo() {
      return this.signs.meta
    },
    // tree
    // inDept() {
    //   let id = this.add.formData.staff_id
    //   console.log('计算', id)
    //   let deptText = []
    //   for (let item of this.doneStaffsAll.items) {
    //     if (item.id === id && (item.depts && item.depts.length)) {
    //       console.log('jisaun', item)
    //       item.depts.map(data => {
    //         console.log('sdf', data.dept.name)
    //         deptText.push(data.dept.name)
    //       })
    //     }
    //   }
    //   return deptText.join(',')
    // },
    // inDeptEdit() {
    //   let id = this.edit.formData.staff_id
    //   console.log('计算', id)
    //   let deptText = []
    //   for (let item of this.doneStaffsAll.items) {
    //     if (item.id === id && (item.depts && item.depts.length)) {
    //       console.log('jisaun', item)
    //       item.depts.map(data => {
    //         console.log('sdf', data.dept.name)
    //         deptText.push(data.dept.name)
    //       })
    //     }
    //   }
    //   return deptText.join(',')
    // },
  },
  async created() {
    await Promise.all([
      // TODO:
      this.getSigns(),
    ])
      // this.getEconIndustryAll({fifters: `isTree:1`}),
  },
  methods: {
    // TODO:
    ...mapActions('signatureManagerModule', ['getStaffs', 'getSigns', 'addSigns', 'editSigns', 'deleteSigns']),
    // page
    setTableHeight() {
      this.tableHeight = this.$refs.body.offsetHeight
    },
    pageInit() {
      // 初始化sort
      // TODO:
      this.sortValue = this.econIndustryLists.meta.total + 1
    },
    // TODO: 是否需要树形
    async setFormParentData(id, isTree) {
      let data = []
      // TODO:
      await this.getFloorParent(id)
      for (let item of this.doneParentIds) {
        data.push(item.id)
      }
      this.add.formData.pName = _.cloneDeep(data)
      if (isTree) {
      // TODO: tree按钮下
          // 父级
        this.add.formData.pName.splice(this.doneParentIds.length - 1)
        // this.doneParentIds.pop()
      }
    },
    // tree
    treeSearch(data) {
      //
      // console.log(data)
      // TODO: 更新tree数据
      // this.getEconTypeTree({search: data, fifters: 'isTree:1'})
    },
    treeSearchEnter(e, value) {
      this.treeSearch(value)
    },
    treeSearchAddrim(e, value) {
      this.treeSearch(value)
    },
    treeSearchCancel() {
      // TODO: 更新tree数据 还原
      // this.getEconTypeTree({search: '', fifters: 'isTree:1'})
    },
    async treeLoadData(item, callback) {
      console.log('item', item)
      // TODO: 获取子级数据
      if (item.is_children) {
        // TODO:
        await this.getFloorChild({ filters: `parent_id:${item.id};isTree:1` })
      }
      console.log('kkkk', this.floorTreeChild)
      callback(_.cloneDeep(this.floorTreeChild.items))
    },
    treeSelectChange(data) {
      // TODO: 更新右侧数据
      // console.log('change', data)
      // this.tableParams.filters = `parent_id:${data[0].id}`
      // this.$refs.table.request()
      // // this.getTreeParent(data[0])
      // this.setParentId(data[0])
    },
    treeAdd(data) {
      // TODO: 新增
      // console.log(data)
      // this.add.formData.remark = ''
      // this.add.showModal = true
    },
    treeDelete(data) {
      // TODO: 删除
      // console.log(data)
      // if (data.is_children || (data.children && data.children.length)) {
      //   // TODO: 这里弹出删除子级提示
      //   return
      // }
      // this.selectionData = [data]
      // this.deleteModal = true
    },
    treePutAwayAll() {
      //
    },
    treeExpandAll() {
      //
    },
    // header
    exportBtn() {
        // console.log('导出')
      let _this = this
      exportXlsx('签名管理', {
        // TODO:
        api: api.signatureManager.getSigns,
        params: this.exportParams.reqParams,
        columns: this.exportParams.columns,
        callback (result) {
          if (result) {
            _this.$Message.success('导出成功')
          } else {
            _this.$Message.error('导出失败')
          }
        },
      })
    },
    getRequestParams(params) {
      this.exportParams.reqParams = params
    },
    headerSearchEnter(val) {
      this.tableParams.search = val
      this.$refs.table.request()
      // FIXME: 在搜索状态下新增的内容后刷新表格，带key
    },
    headerSearchCancel() {
      this.tableParams.search = ''
      this.$refs.table.request()
    },
    async headerAdd() {
      console.log('add')
      // TODO: 新增
      await this.getStaffs({per_page: 100000, filters: 'status:1;staffSign:null'})
      this.add.formData.remark = ''
      this.add.formData.staff_id = ''
      this.add.formData.img = ''
      this.edit.formData.status = 1
      this.imgSrc = ''
      this.add.showModal = true
    },
    headerDelete() {
      // 删除
      this.deleteModal = true
    },
    toSelectMode() {
      this.selectionData = []
      this.isSelectMode = true
    },
    exitSelectMode() {
      // TODO: 取消
      this.selectionData = []
      this.isSelectMode = false
    },
    // table
    tableEdit(row, i, col) {
      this.resetEditForm(row)
      this.edit.showModal = true
    },
    tableRowEdit(row, e) {
      this.resetEditForm(row)
      this.edit.showModal = true
    },
    tableDelete(row, i, col) {
      this.selectionData = [row]
      this.deleteModal = true
    },
    tableRowDelete(row, e) {
      this.selectionData = [row]
      this.deleteModal = true
    },
    tableSelectRow(arr, row, i) {
      this.selectionData = arr
    },
    tableCancelSelectRow(arr, row, i) {
      this.selectionData = arr
    },
    tableSelectAll(arr) {
      this.selectionData = arr
    },
    tableAllSelection(arr) {
      //
    },
    tableSelectionChange(arr) {
      //
    },
    tableClickRow(arr, row, i, col) {
      //
    },
    // form
    getImg(data) {
      console.log('img', data)
    },
    delImage() {
      console.log('123')
      this.imgSrc = ''
      this.add.formData.img = ''
      this.edit.formData.img = ''
    },
    addFileChange(e) {
      const that = this
      const fd = new FileReader()
      fd.onloadend = function() {
        console.log('图片加载OK')
        that.imgSrc = fd.result
      }
      if (this.$refs.addInput.files && this.$refs.addInput.files[0]) {
        fd.readAsDataURL(this.$refs.addInput.files[0])
        this.getImg(this.$refs.addInput.files[0])
        this.add.formData.img = this.$refs.addInput.files[0]
        // this.$emit('getImg', this.$refs.addInput.files[0])
      }
    },
    editFileChange(e) {
      const that = this
      const fd = new FileReader()
      fd.onloadend = function() {
        console.log('图片加载OK')
        that.imgSrc = fd.result
      }
      if (this.$refs.editInput.files && this.$refs.editInput.files[0]) {
        fd.readAsDataURL(this.$refs.editInput.files[0])
        this.getImg(this.$refs.editInput.files[0])
        this.add.formData.img = this.$refs.editInput.files[0]
        // this.$emit('getImg', this.$refs.addInput.files[0])
      }
    },
    isEmpty(data) {
      if (data === '' || data === undefined) {
        return true
      } else {
        return false
      }
    },
    addSortCtrl(val) {
      this.sortValue = val
    },
    addCascaderChange(val, selection) {
      this.cascaderData = selection
    // TODO:
      // this.setParentId(selection[selection.length - 1])
      console.log('返回', val, selection)
    },
    addCascaderEnd(isShow) {
      if (!isShow) {
        // TODO:
        // this.add.formData.pCode = this.cascaderData[this.cascaderData.length - 1].code
      }
    },
    addSelectChange(val) {
      let deptText = []
      for (let item of this.doneStaffsAll.items) {
        if (item.id === val && (item.depts && item.depts.length)) {
          item.depts.map(data => {
            item.depts.map(data => {
              if (data.dept && data.dept.name) {
                deptText.push(data.dept.name)
              }
            })
          })
        }
      }
      this.inDept = deptText.join(',')
    },
    editSelectChange(val) {
      let deptText = []
      for (let item of this.doneStaffsAll.items) {
        if (item.id === val && (item.depts && item.depts.length)) {
          item.depts.map(data => {
            if (data.dept && data.dept.name) {
              deptText.push(data.dept.name)
            }
          })
        }
      }
      this.inDeptEdit = deptText.join(',')
    },
    async addFormSave() {
      console.log(this.add.formData)
      console.log('图片', this.$refs.addInput.files[0])
      try {
        let formData = new FormData()
        formData.append('staff_id', this.add.formData.staff_id)
        formData.append('remark', this.add.formData.remark)
        formData.append('status', Number(this.add.formData.status))
        formData.append('image', this.add.formData.img)

        await this.addSigns(formData)
        this.add.showModal = false
        this.$refs.table.request()
      } catch (err) {
        console.error(err)
      }
    },
    addFormCancel() {
      this.add.showModal = false
    },
    // edit
    async editFormSave() {
      console.log(this.edit.formData)
      try {
        let formData = new FormData()
        formData.append('staff_id', this.edit.formData.staff_id)
        formData.append('remark', this.edit.formData.remark)
        formData.append('status', Number(this.edit.formData.status))
        if (!this.edit.formData.img) {
          formData.append('img_del', '1')
        } else {
          formData.append('image', this.edit.formData.img)
        }
        await this.editSigns({id: this.edit.formData.id, formData: formData})
        this.edit.showModal = false
        this.$refs.table.request()
      } catch (err) {
        console.error(err)
      }
    },
    async resetEditForm(obj) {
      console.log('edit', obj)
      await this.getStaffs({per_page: 100000, filters: 'status:1;'})
      for (let item of this.doneStaffsAll.items) {
        if (obj.staff_id === item.id) {
          this.editPinfo = item.label
        }
      }
      this.edit.formData.id = obj.id
      this.edit.formData.staff_id = obj.staff_id
      this.edit.formData.remark = obj.remark
      this.edit.formData.status = !!obj.status
      this.edit.formData.operater = obj.operater
      this.edit.formData.updated_at = obj.updated_at
      this.editSelectChange(this.edit.formData.staff_id)
      if (obj.has_sign) {
        this.edit.formData.img = obj.img
        this.imgSrc = obj.img
      } else {
        this.edit.formData.img = ''
        this.imgSrc = ''
      }

      // this.edit.formData.sort = obj.sort
    },
    editFormCancel() {
      this.edit.showModal = false
    },
    // delete
    async deleteAffirm() {
      // try {
      //   let send = []
      //   this.selectionData.map(function(value, i, arr) {
      //     send.push(value.id)
      //   })
      //   await this.delEconType(send)
      this.deleteModal = false
      //   this.deleteModalHasChild = false
      //   // TODO: 更新table和tree
      //   this.$refs.table.request()
      //   this.getEconTypeTree({per_page: 100000, filters: 'isTree:1'})
      // } catch (err) {
      //   console.error(err)
      // }
    },
  },
}
</script>

<style lang="less" scoped>
.personnel-admin {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 10px;

  .container {
    display: flex;
    overflow: hidden;
    width: 100%;
    height: 100%;
    & > div {
      width: 100%;
      height: 100%;
    }
    .tree-wrapper {
      flex: 1;
      height: 100%;
>div:last-child{
        height: ~"calc(100% - 40px)";
      }
      .input-wrapper {
        width: 100%;
        padding: 10px 10px 0 10px;
      }
    }
    .table-wrapper {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      .header {
        .header-content-wrapper {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          width: 100%;
          height: 100%;
        }
      }
      .body {
        display: flex;
        width: 100%;
        flex: 1;

        & > div {
          width: 100%;
        }
      }
    }
  }
}
</style>

<style lang="less">
.personnel-admin {
  .fmm-modal-content {
    padding-top: 20px;
    .fmm-img-loader{
      height:178px;
      position: relative;
      border:1px solid #ccc;
      border-radius:4px;

      .img-wrapper{
        width:100%;
        height:100%;
        display: flex;
        justify-content:center;
        align-items:center;
        img{
          max-width:100%;
          max-height:100%;
        }
      }
      .btn-wrapper{
        display: flex;
        position:absolute;
        bottom:0;
        height:28px;
        width:100%;
        padding-left:10px;
        padding-right:10px;
        justify-content: space-between;
        >div{
          position: relative;
          width:48px;
          color:#008CEE;
          font-size:12px;
          input{
            width:100%;
            border:none;
          }
          span{
            position: absolute;
            top:0;
            right:0;
            bottom:0;
            left:0;
            margin:auto;
            cursor: pointer;
          }
        }
      }
    }
    .fmm-form-row {
      display: flex;
      align-items: center;
      & > span {
        height: 30px;
        line-height: 30px;
        margin-bottom: 20px;
      }
    }
    .fmm-form-row-height-label {
      padding-top: 7px;
      line-height: 20px;
    }
    .fmm-form-row-height {
      display: flex;
      // height: 60px;
    }
    .fmm-flex1 {
      flex: 1;
    }
    .fmm-item-label {
      width: 48px;
      overflow: hidden;
      text-align: justify;
      text-align-last: justify;
      color:#737373;
    }
    .fmm-item-large {
      width: 200px;
      color:#4a4a4a;      
    }
    .fmm-item-small {
      width: 60px;
    }
    .fmm-operator {
      line-height: 12px;
    }
  }
  .fmm-modal-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    // height: 50px;
    padding-right: 20px;
    padding-bottom: 20px;
    & > label {
      margin-right: 20px;
    }
  }
}
</style>
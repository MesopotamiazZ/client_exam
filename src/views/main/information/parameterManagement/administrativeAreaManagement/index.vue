/* 
* 基本信息-参数管理-行政区划管理 
* @author 肖康 
* @date 2017/12/1 
* TODO: 子类判断，表单内上级选择不同，那么变化对应的数字码
*/
<template>
  <div class="paddingT10 paddingB10"
       style="position:relative;height:100%;">
    <div class="administrativeAreaManagement contentBg">
      <title-has-slot>
        <span slot="titletHasSlotLeftTitle">行政区划列表</span>
        <div slot="titletHasSlotRightContent">
          <Button @click="addAreaFn"
                    type="ghost"
                    class="marginR10">新 增</Button>
          <Button @click="editAreaFn"
                    :disabled="config.editBtn"
                    type="ghost"
                    class="marginR10">编 辑</Button>
          <Button @click="delAreaFn"
                    :disabled="config.editBtn"
                    type="success">删 除</Button>
        </div>
      </title-has-slot>
      <div class="body">
        <div class="proviceHeader area-header">
          <span>省/直辖市</span>
          <div class="xLine"></div>
        </div>
        <ul class="province">
          <li v-for="(item,index) in doneProvinceList"
              :key="index"
              @click="selectProvince(index)"
              ref="province"
              class="default">
            <div class="icon"
                 v-if="hiddenLetter(index)">{{item.district_letter.substring(1,0).toUpperCase()}}</div>
            <div class="icon-no"
                 v-else></div>
            <span>{{item.name}}</span>
          </li>
        </ul>
        <!-- 市 -->
        <div class="cityHeader area-header">
          <span>市</span>
          <div class="xLine"></div>
        </div>
        <ul class="city">
          <li v-for="(item,index) in city"
              :key="index"
              v-if="item.name"
              @click="selectCity(index)"
              ref="city">{{item.name}}</li>
          <div class="areaAdd"
               @click="addCity">
            <div class="x"></div>
            <div class="y"></div>
          </div>
        </ul>
        <!-- 区/县 -->
        <div class="area-header">
          <span>区</span>
          <div class="xLine"></div>
        </div>
        <ul class="county">
          <li v-for="(item,index) in county"
              :key="index"
              v-if="item.name"
              @click="selectCounty(index)"
              ref="county">{{item.name}}</li>
          <div class="areaAdd"
               v-show="config.countyAddBtn"
               @click="addCounty">
            <div class="x"></div>
            <div class="y"></div>
          </div>
        </ul>
        <!-- 街道 -->
        <div class="area-header">
          <span>片区/街道</span>
          <div class="xLine"></div>
        </div>
        <ul class="street">
          <li v-for="(item,index) in street"
              :key="index"
              v-if="item.name"
              @click="selecStreet(index)"
              ref="street">{{item.name}}</li>
          <div class="areaAdd"
               v-show="config.streetAddBtn"
               @click="addStreet">
            <div class="x"></div>
            <div class="y"></div>
          </div>
        </ul>
      </div>
      <!-- 新增 -->
      <Modal v-if="config.modalShow"
             v-model="config.modalShow"
             :mask-closable="false"
             :closable="false"
             width="398"
             :transition-names="['']"
             :transfer="false">
        <div slot="header">
          <alert-header headerText="新增行政区划"
                        :headerVal="addFormSort"
                        @alert-retrun-num="addSortCtrl"></alert-header>
        </div>
        <div class="addForm">
          <Form :model="addForm"
                :rules="modalEdit.form.rules"
                ref="addForm">
            <div class="modal-form-row marginT20">
              <div class="leabel-wrapper">
                <p>上级行政区划名称</p>
                <p>数字码/字母码</p>
              </div>
              <FormItem class="input-wrapper"
                        prop="parentName">
                <!-- FIXME: 此组件不支持异步加载数据 :load-data="loadData" -->
                <Cascader v-if="addForm.selection"
                          class="input-item"
                          v-model="addForm.selection"
                          :data="areaCascader.items"
                          @on-change="addCasvaderChange"
                          change-on-select
                          placeholder=" ">
                </Cascader>
                <div class="input-text">
                  <span v-show="addForm.district_num||addForm.district_letter">{{addForm.district_num+'/'+addForm.district_letter}}</span>
                </div>
              </FormItem>
            </div>
            <div class="modal-form-row">
              <div class="leabel-wrapper">
                <p>行政区划名称</p>
                <p>数字码/字母码</p>
              </div>
              <FormItem class="input-wrapper"
                        prop="name">
                <select-input :data="selectInputData"
                              @input="addFormInputName"
                              @getSelect="addFormInputSelect"
                              placeholder=" "></select-input>
                <div class="input-text">{{codeOfName}}</div>
                <p v-show="addForm.name === ''"
                   class="required required-input">*</p>
              </FormItem>
            </div>

            <div class="modal-form-row">
              <div class="leabel-wrapper text-area">
                <p>备注</p>
              </div>
              <FormItem class="input-wrapper">
                <Input v-model="addForm.remark"
                       type="textarea"
                       placeholder=" "></Input>
                <!-- <div class="input-text">{{addForm.name}}</div> -->
              </FormItem>
            </div>
          </Form>
        </div>
        <div slot="footer"
             class="aam-footer-wrapper">
          <div class="footer">
            <Checkbox v-model="addForm.status">启用</Checkbox>
            <Button class="marginR20"
                      type="primary"
                      @click="addConfirm('确定')">保 存</Button>
            <Button class="marginR20"
                      type="ghost"
                      @click="addConfirm('取消')">取 消</Button>
          </div>
        </div>
      </Modal>
      <!-- 编辑 -->
      <Modal v-if="config.modalShow2"
             v-model="config.modalShow2"
             :mask-closable="false"
             :closable="false"
             width="398"
             :transition-names="['']"
             :transfer="false">
        <div slot="header">
          <alert-header headerText="编辑行政区划"
                        :headerVal="editForm.sort"
                        @alert-retrun-num="editSortCtrl"></alert-header>
        </div>
        <div class="addForm">
          <Form :model="editForm"
                :rules="modalEdit.form.rules"
                ref="editForm">
            <div class="modal-form-row marginT20">
              <div class="leabel-wrapper">
                <p>上级行政区划名称</p>
                <p>数字码/字母码</p>
              </div>
              <FormItem class="input-wrapper"
                        prop="parentName">
                <Cascader change-on-select
                          class="input-item"
                          v-model="editForm.selection"
                          :data="areaCascader.items"
                          @on-change="editCasvaderChange"
                          placeholder=" "></Cascader>
                <div class="input-text">
                  <span v-show="editForm.district_num_p||editForm.district_letter_p">{{editForm.district_num_p+'/'+editForm.district_letter_p}}</span>
                </div>
              </FormItem>
            </div>
            <div class="modal-form-row">
              <div class="leabel-wrapper">
                <p>行政区划名称</p>
                <p>数字码/字母码</p>
              </div>
              <FormItem class="input-wrapper"
                        prop="name">
                <Input v-model="editForm.name"
                       @input="editFormInputName"
                       @getSelect="editFormInputSelect"
                       placeholder=" "></Input>
                <div class="input-text">{{codeOfName}}</div>
                <p v-show="editForm.name === ''"
                   class="required required-input">*</p>
              </FormItem>
            </div>

            <div class="modal-form-row">
              <div class="leabel-wrapper text-area">
                <p>备注</p>
              </div>
              <FormItem class="input-wrapper">
                <!-- <Cascader v-model="editForm.name" :data="areaCascader" :load-data="loadData"></Cascader> -->
                <Input v-model="editForm.remark"
                       type="textarea"
                       placeholder=" "></Input>
                <!-- <div class="input-text">{{addForm.name}}</div> -->
              </FormItem>
            </div>
            <div class="marginB20 paddingL20">
              <span>最后修改人：</span>
              <span>{{editForm.operater}}</span>
              <span class="marginL10">最后修改时间：</span>
              <span>{{editForm.updated_at|timeFilter}}</span>
            </div>
          </Form>
        </div>
        <div slot="footer"
             class="aam-footer-wrapper">
          <div class="footer">
            <Checkbox v-model="formStatus">启用</Checkbox>
            <!-- <Button class="marginR20" type="success" @click="delThisData">删 除</Button> -->
            <Button class="marginR20"
                      type="primary"
                      @click="editAffirm('editForm')">保 存</Button>
            <Button class="marginR20"
                      type="ghost"
                      @click="cancelMoel2('取消')">取 消</Button>
          </div>
        </div>
      </Modal>
      <!-- 确认删除提示 -->
      <affirm-del-modal :controlModal="config.showModal3"
                        @delCancel="delConfirm('取消')"
                        @affirmDel="delConfirm('确定')"
                        :delCounts="1">
      </affirm-del-modal>
    </div>
    <Modal v-model="config.showModal4"
           :mask-closable="false"
           :closable="false"
           width="296"
           :transition-names="['']"
           :transfer="false">
      <div slot="header">
        <alert-header headerText="提示"
                      :showInput="false"></alert-header>
      </div>
      <div class="del-text">
        <span>请先删除其包含子类信息再进行删除操作！</span>
      </div>
      <div slot="footer">
        <div class="footer">
          <Button class="  marginR10"
                    type="success"
                    @click="delConfirm('确定')">删 除</Button>
          <Button class=" marginR20"
                    type="ghost"
                    @click="delConfirm('取消')">取 消</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex'
import _ from 'lodash'
import filters from '@/utils/fifters'

export default {
  name: 'administrativeAreaManagement',
  data() {
    return {
      // 表单-编辑
      modalEdit: {
        form: {
          model: {
            parent: '',
            name: '',
          },
          rules: {
            name: [{
              required: true,
              message: '行政区划名称不能为空',
              trigger: 'blur',
            }],
          },
        },
      },
      // 选中
      actions: {
        province: {
          elm: '',
          index: NaN,
        },
        city: {
          elm: '',
          index: NaN,
        },
        county: {
          elm: '',
          index: NaN,
        },
        street: {
          elm: '',
          index: NaN,
        },
      },
      style: {
        // 选中状态样式
        active: 'color:#83CB54; font-size: 14px;font-weight:900;',
      },
      config: {
        modalShow: false,
        modalShow2: false,
        showModal3: false,
        showModal4: false,
        editBtn: true,
        countyAddBtn: false,
        streetAddBtn: false,
      },
      // status
      formStatus: true,
      // level
      level: '',
      // 名字对应code
      codeOfName: '',
      // 选中城市父级ids
      parentArr: [],
      // 名字输入组件数据
      selectInputData: [],
      // 选中数据list
      selection: [{}, {}, {}, {}],
      // 选中数据
      selectionSingle: {},
         // 显示顺序
      addFormSort: 0,
      // 上级行政区划选择项目
      relationship: {
        province: 0,
        city: 0,
        county: 0,
        street: 0,
      },
      // 市级行政区
      city: [],
      // 区、县
      county: [],
      // 片区、街道
      street: [],
      selectedParent: '',
      addForm: {
        selection: [],
      },
      editForm: {
        name: '',
      },
    }
  },
  async created() {
    // console.log('run')
    let that = this
    try {
      // 获取到级联的数据
      await Promise.all([
        this.getAreaCascader({per_page: 100000, filters: 'level:[1,4);isTree:1'}),
        this.getAreaProvince({per_page: 100000, filters: 'level:1'}),
      ])
      this.$nextTick(() => {
        that.setSelectDefault('四川省')
      })
    } catch (err) {
      console.error(err)
    }
    filters
  },
  mounted() {
    // console.log(this.doneAreaList)

  },
  computed: {
    ...mapState('administrativeAreaManagementModule', [
      'areaCascader',
      'areaParent',
      // 'areaList',
      'provinceList',
      'cityList',
      'countyList',
      'streetList',
    ]),
    ...mapGetters('administrativeAreaManagementModule', [
      // 'doneAreaList',
      'doneProvinceList',
      'doneParentIds',
    ]),
    selectionList() {
      let data = []
      if (this.selection.length) {
        for (let item of this.selection) {
          data.push(item.id)
        }
      }
      return data
    },
  },
  methods: {
    // 存储选中数据
    saveSelection(data, i) {
      this.selection[i - 1] = data
      this.selectionSingle = data
      console.log('保存选中', data, i, this.selection)
    },
    // 添加市
    addCity() {
      // console.log(this.parentArr)

      // console.log('选中项', this.selectionSingle)
      this.addForm = Object.assign(_.cloneDeep(this.selectionSingle), this.addForm)
      // this.addForm.selection = _.cloneDeep(this.selectionList)
      if (this.parentArr && this.parentArr.length !== 1) {
        this.addForm.selection = [_.cloneDeep(this.parentArr).shift()]
        // this.addForm.selection.shift()
      } else {
        this.addForm.selection = _.cloneDeep(this.parentArr)
      }
      this.setSort(this.city)
      this.addModalShow()
      // console.log('===', this.addForm)
    },

    // 添加区
    addCounty() {
      // console.log(this.parentArr)
      // console.log(_.cloneDeep(this.parentArr).splice(2))

      this.addForm = Object.assign(_.cloneDeep(this.selectionSingle), this.addForm)
      // this.addForm.selection = _.cloneDeep(this.selectionList)
      if (this.parentArr && this.parentArr.length !== 2) {
        this.addForm.selection = _.cloneDeep(this.parentArr)
        this.addForm.selection.splice(2)
      } else {
        this.addForm.selection = _.cloneDeep(this.parentArr)
      }
      this.setSort(this.county)
      this.addModalShow()
      // console.log('===', this.addForm)
    },
    // 添加街道
    addStreet() {
      // console.log(this.parentArr)
      this.addForm = Object.assign(_.cloneDeep(this.selectionSingle), this.addForm)
      // this.addForm.selection = _.cloneDeep(this.selectionList)
      if (this.parentArr && this.parentArr.length !== 3) {
        this.addForm.selection = _.cloneDeep(this.parentArr)
        this.addForm.selection.splice(3)
      } else {
        this.addForm.selection = _.cloneDeep(this.parentArr)
      }
      this.setSort(this.street)
      this.addModalShow()
      // console.log('===', this.addForm)
    },
    // 控制编辑按钮
    // FIXME: 如果每一级的数据都是可以编辑的，那么这个编辑状态的更新就不需要了
    editBtnStatusUpdate(level) {
      // console.log('update', level, this.config.editBtn)
      level > 0 ? this.config.editBtn = false : this.config.editBtn = true
    },
    // 设置默认选中项
    setSelectDefault(name) {
      // console.log('设置默认')
      let set = false
      // 样式、表单、二级、选中项索引
      // console.log(this.doneProvinceList.length)
      for (let i = 0; i < this.doneProvinceList.length; i++) {
        console.log(this.doneProvinceList[i].name, name)
        if (this.doneProvinceList[i].name === name) {
          this.selectProvince(i)
          set = true
          return
        }
      }

      if (set === false) {
        this.selectProvince(0)
        this.setItemStyle(1, this.$refs.province, 0)
        this.city = this.doneProvinceList[0].children
        this.county = []
        this.street = []
        this.relationship.province = 0
      }
    },
    // 设置选中项样式,级别，元素组，索引
    setItemStyle(l, e, i) {
      // 设置选中样式
      // console.log(e)
      for (let j = 0; j < e.length; j++) {
        e[j].style.cssText = ''
      }
      e[i].style.cssText = this.style.active
      // 保存操作对象
      switch (l) {
      case 1:
        this.actions.province.elm = e[i]
        this.actions.province.index = i
        break
      case 2:
        this.actions.city.elm = e[i]
        this.actions.city.index = i
        break
      case 3:
        this.actions.county.elm = e[i]
        this.actions.county.index = i
        break
      case 4:
        this.actions.street.elm = e[i]
        this.actions.street.index = i
        break
      }
      // console.log('sssssssssssss')
      this.setItemSelectedStyle(l)
    },
    // 设置选后样式 ,级别
    setItemSelectedStyle(level) {
      // console.log('省', this.actions.province.elm)
      let province = this.actions.province.elm
      let city = this.actions.city.elm
      let county = this.actions.county.elm
      let street = this.actions.street.elm
      switch (level) {
      case 1:
        try {
          city.style.cssText = ''
          county.style.cssText = ''
          street.style.cssText = ''
        } catch (errr) {
            // console.log()
        }
        break
      case 2:
        try {
          province.style.cssText = 'color:#737373;font-size:14px;font-weight:900;'
          county.style.cssText = ''
          street.style.cssText = ''
        } catch (errr) {
            // console.log()
        }
        break
      case 3:
        try {
          city.style.cssText = 'color:#737373;font-size:14px;font-weight:900;'
          street.style.cssText = ''
        } catch (errr) {
            // console.log()
        }
        break
      case 4:
        try {
          county.style.cssText = 'color:#737373;font-size:14px;font-weight:900;'
        } catch (errr) {
            // console.log()
        }
        break
      }
    },

    // 隐藏相同字母
    hiddenLetter(index) {
      // console.log('隐藏相同字母', this.areaList[index].pinyin_code)
      // 是否为null
      // if (!this.doneProvinceList[index]) {
      //   return false
      // }
      if (this.doneProvinceList[index] === null) {
        return false
      }
      if (!this.doneProvinceList[index].district_letter) {
        return false
      }
      if (index === 0) {
        return true
      }
      // 上一个是否为null
      if (this.doneProvinceList[index - 1].district_letter === null) {
        return true
      }
      // 判断
      if (this.doneProvinceList[index].district_letter.toLowerCase().substring(1, 0) !== this.doneProvinceList[index - 1].district_letter.toLowerCase().substring(1, 0)) {
        return true
      } else {
        return false
      }
    },
    // 设置表单上级数组
    async setAreaParent(obj) {
      if (obj.id) {
        await this.getAreaParent(obj.id)
        this.parentArr = _.cloneDeep(this.doneParentIds)
        console.log('父级', this.parentArr)
        // this.addForm.selection
      }
    },
    // 选择省方法
    async selectProvince(index) {
      console.log('选择省', index)
      // 保存选中
      this.saveSelection(this.doneProvinceList[index], 1)
      // 保存当前省索引
      this.relationship.province = index
      this.relationship.city = 0
      this.relationship.county = 0
      this.relationship.street = 0
      // console.log('选择省方法')
      // 更改表单显示父级名称
      // this.formSuperiorName(1)
      // 样式处理
      this.setItemStyle(1, this.$refs.province, index)
      // 更新按钮
      this.editBtnStatusUpdate(1)
      // 禁止添加
      this.config.countyAddBtn = false
      this.config.streetAddBtn = false
      // 改变市
      await Promise.all([

        this.getAreaCity({filters: `level:2;parent_id:${this.doneProvinceList[index].id}`}),
        this.setAreaParent(this.doneProvinceList[index]),

      ])
      this.city = _.cloneDeep(this.cityList.items)
      this.setSort(this.city)
      this.county = []
      this.street = []

      // 弹窗内关联数据
      // FIXME: 这里应该是标准库中对应省的 市 数据
      this.selectInputData = this.city

      //  要设置的数据有：
      // sort
      // 上级id数组
      // 上级城市对应数字码字母码
    },
    // 选择市方法
    async selectCity(index) {
      console.log('选择市', index)
      this.saveSelection(this.city[index], 2)
      // 样式处理
      this.setItemStyle(2, this.$refs.city, index)
      // 更新按钮
      this.editBtnStatusUpdate(2)
      // 区县可添加
      this.config.countyAddBtn = true
      this.config.streetAddBtn = false
      // 改变区县
      await this.getAreaCounty({filters: `level:3;parent_id:${this.city[index].id}`})
      this.county = _.cloneDeep(this.countyList.items)
      // console.log('县', this.county)
      this.street = []
      // 弹窗内关联数据
      this.selectInputData = this.county
      // 保存市的索引
      this.relationship.city = index
      this.relationship.county = 0
      this.relationship.street = 0
      // 更改表单显示父级名称
      this.setAreaParent(this.city[index])
    },
    async selectCounty(index) {
      console.log('选择县', index)

      this.saveSelection(this.county[index], 3)
      // console.log('选择县方法')
      // 样式处理
      this.setItemStyle(3, this.$refs.county, index)
      // 更新按钮
      this.editBtnStatusUpdate(3)
      // 更改表单显示父级名称
      // this.formSuperiorName(3)
      // 街道可添加
      this.config.streetAddBtn = true
      // 改变街道
      await this.getAreaStreet({filters: `level:4;parent_id:${this.county[index].id}`})

      this.street = _.cloneDeep(this.streetList.items)
      this.relationship.street = 0
      // 保存县的索引
      this.relationship.county = index
      this.setAreaParent(this.county[index])
    },
    selecStreet(index) {
      console.log('选择乡方法', index)
      this.saveSelection(this.street[index], 4)
      // 样式处理
      this.setItemStyle(4, this.$refs.street, index)
      // 更新按钮
      this.editBtnStatusUpdate(4)
      this.setAreaParent(this.street[index])
    },
    // modal
    cleanFormData() {
      this.addForm.name = ''
      this.addForm.remark = ''
      this.addForm.status = true
      this.codeOfName = ''
    },
    setSort(arr) {
      // console.log('sort数组', arr)
      if (arr.length) {
        this.addFormSort = arr[0].sort
        for (let i in arr) {
          if (arr[i].sort >= this.addFormSort) {
            this.addFormSort = arr[i].sort + 1
            // console.log('设置sort', this.addFormSort)
          }
        }
      }
    },
    addCasvaderChange(value, selectedData) {
      // console.log('选择', value, selectedData)
      // console.log(this.selection)
      this.addForm.district_num = selectedData[selectedData.length - 1].district_num
      this.addForm.district_letter = selectedData[selectedData.length - 1].district_letter
    },
    editCasvaderChange(value, selectedData) {
      // console.log('选择', value, selectedData)
      // console.log(this.selection)
      this.editForm.district_num_p = selectedData[selectedData.length - 1].district_num
      this.editForm.district_num_p = selectedData[selectedData.length - 1].district_letter
    },
    // add
    addModalShow() {
      this.cleanFormData()
      this.config.modalShow = true
      // console.log(this.addForm)
    },
    addFormInputName(val) {
      this.addForm.name = val
    },
    addFormInputSelect(data) {
      if (data && data.district_num) {
        this.codeOfName = `${data.district_num}/${data.district_letter}`
      } else {
        this.codeOfName = ''
      }
    },

    addSortCtrl(val) {
      this.addFormSort = val
      // this.$set(this.addFormSort, val)
    },
    // edit
    editSortCtrl(val) {
      // this.$set(this.addFormSort, val)
      // this.addFormSort = val
      this.editForm.sort = val
    },
    editFormInputName(val) {
      // console.log('输入的')
      this.editForm.name = val
    },
    editFormInputSelect(data) {
      // console.log('选择的', data)
      if (data && data.district_num) {
        this.codeOfName = `${data.district_num}/${data.district_letter}`
      } else {
        this.codeOfName = ''
      }
    },
    async addConfirm(val) {
      // let that = this
      // console.log(this.addForm)
      if (val === '确定') {
        let valid = this.$refs.addForm.validate()
        if (valid) {
          let send = {
            name: this.addForm.name,
            parent_id: this.addForm.selection.length ? this.addForm.selection[this.addForm.selection.length - 1] : 0,
            level: this.addForm.selection.length + 1,
            sort: this.addFormSort,
            remark: this.addForm.remark,
            status: Number(this.addForm.status),
          }
          await this.addArea(send)
          this.config.modalShow = false
          switch (this.addForm.selection.length + 1) {
          case 1:
            this.getAreaProvince({filters: 'level:1'})
            break
          case 2 :
            await this.getAreaCity({filters: `level:2;parent_id:${this.addForm.selection[this.addForm.selection.length - 1]}`})
            this.city = _.cloneDeep(this.cityList.items)
            break
          case 3 :
            await this.getAreaCounty({filters: `level:3;parent_id:${this.addForm.selection[this.addForm.selection.length - 1]}`})
            this.county = _.cloneDeep(this.countyList.items)
            break
          case 4 :
            await this.getAreaStreet({filters: `level:4;parent_id:${this.addForm.selection[this.addForm.selection.length - 1]}`})
            this.street = _.cloneDeep(this.streetList.items)
            break
          }
          this.addForm = {}
          this.getAreaCascader({filters: 'isTree:1'})
        }
        // console.log()
      } else if (val === '取消') {
        this.config.modalShow = false
        this.addForm = {}
        // console.log()
      }
    },
    editAreaFn() {
      // console.log('status', this.editForm.status, !!this.editForm.status)
      console.log('当前选中项', this.selectionSingle)
      this.editForm = _.cloneDeep(this.selectionSingle)
      this.editForm.selection = []
      console.log(this.parentArr)
      this.parentArr.pop()
      console.log('=====')
      console.log(this.parentArr)
      this.editForm.selection = _.cloneDeep(this.parentArr)
      this.formStatus = !!this.editForm.status
      // if (this.addForm.selection && this.addForm.selection.length !== 1) {
      //   this.addForm.selection = _.cloneDeep(this.parentArr.shift())
      // } else {
      //   this.addForm.selection = _.cloneDeep(this.parentArr)
      // }

      if (this.editForm.district_num) {
        this.codeOfName = `${this.editForm.district_num}/${this.editForm.district_letter}`
      } else {
        this.codeOfName = ''
      }
      // console.log('编辑', this.editForm)
      // this.addForm.parentName = this.selectedParent
      this.config.modalShow2 = true
    },
    editAffirm(formName) {
      let valid = this.$refs.editForm.validate()
      if (valid) {
        let send = {
            // adm_code: this.addForm.adm_code,
            // code: this.addForm.code,
          name: this.editForm.name,
          parent_id: this.editForm.parent_id,
          id: this.editForm.id,
          remark: this.editForm.remark,
          sort: this.addForm.sort,
          status: Number(this.formStatus),
        }
          // console.log('send', send)
        try {
          this.editArea(send)
          this.config.modalShow2 = false
          this.editFormClean()
        } catch (err) {
          console.log(err)
        }

          // .then(res => {
          //   // console.log('修改', res)
          //   if (res.name === send.name) {

          //   }
          // })
      }
    },
    editFormClean() {
      // this.editForm.name = ''
    },
    addAreaFn() {
      // FIXME: 确定右上角新增按钮是新增的哪一级数据，暂定为新增子级
      this.addForm = Object.assign(_.cloneDeep(this.selectionSingle), this.addForm)
      this.addForm.selection = _.cloneDeep(this.parentArr)
      this.addModalShow()
      // console.log('新增表单对象', this.addForm)
    },
    delAreaFn() {
      // this.$refs.editForm.resetFields()
      // this.addForm.parentName = this.selectedParent
      this.config.showModal3 = true
    },
    cancelMoel2(val) {
      // console.log('取消modal2')

      if (val === '确定') {
        //
      } else if (val === '取消') {
        this.config.modalShow2 = false
      }
      this.editFormClean()
    },
    delThisData() {
      this.config.showModal3 = true
    },
    // 删除确认
    async delConfirm(val) {
      // let that = this
      if (val === '确定') {
        // TODO: 判断是否有子级,可能需要后台返回值
        // if()
        let send = {
          // ids: this.addForm.superior[this.addForm.superior.length - 1],
          ids: [this.selectionSingle.id],
        }
        // console.log('id', send)
        await this.delArea(send)
        // FIXME: 这里更新需要判断更新哪一层

        // .then(res => {
        //   // console.log('del', res)
        //   that.getAreaList()
        // })
        this.config.modalShow2 = false
      } else {
        // console.log()
      }
      this.config.showModal3 = false
    },

    ...mapActions('administrativeAreaManagementModule', [
      'getAreaList',
      'addArea',
      'editArea',
      'delArea',
      'getAreaCascader',
      'getAreaCounty',
      'getAreaParent',
      'getAreaStreet',
      'getAreaCity',
      'getAreaProvince',
    ]),
  },
}
</script>

<style lang="less" scoped>
@import (reference) '~assets/less/public.less';
.administrativeAreaManagement {
  // border-radius:8px;
  width: calc(~'100% - 20px');
  margin-left: 10px;
  overflow: hidden; // border: 1px solid #e0e0e0;
  height: 100%;
  .body {
    padding-left: 18px;
    overflow-y: scroll;
    .xLine {
      min-width: 944px;
      flex: 1;
      margin-left: 10px;
      background: #d9d9d9;
      height: 1px;
    } // 添加
    .areaAdd {
      position: relative;
      width: 30px;
      height: 30px;
      box-sizing: border-box;
      border: 1px dashed #008cee;
      cursor: pointer;
      .x {
        width: 14px;
        height: 2px;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        background: #008cee;
      }
      .y {
        width: 2px;
        height: 14px;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        background: #008cee;
      }
    }
    .province {
      // padding-left:63px;
      // float:right;
      // width:949px;
      margin-left: 63px;
      padding-right: 63px;

      display: flex;
      flex-wrap: wrap; // 纵向排列
      flex-direction:column;
      max-height:220px;
      align-content: flex-start; //  .default:first-child{
      //   span{
      //     color:#83CB54;
      //     font-size:14px;
      //   }
      // }
      li {
        display: flex;
        align-items: center;
        height: 24px;
        line-height: 24px;
        min-width: 132px;
        margin-bottom: 20px;
        color: @gradeAshThree;
        font-size: 12px;
        cursor: pointer;
        .icon {
          height: 24px;
          width: 24px;
          background: #83cb54;
          border-radius: 50%;
          line-height: 24px;
          text-align: center;
          color: #ffffff;
          font-size: 14px;
        }
        .icon-no {
          height: 24px;
          width: 24px;
        }
        span {
          margin-left: 10px;
        }
      } // 选中样式
      // .active{
      //   span{
      //     color:#83CB54;
      //     font-size:14px;
      //     font-weight:900;
      //   }
      // }
    }
    .area-header {
      display: flex;
      align-items: center;
      clear: both;
      justify-content: flex-end;
      height: 40px;
      span {
        // display: inline-block;
        // flex:1;
        width: 54px;
        text-align: right;
        color: @gradeAshThree;
        font-weight: 900;
      }
    }
    .city {
      display: flex;
      flex-wrap: wrap;
      padding-right: 63px;
      min-height: 30px;
      align-items: center;
      margin-left: 63px;
      margin-top: -10px;
      li {
        // margin-top:15px;
        height: 44px;
        line-height: 44px;
        margin-right: 24px;
        color: @gradeAshThree;
        font-size: 12px;
        cursor: pointer;
      } // 选中样式
      .active {
        color: #83cb54;
        font-size: 14px;
        font-weight: 900;
      }
    }
    .county {
      display: flex;
      flex-wrap: wrap;
      padding-right: 63px;
      min-height: 30px;
      align-items: center;
      margin-left: 63px;
      margin-top: -10px;
      li {
        height: 44px;
        line-height: 44px;
        margin-right: 24px;
        color: @gradeAshThree;
        font-size: 12px;
        cursor: pointer;
      } // 选中样式
      .active {
        color: #83cb54;
        font-size: 14px;
        font-weight: 900;
      }
    }
    .street {
      display: flex;
      flex-wrap: wrap;
      padding-right: 63px;
      min-height: 30px;
      align-items: center;
      margin-left: 63px;
      margin-top: -10px;
      li {
        height: 44px;
        line-height: 44px;
        margin-right: 24px;
        color: @gradeAshThree;
        font-size: 12px;
        cursor: pointer;
      } // 选中样式
      .active {
        color: #83cb54;
        font-size: 14px;
        font-weight: 900;
      }
    }
  }
}
</style>

<style lang="less">
@import (reference) '~assets/less/public.less';
.administrativeAreaManagement {
  .modal-form-row {
    // padding: 0 @num20;
    display: flex;
    justify-content: flex-end;
    padding-right: 20px;
    .text-area {
      margin-top: 2px;
    }
    .leabel-wrapper {
      color: #737373;
      line-height: 30px;
      text-align: right;
    }
    .input-wrapper {
      // flex:1;
      width: 250px;
      margin-left: 10px;
      border: 1px solid #dddee1;
      border-radius: 5px;
      position: relative;
      .aam-input-item {
        border-radius: 5px 5px 0 0;
      }
      .input-text {
        height: 30px;
        line-height: 30px;
        background: #f2f5fa;
        padding-left: 10px;
        border-radius: 0 0 5px 5px;
      }
      .ivu-input {
        border: none;
        box-shadow: none;
      }
      // .ivu-cascader .ivu-input{
      //   border:none;
      //   box-shadow:none;
      // }
    }

    // &>.ivu-form-item-label {
    //   padding: @num10 @num10 0 0;
    //   text-align: justify;
    //   &::after {
    //     content: "";
    //     display: inline-block;
    //     width: 100%;
    //     overflow: hidden;
    //     height: 0%;
    //   }
    //   &::before {
    //     display: none;
    //   }
    // }
    &.ivu-form-item {
      margin-bottom: @num20;
    }
  } // 必填项
  .required {
    position: absolute;
    color: #ff6262;
    z-index: 10;
    font-size: 16px;
    height: 6px;
    line-height: 6px;
    width: 6px;
    user-select: none;
    bottom: 80px;
    right: 32px;
  }
  .required-input {
    right: 10px;
    top: 15px;
  }
  .required-select {
    right: 26px;
    top: 6px;
  }
  .required-textarea {
    right: 12px;
    bottom: 12px;
  }
  .del-text {
    padding-top: 20px;
    padding-bottom: 20px;
    text-align: center;
    color: @gradeAshThree;
    font-size: 16px;
  }
  .aam-footer-wrapper:after {
    content: '';
    display: table;
  }
  .footer {
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 20px;
  }
  // .addForm {
  // padding-top: 5px; // display:flex;
  // .formRow {
  //   position: relative;
  //   margin-top: 15px;
  //   height: 30px;
  //   line-height: 30px;
  //   color: #737373;
  //   font-size: 12px;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center; // max-height:30px;
  //   .title {
  //     height: 30px;
  //     overflow: hidden; // display:inline-block;
  //     width: 72px; // text-align: justify;
  //     margin-right: 10px;
  //   }
  //   .inputCon {
  //     width: 250px;
  //   }
  // }
  // }
}
</style>

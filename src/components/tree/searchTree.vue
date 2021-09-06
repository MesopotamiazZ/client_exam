<template>
  <div slot="left" class="tree-content fl">
    <div class="search-line flex marginR10">
      <div class="marginL10 flx1">
        <localSearchInput @search-key='localSearchKey' :allSearch="valueSearch"></localSearchInput>
      </div>
      <span class='curPointer marginL10'>
        <icon name='tableTitleJump' @click.native="skipTo"></icon>
      </span>
    </div>
    <div class="contentL-content">
      <tree :empty-text="emptyText" @local-search-key="localSearchKey" :data='treeData' @on-select-change='treeSelectChange'></tree>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import * as types from '@/store/types'
import * as _ from 'lodash'
import tree from '@/components/tree/components/tree'
import localSearchInput from '@/components/localSearchInput'
export default{
  name: 'searchTree',
  components: {
    tree,
    localSearchInput,
  },
  props: {
    searchValue: {
      type: Object,
      default () {
        return {}
      },
    },
    data: {
      type: Array,
      default () {
        return []
      },
    },
    emptyText: {
      type: String,
      default: '无匹配项目',
    },
    skipName: {
      type: String,
      default: '',
    },
    totalTitle: {
      type: String,
      default: '所有项目',
    },
    // chouseData: {
    //   type: Object,
    //   default: () => {
    //     return {}
    //   },
    // },
  },
  data() {
    return {
      newDataList: null,
      treeData: JSON.parse(JSON.stringify(this.data)),
      searchData: [],
      searchVal: '',
      valueSearch: '',
      selectVal: {},
    }
  },
  methods: {
    ...mapMutations({
      openPage: types.OPEN_PAGE,
      setCurPage: types.SET_CURRENT_PAGE_NAME,
    }),
    skipTo() {
      if (this.skipName) {
        this.$router.push({ name: this.skipName })
        let temp = {}
        temp.name = this.skipName
        temp.title = this.skipName
        this.openPage(temp)
        this.setCurPage(temp.name)
      }
    },
    treeSelectChange(data) {
      // console.log(data[0])
      this.selectVal.id = data[0].id
      this.selectVal.level = data[0].level
      this.$emit('on-select-change', data)
    },
    searchKey (data) { // 本地搜索
      let arr = []
      let arrErr = []
      let arrFin = []
      let ex = false
      // console.log(this.newDataList[0])
      for (let i in this.newDataList[0].children) {
        if (this.selectVal.level === 2 && this.newDataList[0].children[i].id === this.selectVal.id) {
          this.newDataList[0].children[i].selected = true
        } else {
          this.newDataList[0].children[i].selected = false
        }
        if (this.newDataList[0].children[i].title.indexOf(data) !== -1) {
          if (data) {
            this.newDataList[0].children[i].expand = true
          } else if (this.selectVal && this.selectVal.level === 2 && this.newDataList[0].children[i].id === this.selectVal.id) {
            this.newDataList[0].children[i].expand = true
          } else {
            if (this.newDataList[0].children[i].children && this.selectVal && this.selectVal.level === 3) {
              for (let k in this.newDataList[0].children[i].children) {
                if (this.newDataList[0].children[i].children[k].id === this.selectVal.id) {
                  ex = true
                }
              }
              if (ex === true) {
                // console.log(this.newDataList[0].children[i])
                this.newDataList[0].children[i].expand = true
                ex = false
              } else {
                this.newDataList[0].children[i].expand = false
              }
            }
          }
          arr.push(this.newDataList[0].children[i])
        } else {
          arrErr.push(this.newDataList[0].children[i])
        }
      }
      arrFin = _.cloneDeep(arrErr)
      for (let i in arr) {
        if (arr[i].length && arr[i].children) {
          for (let j in arrErr[i].children) {
            if (arr[i].children[j].id === this.selectVal.id && this.selectVal.level === 3) {
              arr[i].children[j].selected = true
            } else {
              arr[i].children[j].selected = false
            }
          }
        }
      }
      for (let i in arrErr) {
        let num = 0
        arrFin[i].children = []
        if (arrErr[i].children) {
          for (let j in arrErr[i].children) {
            if (arrErr[i].children[j].id === this.selectVal.id && this.selectVal.level === 3) {
              arrErr[i].children[j].selected = true
            } else {
              arrErr[i].children[j].selected = false
            }
            if (arrErr[i].children[j].title.indexOf(data) !== -1) {
              arrFin[i].children[num] = arrErr[i].children[j]
              num++
              if (data) {
                arrFin[i].expand = true
              } else {
                arrFin[i].expand = false
              }
            }
          }
          if (arrFin[i].children.length !== 0) {
            arr.push(arrFin[i])
          }
        }
      }
      if (!data) {
        this.treeData = _.cloneDeep(this.newDataList)
        this.searchData = this.newDataList
        if (this.selectVal.id) {
          this.treeData[0].selected = false
          // for (let i in this.treeData[0].children) {
          //   if (this.selectVal.level === 2 && this.treeData[0].children[i].id === this.selectVal.id) {
          //     this.treeData[0].children[i].selected = true
          //   } else {
          //     this.treeData[0].children[i].selected = false
          //   }
          //   if (this.treeData[0].children[i].title.indexOf(data) !== -1) {
          //     if (data) {
          //       this.treeData[0].children[i].expand = true
          //     } else if (this.selectVal && this.selectVal.level === 2 && this.treeData[0].children[i].id === this.selectVal.id) {
          //       this.treeData[0].children[i].expand = true
          //     } else {
          //       if (this.treeData[0].children[i].children && this.selectVal && this.selectVal.level === 3) {
          //         for (let k in this.treeData[0].children[i].children) {
          //           if (this.treeData[0].children[i].children[k].id === this.selectVal.id) {
          //             ex = true
          //           }
          //         }
          //         if (ex === true) {
          //           console.log(this.treeData[0].children[i])
          //           this.treeData[0].children[i].expand = true
          //           ex = false
          //         } else {
          //           this.treeData[0].children[i].expand = false
          //         }
          //       }
          //     }
          //   }
          // }
        }
      } else {
        this.searchData = arr
        if (arr.length === 0) {
          this.treeData = _.cloneDeep(arr)
        } else {
          if (this.treeData[0]) {
            this.treeData[0].children = _.cloneDeep(arr)
          } else if (this.selectVal.id) {
            let data = [
              {
                title: this.totalTitle,
                expand: true,
                selected: false,
                children: [],
              },
            ]
            this.treeData = data
            this.treeData[0].children = _.cloneDeep(arr)
          } else {
            let data = [
              {
                title: this.totalTitle,
                expand: true,
                selected: true,
                children: [],
              },
            ]
            this.treeData = data
            this.treeData[0].children = _.cloneDeep(arr)
          }
        }
      }
    },
    localSearchKey(data) {
      this.searchVal = data
      this.searchKey(data)
      this.$emit('local-search-key', data)
    },
  },
  watch: {
    searchValue(val) {
      this.valueSearch = val
    },
    data(val, old) {
      // console.log(val)
      if (val && val.length > 0 && (old.length === 0 && this.treeData.length === 0 || !this.searchVal)) {
        this.newDataList = _.cloneDeep(val)
      }
      this.treeData = val
    },
    treeData(val) {
      console.log(val)
    },
    // chouseData(val) {
    //   // console.log(val)
    //   if (val.level === 2) {
    //     // console.log('aaa')
    //     for (let i in this.treeData[0].children) {
    //       if (this.treeData[0].children[i].id === val.id) {
    //         this.treeData[0].children[i].selected = true
    //       } else {
    //         this.treeData[0].children[i].selected = false
    //       }
    //     }
    //   } else if (val.level === 3) {
    //     for (let i in this.treeData[0].children) {
    //       this.treeData[0].children[i].selected = false
    //       this.treeData[0].selected = false
    //       if (this.treeData[0].children[i].children.length) {
    //         for (let j in this.treeData[0].children[i].children) {
    //           if (this.treeData[0].children[i].children[j].id === val.id) {
    //             this.treeData[0].children[i].children[j].selected = true
    //             this.treeData[0].children[i].expand = true
    //             this.selectVal = this.treeData[0].children[i].children[j]
    //             // console.log(this.treeData[0].children[i].children[j])
    //           } else {
    //             this.treeData[0].children[i].children[j].selected === false
    //           }
    //         }
    //       }
    //     }
    //   }
    // },
    selectVal(val) {
      // console.log(val)
    },
  },
  mounted() {
    this.newDataList = _.cloneDeep(this.treeData)
  },
}
</script>
<style lang="less">
  @import (reference) '~assets/less/public.less';
  .tree-content {
    height: 100%;
    background: #F2F7FF;
    width: 100%;
    .search-line {
      height: 50px;
      font-size: 0;
    }
    .contentL-content {
      width: 100%;
      height: calc(~'100% - 50px');
      overflow: auto;
    }
  }
</style>

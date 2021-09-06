// 组件加载器
import Vue from 'vue'

import isvg from './isvg'
import titleHasSlotSmall from './titleHasSlotSmall'
import titleHasSlot from './titleHasSlot'
// import tagSelector from './tagSelector'
import searchInput from './searchInput'
import searchTree from './tree/searchTree'
import searchTable from './table/searchTable'
import prepareTable from './table/prepareTable/prepareTable'
import zBaseInfoTable from './table/zBaseInfoTable'
import qtable from './qtable/index'
import selfTab from './tab/tab.vue'
import affirmDelModal from './modal/affirmDelModal'
import warningModal from './modal/warningModal'
import imageLoad from './img/imageLoad'
import customTransfer from './customTransfer/customTransfer'
import dateComponent from './calendar/dateComponent'
import ZButton from './button/ZButton'
import ZButtonHasBg from './button/ZButtonHasBg'
import alertHeader from './alert/alertHeader'
import alertHeaderForModal from './alert/alertHeaderForModal'
import alertHeaderHasClose from './alert/alertHeaderHasClose'
// import listAlertHeader from './alert/listAlertHeader'
import splitPane from './splitPane'
import localSearchInput from './localSearchInput'
import selectInput from './selectInput'
import zInput from './zInput'
import Formula from '@/components/formula/formula'
import TableHeadFilter from '@/components/tableHeadFilter'
import RemarkInTable from '@/components/remarkInTable'
import StatusInTable from '@/components/statusInTable'
import sTree from '@/components/stree'
import TableHeadSort from '@/components/tableHeadSort'
import tipModal from './tipModal'
import xInput from '@/components/xInput'
let components = [
  isvg,
  titleHasSlotSmall,
  titleHasSlot,
  // tagSelector,
  searchInput,
  searchTree,
  searchTable,
  prepareTable,
  zBaseInfoTable,
  qtable,
  selfTab,
  affirmDelModal,
  warningModal,
  imageLoad,
  customTransfer,
  dateComponent,
  ZButton,
  ZButtonHasBg,
  alertHeader,
  alertHeaderForModal,
  alertHeaderHasClose,
  // listAlertHeader,
  splitPane,
  localSearchInput,
  selectInput,
  zInput,
  Formula,
  TableHeadFilter,
  RemarkInTable,
  StatusInTable,
  sTree,
  TableHeadSort,
  tipModal,
  xInput,
]

components.forEach((com) => {
  Vue.component(com.name, com)
})


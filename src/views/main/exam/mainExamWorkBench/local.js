/**
 * Created by Admin on 2018/3/7/007.
 */
// const projectGetBasic = () => {
//
// }
const deptsGet = new window['Function']('id', `
  let data = {
    '243': {
      'id': 243,
      'pe_sn': '1804010126',
      'customer_id': 414,
      'is_print_health_card': 0,
      'print_guide_list_time': null,
      'package_name': '',
      'package_id': 12,
      'appt_time': 15124151,
      'pe_type': 2,
      'is_recheck': 0,
      'is_lock': 0,
      'lock_time': 0,
      'lock_staff_id': 0,
      'is_outside_check': 0,
      'is_print_report': 0,
      'operater': '李四',
      'created_at': '1515460093',
      'updated_at': '1517906397',
      'status': 4,
      'unit_id': null,
      'subscription': 0,
      'settlement_type': null,
      'remark': '',
      'reject_reason': '写错了',
      'pe_group_item': [
        {
          'id': 1,
          'pe_id': 243,
          'order_id': 931,
          'group_item_id': 2,
          'pe_dept_id': 1,
          'price': 4334.3400000000001,
          'is_suggest_reexam': 0,
          'is_reexam': 0,
          'desc': '吱吱吱吱追踪1',
          'operater': '李四',
          'created_at': '1514959708',
          'updated_at': '1517800303',
          'status': 1,
          'group_item_name': '组合项目4',
          'abandon_reason': '',
          'is_unit': 0,
          'is_abandon': 0,
          'is_special': null,
          'pe_item': [
            {
              'id': 1,
              'pe_group_item_id': 1,
              'item_id': 9,
              'examine_saw': '12.6',
              'examine_result': '多了11',
              'is_positive': 1,
              'image_pic': ['/static/images/public/heartbit.jpg', '/static/images/public/heartbit.jpg', '/static/images/public/heartbit.jpg'],
              'operater': '李四',
              'created_at': '1517800303',
              'updated_at': '1517800303',
              'status': 1,
              'item_name': '吞吞吐吐拖拖沓沓天',
              'item': {
                'id': 9,
                'name': 'dddddddd',
                'sex': 0,
                'res_type': 1,
                'type_id': 36,
                'created_at': null,
                'updated_at': '1518142154',
                'status': 1,
                'operater': '李四',
                'code': null,
                'default_res_id': 319,
                'pinyin_code': null,
                'wubi_code': null,
                'remark': 'fds',
                'report_name': 'j3333',
                'is_show_name': 1,
                'brief_summary': 2,
                'is_positive': null,
                'sort': 21,
                'en_abbr': 'fgd',
                'displayed_rows': 45,
                'min_val': null,
                'max_val': null,
                'low_limit_man': null,
                'upper_limit_man': null,
                'low_limit_woman': null,
                'upper_limit_woman': null,
                'unit': null,
                'low_side': 1,
                'high_side': 1,
                'reference_rule': {
                  'left': null,
                  'right': null
                },
                'is_has_summary': 1
              }
            }
          ],
          'pedept': {
            'id': 1,
            'pe_id': 243,
            'dept_id': 1,
            'dept_name': '1',
            'examine_staff_id': 1,
            'impress': '1',
            'operater': '1',
            'created_at': '1',
            'updated_at': '1',
            'status': 2,
            'pe_dept_cnclsn': [
              {
                'id': 1,
                'pe_dept_id': 1,
                'disease_id': 1,
                'disease_name': null,
                'pe_group_item_id': 1,
                'advice': '1',
                'is_update': 1,
                'operater': '1',
                'created_at': '1',
                'updated_at': '1',
                'status': 1
              }
            ],
            'staff': {
              'id': 1,
              'username': 'admin',
              'created_at': null,
              'updated_at': '1513318069',
              'staff_type_id': 0,
              'idcard': null,
              'mobile': '13545698745',
              'realname': '管理员',
              'status': 1,
              'operater': '4',
              'code': '',
              'sex': 1,
              'pinyin_code': null,
              'wubi_code': null,
              'sign': '/picture/staff/sign/0OhjJl9Tzadj24fMlVd4clBdLzjEdMaleYWfp7Rc.jpeg',
              'sort': 30
            }
          },
          'group_item': {
            'id': 2,
            'name': '从事多年',
            'price': '120.00',
            'item_type_id': 1,
            'sex': 0,
            'summary_type': 1,
            'remark': '',
            'charge_category_id': 1,
            'default_summary': '',
            'dept_id': 1,
            'operater': '4',
            'created_at': '1514884704',
            'updated_at': '1517389182',
            'status': 1,
            'code': null,
            'pinyin_code': null,
            'wubi_code': null,
            'is_abn': 1,
            'guide_content': '1',
            'is_sample_code': 1,
            'is_blood': 1,
            'default_content': null,
            'sample_type': 282,
            'sample_num': 1,
            'is_before_eat': 0,
            'unit_price': '0.00',
            'surcharge_price': null,
            'vip_price': null,
            'sort': 2,
            'report_name': '!csdn',
            'abn_summary_mode': null,
            'guide_name': '',
            'is_has_img': 0,
            'exam_time': null,
            'expression_type': 1,
            'expression_content': '2313/32*7+3-[4]',
            'expression_status': null,
            'is_special': 0
          }
        }
      ]
    },
  }
  return new Promise((resolve) => {
    resolve(data[id])
  })
`)
const diagnoseInfo = new window['Function']('pe_id', `
  let data = {
    '243': {
      'main_examine': [
        {
          'id': 4,
          'pe_id': 243,
          'examine_staff_id': 4,
          'doctor_order': '3',
          'advice': '324234',
          'cnclsn': '3242342',
          'reexam_ids': [
            '组合项目4',
            '组合项目7',
            '后前位X射线高千伏胸片'
          ],
          'operater': '李四',
          'created_at': '1517295836',
          'updated_at': '1517906421',
          'status': 0
        },
      ],
      'clinical_diagnosi': [
        {
          'id': 48,
          'pe_id': 243,
          'diagnosi_type': 1,
          'disease_id': 192,
          'disease_name': '低血压',
          'disease_source': null,
          'advice': null,
          'operater': '4',
          'created_at': '1517295767',
          'updated_at': '1517295767',
          'status': 1
        },
        {
          'id': 49,
          'pe_id': 243,
          'diagnosi_type': 2,
          'disease_id': 191,
          'disease_name': '高血压',
          'disease_source': null,
          'advice': '少吃肥肉',
          'operater': '4',
          'created_at': '1517295767',
          'updated_at': '1517295767',
          'status': 1
        },
        {
          'id': 50,
          'pe_id': 243,
          'diagnosi_type': 3,
          'disease_id': 190,
          'disease_name': '糖尿病',
          'disease_source': null,
          'advice': null,
          'operater': '4',
          'created_at': '1517295767',
          'updated_at': '1517295767',
          'status': 1
        },
        {
          'id': 51,
          'pe_id': 243,
          'diagnosi_type': 1,
          'disease_id': 192,
          'disease_name': '低血压',
          'disease_source': null,
          'advice': null,
          'operater': '4',
          'created_at': '1517295836',
          'updated_at': '1517295836',
          'status': 1
        },
        {
          'id': 52,
          'pe_id': 243,
          'diagnosi_type': 2,
          'disease_id': 191,
          'disease_name': '高血压',
          'disease_source': null,
          'advice': null,
          'operater': '4',
          'created_at': '1517295836',
          'updated_at': '1517295836',
          'status': 1
        },
        {
          'id': 53,
          'pe_id': 243,
          'diagnosi_type': 3,
          'disease_id': 190,
          'disease_name': '糖尿病',
          'disease_source': null,
          'advice': null,
          'operater': '4',
          'created_at': '1517295836',
          'updated_at': '1517295836',
          'status': 1
        },
      ],
    },
  }
  return new Promise((resolve) => {
    resolve(data[pe_id])
  })
`)
// const sourceInfo = () => {
//
// }
const getDiseaseTypes = new window['Function'](`
  let data = {
    'items': [
      {
        'id': 85,
        'name': 'hhhhhhhhhhhh',
        'operater': '李四',
        'created_at': '1519979315',
        'updated_at': '1519979315',
        'status': 0,
        'sort': 51,
        'remark': 'hhhhhhh'
      },
      {
        'id': 84,
        'name': 'y',
        'operater': '李四',
        'created_at': '1519979307',
        'updated_at': '1519979307',
        'status': 0,
        'sort': 50,
        'remark': null
      },
      {
        'id': 82,
        'name': '给嘎嘎嘎嘎嘎嘎过',
        'operater': '李四',
        'created_at': '1519701109',
        'updated_at': '1519701109',
        'status': 0,
        'sort': 54,
        'remark': '很高'
      },
      {
        'id': 81,
        'name': '热污染',
        'operater': '李四',
        'created_at': '1519694337',
        'updated_at': '1519701120',
        'status': 1,
        'sort': 55,
        'remark': '让温柔温柔'
      },
      {
        'id': 80,
        'name': 'dtb',
        'operater': '4',
        'created_at': '1517044896',
        'updated_at': '1517466898',
        'status': 0,
        'sort': 53,
        'remark': null
      },
      {
        'id': 79,
        'name': '犹太人',
        'operater': '4',
        'created_at': '1517044705',
        'updated_at': '1517044705',
        'status': 0,
        'sort': 52,
        'remark': '甜言软语'
      },
      {
        'id': 78,
        'name': '天天停停停停停停',
        'operater': '4',
        'created_at': '1517044556',
        'updated_at': '1517044556',
        'status': 0,
        'sort': 51,
        'remark': '滚滚滚滚滚哥哥哥哥哥哥'
      },
      {
        'id': 76,
        'name': '东方时代',
        'operater': '4',
        'created_at': '1517044067',
        'updated_at': '1517044067',
        'status': 0,
        'sort': 49,
        'remark': '发'
      },
      {
        'id': 74,
        'name': '特特特认同',
        'operater': '4',
        'created_at': '1517043991',
        'updated_at': '1517043991',
        'status': 0,
        'sort': 47,
        'remark': '规范'
      },
      {
        'id': 73,
        'name': '规范的的广告',
        'operater': '4',
        'created_at': '1517043979',
        'updated_at': '1517043979',
        'status': 0,
        'sort': 46,
        'remark': '广泛的'
      },
      {
        'id': 72,
        'name': '回复过后哈哈哈哈',
        'operater': '4',
        'created_at': '1517043685',
        'updated_at': '1517043685',
        'status': 1,
        'sort': 2,
        'remark': null
      },
      {
        'id': 71,
        'name': '回复过后',
        'operater': '4',
        'created_at': '1517043675',
        'updated_at': '1517043675',
        'status': 0,
        'sort': 1,
        'remark': '和规范化'
      },
      {
        'id': 69,
        'name': '老姐，救我3',
        'operater': '4',
        'created_at': '1516672058',
        'updated_at': '1516881726',
        'status': 1,
        'sort': 11,
        'remark': '不救不救1'
      },
      {
        'id': 68,
        'name': '老姐，救我',
        'operater': '4',
        'created_at': '1516672053',
        'updated_at': '1517226009',
        'status': 1,
        'sort': 1,
        'remark': '这是一个测试备注2222'
      },
      {
        'id': 67,
        'name': '好几个',
        'operater': '4',
        'created_at': '1514859173',
        'updated_at': '1515403493',
        'status': 1,
        'sort': 45,
        'remark': ''
      },
      {
        'id': 64,
        'name': '我的',
        'operater': '4',
        'created_at': '1514453961',
        'updated_at': '1516672058',
        'status': 1,
        'sort': 42,
        'remark': ''
      },
      {
        'id': 62,
        'name': '尔虞我诈',
        'operater': '4',
        'created_at': '1514453798',
        'updated_at': '1516672058',
        'status': 1,
        'sort': 40,
        'remark': ''
      },
      {
        'id': 61,
        'name': '我的递四方速递方式的',
        'operater': '4',
        'created_at': '1514453760',
        'updated_at': '1516672058',
        'status': 1,
        'sort': 39,
        'remark': ''
      },
      {
        'id': 56,
        'name': '王弟弟',
        'operater': '4',
        'created_at': '1514426438',
        'updated_at': '1516672058',
        'status': 1,
        'sort': 35,
        'remark': ''
      },
      {
        'id': 51,
        'name': '糖尿病',
        'operater': '4',
        'created_at': '1514356551',
        'updated_at': '1516672058',
        'status': 1,
        'sort': 34,
        'remark': ''
      },
    ],
    'meta': {
      'total': 51,
      'current_page': 1,
      'per_page': 20
    },
  }
  return new Promise((resolve) => {
    resolve(data)
  })
`)
const getDiseases = new window['Function'](`
  let data = {
    'items': [
      {
        'id': 192,
        'name': '低血压',
        'item_type_id': 278,
        'disease_type_id': 85,
        'std_disease_id': 5,
        'diagnose_info': 2,
        'is_common': 1,
        'is_add_history': 1,
        'ICD10_code': '',
        'advice': 'ddd',
        'operater': '李四',
        'created_at': '1519979681',
        'updated_at': '1519979681',
        'status': 1,
        'pinyin_code': null,
        'wubi_code': null,
        'is_std': 0,
        'sort': 126,
        'remark': 'dddd',
        'std_disease': {
          'id': 5,
          'name': '心肌梗塞'
        },
        'item_type': {
          'id': 278,
          'name': '发个好的风格化的规划'
        },
        'disease_type': {
          'id': 85,
          'name': 'hhhhhhhhhhhh'
        },
      },
      {
        'id': 191,
        'name': '高血压',
        'item_type_id': 259,
        'disease_type_id': 82,
        'std_disease_id': 5,
        'diagnose_info': null,
        'is_common': 0,
        'is_add_history': 0,
        'ICD10_code': '',
        'advice': null,
        'operater': '李四',
        'created_at': '1519890522',
        'updated_at': '1519890522',
        'status': 0,
        'pinyin_code': null,
        'wubi_code': null,
        'is_std': 0,
        'sort': 125,
        'remark': null,
        'std_disease': {
          'id': 5,
          'name': '心肌梗塞'
        },
        'item_type': {
          'id': 259,
          'name': '葡萄糖检测'
        },
        'disease_type': {
          'id': 82,
          'name': '给嘎嘎嘎嘎嘎嘎过'
        },
      },
      {
        'id': 190,
        'name': '糖尿病',
        'item_type_id': 37,
        'disease_type_id': 81,
        'std_disease_id': 5,
        'diagnose_info': 1,
        'is_common': 0,
        'is_add_history': 0,
        'ICD10_code': '',
        'advice': '天',
        'operater': '李四',
        'created_at': '1519723770',
        'updated_at': '1519723770',
        'status': 0,
        'pinyin_code': null,
        'wubi_code': null,
        'is_std': 0,
        'sort': 124,
        'remark': null,
        'std_disease': {
          'id': 5,
          'name': '心肌梗塞'
        },
        'item_type': {
          'id': 37,
          'name': 'h'
        },
        'disease_type': {
          'id': 81,
          'name': '热污染'
        },
      },
      {
        'id': 189,
        'name': 'SAD',
        'item_type_id': 34,
        'disease_type_id': 78,
        'std_disease_id': 5,
        'diagnose_info': 3,
        'is_common': 0,
        'is_add_history': 0,
        'ICD10_code': '',
        'advice': null,
        'operater': '李四',
        'created_at': '1519643324',
        'updated_at': '1519643324',
        'status': 0,
        'pinyin_code': null,
        'wubi_code': null,
        'is_std': 0,
        'sort': 123,
        'remark': null,
        'std_disease': {
          'id': 5,
          'name': '心肌梗塞'
        },
        'item_type': {
          'id': 34,
          'name': 'b'
        },
        'disease_type': {
          'id': 78,
          'name': '天天停停停停停停'
        },
      },
      {
        'id': 188,
        'name': 'f发发发发发发发',
        'item_type_id': 36,
        'disease_type_id': 78,
        'std_disease_id': 5,
        'diagnose_info': null,
        'is_common': 0,
        'is_add_history': 0,
        'ICD10_code': '',
        'advice': null,
        'operater': '李四',
        'created_at': '1519637937',
        'updated_at': '1519637937',
        'status': 0,
        'pinyin_code': null,
        'wubi_code': null,
        'is_std': 0,
        'sort': 122,
        'remark': null,
        'std_disease': {
          'id': 5,
          'name': '心肌梗塞'
        },
        'item_type': {
          'id': 36,
          'name': 's'
        },
        'disease_type': {
          'id': 78,
          'name': '天天停停停停停停'
        },
      },
      {
        'id': 187,
        'name': 't天天停停停停停停',
        'item_type_id': 36,
        'disease_type_id': 78,
        'std_disease_id': 5,
        'diagnose_info': null,
        'is_common': 0,
        'is_add_history': 0,
        'ICD10_code': '',
        'advice': null,
        'operater': '李四',
        'created_at': '1519633667',
        'updated_at': '1519633667',
        'status': 0,
        'pinyin_code': null,
        'wubi_code': null,
        'is_std': 0,
        'sort': 124,
        'remark': null,
        'std_disease': {
          'id': 5,
          'name': '心肌梗塞'
        },
        'item_type': {
          'id': 36,
          'name': 's'
        },
        'disease_type': {
          'id': 78,
          'name': '天天停停停停停停'
        },
      },
      {
        'id': 186,
        'name': '法法法法法',
        'item_type_id': 36,
        'disease_type_id': 79,
        'std_disease_id': 5,
        'diagnose_info': 2,
        'is_common': 1,
        'is_add_history': 1,
        'ICD10_code': '',
        'advice': '嘎嘎嘎嘎',
        'operater': '李四',
        'created_at': '1519633619',
        'updated_at': '1519633619',
        'status': 1,
        'pinyin_code': null,
        'wubi_code': null,
        'is_std': 0,
        'sort': 124,
        'remark': '反反复复',
        'std_disease': {
          'id': 5,
          'name': '心肌梗塞'
        },
        'item_type': {
          'id': 36,
          'name': 's'
        },
        'disease_type': {
          'id': 79,
          'name': '犹太人'
        },
      },
      {
        'id': 183,
        'name': '和',
        'item_type_id': 35,
        'disease_type_id': 79,
        'std_disease_id': 5,
        'diagnose_info': 2,
        'is_common': 1,
        'is_add_history': 1,
        'ICD10_code': '',
        'advice': '哈哈哈哈哈哈',
        'operater': '李四',
        'created_at': '1519617439',
        'updated_at': '1519633556',
        'status': 1,
        'pinyin_code': null,
        'wubi_code': null,
        'is_std': 0,
        'sort': 126,
        'remark': '滚滚滚滚滚',
        'std_disease': {
          'id': 5,
          'name': '心肌梗塞'
        },
        'item_type': {
          'id': 35,
          'name': '大私服大私服'
        },
        'disease_type': {
          'id': 79,
          'name': '犹太人'
        },
      },
      {
        'id': 180,
        'name': '天',
        'item_type_id': 37,
        'disease_type_id': 79,
        'std_disease_id': 5,
        'diagnose_info': 2,
        'is_common': 1,
        'is_add_history': 0,
        'ICD10_code': '',
        'advice': '哈哈哈',
        'operater': '李四',
        'created_at': '1518163634',
        'updated_at': '1518163634',
        'status': 1,
        'pinyin_code': null,
        'wubi_code': null,
        'is_std': 0,
        'sort': 125,
        'remark': '和规范化',
        'std_disease': {
          'id': 5,
          'name': '心肌梗塞'
        },
        'item_type': {
          'id': 37,
          'name': 'h'
        },
        'disease_type': {
          'id': 79,
          'name': '犹太人'
        },
      },
      {
        'id': 178,
        'name': '反反复反复反复反复反复V',
        'item_type_id': 36,
        'disease_type_id': 79,
        'std_disease_id': 5,
        'diagnose_info': null,
        'is_common': 0,
        'is_add_history': 0,
        'ICD10_code': '',
        'advice': null,
        'operater': '李四',
        'created_at': '1518162007',
        'updated_at': '1518162007',
        'status': 0,
        'pinyin_code': null,
        'wubi_code': null,
        'is_std': 0,
        'sort': 123,
        'remark': null,
        'std_disease': {
          'id': 5,
          'name': '心肌梗塞'
        },
        'item_type': {
          'id': 36,
          'name': 's'
        },
        'disease_type': {
          'id': 79,
          'name': '犹太人'
        },
      },
      {
        'id': 177,
        'name': '不抱抱抱抱抱抱抱抱抱抱吧',
        'item_type_id': 36,
        'disease_type_id': 79,
        'std_disease_id': 5,
        'diagnose_info': 1,
        'is_common': 0,
        'is_add_history': 0,
        'ICD10_code': '',
        'advice': '哈哈哈哈哈哈h',
        'operater': '李四',
        'created_at': '1518161951',
        'updated_at': '1518161951',
        'status': 0,
        'pinyin_code': null,
        'wubi_code': null,
        'is_std': 0,
        'sort': 122,
        'remark': '规范',
        'std_disease': {
          'id': 5,
          'name': '心肌梗塞'
        },
        'item_type': {
          'id': 36,
          'name': 's'
        },
        'disease_type': {
          'id': 79,
          'name': '犹太人'
        },
      },
      {
        'id': 174,
        'name': '快快快快快快',
        'item_type_id': 36,
        'disease_type_id': 79,
        'std_disease_id': 5,
        'diagnose_info': 1,
        'is_common': 1,
        'is_add_history': 1,
        'ICD10_code': '',
        'advice': '快快快快快快',
        'operater': '李四',
        'created_at': '1518141833',
        'updated_at': '1518141833',
        'status': 1,
        'pinyin_code': null,
        'wubi_code': null,
        'is_std': 0,
        'sort': 122,
        'remark': '看快快快快快快',
        'std_disease': {
          'id': 5,
          'name': '心肌梗塞'
        },
        'item_type': {
          'id': 36,
          'name': 's'
        },
        'disease_type': {
          'id': 79,
          'name': '犹太人'
        },
      },
      {
        'id': 173,
        'name': '嘎嘎嘎嘎',
        'item_type_id': 36,
        'disease_type_id': 80,
        'std_disease_id': 5,
        'diagnose_info': null,
        'is_common': 0,
        'is_add_history': 0,
        'ICD10_code': '',
        'advice': null,
        'operater': '李四',
        'created_at': '1518083915',
        'updated_at': '1518083915',
        'status': 0,
        'pinyin_code': null,
        'wubi_code': null,
        'is_std': 0,
        'sort': 121,
        'remark': null,
        'std_disease': {
          'id': 5,
          'name': '心肌梗塞'
        },
        'item_type': {
          'id': 36,
          'name': 's'
        },
        'disease_type': {
          'id': 80,
          'name': 'dtb'
        },
      },
      {
        'id': 172,
        'name': '炸了2',
        'item_type_id': 36,
        'disease_type_id': 2,
        'std_disease_id': 0,
        'diagnose_info': 0,
        'is_common': 0,
        'is_add_history': 0,
        'ICD10_code': '',
        'advice': '',
        'operater': '李四',
        'created_at': '1518083352',
        'updated_at': '1518083352',
        'status': 1,
        'pinyin_code': null,
        'wubi_code': null,
        'is_std': 0,
        'sort': 0,
        'remark': '',
        'std_disease': null,
        'item_type': {
          'id': 36,
          'name': 's'
        },
        'disease_type': {
          'id': 2,
          'name': '丧心病狂温柔温柔温柔'
        },
      },
      {
        'id': 167,
        'name': '急性心脏病',
        'item_type_id': 0,
        'disease_type_id': 64,
        'std_disease_id': 5,
        'diagnose_info': 0,
        'is_common': 0,
        'is_add_history': 0,
        'ICD10_code': '',
        'advice': '时代发生地方时代发生',
        'operater': '4',
        'created_at': '1515488996',
        'updated_at': '1516242363',
        'status': 1,
        'pinyin_code': null,
        'wubi_code': null,
        'is_std': 1,
        'sort': 122,
        'remark': '',
        'std_disease': {
          'id': 5,
          'name': '心肌梗塞'
        },
        'item_type': null,
        'disease_type': {
          'id': 64,
          'name': '我的'
        },
      },
      {
        'id': 166,
        'name': '234234234234234234232342abcccc',
        'item_type_id': 0,
        'disease_type_id': 67,
        'std_disease_id': 71,
        'diagnose_info': 0,
        'is_common': 0,
        'is_add_history': 0,
        'ICD10_code': '',
        'advice': null,
        'operater': '4',
        'created_at': '1515054296',
        'updated_at': '1516242363',
        'status': 1,
        'pinyin_code': null,
        'wubi_code': null,
        'is_std': 1,
        'sort': 121,
        'remark': '',
        'std_disease': {
          'id': 71,
          'name': '时代发生的'
        },
        'item_type': null,
        'disease_type': {
          'id': 67,
          'name': '好几个'
        },
      },
      {
        'id': 165,
        'name': '234234234234',
        'item_type_id': 0,
        'disease_type_id': 67,
        'std_disease_id': 68,
        'diagnose_info': 0,
        'is_common': 0,
        'is_add_history': 0,
        'ICD10_code': '',
        'advice': null,
        'operater': '4',
        'created_at': '1515054289',
        'updated_at': '1516242363',
        'status': 1,
        'pinyin_code': null,
        'wubi_code': null,
        'is_std': 1,
        'sort': 120,
        'remark': '',
        'std_disease': {
          'id': 68,
          'name': '管理；很干净；好和进口环节'
        },
        'item_type': null,
        'disease_type': {
          'id': 67,
          'name': '好几个'
        },
      },
      {
        'id': 162,
        'name': '435345让3',
        'item_type_id': 0,
        'disease_type_id': 67,
        'std_disease_id': 65,
        'diagnose_info': 0,
        'is_common': 0,
        'is_add_history': 0,
        'ICD10_code': '',
        'advice': null,
        'operater': '4',
        'created_at': '1515054274',
        'updated_at': '1515054274',
        'status': 1,
        'pinyin_code': null,
        'wubi_code': null,
        'is_std': 0,
        'sort': 117,
        'remark': '',
        'std_disease': {
          'id': 65,
          'name': '的风格空间克隆的发过来'
        },
        'item_type': null,
        'disease_type': {
          'id': 67,
          'name': '好几个'
        },
      },
      {
        'id': 161,
        'name': '1342345423',
        'item_type_id': 0,
        'disease_type_id': 67,
        'std_disease_id': 65,
        'diagnose_info': 0,
        'is_common': 0,
        'is_add_history': 0,
        'ICD10_code': '',
        'advice': null,
        'operater': '4',
        'created_at': '1515054267',
        'updated_at': '1515054267',
        'status': 1,
        'pinyin_code': null,
        'wubi_code': null,
        'is_std': 0,
        'sort': 116,
        'remark': '',
        'std_disease': {
          'id': 65,
          'name': '的风格空间克隆的发过来'
        },
        'item_type': null,
        'disease_type': {
          'id': 67,
          'name': '好几个'
        },
      },
      {
        'id': 160,
        'name': '12312342',
        'item_type_id': 35,
        'disease_type_id': 67,
        'std_disease_id': 65,
        'diagnose_info': 0,
        'is_common': 0,
        'is_add_history': 0,
        'ICD10_code': '',
        'advice': null,
        'operater': '李四',
        'created_at': '1515054262',
        'updated_at': '1518142707',
        'status': 1,
        'pinyin_code': null,
        'wubi_code': null,
        'is_std': 0,
        'sort': 115,
        'remark': null,
        'std_disease': {
          'id': 65,
          'name': '的风格空间克隆的发过来'
        },
        'item_type': {
          'id': 35,
          'name': '大私服大私服'
        },
        'disease_type': {
          'id': 67,
          'name': '好几个'
        },
      },
    ],
    'meta': {
      'total': 126,
      'current_page': 1,
      'per_page': 20
    },
  }
  return new Promise((resolve) => {
    resolve(data)
  })
`)
// const getProjectCategoryList = () => {
//
// }
const basicInformationGet = new window['Function']('param', `
  let data = {
    '10': {
      'id': 10,
      'personal_code': '1006',
      'area_code': '028',
      'identity_type': 1,
      'identity_num': '65535222123',
      'realname': '亦如黎明中的花3',
      'blood_group': 1,
      'edu_level': 1,
      'age': 1,
      'mobile': '13880809999',
      'sex': 2,
      'marital_status': 4,
      'contact_name': '三 我',
      'contact_mobile': '13880809999',
      'provider_payments': [
        1,
        2,
        4
      ],
      'medicare_num': '11',
      'medical_card_number': '22',
      'agr_card_num': '333',
      'remark': '所谓达娃大无畏达瓦齐尔',
      'operater': '李四',
      'created_at': '1518059838',
      'updated_at': '1519987901',
      'status': 1,
      'ha_organ': '',
      'ha_create_man': '',
      'ha_create_dates': 0,
      'medical_hist': [
        {
          'id': 19,
          'ha_id': 10,
          'operater': '李四',
          'created_at': '1518321119',
          'updated_at': '1519960201',
          'status': 1,
          'type': 1,
          'type_status': 1,
          'value': [
            {
              'date': 1520524800,
              'name': '其他',
              'remark': '11'
            },
          ],
        },
        {
          'id': 20,
          'ha_id': 10,
          'operater': '李四',
          'created_at': '1518328341',
          'updated_at': '1520213662',
          'status': 1,
          'type': 2,
          'type_status': 1,
          'value': [
            {
              'date': 1521734400,
              'name': '你是真的皮啊',
              'remark': null,
              'type_id': 10
            },
            {
              'date': 1520524800,
              'name': '你好啊啊啊啊2',
              'remark': null,
              'type_id': 1
            },
            {
              'date': null,
              'name': null,
              'remark': null
            },
          ],
        },
        {
          'id': 21,
          'ha_id': 10,
          'operater': '李四',
          'created_at': '1519465239',
          'updated_at': '1519957899',
          'status': 1,
          'type': 5,
          'type_status': 1,
          'value': [
            {
              'date': 1481126400,
              'name': '2',
              'remark': null
            },
            {
              'date': 1520438400,
              'name': '45',
              'remark': null
            },
          ],
        },
        {
          'id': 22,
          'ha_id': 10,
          'operater': '李四',
          'created_at': '1519465354',
          'updated_at': '1519868340',
          'status': 1,
          'type': 3,
          'type_status': 1,
          'value': [
            {
              'date': 1518710400,
              'name': '2',
              'remark': null
            },
          ],
        },
        {
          'id': 23,
          'ha_id': 10,
          'operater': '李四',
          'created_at': '1519465430',
          'updated_at': '1519957846',
          'status': 1,
          'type': 4,
          'type_status': 1,
          'value': [
            {
              'date': 1521216000,
              'name': '3',
              'remark': null
            },
            {
              'date': 1520006400,
              'name': '231232211',
              'remark': null
            },
            {
              'date': 1518019200,
              'name': '大师的撒',
              'remark': null
            },
          ],
        },
      ],
    },
  }
  return new Promise((resolve) => {
    resolve(data[param.id])
  })
`)

export default {
  deptsGet,
  diagnoseInfo,
  getDiseaseTypes,
  getDiseases,
  basicInformationGet,
}

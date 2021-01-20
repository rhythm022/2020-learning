Ext.onReady(() => {
  Ext.create('Ext.data.Store', {
    storeId: 'simpsonsStore',
    fields: ['lname', 'lastweek', 'rate', 'pre'],
    data: {
      'items':
          [
            {
              'isEmerPlan': 0,
              'lname': '综合指数',
              'lcode': 'CT0',

              'rate': '3207.85',
              'pre': '909.57',
              'lastweek': '142.8%',

              //--新增了单位以及权重字段
              'rateUnit': '点',
              'weight': '1',

            },
            {
              'lname': '中东湾拉斯坦努拉—中国宁波',
              'tdwt': '270000',
              'ShipTypeName': 'VLCC',
              'lcode': 'CT1',

              //--标准
              'bztceUnit': '美元/天（标准航速）',
              'bztce': '201031',
              'bztcepre': '66475',
              'bzlastweek': '279.2%',

              //--经济
              'jjtceUnit': '美元/天（经济航速）',
              'jjtce': '166959',
              'jjtcepre': '54147',
              'jjlastweek': '247.1%',

              //--ws
              'wsUnit': 'WS',
              'wsfreight': '38.33',
              'wspre': '11.17',
              'wslastweek': '153.8%',

              //--运价
              'rateUnit': '美元/吨',
              'rate': '205.77',
              'pre': '60.00',
              'lastweek': '153.8%',

              // --分航线指数
              'subIndexUnit': '点',
              'weight': '0.6',
              'subIndex': '123',
              'subIndexPre': '-5',
              'subIndexLastWeek': '-5%',

            },
            {
              'lname': '西非马隆格/杰诺—中国宁波',
              'tdwt': '270000',
              'ShipTypeName': 'VLCC',
              'lcode': 'CT2',

              // --标准
              'bztceUnit': '美元/天（标准航速）',
              'bztce': '201031',
              'bztcepre': '66475',
              'bzlastweek': '279.2%',

              //--经济
              'jjtceUnit': '美元/天（经济航速）',
              'jjtce': '166959',
              'jjtcepre': '54147',
              'jjlastweek': '247.1%',

              // --ws
              'wsUnit': 'WS',
              'wsfreight': '38.33',
              'wspre': '11.17',
              'wslastweek': '153.8%',

              //--运价
              'rateUnit': '美元/吨',
              'rate': '205.77',
              'pre': '60.00',
              'lastweek': '153.8%',

              //--新增的分航线指数
              'subIndexUnit': '点',
              'weight': '0.6',
              'subIndex': '123',
              'subIndexPre': '-5',
              'subIndexLastWeek': '-5%',

            },
            {
              'lname': '俄罗斯科兹米诺—中国青岛',
              'tdwt': '100000',
              'ShipTypeName': '阿芙拉',
              'lcode': 'CT3',

              //--新增的分航线指数
              'subIndexUnit': '点',
              'weight': '0',
              'subIndex': '123',
              'subIndexPre': '-5',
              'subIndexLastWeek': '-5%',

              //--运价
              'rateUnit': '万美元',
              'rate': '88.54',
              'pre': '7.79',
              'lastweek': '50.6%',

            },
          ],
    },
    proxy: {
      type: 'memory',
      reader: {
        type: 'json',
        root: 'items',
      },
    },
  });
























  
  Ext.define('Freightindex.view.win.CTFIIndexGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'WINCTFIIndexGrid',
    loadMask:{msg:"数据加载中，请稍等..."},
    trackMouseOver:false,
    store: Ext.data.StoreManager.lookup('simpsonsStore'),
    initComponent: function() {
      Ext.apply(this, {
        columns: [
          {header: 'lname', dataIndex: 'lname', sortable: false, hideable: false},
          {
            header: 'lastweek',
            dataIndex: 'lastweek',
            flex: 1,
            sortable: false,
            hideable: false,
          },
          {header: 'rate', dataIndex: 'rate', sortable: false, hideable: false},
          {header: 'pre', dataIndex: 'pre', sortable: false, hideable: false},
        ],
        viewConfig: {
          getRowClass: function(record, rowIndex, rowParams, store) {
            return 'grid-row-mine';
          },
        },
        renderTo: Ext.getBody(),
        listeners:{
          afterLayout:function(a) {
            mergeGrid(a,[])
          }
        },

      });
      this.callParent(arguments);
    },

  });


  Ext.create('Freightindex.view.win.CTFIIndexGrid');
});































/**
 * 合并Grid的数据列
 * @param grid {Ext.Grid.Panel} 需要合并的Grid
 * @param colIndexArray {Array} 需要合并列的Index(序号)数组；从0开始计数，序号也包含。
 * @param isAllSome {Boolean} 是否2个tr的colIndexArray必须完成一样才能进行合并。true：完成一样；false：不完全一样
 */
function mergeGrid(grid, colIndexArray) {

  // 1.是否含有数据
  var gridView = document.getElementById(grid.getView().getId());
  if (gridView == null) {
    return;
  }

  // 2.获取Grid的所有tr
  var trArray = gridView.getElementsByTagName('tr');

  if (!trArray.length) return;
  // 3.进行合并操作
  // 1)遍历列的序号数组
  for (var i = 0, colArrayLength = colIndexArray.length; i <
  colArrayLength; i++) {
    var colIndex = colIndexArray[i];
    var startTr = trArray[0]; // 合并tr，默认为第一行数据
    // 2)遍历grid的tr，从第二个数据行开始
    for (var j = 1; j < trArray.length; j++) {
      var currentTr = trArray[j];
      // 3)2个tr的td内容一样
      if (startTr.childNodes[colIndex].innerText ==
          currentTr.childNodes[colIndex].innerText) {

        if (startTr.childNodes[colIndex].hasAttribute('rowspan')) {
          var rowspan = Number(
              startTr.childNodes[colIndex].getAttribute('rowspan')) + 1;

          startTr.childNodes[colIndex].setAttribute('rowspan', rowspan);
        } else {
          startTr.childNodes[colIndex].setAttribute('rowspan', '2');
        }
        startTr.childNodes[colIndex].style['vertical-align'] = 'middle';// 纵向居中

        currentTr.childNodes[colIndex].style['display'] = 'none'; // 当前单元格隐藏

      } else {
        // 5)2个tr的td内容不一样
        startTr = currentTr;
      }
    }
  }
}

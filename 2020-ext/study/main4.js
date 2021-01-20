Ext.onReady(() => {
  Ext.define('win.CTFIIndexGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'WINCTFIIndexGrid',
    trackMouseOver: false,
    initComponent: function() {
      Ext.apply(this, {
        columns: [],
        viewConfig: {
          getRowClass: function(record, rowIndex, rowParams, store) {
            return 'grid-row-mine';
          },
        },
        renderTo: Ext.getBody(),
        listeners: {
          afterLayout: function(a) {
            mergeGrid(a, [0,1,2,4]);
          },
        },

      });
      this.callParent(arguments);
    },

  });
  var grid = Ext.create('win.CTFIIndexGrid');

  Ext.Ajax.request({
    url: 'http://localhost:3002/building/getCTFIIndex',
    method: 'GET',
    scope: this,
    success: function(response) {
      var CTFIIndex = Ext.JSON.decode(response.responseText);
      console.log(CTFIIndex);
      var CT0 = CTFIIndex[0];

      var CT1 = CTFIIndex[1];
      var CT1Row = [
        {
          lname: CT1.lname,
          tdwt: CT1.tdwt,
          shipTypeName: CT1.ShipTypeName,
          // --分航线指数
          unit: CT1.subIndexUnit,
          weight: CT1.weight,
          current: CT1.subIndex,
          pre: CT1.subIndexPre,
          lastWeek: CT1.subIndexLastWeek,
        },
        {
          lname: CT1.lname,
          tdwt: CT1.tdwt,
          shipTypeName: CT1.ShipTypeName,
          //--ws
          unit: CT1.wsUnit,
          current: CT1.wsfreight,
          pre: CT1.wspre,
          lastWeek: CT1.wslastweek,
        },
        {
          lname: CT1.lname,
          tdwt: CT1.tdwt,
          shipTypeName: CT1.ShipTypeName,
          //--运价
          unit: CT1.rateUnit,
          current: CT1.rate,
          pre: CT1.pre,
          lastWeek: CT1.lastweek,
        },
        {
          lname: CT1.lname,
          tdwt: CT1.tdwt,
          shipTypeName: CT1.ShipTypeName,
//--标准
          unit: CT1.bztceUnit,
          current: CT1.bztce,
          pre: CT1.bztcepre,
          lastWeek: CT1.bzlastweek,
        },
        {
          lname: CT1.lname,
          tdwt: CT1.tdwt,
          shipTypeName: CT1.ShipTypeName,
          //--经济
          unit: CT1.jjtceUnit,
          current: CT1.jjtce,
          pre: CT1.jjtcepre,
          lastWeek: CT1.jjlastweek,
        },
      ];

      var CT2 = CTFIIndex[2];
      var CT2Row = [
        {
          lname: CT2.lname,
          tdwt: CT2.tdwt,
          shipTypeName: CT2.ShipTypeName,
          // --分航线指数
          unit: CT2.subIndexUnit,
          weight: CT2.weight,
          current: CT2.subIndex,
          pre: CT2.subIndexPre,
          lastWeek: CT2.subIndexLastWeek,
        },
        {
          lname: CT2.lname,
          tdwt: CT2.tdwt,
          shipTypeName: CT2.ShipTypeName,
          //--ws
          unit: CT2.wsUnit,
          current: CT2.wsfreight,
          pre: CT2.wspre,
          lastWeek: CT2.wslastweek,
        },
        {
          lname: CT2.lname,
          tdwt: CT2.tdwt,
          shipTypeName: CT2.ShipTypeName,
          //--运价
          unit: CT2.rateUnit,
          current: CT2.rate,
          pre: CT2.pre,
          lastWeek: CT2.lastweek,
        },
        {
          lname: CT2.lname,
          tdwt: CT2.tdwt,
          shipTypeName: CT2.ShipTypeName,
//--标准
          unit: CT2.bztceUnit,
          current: CT2.bztce,
          pre: CT2.bztcepre,
          lastWeek: CT2.bzlastweek,
        },
        {
          lname: CT2.lname,
          tdwt: CT2.tdwt,
          shipTypeName: CT2.ShipTypeName,
          //--经济
          unit: CT2.jjtceUnit,
          current: CT2.jjtce,
          pre: CT2.jjtcepre,
          lastWeek: CT2.jjlastweek,
        },
      ];

      var CT3 = CTFIIndex[3];
      var CT3Row = [
        {
          lname: CT3.lname,
          tdwt: CT3.tdwt,
          shipTypeName: CT3.ShipTypeName,
          // --分航线指数
          unit: CT3.subIndexUnit,
          weight: CT3.weight,
          current: CT3.subIndex,
          pre: CT3.subIndexPre,
          lastWeek: CT3.subIndexLastWeek,
        },
        {
          lname: CT3.lname,
          tdwt: CT3.tdwt,
          shipTypeName: CT3.ShipTypeName,
          //--运价
          unit: CT3.rateUnit,
          current: CT3.rate,
          pre: CT3.pre,
          lastWeek: CT3.lastweek,
        }
      ];

      var store = Ext.create('Ext.data.Store', {
        fields: [
          {name: 'lname', type: 'string'},
          {name: 'tdwt', type: 'string'},
          {name: 'shipTypeName', type: 'string'},
          {name: 'unit', type: 'string'},
          {name: 'weight', type: 'string'},
          {name: 'current', type: 'string'},
          {name: 'pre', type: 'string'},
          {name: 'lastWeek', type: 'string'},
        ],
        data: CT1Row.concat(CT2Row).concat(CT3Row),
      });

      grid.reconfigure(store, [
        {
          header: '航线',
          dataIndex: 'lname',
          flex: 1,
          sortable: false,
          hideable: false,
        },
        {
          header: '载货量',
          dataIndex: 'tdwt',
          sortable: false,
          hideable: false,
        },
        {
          header: '船型',
          dataIndex: 'shipTypeName',
          sortable: false,
          hideable: false,
        },
        {header: '单位', dataIndex: 'unit',
          flex: 1,
          sortable: false, hideable: false},
        {
          header: '权重',
          dataIndex: 'weight',
          sortable: false,
          hideable: false,
        },
        {header: '本期', dataIndex: 'current', sortable: false, hideable: false},
        {header: '与上期比涨跌', dataIndex: 'pre', sortable: false, hideable: false},
        {
          header: '与上周比涨跌',
          dataIndex: 'lastWeek',
          sortable: false,
          hideable: false,
        },
      ]);
    },
  });
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

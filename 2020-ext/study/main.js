Ext.onReady(()=>{
  Ext.create('Ext.data.Store', {
    storeId:'simpsonsStore',
    fields:['name', 'email', 'phone'],
    data:{'items':[
        { 'name': 'Lisa',  "email":"lisa",  "phone":"555"  },
        { 'name': 'Lisa',  "email":"lisa2",  "phone":"555" },
        { 'name': 'Lisa', "email":"lisa2",  "phone":"5555"  },
        { 'name': 'Marge', "email":"marge@simpsons.com", "phone":"555-222-1254"  }
      ]},
    proxy: {
      type: 'memory',
      reader: {
        type: 'json',
        root: 'items'
      }
    }
  });

  var aP = Ext.create('Ext.grid.Panel', {
    title: 'Simpsons',
    store: Ext.data.StoreManager.lookup('simpsonsStore'),
    columns: [
      { header: 'Name',  dataIndex: 'name' },
      { header: 'Email', dataIndex: 'email', flex: 1 },
      { header: 'Phone', dataIndex: 'phone' }
    ],
    height: 200,
    width: 400,
    renderTo: Ext.getBody(),
    viewConfig: {
      getRowClass : function(record,rowIndex,rowParams,store){
        return 'grid-row-mine';

      }
    },
    listeners:{
      afterLayout:function(a) {
        console.log('afterLayout');
        mergeGrid(a,[0,1,2],false)
      }
    }
  });
})




/**
 * 合并Grid的数据列
 * @param grid {Ext.Grid.Panel} 需要合并的Grid
 * @param colIndexArray {Array} 需要合并列的Index(序号)数组；从0开始计数，序号也包含。
 * @param isAllSome {Boolean} 是否2个tr的colIndexArray必须完成一样才能进行合并。true：完成一样；false：不完全一样
 */
function mergeGrid(grid, colIndexArray, isAllSome) {
  isAllSome = isAllSome == undefined ? true : isAllSome; // 默认为true


  // 1.是否含有数据
  var gridView = document.getElementById(grid.getView().getId());
  if (gridView == null) {
    return;
  }

  // 2.获取Grid的所有tr
  var trArray = gridView.getElementsByTagName('tr');


  if(!trArray.length) return;
  // 3.进行合并操作
  // 1)遍历列的序号数组
  for (var i = 0, colArrayLength = colIndexArray.length; i < colArrayLength; i++) {
    var colIndex = colIndexArray[i];
    var startTr = trArray[0]; // 合并tr，默认为第一行数据
    // 2)遍历grid的tr，从第二个数据行开始
    for (var j = 1; j < trArray.length; j++) {
      var currentTr = trArray[j];
      // 3)2个tr的td内容一样
      if (startTr.childNodes[colIndex].innerText == currentTr.childNodes[colIndex].innerText) {

        if (i > 0 && currentTr.childNodes[colIndexArray[i - 1]].style.display != 'none') {
          startTr = currentTr;
          continue;
        } else {   // 5)符合条件合并td
          if (startTr.childNodes[colIndex].hasAttribute('rowspan')) {
            var rowspan = startTr.childNodes[colIndex].getAttribute('rowspan') -
                0;
            rowspan++;
            startTr.childNodes[colIndex].setAttribute('rowspan', rowspan);
          } else {
            startTr.childNodes[colIndex].setAttribute('rowspan', '2');
          }
          startTr.childNodes[colIndex].style['vertical-align'] = 'middle';// 纵向居中
          currentTr.childNodes[colIndex].style.display = 'none'; // 当前行隐藏}

        }



      } else {
        // 5)2个tr的td内容不一样
        startTr = currentTr;
      }
    }
  }
}

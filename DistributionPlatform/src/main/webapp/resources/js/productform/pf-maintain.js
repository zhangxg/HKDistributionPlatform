/** create a tree store* */
var treestore = Ext.create('Ext.data.TreeStore', {
	root : {
		children : [ {
			text : "基本信息",
			expanded : true,
			checked : false,
			children : [ {
				text : "姓名",
				id :'name',
				checked : false,
				leaf : true
			}, {
				text : "年龄",
				id :'age',
				checked : false,
				leaf : true
			} ]
		}, {
			text : "通讯方式",
			expanded : true,
			checked : false,
			children : [ {
				text : "电子邮件",
				id:'email',
				checked : false,
				leaf : true
			}, {
				text : "QQ号码",
				id:'qq',
				checked : false,
				leaf : true
			},{
				text : "手机号码",
				id :'telnumber',
				checked : false,
				leaf : true
			} ]
		} ]
	}
});
Ext.resetElement = Ext.getBody();
/**create a toolbar **/
var productPanel = Ext.create('Ext.panel.Panel', {
	region :'north',
	layout:'column',
	title: '',
	items: [{
        xtype: 'combobox',
        fieldLabel: '产品类型',
        width: 361,
        mode:'local',
        queryMode:'local',
        editable:false,
        id:'productType',
        name:'productType',
        displayField:'name',
        valueField:'value',
        store: Ext.create('Ext.data.Store', {
            fields:['name', 'value'],
            data:[
                {name:'弘康灵动一号保险理财计划', value:'product1'},
                {name:'弘康灵动二号保险理财计划', value:'product2'},
                {name:'弘康零极限B款保险理财计划 ', value:'product3'},
                {name:'弘康零极限C款保险理财计划 ', value:'product4'}
                
            ]
        })
    },{
    		xtype: 'button',
            width: 80,
            text: '保存',
            listeners: {
                click: {
                    fn: this.onButtonClick,
                    scope: this
                }
            }
       
    }]
});

function onButtonClick(button, e, eOpts) {
	
	var productType = Ext.getCmp('productType');
	var tree = Ext.getCmp('treePanel');
	var records = tree.getView().getChecked();
	names = [];
	Ext.Array.each(records,function(rec){
		if(rec.data.leaf){
			names.push(rec.get('id'));
		}
	});
	if(productType.value == null){
		 Ext.MessageBox.show({
	            msg: '请选择产品类型!'
	        });
	}else if (names.length == 0){
		Ext.MessageBox.show({
            msg: '请选择产品类型表单项！'
        });
	}else{
		Ext.Ajax.request({
		    url: '../pf/generate.action',
		    params: {
		        id: names,
		        pt :productType.value
		    },
		    success: function(response){
		        var text = response.responseText;
		        Ext.MessageBox.show({
		            msg: text
		        });
		    }
		});
	}
	
}
/** create a Tree panel* */

var treePanel = Ext.create('Ext.tree.Panel', {
	id : 'treePanel',
	title : '产品表单配置',
	region :'center',
	rootVisible : false,
	expanded : true,
	autoScroll : true,
	store : treestore
});

treePanel.on('checkchange', function(node, checked, eOpts) {
	node.cascadeBy(function(n) {
		n.set('checked', checked);
	});
}, null);

Ext.create('Ext.Viewport', {
	layout : 'border',
	items : [productPanel,treePanel ],
	renderTo : Ext.getBody()
});
Ext.Loader.setConfig({
    enabled : true
});

Ext.onReady(function() {

    Ext.tip.QuickTipManager.init();

    /*************站点列表代码(开始)**************************/
    /*
     * Site Model 全局
     */
    Ext.regModel('attrModel',{
        extend: 'Ext.data.Model',
        fields: ['name','type','options','required']
    });

    /*
     * Site Grid Store
     */
    var siteStore = Ext.create('Ext.data.JsonStore',{
        autoLoad:true,
        model: 'attrModel',
        proxy:{
            type:'ajax',
            url:'json/listAttr.action',
            reader: {
                type: 'json'
            }
        }
    });

    /*
     * Site Grid Object
     */
    var grid = Ext.create('Ext.grid.Panel', {
        id:'siteGrid',
        store: siteStore,
        columnLines:true,
        selModel: Ext.create('Ext.selection.CheckboxModel'),
        columns:[{
            header:'名称',dataIndex:'name', width:200
        }, {
            header:'类型',dataIndex:'type', width:200, renderer:dislayType
        }, {
            header:'选项',dataIndex:'options', flex:1
        }, {
            header:'是否必填',dataIndex:'required', flex:1, renderer:dislayRequired
        }],
        bbar: Ext.create('Ext.PagingToolbar', {displayInfo:true, emptyMsg:'没有记录', store:siteStore}),
        tbar:[{
            id:'addNew',
            text: '新增',
            iconCls:'icon-add',
            handler:function(){
                showAdd();
            }
        }, '-', {
            id:'edit',
            text:'编辑',
            iconCls:'icon-edit',
            handler:function() {
                var obj = grid.getSelectionModel().selected.items[0];
                showEdit(obj);
            }
        }, '-', {
            id:'del',
            text:'删除',
            iconCls:'icon-del',
            handler:function(){
            	
            	Ext.Msg.confirm("请确认", "确认要删除?", function(id){
            		if (id == "yes") {
            			var models = grid.getSelectionModel().selected.items;
                        var ids = '';
                        Ext.iterate(models, function(key, value) {
                            var tmp = key.data.name;
                            if(ids.length !=0) {
                                ids = ids + ',' + tmp;
                            } else {
                                ids = ids + tmp;
                            }
                        }, this);
                        Ext.Ajax.request({
                            url : '../pf/delete.action',
                            params : {
                                names : ids
                            },

                            success : function(response, option) {
                                Ext.Msg.alert('提示','删除成功');
                                grid.store.load();
                            },
                            failure : function() {
                                Ext.Msg.alert('提示','删除失败');
                            }
                        });
            		}
            	});
            }
        }]
    });
    
    /*
     * Tab页面的布局
     */
    Ext.create('Ext.Viewport', {
        layout : 'fit',
        items:[grid],
        renderTo : Ext.getBody()
    });
    
    function dislayType(val) {
        
    	switch(val)
    	{
    	case 1:
    		return '短文本';
    	  break;
    	case 2:
    		return '长文本';
    	  break;
    	case 3:
    		return '单选项';
    	  break;
    	case 4:
    		return '多选项';
    	  break;
    	case 5:
    		return '数值';
    	  break;
    	case 6:
    		return '日期';
    	  break;
    	default:
    	  return "未定义！";
    	}
    }
    
    
    function dislayRequired(val) {
        
    	switch(val)
    	{
    	case 'y':
    		return '是';
    	  break;
    	case 'n':
    		return '否';
    	  break;
    	default:
    	  return "未定义！";
    	}
    }
    /*************站点列表代码(结束)**************************/
    
    /*************站点新增/编辑代码(开始)*********************/
    var editForm = new Ext.form.FormPanel({
        
        id:'editForm',
        name:'editForm',
        labelAlign : 'right',
        labelWidth : 50,

        url:'../pf/save.action',

        layout: 'anchor',
        defaults: {
            anchor: '100%'
        },

        items:[{
            xtype:'textfield',
            id:'editType',
            name: 'editType',
            value:1,
            hidden:true
        }, {
            xtype:'textfield',
            fieldLabel:'名称:',
            id:'name',
            name:'name',
            allowBlank: false
        }, {
            xtype:'combo',
            mode:'local',
            queryMode:'local',
            editable:false,
            fieldLabel:'类型:',
            id:'type',
            name:'type',
            displayField:'name',
            valueField:'value',
            store: Ext.create('Ext.data.Store', {
                fields:['name', 'value'],
                data:[
                    {name:'短文本', value:1},
                    {name:'长文本', value:2},
                    {name:'单选项', value:3},
                    {name:'多选项', value:4},
                    {name:'数值', value:5},
                    {name:'日期', value:6}
                ]
            })
        }, {
            xtype:'textareafield',
            fieldLabel:'选择项:',
            id:'options',
            name:'options',
            allowBlank:true
        }, {
        	xtype      : 'fieldcontainer',
            fieldLabel : '是否必填',
            defaultType: 'radiofield',
            defaults: {
                flex: 1
            },
            layout: 'hbox',
            items: [
                {
                    boxLabel  : '是',
                    name      : 'required',
                    inputValue: 'y',
                    id        : 'radio1'
                }, {
                    boxLabel  : '否',
                    name      : 'required',
                    inputValue: 'n',
                    id        : 'radio2'
                }
            ]
        }],
        buttons:[{
            text: '保存',
            iconCls : 'icon-submit',
            handler: function() {
                var form = editForm.getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {
                            Ext.Msg.alert('提示','保存成功');
                            editWin.close();
                            grid.store.load();
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('提示','保存失败');
                        }
                    });
                }
            }
        }, {
            text: '关闭',
            iconCls : 'icon-cancel',
            handler: function() {
                editWin.close();
            }
        }]
    });
    
    var editWin = new Ext.Window({
        layout : 'fit',
        width : 400,
        title : '添加属性',
        height : 250,
        closeAction : 'hide',
        closable : false,

        items : [editForm]

    });
    
    function showEdit(data) {
        editForm.getForm().loadRecord(data);
        Ext.getCmp('editType').setValue(2);
        editWin.show();
    }
    
    function showAdd() {
        editForm.getForm().reset();
        editWin.show();
    }
    /*************站点新增/编辑代码(结束)*********************/
});
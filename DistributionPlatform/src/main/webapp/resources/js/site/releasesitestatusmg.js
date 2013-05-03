Ext.Loader.setConfig({
    enabled : true
});

Ext.onReady(function() {

    Ext.tip.QuickTipManager.init();

    /*************站点列表代码(开始)**************************/
    /*
     * Site Model 全局
     */
    Ext.regModel('siteModel',{
        extend: 'Ext.data.Model',
        fields: ['address','showType','targetURI']
    });

    /*
     * Site Grid Store
     */
    var siteStore = Ext.create('Ext.data.JsonStore',{
        autoLoad:true,
        model: 'siteModel',
        proxy:{
            type:'ajax',
            url:'json/list.action',
            reader: {
                type: 'json'
            }
        }
    });

    /*
     * Site Grid Object
     */
    var releasegrid = Ext.create('Ext.grid.Panel', {
        id:'releasesiteGrid',
        store: siteStore,
        columnLines:true,
        selModel: Ext.create('Ext.selection.CheckboxModel'),
        columns:[{
            header:'站点网址',dataIndex:'address', width:200
        }, {
            header:'展示方式',dataIndex:'showType', width:200, renderer:showTypeChange
        }, {
            header:'站点状态',dataIndex:'showType', width:200, renderer:showsiteType
        }, {
            header:'目标网站URI',dataIndex:'targetURI', flex:1
        }],
        bbar: Ext.create('Ext.PagingToolbar', {displayInfo:true, emptyMsg:'没有记录', store:siteStore}),
        tbar:[{
            id:'view',
            text: '预览效果',
            iconCls:'icon-add',
            handler:function(){
                showAdd();
            }
        }, '-',{
            id:'addNew',
            text: '终审通过',
            iconCls:'icon-submit',
            handler:function(){
                showAdd();
            }
        }, '-', {
            id:'edit',
            text:'终审取消',
            iconCls:'icon-cancel',
            handler:function() {
                var obj = releasegrid.getSelectionModel().selected.items[0];
                showEdit(obj);
            }
        }, '-', {
            id:'del',
            text:'退回修改',
            iconCls:'icon-edit',
            handler:function(){
                var models = releasegrid.getSelectionModel().selected.items;
                var ids = '';
                Ext.iterate(models, function(key, value) {
                    var tmp = key.data.address;
                    if(ids.length !=0) {
                        ids = ids + ',' + tmp;
                    } else {
                        ids = ids + tmp;
                    }
                }, this);
                Ext.Ajax.request({
                    url : '../site/delete.action',
                    params : {
                        address : ids
                    },

                    success : function(response, option) {
                        Ext.Msg.alert('提示','删除成功');
                        releasegrid.store.load();
                    },
                    failure : function() {
                        Ext.Msg.alert('提示','删除失败');
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
        items:[releasegrid],
        renderTo : Ext.getBody()
    });
    
    function showsiteType(val) {
        if(val == '1') {
            return '发布中';
        } else {
            return '暂停发布';
        }
    }
    function showTypeChange(val) {
        if(val == '1') {
            return '跳回官网产品简介';
        } else {
            return '在目标新网页打开';
        }
    }
    /*************站点列表代码(结束)**************************/
    
    /*************站点新增/编辑代码(开始)*********************/
    var editForm = new Ext.form.FormPanel({
        
        id:'editForm',
        name:'editForm',
        labelAlign : 'right',
        labelWidth : 50,

        url:'../site/save.action',

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
            fieldLabel:'站点网址:',
            id:'address',
            name:'address',
            allowBlank: false
        }, {
            xtype:'combo',
            mode:'local',
            queryMode:'local',
            editable:false,
            fieldLabel:'展示方式:',
            id:'showType',
            name:'showType',
            displayField:'name',
            valueField:'value',
            store: Ext.create('Ext.data.Store', {
                fields:['name', 'value'],
                data:[
                    {name:'跳回官网产品简介', value:1},
                    {name:'在目标新网页打开', value:2}
                ]
            })
        }, {
            xtype:'textareafield',
            fieldLabel:'目标网站URI:',
            id:'targetURI',
            name:'targetURI',
            allowBlank:true
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
                            releasegrid.store.load();
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
        title : '站点',
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
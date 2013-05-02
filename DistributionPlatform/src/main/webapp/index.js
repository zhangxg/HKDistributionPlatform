

Ext.onReady(function() {

    Ext.tip.QuickTipManager.init();

    var store = Ext.create('Ext.data.TreeStore', {
        proxy : {
            type: 'ajax',
            url : 'menu.json'
        }
    });

    var treePanel = Ext.create('Ext.tree.Panel', {
        id : 'tree-panel',
        title : '菜单',
        region : 'west',
        expanded : true,
        collapsible : true,
        split : true,
        width : '20%',
        minSize : 150,
        rootVisible : false,
        autoScroll : true,
        store : store,
        listeners : {
            itemclick : function(dw, record, element) {
                //Just click the leaf nodes, can add a new tab
                if(!record.get('leaf')){
                    return;
                }
                
                var flag=true;
                Ext.each(Ext.getCmp('mainPanel').items,function(item,index,allItems){
                    if(Ext.getCmp('mainPanel').items.get(index).id == record.get('id')){
                        flag=false;
                    }
                });
                if(!flag){
                    Ext.getCmp('mainPanel').items.get(record.get('id')).show();
                    return false;
                }
                Ext.getCmp('mainPanel').add({
                    id: record.get('id'),
                    title: record.get('text'),
                    closable: true,
                    html:'<iframe id="aaa" frameborder="0" noresize=\'noresize\' width="100%" height="100%" src=\''+record.get('qtitle')+'\'>'
                }).show();
            }
        }// /listeners
    });

    var mainPanel = Ext.create('Ext.tab.Panel', {
        id : 'mainPanel',
        region : 'center',
        layout : 'fit',
        items : [{
            id : 'welcome',
            title : 'Welcome',
            closable : true,
            html : '<h1>欢迎使用<h1/>'
        }]
    });

    Ext.create('Ext.Viewport', {
        id : 'viewPort',
        layout : 'border',
        title : 'Ext Layout Browser',
        items : [{
            xtype : 'panel',
            id : 'header',
            layout : 'border',
            region : 'north',
            height : 100,
            html:"<img src='resources/img/logo.jpg'/>"
        }, treePanel, mainPanel],
        renderTo : Ext.getBody()
    });
});
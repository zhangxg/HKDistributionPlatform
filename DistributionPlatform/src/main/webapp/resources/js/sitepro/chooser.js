/*
 * This example features a window with a DataView from which the user can select images to add to a <div> on the page.
 * To create the example we create simple subclasses of Window, DataView and Panel. When the user selects an image
 * we just add it to the page using the insertSelectedImage function below.
 * 
 * Our subclasses all sit under the Ext.chooser namespace so the first thing we do is tell Ext's class loader that it
 * can find those classes in this directory (InfoPanel.js, IconBrowser.js and Window.js). Then we just need to require
 * those files and pass in an onReady callback that will be called as soon as everything is loaded.
 */
Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.chooser', '../resources/js/sitepro');
Ext.Loader.setPath('Ext.ux', '../resources/extjs/examples/ux');

Ext.require([
    'Ext.button.Button',
    'Ext.data.proxy.Ajax',
    'Ext.chooser.InfoPanel',
    'Ext.chooser.IconBrowser',
    'Ext.chooser.Window',
    'Ext.ux.DataView.Animated',
    'Ext.toolbar.Spacer'
]);

Ext.onReady(function() {
    
    /*
     * Tab页面的布局
     */
    Ext.create('Ext.Viewport', {
        layout : {
            type:'border'
        },
        items:[{
            xtype: 'panel',
            region: 'north',
            height: 110,
            items: [{
                xtype: 'combobox',
                margin: 10,
                width: 339,
                fieldLabel: '站点:',
                editable: false,
                displayField:'name',
                valueField:'value',
                store: Ext.create('Ext.data.Store', {
                    fields:['name', 'value'],
                    data:[
                        {name:'www.163.com', value:'www.163.com'},
                        {name:'www.164.com', value:'www.164.com'}
                    ]
                }),
                listeners:{
                    "select":function(){
                    	site=this.value; 
                     }
                }
            },
            {
                xtype: 'combobox',
                margin: 10,
                width: 340,
                fieldLabel: '产品:',
                editable: false,
                displayField:'name',
                valueField:'value',
                store: Ext.create('Ext.data.Store', {
                    fields:['name', 'value'],
                    data:[
                        {name:'弘康灵动一号保险理财计划', value:'product1'},
                        {name:'弘康灵动二号保险理财计划', value:'product2'},
                        {name:'弘康零极限B款保险理财计划', value:'product3'},
                        {name:'弘康零极限C款保险理财计划', value:'product4'},
                        {name:'零极限Ｅ款保险理财计划', value:'product5'}
                    ]
                }),
                listeners:{
                    "select":function(){
                    	var i = 0;
                    	for (; i < products.length; i++) {
                    		if(products[i]==this.value){
                    			break;
                    		}
                        }
                    	products[i]=this.value;
                    	 //alert(this.value); 
                    	//alert(Ext.get("combo").dom.value);
                     }
                }
            },
            {
                xtype: 'button',
                margin: '0 0 0 250',
                text: '维护图片',
                handler: function() {
                    win.filter('type', this.up('panel').items.items[1].getValue());
                    win.show();
                }
            },
            {
                xtype: 'button',
                margin: '0 0 0 5',
                text: '保存',
                handler: function() {
                    aaa();
                }
            }]
        },
        {
            xtype: 'panel',
            id:'images',
            region: 'center',
            collapsible: true,
            autoScroll: true,
            title: '已选择图片'
        }],
        renderTo : Ext.getBody()
    })

    var products=[];
    var site;
    /*
     * Here is where we create the window from which the user can select images to insert into the 'images' div.
     * This window is a simple subclass of Ext.window.Window, and you can see its source code in Window.js.
     * All we do here is attach a listener for when the 'selected' event is fired - when this happens it means
     * the user has double clicked an image in the window so we call our insertSelectedImage function to add it
     * to the DOM (see below).
     */
    var win = Ext.create('Ext.chooser.Window', {
        id: 'img-chooser-dlg',
        listeners: {
            selected: insertSelectedImage
        }
    });
    
    function aaa(){
    	var imgids=[];
    	
    	for (var i = 0; i < Ext.getCmp('images').items.length; i++) {
    		
    		imgids[i]=Ext.getCmp('images').items.get(i).id;
        }
    	Ext.Ajax.request({
    		url: '../sitepro/savehtml.action',
    		params: {
    			id: imgids,
    			siteid:site,
    			pid:products
    		},
    		success: function(response){
    			var text = response.responseText;
    			Ext.MessageBox.show({
    				msg: text
    			});
    		}
    	});
    }
    
    /*
     * This function is called whenever the user double-clicks an image inside the window. It creates
     * a new <img> tag inside the 'images' div and immediately hides it. We then call the show() function
     * with a duration of 500ms to fade the image in. At the end we call .frame() to give a visual cue
     * to the user that the image has been inserted
     */
    function insertSelectedImage(image) {
    
        var ele = Ext.fly(image.get('thumb'));
        var imageEle = Ext.getCmp('images');
        
        if(!ele) {
        //create the new image tag
        var image = imageEle.add({
            xtype: 'image',
            margin: 5,
            id:image.get('thumb'),
            src: '../resources/img/product/' + image.get('thumb')
        });
        
        //hide it straight away then fade it in over 500ms, finally use the frame animation to give emphasis
        //image.hide().show({duration: 500}).frame();
        
        //this will make the window animate back to the newly inserted image element
        win.animateTarget = image;
        } else {
            for (var i = 0; i < imageEle.items.length; i++) {
                if(imageEle.items.get(i).id == image.get('thumb')){
                        imageEle.remove(imageEle.items.get(i));
                        break;
                }
            }
        }
    }
});
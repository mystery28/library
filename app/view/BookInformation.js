Ext.define('Library.view.BookInformation', {
    extend: 'Ext.window.Window',
    xtype: 'bookinfo',

    title: 'Book details',
    layout: 'fit',
    autoShow: true,

    initComponent: function() {
        this.items = [{
            xtype: 'form',
            bodyPadding: 5,
            items: [{
                xtype: 'textfield',
                name: 'title',
                fieldLabel: 'Title',
                emptyText: 'input title',
                allowBlank: false,
                width: 300
            },{
                xtype: 'combobox',
                name: 'publisher_id',
                store: 'PublisherStore',
                valueField: 'id',
                displayField: 'name',
                emptyText: 'select publisher',
                forceSelection: true,
                fieldLabel: 'Publisher'
            },{
                xtype: 'combobox',
                name: 'author_id',
                store: 'AuthorStore',
                valueField: 'id',
                displayField: 'name',
                emptyText: 'select author',
                forceSelection: true,
                fieldLabel: 'Author'
            },{
                xtype: 'combobox',
                name: 'technology_id',
                store: 'TechnologyStore',
                valueField: 'id',
                displayField: 'name',
                emptyText: 'select technology',
                forceSelection: true,
                multiSelect: true,
                fieldLabel: 'Technologies'
            },{
                xtype: 'textareafield',
                name: 'description',
                fieldLabel: 'Description',
                labelAlign: 'top',
                emptyText: 'input description',
                width: 300,
                height: 100
            },{
                xtype: 'form',
                layout: 'absolute',
                width: 300,
                height: 60,
                items: [{
                    xtype: 'textfield',
                    id: 'filetype',
                    name: 'file_type',
                    emptyText: 'Select a document to upload...',
                    x: 0,
                    y: 5,
                    width: 210
                },{
                    xtype: 'button',
                    text: 'upload',
                    action: 'uploadfile',
                    x: 220,
                    y: 5
                },{
                    xtype: 'filefield',
                    name: 'file',
                    buttonOnly: true,
                    buttonText: 'Browse',
                    action: 'selectfile',
                    x: 0,
                    y: 35
                }]
            }]
        }];
        this.buttons = [{
            text: 'Save',
            scope: this,
            action: 'save'
        },{
            text: 'Delete',
            scope: this,
            action: 'delete'
        },{
            text: 'close',
            scope: this,
            action: 'close'
        }];

        this.callParent(arguments);
    }
})
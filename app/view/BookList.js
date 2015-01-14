Ext.define('Library.view.BookList', {
    extend: 'Ext.grid.Panel',
    xtype: 'booklist',

    store: 'BookStore',

    columnLines: true,

    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'BookStore',
        dock: 'bottom',
        displayInfo: true,
        beforePageText: 'Page',
        afterPageText: 'of {0}',
        displayMsg: 'Books {0} - {1} of {2}'
    }],

    initComponent: function() {
        this.columns = [{
            header: 'Title',
            dataIndex: 'title',
            flex: 1
        },{
            header: 'Publisher',
            dataIndex: 'publisher_name',
            flex: 1
        },{
            header: 'Author',
            dataIndex: 'author_name',
            flex: 1
        },{
            header: 'Action',
            xtype: 'actioncolumn',
            align: 'center',
            width:70,
            items: [{
                iconCls: 'icon-information',
                tooltip: 'Information',
                handler: function(view, rowIndex, colIndex, item, e, record, row) {
                    this.up('grid').fireEvent('iteminfobuttonclick', view, rowIndex, colIndex, item, e, record, row);
                }
            },{
                iconCls: 'icon-download',
                tooltip: 'Download',
                handler: function(view, rowIndex, colIndex, item, e, record, row) {
                    this.up('grid').fireEvent('itemdwnlbuttonclick', view, rowIndex, colIndex, item, e, record, row);
                }
            },{
                iconCls: 'icon-delete',
                tooltip: 'Delete',
                handler: function(view, rowIndex, colIndex, item, e, record, row) {
                    this.up('grid').fireEvent('itemdeletebuttonclick', view, rowIndex, colIndex, item, e, record, row);
                }
            }]

        }];
        this.addStateEvents('iteminfobuttonclick', 'itemdwnlbuttonclick', 'itemdeletebuttonclick');

        this.callParent(arguments);
    }
});
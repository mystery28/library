Ext.define('Library.view.BookDetail', {
    extend: 'Ext.form.Panel',
    xtype: 'bookdetail',

    requires : [
        'Library.view.BookDetailViewModel'
    ],

    viewModel: {
        type: 'bookdetailform'
    },

    items: [{
        xtype: 'textareafield',
        bind: '{rec.description}',
        fieldLabel: 'Description',
        labelAlign: 'top',
        width: '100%',
        height: '100%'
    }]
});
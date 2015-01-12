Ext.define('Library.view.PublisherList', {
    extend: 'Ext.form.field.ComboBox',
    xtype: 'publisherlist',
    id: 'publisherlist',

    store: 'PublisherStore',
    valueField: 'id',
    displayField: 'name',
    emptyText: 'select publisher',
    forceSelection: true,
    queryMode: 'remote'
});
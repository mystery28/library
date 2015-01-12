Ext.define('Library.view.AuthorList', {
    extend: 'Ext.form.field.ComboBox',
    xtype: 'authorlist',
    id: 'authorlist',

    store: 'AuthorStore',
    valueField: 'id',
    displayField: 'name',
    emptyText: 'select author',
    forceSelection: true,
    queryMode: 'remote'
});
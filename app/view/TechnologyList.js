Ext.define('Library.view.TechnologyList', {
    extend: 'Ext.form.field.ComboBox',
    xtype: 'technologylist',
    id: 'technologylist',

    store: 'TechnologyStore',
    valueField: 'id',
    displayField: 'name',
    emptyText: 'select technology',
    forceSelection: true,
    multiSelect: true,
    queryMode: 'remote'
});
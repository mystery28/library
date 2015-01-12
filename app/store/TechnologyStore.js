Ext.define('Library.store.TechnologyStore', {
    extend: 'Ext.data.Store',

    requires: ['Library.model.Technology'],

    autoLoad: true,
    storeId: 'AuthorStore',
    model: 'Library.model.Technology',
    proxy: {
        type: 'ajax',
        url: 'app/data/technology.php',
        reader: {
            type: 'json',
            rootProperty: 'technology',
            successProperty: 'success'
        }
    }
});
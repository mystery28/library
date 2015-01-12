Ext.define('Library.store.PublisherStore', {
    extend: 'Ext.data.Store',

    requires: ['Library.model.Publisher'],

    autoLoad: true,
    storeId: 'PublisherStore',
    model: 'Library.model.Publisher',
    proxy: {
        type: 'ajax',
        url: 'app/data/publisher.php',
        reader: {
            type: 'json',
            rootProperty: 'publisher',
            successProperty: 'success'
        }
    }
});
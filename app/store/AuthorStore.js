Ext.define('Library.store.AuthorStore', {
    extend: 'Ext.data.Store',

    requires: ['Library.model.Author'],

    autoLoad: true,
    storeId: 'AuthorStore',
    model: 'Library.model.Author',
    proxy: {
        type: 'ajax',
        url: 'app/data/author.php',
        reader: {
            type: 'json',
            rootProperty: 'author',
            successProperty: 'success'
        }
    }
});
Ext.define('Library.store.BookStore', {
    extend: 'Ext.data.Store',

    requires: ['Library.model.Book'],

    autoLoad: true,
    remoteSort: true,
    pageSize: 4,
    storeId: 'BookStore',
    model: 'Library.model.Book',
    proxy: {
        type: 'ajax',
        url: 'app/data/books.php',
        reader: {
            type: 'json',
            rootProperty: 'books',
            totalProperty: 'results',
            successProperty: 'success'
        }
    }
});
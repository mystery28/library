Ext.define('Library.model.Book', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int'
    },{
        name: 'title',
        type: 'string'
    },{
        name: 'publisher_id',
        type: 'int'
    },{
        name: 'publisher_name',
        type: 'string'
    },{
        name: 'author_id',
        type: 'int'
    },{
        name: 'author_name',
        type: 'string'
    },{
        name: 'technolgy_id',
        type: 'int'
    },{
        name: 'description',
        type: 'string'
    },{
        name: 'file_type',
        type: 'string'
    }]
});
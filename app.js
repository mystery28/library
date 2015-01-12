Ext.application({
    requires: ['Ext.container.Viewport'],
    name: 'Library',

    appFolder: 'app',

    views: [
        'BookList',
        'BookInformation',
        'PublisherList',
        'AuthorList',
        'TechnologyList'
    ],
    controllers: [
        'Books'
    ],
    stores: [
        'BookStore',
        'PublisherStore',
        'AuthorStore',
        'TechnologyStore'
    ],

    launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout: 'ux.center',
            items: [{
                xtype: 'panel',
                width: 700,
                border: '1',
                items: [{
                    xtype: 'panel',
                    layout: 'absolute',
                    title: 'Books list',
                    width: '100%',
                    height: 120,
                    items: [{
                        xtype: 'textfield',
                        id: 'titleSearch',
                        emptyText: 'input title',
                        x: 10,
                        y: 10,
                        width: 250
                    },{
                        xtype: 'button',
                        text: 'search',
                        action: 'search',
                        x: 290,
                        y: 10,
                        width: 100
                    },{
                        xtype: 'publisherlist',
                        x: 10,
                        y: 50,
                        width: 200
                    },{
                        xtype: 'authorlist',
                        x: 240,
                        y: 50,
                        width: 200
                    },{
                        xtype: 'technologylist',
                        x: 480,
                        y: 50,
                        width: 200
                    }]
                },{
                    xtype: 'booklist',
                    width: '100%'
                }]
            }]
        });
    }
});

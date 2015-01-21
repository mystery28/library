Ext.define('Library.controller.Books', {
    extend: 'Ext.app.Controller',

    init: function() {
        this.control({
            'combo': {
                change: this.onComboSelect
            },
            'button[action=search]': {
                click: this.onComboSelect
            },
            'button[action=resetfilters]': {
                click: this.fnResetFilters
            },
            'button[action=addbutton]': {
                click: this.fnInsertBook
            },
            'booklist': {
                iteminfobuttonclick: this.fnInfo,
                itemdwnlbuttonclick: this.fnDwnl,
                itemdeletebuttonclick: this.fnDeleteBook,
                select: this.onGridSelect
            },
            'bookinfo filefield[action=selectfile]': {
                change: this.onSelectFile
            },
            'bookinfo button[action=uploadfile]': {
                click: this.onUploadFile
            },
            'bookinfo button[action=save]': {
                click: this.fnUpdateBook
            },
            'bookinfo button[action=close]': {
                click: this.closeWindow
            }

        });
    },
    onComboSelect: function(sel) {
        var id = sel.value,
            idPublisher = Ext.getCmp('publisherlist').value,
            idAuthor = Ext.getCmp('authorlist').value,
            idTechnology = Ext.getCmp('technologylist').value,
            titleSearch = Ext.getCmp('titleSearch').value,
            values = new Object();

        values.publisher = (idPublisher)? idPublisher: 0;
        values.author = (idAuthor)? idAuthor: 0;
        values.technology = idTechnology.toString();
        values.titleSearch = titleSearch;

        var store = Ext.widget('booklist').getStore();
        Ext.apply(store.getProxy().extraParams,values);
        store.reload();
    },
    fnResetFilters: function(button) {
        var values = new Object();

        Ext.getCmp('titleSearch').setValue('');
        Ext.getCmp('publisherlist').setValue('');
        Ext.getCmp('authorlist').setValue('');
        Ext.getCmp('technologylist').setValue('');

        values.publisher = 0;
        values.author = 0;
        values.technology = 0;
        values.titleSearch = '';

        var store = Ext.widget('booklist').getStore();
        Ext.apply(store.getProxy().extraParams,values);
        store.reload();
    },
    fnInfo: function(view, rowIndex, colIndex, item, e, record, row) {
        var v = Ext.widget('bookinfo');
        v.down('form').loadRecord(record);
    },
    fnDwnl: function(view, rowIndex, colIndex, item, e, record, row) {
        var rec = view.getStore().getAt(rowIndex),
            values = new Object();

        values.id = rec.get('id');
        Ext.Ajax.request({
            url: 'app/data/download_book.php',
            params: values,
            success: function(response, options){
                var data=Ext.decode(response.responseText);

                if(data.success){
                    var link = 'app/data/download_file.php',
                        params = (data.fileName) ? 'file=' + data.fileName : '';

                    if (params) {
                        document.location.href = link + '?' +params;
                    }
                    else {
                        Ext.Msg.alert('Warning','no file');
                    }
                }
            }
        });
    },
    onSelectFile: function(thiss, value, eOpts) {
        Ext.getCmp('filetype').setValue(value.replace(/C:\\fakepath\\/g, ''));
    },
    onGridSelect : function(grid, record, index, eOpts) {
        var detailView = Ext.ComponentQuery.query('bookdetail')[0];

        detailView.getViewModel().setData({rec: record});
    },
    onUploadFile: function(button) {
        var form = button.up('form').getForm();
        if (form.isValid()) {
            form.submit({
                url: 'app/data/upload_file.php',
                waitMsgTarget: 'Uploading your file...',
                success: function(form, action) {
                    Ext.Msg.alert('Success', 'file: "' + action.result.file + '" upload');
                }
            })
        }
    },
    fnInsertBook: function(button) {
        var v = Ext.widget('bookinfo');
        var modelBook = Ext.create('Library.model.Book',{id:'0'});

        v.down('form').loadRecord(modelBook);
    },
    fnUpdateBook: function(button) {
        var win = button.up('window'),
            form = win.down('form').getForm(),
            values = form.getValues(),
            urlPath = new String();

        values.technology_id = Ext.encode(values.technology_id);

        if (values.id == 0) urlPath = 'app/data/insert_book.php';
        if (values.id != 0) urlPath = 'app/data/update_book.php';

//        alert(Ext.encode(values));
        Ext.Ajax.request({
            url: urlPath,
            params: values,
            success: function(response, options){
                var data = Ext.decode(response.responseText);
                if(data.success){
                    var store = Ext.widget('booklist').getStore();
                    store.load();
//                    Ext.Msg.alert('Edit',data.message);
                }
                else{
                    Ext.Msg.alert('Edit','Edit book failed');
                }
            }
        });
        win.close();
    },
    fnDeleteBook: function(view, rowIndex, colIndex, item, e, record, row) {
        var rec = view.getStore().getAt(rowIndex),
            values = new Object();

        values.id = rec.get('id');
        Ext.Ajax.request({
            url: 'app/data/delete_book.php',
            params: values,
            success: function(response, options){
                var data = Ext.decode(response.responseText);
                if(data.success){
                    var store = Ext.widget('booklist').getStore();
                    store.load();
//                    Ext.Msg.alert('Delete',data.message);
                }
                else{
                    Ext.Msg.alert('Delete','Delete book failed');
                }
            }
        });
    },
    closeWindow: function(button) {
        var win = button.up('window');
        win.close();
    }
});
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
            'booklist': {
                iteminfobuttonclick: this.fnInfo,
                itemdwnlbuttonclick: this.fnDwnl
            },
            'bookinfo filefield[action=selectfile]': {
                change: this.onSelectFile
            },
            'bookinfo button[action=uploadfile]': {
                click: this.onUploadFile
            },
            'bookinfo button[action=save]': {
                click: this.updateData
            },
            'bookinfo button[action=delete]': {
                click: this.deleteData
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
//        alert(value);
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
    updateData: function(button) {
        var win = button.up('window'),
            form = win.down('form').getForm(),
            values = form.getValues(),
            id = form.getRecord().get('id');
        values.id = id;
        values.technology_id = Ext.encode(values.technology_id);
//        alert(Ext.encode(values));
        Ext.Ajax.request({
            url: 'app/data/update_book.php',
            params: values,
            success: function(response, options){
                var data=Ext.decode(response.responseText);
                if(data.success){
                    var store = Ext.widget('booklist').getStore();
                    store.load();
                    Ext.Msg.alert('Update',data.message);
                }
                else{
                    Ext.Msg.alert('Update','Update book failed');
                }
            }
        });
        win.close();
    },
    closeWindow: function(button) {
        var win = button.up('window');
        win.close();
    },
    deleteData: function(button) {
        var win = button.up('window'),
            form = win.down('form').getForm(),
            id = form.getRecord().get('id');
        Ext.Ajax.request({
            url: 'app/data/delete_book.php',
            params: {id:id},
            success: function(response, options){
                var data=Ext.decode(response.responseText);
                if(data.success){
                    var store = Ext.widget('booklist').getStore();
                    store.load();
                    Ext.Msg.alert('Delete',data.message);
                }
                else{
                    Ext.Msg.alert('Delete','Delete book failed');
                }
            }
        });
        win.close();
    }
});
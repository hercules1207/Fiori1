sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment"

], function(Controller, MessageToast , Fragment) {
    'use strict';
    return Controller.extend("sap.walkthrough.controller.HelloPanel", {
        onOpenDialog : function() {
            //create dialog lazily
            if(!this.pDialog){
                this.pDialog = this.loadFragment({
                    name : "sap.walkthrough.view.HelloDialog"
                });
            }
            this.pDialog.then(function(oDialog){
                oDialog.open();
            });
        },
        onShowHello : function () {
        //read msg from i18n model
        var oBundle = this.getView().getModel("i18n").getResourceBundle();
        var sRecipient = this.getView().getModel().getProperty("/recipient/name");
        var sMsg = oBundle.getText("helloMsg" , [sRecipient]);
        //show Message 
        MessageToast.show(sMsg);


       },
       onShowName : function() {
         //read msg from i18n model
         var oBundle2 = this.getView().getModel("i18n").getResourceBundle();
         var sRecipient2 = this.getView().getModel().getProperty("/recipient2/name");
         var sMsg2 = oBundle2.getText("nameMsg", [sRecipient2]);
         //show message
         MessageToast.show(sMsg2);
       },
       onCloseDialog : function (){
			// note: We don't need to chain to the pDialog promise, since this event-handler
			// is only called from within the loaded dialog itself.
            this.byId("helloDialog").close();        
       },
        // When user will click on 'Generate QR Code' button then this method will fire....
        handleGenerateQRCode: function () {
            var Arr = [];
            // Google Chart API....
            var baseURL = "http://chart.apis.google.com/chart?cht=qr&chs=250x250&chl=";
            var allString = "";
            // Arr.push({
            // key: "Product-Id",
            // value: "phan Nho Vuong"
            // });
            // allString = escape(JSON.stringify(Arr));

            //read msg from i18n model
            var sRecipient2 = this.getView().getModel().getProperty("/recipient2/name");            
            // var url = baseURL + allString;
             var url = baseURL + sRecipient2;
            // setting final URL to image,which I have taken in view....
            this.byId("imgId").setSrc(url);
        }   

    });    
});
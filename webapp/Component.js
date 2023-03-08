sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device"
], function(UIComponent, JSONModel , Device) {
    'use strict';
    
    return UIComponent.extend("sap.walkthrough.Component",{

      metadata : {
            interfaces: ["sap.ui.core.IAsyncContentCreation"],
            manifest: "json"
      },

        init: function () {
            //call the init function of the parent
            UIComponent.prototype.init.apply(this, arguments);
            //set data Model
            var oData  = {
                recipient : {
                    name : "World"
                },
                recipient2 :{
                    name : "Minh Tue"
                }                
            };
            var oModel = new JSONModel(oData);
            this.setModel(oModel);

			// set device model
			var oDeviceModel = new JSONModel(Device);
			oDeviceModel.setDefaultBindingMode("OneWay");
			this.setModel(oDeviceModel, "device");
                        
            //create the views based on the url/hash
            this.getRouter().initialize();

        }
    });
});
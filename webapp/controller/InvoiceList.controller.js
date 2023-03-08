sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "../model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
	'sap/ui/export/library',
	'sap/ui/export/Spreadsheet',
	'sap/m/MessageToast'    
], function(Controller, JSONModel , formatter , Filter, FilterOperator , 
    exportLibrary, Spreadsheet, MessageToast ) {
    'use strict';
    var EdmType = exportLibrary.EdmType;
    return Controller.extend("sap.walkthrough.controller.InvoiceList",{
        formatter : formatter,
        onInit : function() {
            var oViewModel = new JSONModel({
                currency : "EUR"
            });
            this.getView().setModel(oViewModel , "view");
        },
        onFilterInvoices : function(oEvent) {
            // build filter array
            var aFilter = [];        
            var sQuery = oEvent.getParameter("query");
            if(sQuery){
                aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
            }
            // filter binding
            var oList = this.byId("invoiceList");
            var oBinding = oList.getBinding("items");
            oBinding.filter(aFilter);
        },
		onPress: function (oEvent) {
            var oItem = oEvent.getSource();
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("detail",{
                invoicePath: window.encodeURIComponent(oItem.getBindingContext("invoice").getPath().substr(1))
            });
		},
		createColumnConfig: function() {
			return [
				{
					label: 'Quantity',
					property: 'Quantity',
					type: EdmType.Number,
					scale: 0
				},
				{
					label: 'Name',
					property: 'ProductName',
					width: '25'
				},
				{
					label: 'Status',
					property: 'Status',
					width: '25'
				},
				{
					label: 'Supplier',
					property: 'ShipperName',
					// type: EdmType.Currency,
					// unitProperty: 'invoice>Currency',
					width: '18'
				},
				{
					label: 'Price',
					property: 'ExtendedPrice',
					type: EdmType.String
				}];
		},        
        handleExportExcel : function( ){
			var aCols, oBinding, oSettings, oSheet, oTable;            
			oTable = this.byId('invoiceList');            
			oBinding = oTable.getBinding('items');
            debugger;
			aCols = this.createColumnConfig();

			oSettings = {
				workbook: { columns: aCols },
				dataSource: oBinding
			};

			oSheet = new Spreadsheet(oSettings);
			oSheet.build()
				.then(function() {
					MessageToast.show('Spreadsheet export has finished');
				}).finally(function() {
					oSheet.destroy();
				});            
        }           
    });
});
sap.ui.define([
    "sap/ui/core/ComponentContainer"
], function(ComponentContainer) {
    'use strict';

    new ComponentContainer({
        name : "sap.walkthrough",
        setting : {
            id : "walkthrough"
        },
        async : true 
    }).placeAt("content");
});



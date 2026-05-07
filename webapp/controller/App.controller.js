sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";
    return Controller.extend("products.controller.App", {
        onGoToCart: function () {
            this.getOwnerComponent().getRouter().navTo("RouteCart");
        }
    });
});
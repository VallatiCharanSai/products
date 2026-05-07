sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel"
], function (UIComponent, JSONModel) {
    "use strict";

    return UIComponent.extend("products.Component", {

        metadata: {
            manifest: "json"
        },

        init: function () {

            UIComponent.prototype.init.apply(this, arguments);

            // Cart Model
            var oCartModel = new JSONModel({
                items: []
            });

            this.setModel(oCartModel, "cart");

            // Checkout Model
            var oCheckoutModel = new JSONModel({
                address: {}
            });

            this.setModel(oCheckoutModel, "checkout");

            this.getRouter().initialize();
        }

    });
});
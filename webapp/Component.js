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

            // CART MODEL
            var oCartModel = new JSONModel({
                items: []
            });

            this.setModel(oCartModel, "cart");

            // CHECKOUT MODEL
            var oCheckoutModel = new JSONModel({

                name: "",
                phone: "",
                email: "",
                address: "",
                city: "",
                state: "",
                pincode: ""

            });

            this.setModel(oCheckoutModel, "checkout");

            this.getRouter().initialize();
        }

    });
});
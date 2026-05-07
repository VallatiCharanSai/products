sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], function (Controller, MessageBox) {
    "use strict";

    return Controller.extend("products.controller.Payment", {

        onNavBack: function () {
            history.go(-1);
        },

        formatTotal: function (aItems) {

            if (!aItems || aItems.length === 0) {
                return "Total: 0.00 USD";
            }

            var total = 0;

            aItems.forEach(function (item) {
                total += item.UnitPrice * item.Quantity;
            });

            return "Total: " + total.toFixed(2) + " USD";
        },

        onPlaceOrder: function () {

            MessageBox.success("Order Placed Successfully!", {
                onClose: function () {
                    window.location.hash = "#/";
                }
            });

            var oCartModel =
                this.getOwnerComponent().getModel("cart");

            oCartModel.setProperty("/items", []);
            oCartModel.refresh(true);
        }

    });
});
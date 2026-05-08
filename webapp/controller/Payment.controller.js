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
                return "0.00 USD";
            }
            var total = 0;
            aItems.forEach(function (item) {
                total += item.UnitPrice * item.Quantity;
            });
            return "Total: " + total.toFixed(2) + " USD";
        },
        onPlaceOrder: function () {
            var oCartModel = this.getOwnerComponent().getModel("cart");
            MessageBox.success(
                "Order Placed Successfully!",
                {
                    title: "Success",
                    onClose: function () {

                        // CLEAR CART
                        oCartModel.setProperty("/items", []);

                        // REFRESH MODEL
                        oCartModel.refresh(true);

                        // NAVIGATE TO CART PAGE
                        this.getOwnerComponent()
                            .getRouter()
                            .navTo("RouteCart");

                    }.bind(this)
                }
            );
        }

    });
});
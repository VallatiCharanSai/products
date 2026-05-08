sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
], function (Controller, MessageBox, MessageToast) {
    "use strict";
    return Controller.extend("products.controller.Payment", {
        onNavBack: function () {
            history.go(-1);
        },
        getSubtotal: function () {
            var aItems = this.getOwnerComponent()
                .getModel("cart")
                .getProperty("/items");
            var subtotal = 0;
            if (aItems) {
                aItems.forEach(function (item) {
                    subtotal +=
                        parseFloat(item.UnitPrice) *
                        parseInt(item.Quantity);
                });
            }
            return subtotal;
        },
        getDiscount: function () {
            var subtotal = this.getSubtotal();
            if (subtotal > 100) {
                return subtotal * 0.20;
            }
            if (subtotal > 50) {
                return subtotal * 0.10;
            }
            return 0;
        },
        getFinalTotal: function () {
            var subtotal = this.getSubtotal();
            var discount = this.getDiscount();
            return subtotal - discount;
        },
        formatSubtotal: function () {
            return "Subtotal: " +
                this.getSubtotal().toFixed(2) +
                " USD";
        },
        formatDiscount: function () {
            var subtotal = this.getSubtotal();
            var discount = this.getDiscount();
            if (discount === 0) {
                return "Discount: 0.00 USD";
            }
            if (subtotal > 100) {
                return "20% Discount Applied: - " +
                    discount.toFixed(2) +
                    " USD";
            }
            return "10% Discount Applied: - " +
                discount.toFixed(2) +
                " USD";
        },
        formatFinalTotal: function () {
            return "Final Total: " +
                this.getFinalTotal().toFixed(2) +
                " USD";
        },
        onPlaceOrder: function () {
            MessageBox.success(
                "Order Placed Successfully!",
                {
                    actions: ["OK"],
                    onClose: function () {
                        this.getOwnerComponent()
                            .getModel("cart")
                            .setProperty("/items", []);
                        this.getOwnerComponent()
                            .getModel("cart")
                            .refresh(true);
                        MessageToast.show("Cart cleared");
                        this.getOwnerComponent()
                            .getRouter()
                            .navTo("RouteCart");
                    }.bind(this)
                }
            );
        }
    });
});
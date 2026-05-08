sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("products.controller.Cart", {

        onNavBack: function () {
            history.go(-1);
        },

        onContinueShopping: function () {
            this.getOwnerComponent()
                .getRouter()
                .navTo("RouteMaster");
        },

        onBuyNow: function () {
            this.getOwnerComponent()
                .getRouter()
                .navTo("RouteAddress");
        },

        // INCREASE QUANTITY
        onIncreaseQty: function (oEvent) {

            var oCartModel = this.getOwnerComponent().getModel("cart");

            var oCtx = oEvent.getSource().getBindingContext("cart");

            var sPath = oCtx.getPath();

            var iQty = oCartModel.getProperty(sPath + "/Quantity");

            oCartModel.setProperty(sPath + "/Quantity", iQty + 1);

            oCartModel.refresh(true);
        },

        // DECREASE QUANTITY
        onDecreaseQty: function (oEvent) {

            var oCartModel = this.getOwnerComponent().getModel("cart");

            var oCtx = oEvent.getSource().getBindingContext("cart");

            var sPath = oCtx.getPath();

            var iQty = oCartModel.getProperty(sPath + "/Quantity");

            if (iQty > 1) {

                oCartModel.setProperty(sPath + "/Quantity", iQty - 1);

                oCartModel.refresh(true);
            }
        },

        // REMOVE ITEM
        onRemoveItem: function (oEvent) {

            var oCartModel = this.getOwnerComponent().getModel("cart");

            var aItems = oCartModel.getProperty("/items");

            var oCtx = oEvent.getSource().getBindingContext("cart");

            var oItem = oCtx.getObject();

            var aNewItems = aItems.filter(function (item) {
                return item.ProductID !== oItem.ProductID;
            });

            oCartModel.setProperty("/items", aNewItems);

            oCartModel.refresh(true);

            MessageToast.show("Item removed");
        },

        // CLEAR CART
        onClearCart: function () {

            this.getOwnerComponent()
                .getModel("cart")
                .setProperty("/items", []);

            this.getOwnerComponent()
                .getModel("cart")
                .refresh(true);

            MessageToast.show("Cart cleared");
        },

        // ITEM TOTAL
        formatItemTotal: function (price, qty) {

            var total = price * qty;

            return "Total: " + total.toFixed(2) + " USD";
        },

        // SUBTOTAL
        formatSubtotalText: function (aItems) {

            if (!aItems || aItems.length === 0) {
                return "Subtotal: 0.00 USD";
            }

            var subtotal = 0;

            aItems.forEach(function (item) {

                subtotal +=
                    parseFloat(item.UnitPrice) *
                    parseInt(item.Quantity);
            });

            return "Subtotal: " +
                subtotal.toFixed(2) +
                " USD";
        },

        // DISCOUNT
        formatDiscountText: function (aItems) {

            if (!aItems || aItems.length === 0) {
                return "Discount: 0.00 USD";
            }

            var subtotal = 0;

            aItems.forEach(function (item) {

                subtotal +=
                    parseFloat(item.UnitPrice) *
                    parseInt(item.Quantity);
            });

            var discount = 0;
            var percentage = 0;

            if (subtotal > 100) {

                percentage = 20;
                discount = subtotal * 0.20;

            } else if (subtotal > 50) {

                percentage = 10;
                discount = subtotal * 0.10;
            }

            if (discount === 0) {
                return "Discount: 0.00 USD";
            }

            return percentage +
                "% Discount Applied: - " +
                discount.toFixed(2) +
                " USD";
        },

        // FINAL TOTAL
        formatFinalTotalText: function (aItems) {

            if (!aItems || aItems.length === 0) {
                return "Final Total: 0.00 USD";
            }

            var subtotal = 0;

            aItems.forEach(function (item) {

                subtotal +=
                    parseFloat(item.UnitPrice) *
                    parseInt(item.Quantity);
            });

            var finalTotal = subtotal;

            if (subtotal > 100) {

                finalTotal =
                    subtotal - (subtotal * 0.20);

            } else if (subtotal > 50) {

                finalTotal =
                    subtotal - (subtotal * 0.10);
            }

            return "Final Total: " +
                finalTotal.toFixed(2) +
                " USD";
        }

    });
});
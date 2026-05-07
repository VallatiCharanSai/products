sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";
    return Controller.extend("products.controller.Cart", {
        onInit: function () {
            var oCartModel = this.getOwnerComponent().getModel("cart");
            if (!oCartModel.getProperty("/items")) {
                oCartModel.setProperty("/items", []);
            }
        },
        onNavBack: function () {
            this.getOwnerComponent().getRouter().navTo("RouteMaster");
        },
        onContinueShopping: function () {
            this.getOwnerComponent().getRouter().navTo("RouteMaster");
        },
        onIncreaseQty: function (oEvent) {
            var oCtx = oEvent.getSource().getBindingContext("cart");
            var oItem = oCtx.getObject();
            if (oItem.Quantity >= oItem.UnitsInStock) {
                MessageToast.show("Out of stock");
                return;
            }
            oItem.Quantity += 1;
            this.getOwnerComponent().getModel("cart").refresh(true);
        },
        onDecreaseQty: function (oEvent) {
            var oCtx = oEvent.getSource().getBindingContext("cart");
            var oItem = oCtx.getObject();
            if (oItem.Quantity > 1) {
                oItem.Quantity -= 1;
            }
            this.getOwnerComponent().getModel("cart").refresh(true);
        },
        onRemoveItem: function (oEvent) {
            var oCtx = oEvent.getSource().getBindingContext("cart");
            var index = oCtx.getPath().split("/")[2];
            var oCartModel = this.getOwnerComponent().getModel("cart");
            var aItems = oCartModel.getProperty("/items");
            aItems.splice(index, 1);
            oCartModel.setProperty("/items", aItems);
            oCartModel.refresh(true);
        },
        onClearCart: function () {
            var oCartModel = this.getOwnerComponent().getModel("cart");
            oCartModel.setProperty("/items", []);
            oCartModel.refresh(true);
        },
        formatItemTotal: function (price, qty) {
            if (!price || !qty) return "0 USD";
            return "Total: " + (price * qty).toFixed(2) + " USD";
        },
        onBuyNow: function () {
            this.getOwnerComponent().getRouter().navTo("RouteAddress");
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
        }
    });
});
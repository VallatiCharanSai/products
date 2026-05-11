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
            this.getRouter().initialize();
            var aStoredItems = JSON.parse(localStorage.getItem("cartItems")) || [];
            var fSubtotal = 0;
            aStoredItems.forEach(function (oItem) {
                fSubtotal += oItem.UnitPrice * oItem.Quantity;
            });
            var fDiscount = 0;
            var sDiscountText = "No Discount";
            if (fSubtotal > 100) {
                fDiscount = fSubtotal * 0.20;
                sDiscountText = "20% Discount Applied";
            } else if (fSubtotal > 50) {
                fDiscount = fSubtotal * 0.10;
                sDiscountText = "10% Discount Applied";
            }
            var fFinalTotal = fSubtotal - fDiscount;
            var oCartModel = new JSONModel({
                items: aStoredItems,
                subtotal: fSubtotal.toFixed(2),
                discount: fDiscount.toFixed(2),
                finalTotal: fFinalTotal.toFixed(2),
                discountText: sDiscountText
            });
            this.setModel(oCartModel, "cart");
        }
    });
});
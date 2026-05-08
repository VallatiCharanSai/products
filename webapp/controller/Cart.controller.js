sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (Controller, MessageToast, MessageBox) {
    "use strict";
    return Controller.extend("products.controller.Cart", {
        onInit: function () {
            var oRouter =
                this.getOwnerComponent().getRouter();
            oRouter.getRoute("RouteCart")
                .attachPatternMatched(
                    this._onRouteMatched,
                    this
                );
        },
        _onRouteMatched: function () {
            this.updateCartSummary();
        },
        onNavBack: function () {
            history.go(-1);
        },
        onContinueShopping: function () {
            this.getOwnerComponent()
                .getRouter()
                .navTo("RouteMaster");
        },
        onBuyNow: function () {
            var oCartModel =
                this.getOwnerComponent().getModel("cart");
            var aItems =
                oCartModel.getProperty("/items") || [];
            if (aItems.length === 0) {
                MessageToast.show("Cart is empty");
                return;
            }
            this.getOwnerComponent()
                .getRouter()
                .navTo("RouteAddress");
        },
        onIncreaseQuantity: function (oEvent) {
            var oContext =
                oEvent.getSource()
                    .getBindingContext("cart");
            var sPath =
                oContext.getPath();
            var oCartModel =
                this.getOwnerComponent()
                    .getModel("cart");
            var iQuantity =
                oCartModel.getProperty(
                    sPath + "/Quantity"
                );
            var iStock =
                oCartModel.getProperty(
                    sPath + "/UnitsInStock"
                );
            if (iQuantity >= iStock) {
                MessageToast.show(
                    "Only " +
                    iStock +
                    " items available in stock"
                );
                return;
            }
            oCartModel.setProperty(
                sPath + "/Quantity",
                iQuantity + 1
            );
            oCartModel.refresh(true);
            this.updateCartSummary();
        },
        onDecreaseQuantity: function (oEvent) {
            var oContext =
                oEvent.getSource()
                    .getBindingContext("cart");
            var sPath =
                oContext.getPath();
            var oCartModel =
                this.getOwnerComponent()
                    .getModel("cart");
            var iQuantity =
                oCartModel.getProperty(
                    sPath + "/Quantity"
                );
            if (iQuantity > 1) {
                oCartModel.setProperty(
                    sPath + "/Quantity",
                    iQuantity - 1
                );
                oCartModel.refresh(true);
                this.updateCartSummary();
            }
        },
        onRemoveItem: function (oEvent) {
            var oContext =
                oEvent.getSource()
                    .getBindingContext("cart");
            var sPath =
                oContext.getPath();
            var iIndex =
                parseInt(
                    sPath.split("/")[2]
                );
            var oCartModel =
                this.getOwnerComponent()
                    .getModel("cart");
            var aItems =
                oCartModel.getProperty("/items");
            aItems.splice(iIndex, 1);
            oCartModel.setProperty(
                "/items",
                aItems
            );
            oCartModel.refresh(true);
            this.updateCartSummary();
            MessageToast.show(
                "Item removed"
            );
        },
        onClearCart: function () {
            var oCartModel =
                this.getOwnerComponent()
                    .getModel("cart");
            MessageBox.confirm(
                "Clear entire cart?",
                {
                    onClose: function (sAction) {
                        if (sAction === "OK") {
                            oCartModel.setProperty(
                                "/items",
                                []
                            );
                            oCartModel.setProperty(
                                "/subtotal",
                                "0.00"
                            );
                            oCartModel.setProperty(
                                "/discount",
                                "0.00"
                            );
                            oCartModel.setProperty(
                                "/finalTotal",
                                "0.00"
                            );
                            oCartModel.refresh(true);
                            MessageToast.show(
                                "Cart cleared"
                            );
                        }
                    }
                }
            );
        },
        updateCartSummary: function () {
            var oCartModel =
                this.getOwnerComponent()
                    .getModel("cart");
            var aItems =
                oCartModel.getProperty("/items") || [];
            var fSubtotal = 0;
            aItems.forEach(function (oItem) {
                fSubtotal +=
                    Number(oItem.UnitPrice) *
                    Number(oItem.Quantity);
            });
            var fDiscount = 0;
            var sDiscountText = "No Discount Applied";
            if (fSubtotal > 100) {
                fDiscount =
                    fSubtotal * 0.20;
                sDiscountText =
                    "20% Discount Applied";
            }
            else if (fSubtotal > 50) {
                fDiscount =
                    fSubtotal * 0.10;
                sDiscountText =
                    "10% Discount Applied";
            }
            var fFinalTotal =
                fSubtotal - fDiscount;
            oCartModel.setProperty(
                "/subtotal",
                fSubtotal.toFixed(2)
            );
            oCartModel.setProperty(
                "/discount",
                fDiscount.toFixed(2)
            );
            oCartModel.setProperty(
                "/finalTotal",
                fFinalTotal.toFixed(2)
            );
            oCartModel.setProperty(
                "/discountText",
                sDiscountText
            );
            oCartModel.refresh(true);
        },
        isIncreaseEnabled: function (
            iQuantity,
            iStock
        ) {
            return iQuantity < iStock;
        },
        formatItemTotal: function (oItem) {
            if (!oItem) {
                return "0.00 USD";
            }
            var fTotal =
                Number(oItem.UnitPrice) *
                Number(oItem.Quantity);
            return (
                fTotal.toFixed(2) +
                " USD"
            );
        }
    });
});
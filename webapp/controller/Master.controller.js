sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";
    return Controller.extend("products.controller.Master", {
        onInit: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("RouteMaster")
                .attachPatternMatched(this._onRouteMatched, this);
        },
        _onRouteMatched: function () {
            this.getOwnerComponent().getModel("cart").refresh(true);
        },
        onItemPress: function (oEvent) {
            var oCtx = oEvent.getSource().getBindingContext();
            var id = oCtx.getPath().match(/\d+/)[0];
            this.getOwnerComponent().getRouter().navTo("RouteDetail", {
                id: id
            });
        },
        onGoToCart: function () {
            this.getOwnerComponent().getRouter().navTo("RouteCart");
        },
        formatCartButtonText: function (productId, stock, cartItems) {
            if (stock === 0) {
                return "Out of Stock";
            }
            cartItems = cartItems || [];
            var exists = cartItems.some(function (item) {
                return item.ProductID === productId;
            });
            return exists ? "Go to Cart" : "Add to Cart";
        },
        onAddToCart: function (oEvent) {
            var oBtn = oEvent.getSource();
            var oCtx = oBtn.getBindingContext();
            var oProduct = oCtx.getObject();
            var oCartModel = this.getOwnerComponent().getModel("cart");
            var aItems = oCartModel.getProperty("/items") || [];
            var existing = aItems.find(function (item) {
                return item.ProductID === oProduct.ProductID;
            });
            if (existing) {
                this.getOwnerComponent().getRouter().navTo("RouteCart");
                return;
            }
            if (oProduct.UnitsInStock === 0) {
                return;
            }
            aItems.push({
                ProductID: oProduct.ProductID,
                ProductName: oProduct.ProductName,
                UnitPrice: oProduct.UnitPrice,
                UnitsInStock: oProduct.UnitsInStock,
                Quantity: 1
            });
            oCartModel.setProperty("/items", aItems);
            oCartModel.refresh(true);
        }
    });
});
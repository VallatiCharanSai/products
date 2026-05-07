sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";
    return Controller.extend("products.controller.Detail", {
        onInit: function () {
            this._qty = 1;
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("RouteDetail")
                .attachPatternMatched(this._onObjectMatched, this);
        },
        _onObjectMatched: function (oEvent) {
            var id = oEvent.getParameter("arguments").id;
            this._qty = 1;
            this.getView().bindElement({
                path: "/Products(" + id + ")"
            });
            this.byId("cartBtn").setText("Add to Cart");
        },
        onNavBack: function () {
            this.getOwnerComponent().getRouter().navTo("RouteMaster");
        },
        onGoToCart: function () {
            this.getOwnerComponent().getRouter().navTo("RouteCart");
        },
        onIncreaseQty: function () {
            this._qty++;
            this.byId("qtyText").setText(this._qty);
        },
        onDecreaseQty: function () {
            if (this._qty > 1) {
                this._qty--;
                this.byId("qtyText").setText(this._qty);
            }
        },
        onCartAction: function () {
            var oBtn = this.byId("cartBtn");
            if (oBtn.getText() === "Go to Cart") {
                this.getOwnerComponent().getRouter().navTo("RouteCart");
                return;
            }
            var oProduct = this.getView().getBindingContext().getObject();
            var oCartModel = this.getOwnerComponent().getModel("cart");
            var aItems = oCartModel.getProperty("/items") || [];
            var existing = aItems.find(item => item.ProductID === oProduct.ProductID);
            if (!existing) {
                if (this._qty > oProduct.UnitsInStock) {
                    MessageToast.show("Out of stock");
                    return;
                }
                aItems.push({
                    ...oProduct,
                    Quantity: this._qty
                });
            } else {
                if (existing.Quantity + this._qty > oProduct.UnitsInStock) {
                    MessageToast.show("Out of stock");
                    return;
                }
                existing.Quantity += this._qty;
            }
            oCartModel.setProperty("/items", JSON.parse(JSON.stringify(aItems)));
            oCartModel.refresh(true);
            oBtn.setText("Go to Cart");
        }
    });
});
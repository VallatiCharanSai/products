sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/VBox",
    "sap/m/Label",
    "sap/m/Select",
    "sap/ui/core/Item",
    "sap/m/Input"
], function (
    Controller,
    Filter,
    FilterOperator,
    Dialog,
    Button,
    VBox,
    Label,
    Select,
    Item,
    Input
) {
    "use strict";

    return Controller.extend("products.controller.Master", {

        // INIT
        onInit: function () {

            var oRouter =
                this.getOwnerComponent().getRouter();

            oRouter.getRoute("RouteMaster")
                .attachPatternMatched(
                    this._onRouteMatched,
                    this
                );
        },

        _onRouteMatched: function () {

            this.getOwnerComponent()
                .getModel("cart")
                .refresh(true);
        },

        // ITEM PRESS
        onItemPress: function (oEvent) {

            var oCtx =
                oEvent.getSource().getBindingContext();

            var id =
                oCtx.getPath().match(/\d+/)[0];

            this.getOwnerComponent()
                .getRouter()
                .navTo("RouteDetail", {
                    id: id
                });
        },

        // GO TO CART
        onGoToCart: function () {

            this.getOwnerComponent()
                .getRouter()
                .navTo("RouteCart");
        },

        // SEARCH
        onSearch: function (oEvent) {

            var sValue =
                oEvent.getParameter("newValue");

            var oList =
                this.byId("productList");

            var oBinding =
                oList.getBinding("items");

            var aFilters = [];

            if (sValue) {

                aFilters.push(

                    new Filter(
                        "ProductName",
                        FilterOperator.Contains,
                        sValue
                    )
                );
            }

            oBinding.filter(aFilters);
        },

        // OPEN FILTER DIALOG
        onOpenFilterDialog: function () {

            if (!this._oFilterDialog) {

                // CATEGORY
                this._oCategorySelect = new Select({

                    width: "100%",

                    items: [

                        new Item({
                            key: "",
                            text: "All Categories"
                        }),

                        new Item({
                            key: "Beverages",
                            text: "Beverages"
                        }),

                        new Item({
                            key: "Condiments",
                            text: "Condiments"
                        }),

                        new Item({
                            key: "Seafood",
                            text: "Seafood"
                        })
                    ]
                });

                // PRICE
                this._oPriceInput = new Input({

                    width: "100%",

                    type: "Number",

                    placeholder: "Enter max price"
                });

                // DIALOG
                this._oFilterDialog = new Dialog({

                    title: "Filter Products",

                    contentWidth: "300px",

                    content: new VBox({

                        class: "sapUiMediumMargin",

                        items: [

                            new Label({
                                text: "Category"
                            }),

                            this._oCategorySelect,

                            new Label({
                                text: "Maximum Price",
                                class: "sapUiSmallMarginTop"
                            }),

                            this._oPriceInput
                        ]
                    }),

                    beginButton: new Button({

                        text: "Apply",

                        press: function () {

                            this.onApplyFilters();

                            this._oFilterDialog.close();

                        }.bind(this)
                    }),

                    endButton: new Button({

                        text: "Cancel",

                        press: function () {

                            this._oFilterDialog.close();

                        }.bind(this)
                    })
                });
            }

            this._oFilterDialog.open();
        },

        // APPLY FILTERS
        onApplyFilters: function () {

            var aFilters = [];

            var sCategory =
                this._oCategorySelect.getSelectedKey();

            var sPrice =
                this._oPriceInput.getValue();

            // CATEGORY FILTER
            if (sCategory) {

                aFilters.push(

                    new Filter(
                        "Category/CategoryName",
                        FilterOperator.EQ,
                        sCategory
                    )
                );
            }

            // PRICE FILTER
            if (sPrice) {

                aFilters.push(

                    new Filter(
                        "UnitPrice",
                        FilterOperator.LE,
                        parseFloat(sPrice)
                    )
                );
            }

            var oList =
                this.byId("productList");

            var oBinding =
                oList.getBinding("items");

            oBinding.filter(aFilters);
        },

        // BUTTON TEXT
        formatCartButtonText: function (
            productId,
            stock,
            cartItems
        ) {

            if (stock === 0) {
                return "Out of Stock";
            }

            cartItems = cartItems || [];

            var exists = cartItems.some(function (item) {

                return item.ProductID === productId;
            });

            return exists
                ? "Go to Cart"
                : "Add to Cart";
        },

        // ADD TO CART
        onAddToCart: function (oEvent) {

            var oBtn = oEvent.getSource();

            var oCtx = oBtn.getBindingContext();

            var oProduct = oCtx.getObject();

            var oCartModel =
                this.getOwnerComponent()
                    .getModel("cart");

            var aItems =
                oCartModel.getProperty("/items") || [];

            var existing = aItems.find(function (item) {

                return item.ProductID ===
                    oProduct.ProductID;
            });

            // IF ALREADY EXISTS
            if (existing) {

                this.getOwnerComponent()
                    .getRouter()
                    .navTo("RouteCart");

                return;
            }

            // OUT OF STOCK
            if (oProduct.UnitsInStock === 0) {
                return;
            }

            // ADD ITEM
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
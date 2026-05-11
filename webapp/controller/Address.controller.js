sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";
    return Controller.extend("products.controller.Address", {
        onNavBack: function () {
            this.getOwnerComponent()
                .getRouter()
                .navTo("RouteCart");
        },
        onContinue: function () {
            var oCartModel =
                this.getOwnerComponent()
                    .getModel("cart");
            if (!oCartModel) {
                MessageToast.show(
                    "Cart model missing"
                );
                return;
            }
            var sFullName =
                this.byId("fullName").getValue();
            var sPhone =
                this.byId("phone").getValue();
            var sEmail =
                this.byId("email").getValue();
            var sAddress =
                this.byId("address").getValue();
            var sCity =
                this.byId("city").getValue();
            var sState =
                this.byId("state").getValue();
            var sPincode =
                this.byId("pincode").getValue();
            if (!sFullName ||
                !sPhone ||
                !sEmail ||
                !sAddress ||
                !sCity ||
                !sState ||
                !sPincode) {
                MessageToast.show(
                    "Please fill all fields"
                );
                return;
            }
            var oPhoneRegex = /^[0-9]{10}$/;
            if (!oPhoneRegex.test(sPhone)) {
                MessageToast.show(
                    "Enter valid 10 digit phone number"
                );
                return;
            }
            var oEmailRegex =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!oEmailRegex.test(sEmail)) {
                MessageToast.show(
                    "Enter valid email"
                );
                return;
            }
            var oPinRegex = /^[0-9]{6}$/;
            if (!oPinRegex.test(sPincode)) {
                MessageToast.show(
                    "Enter valid 6 digit pincode"
                );
                return;
            }
            oCartModel.setProperty("/address", {
                fullName: sFullName,
                phone: sPhone,
                email: sEmail,
                address: sAddress,
                city: sCity,
                state: sState,
                pincode: sPincode
            });
            this.getOwnerComponent()
                .getRouter()
                .navTo("RoutePayment");
        }
    });
});
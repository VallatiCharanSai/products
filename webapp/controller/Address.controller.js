sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], function (Controller, MessageBox) {
    "use strict";

    return Controller.extend("products.controller.Address", {

        onNavBack: function () {
            history.go(-1);
        },

        onContinue: function () {

            var sName = this.byId("nameInput").getValue().trim();
            var sMobile = this.byId("mobileInput").getValue().trim();
            var sEmail = this.byId("emailInput").getValue().trim();
            var sAddress = this.byId("addressInput").getValue().trim();
            var sCity = this.byId("cityInput").getValue().trim();
            var sState = this.byId("stateInput").getValue().trim();
            var sPincode = this.byId("pincodeInput").getValue().trim();

            // NAME VALIDATION
            if (!sName) {
                MessageBox.error("Please enter name");
                return;
            }

            // PHONE VALIDATION
            var mobileRegex = /^[0-9]{10}$/;

            if (!mobileRegex.test(sMobile)) {
                MessageBox.error("Enter valid 10 digit phone number");
                return;
            }

            // EMAIL VALIDATION
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(sEmail)) {
                MessageBox.error("Enter valid email");
                return;
            }

            // ADDRESS VALIDATION
            if (!sAddress) {
                MessageBox.error("Please enter address");
                return;
            }

            // CITY VALIDATION
            if (!sCity) {
                MessageBox.error("Please enter city");
                return;
            }

            // STATE VALIDATION
            if (!sState) {
                MessageBox.error("Please enter state");
                return;
            }

            // PINCODE VALIDATION
            var pinRegex = /^[0-9]{6}$/;

            if (!pinRegex.test(sPincode)) {
                MessageBox.error("Enter valid 6 digit pincode");
                return;
            }

            // SAVE DATA
            var oCheckoutModel =
                this.getOwnerComponent().getModel("checkout");

            oCheckoutModel.setProperty("/name", sName);
            oCheckoutModel.setProperty("/phone", sMobile);
            oCheckoutModel.setProperty("/email", sEmail);
            oCheckoutModel.setProperty("/address", sAddress);
            oCheckoutModel.setProperty("/city", sCity);
            oCheckoutModel.setProperty("/state", sState);
            oCheckoutModel.setProperty("/pincode", sPincode);

            // NAVIGATE
            this.getOwnerComponent()
                .getRouter()
                .navTo("RoutePayment");
        }

    });
});
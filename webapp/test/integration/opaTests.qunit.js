/* global QUnit */
QUnit.config.autostart = false;

sap.ui.require(["products/test/integration/AllJourneys"
], function () {
	QUnit.start();
});

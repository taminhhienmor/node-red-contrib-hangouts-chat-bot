const {google} = require('googleapis');

module.exports = function(RED) {
    "use strict";
    function hangoutsCertificate(n) {
        RED.nodes.createNode(this, n);
		this.clientEmail = n.clientEmail
        this.privateKey = n.privateKey;
  	}
    RED.nodes.registerType("hangoutsCertificate", hangoutsCertificate);
};
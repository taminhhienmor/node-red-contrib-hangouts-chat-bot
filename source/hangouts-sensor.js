const {google} = require('googleapis');
const request = require('request');
module.exports = function (RED) {
	"use strict";

	function hangoutSensor(n) {
		RED.nodes.createNode(this, n);
		this.box = RED.nodes.getNode(n.box);
		var node = this;

		var keytype = n.keytype || "msg";
		var keyproperty = n.keyproperty;
		
		var roomtype = n.roomtype || "msg";
		var roomproperty = n.roomproperty;
		
		var contenttype = n.contenttype || "msg";
		var contentproperty = n.contentproperty;
		
		node.on("input", function (msg) {
			node.status({});

			if(keyproperty == "") {
				node.error(RED._("Value can't empty"),msg)
				node.status({fill:"red",shape:"ring",text:"Error. Empty value"});        
				return;
			}

			
			var key = getValueProperty(keytype, keyproperty, this, msg)
			var room = getValueProperty(roomtype, roomproperty, this, msg)
			var content = getValueProperty(contenttype, contentproperty, this, msg)

			getJWT(key).then((token) => {
				var linkUrl = "https://chat.googleapis.com/v1/spaces/" + room + "/messages/"
				var opts = {
					method: "POST",
					url: linkUrl,
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + token
					},
					body: JSON.stringify({"text": content})
				};
				request(opts, function (error, response, body) {
					if (error) {
						node.error(error,{});
						node.status({fill:"red",shape:"ring",text:"failed"});
						return;
					} else {
						msg.payload = content
						node.send(msg);
					}            
				})
			})
		})   
  	}

	function getValueProperty(valuetype, valueproperty, that, msg) {
		var value = ""
		var globalContext = that.context().global;
		var flowContext = that.context().flow;
		switch (valuetype) {
			case "str":
				value = valueproperty
				break;
			case "msg":
				value = msg[valueproperty]
				break;
			case "flow":
				value = flowContext.get(valueproperty)
				break;
			case "global":
				value = globalContext.get(valueproperty)
				break;
			default:
				value = valueproperty
				break;
		}
		return value
	}

	function getJWT(gkeys) {
		return new Promise((resolve, reject) => {
			let jwtClient = new google.auth.JWT(
				gkeys.client_email,
				null,
				gkeys.private_key, ['https://www.googleapis.com/auth/chat.bot']);
	
			jwtClient.authorize((err, tokens) => {
				if (err) {
					console.log('Error create JWT hangoutchat');
					node.error(error,{});
					node.status({fill:"red",shape:"ring",text:"failed"});
					return;
				} else {
					resolve(tokens.access_token);
				}
			});
		});
	}

	RED.nodes.registerType("hangoutSensor", hangoutSensor);
};
const {google} = require('googleapis');
const request = require('request');
module.exports = function (RED) {
	"use strict";

	function hangoutChatBot(n) {
		RED.nodes.createNode(this, n);
		var node = this;
		
		var contenttype = n.contenttype || "msg";
		var contentproperty = n.contentproperty;

		var certificate = RED.nodes.getNode(n.hangoutsCertificate);
		if(certificate == null) return;

		var room = n.roomname

		node.on("input", function (msg) {
			node.status({});

			var content = getValueProperty(contenttype, contentproperty, this, msg)
			var scopes = ['https://www.googleapis.com/auth/chat.bot'];
			var decoder = certificate.privateKey.replace(/\\n/g,"\n")
			var jwtClient = new google.auth.JWT(certificate.clientEmail, null, decoder, scopes);
			jwtClient.authorize(function(error, tokens) {
				if (error) {
					node.error(error, {});
					node.status({fill: "red", shape: "ring", text: "Error making request to generate access token"});
					return;
				} else if (tokens.access_token === null) {
					node.error(error, {});
					node.status({fill: "red", shape: "ring", text: "Provided service account does not have permission to generate access tokens"});
					return;
				} else {
					var linkUrl = "https://chat.googleapis.com/v1/" + room + "/messages/"
					var opts = {
						method: "POST",
						url: linkUrl,
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + tokens.access_token
						},
						body: JSON.stringify({"text": content})
					};
					request(opts, function (error, response, body) {
						var bodyObj = {}
						try {
							bodyObj = JSON.parse(body);
						} catch (error) {
							node.error("room not found");
							node.status({fill:"red",shape:"ring",text:"input error"});
							return;
						}

						if (error) {
							node.error(error,{});
							node.status({fill:"red",shape:"ring",text:"failed request chat"});
							return;
						} else if (bodyObj.hasOwnProperty("error")) {
							node.error(bodyObj.error);
							node.status({fill:"red",shape:"ring",text:bodyObj.error.status});
							return;
						} else {
							var typeRoom = bodyObj.space.type.toLowerCase()
							var idRoom = bodyObj.space.name.split("spaces/")[1]
							msg.payload = "https://chat.google.com/" + typeRoom + "/" + idRoom
							node.send(msg);
						}            
					})
				}
			});
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

	RED.nodes.registerType("hangoutChatBot", hangoutChatBot);

	RED.httpAdmin.get('/hangout', function(req, res) {     
		var hangoutId = res.socket.parser.incoming._parsedUrl.path.split("id=")[1];
		var certificate = RED.nodes.getNode(hangoutId);
		if(certificate == null) return
		        
        var scopes = ['https://www.googleapis.com/auth/chat.bot'];
		var decoder = certificate.privateKey.replace(/\\n/g,"\n")
		var jwtClient = new google.auth.JWT(certificate.clientEmail, null, decoder, scopes);
		jwtClient.authorize(function(error, tokens) {
			if (error) {
				node.error(error, {});
				node.status({fill: "red", shape: "ring", text: "Error making request to generate access token"});
				return;
			} else if (tokens.access_token === null) {
				node.error(error, {});
				node.status({fill: "red", shape: "ring", text: "Provided service account does not have permission to generate access tokens"});
				return;
			} else {
				var linkUrl = "https://chat.googleapis.com/v1/spaces/"
				var opts = {
					method: "GET",
					url: linkUrl,
					headers: {
						"Content-Type": "application/json",
						"Authorization": "Bearer " + tokens.access_token
					}
				};
				request(opts, function (error, response, body) {
					var bodyObj = JSON.parse(body);
					if (error || bodyObj.hasOwnProperty("error")) {
						return;
					} else {
						res.json(bodyObj)
					}            
				})
			}
		});
    })
};
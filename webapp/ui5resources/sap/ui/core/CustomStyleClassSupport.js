/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./Element'],function(q,E){"use strict";var C=function(){if(!(this instanceof E)){return;}var o=this.clone;this.clone=function(){var c=o.apply(this,arguments);if(this.aCustomStyleClasses){c.aCustomStyleClasses=this.aCustomStyleClasses.slice();}if(this.mCustomStyleClassMap){c.mCustomStyleClassMap=q.extend({},this.mCustomStyleClassMap);}return c;};var r=/\S+/g;this.addStyleClass=function(s,S){var c,m=false;var a=[],b=g();if(!this.aCustomStyleClasses){this.aCustomStyleClasses=[];}if(!this.mCustomStyleClassMap){this.mCustomStyleClassMap={};}if(s&&typeof s==="string"){if(s.indexOf("\"")>-1){return this;}if(s.indexOf("'")>-1){return this;}c=s.match(r)||[];c.forEach(function(d){if(!this.mCustomStyleClassMap[d]){this.mCustomStyleClassMap[d]=true;this.aCustomStyleClasses.push(d);if(b&&b.indexOf(d)>-1){a.push(d);}m=true;}}.bind(this));if(!m){return this;}var R=this.getDomRef();if(R){q(R).addClass(s);}else if(S===false){this.invalidate();}if(a.length>0){f(this,a,true);}}return this;};this.removeStyleClass=function(s,S){var c,e=false,n;var a=[],b=g();if(s&&typeof s==="string"&&this.aCustomStyleClasses&&this.mCustomStyleClassMap){c=s.match(r)||[];c.forEach(function(d){if(this.mCustomStyleClassMap[d]){e=true;n=this.aCustomStyleClasses.indexOf(d);if(n!==-1){this.aCustomStyleClasses.splice(n,1);delete this.mCustomStyleClassMap[d];if(b&&b.indexOf(d)>-1){a.push(d);}}}}.bind(this));}if(e){var R=this.getDomRef();if(R){q(R).removeClass(s);}else if(S===false){this.invalidate();}if(a.length>0){f(this,a,false);}}return this;};this.toggleStyleClass=function(s,a){if(s&&typeof s==="string"){if(a===true){this.addStyleClass(s);}else if(a===false){this.removeStyleClass(s);}else if(a===undefined){this.hasStyleClass(s)?this.removeStyleClass(s):this.addStyleClass(s);}else{q.sap.log.warning(this.toString()+"- toggleStyleClass(): bAdd should be a boolean or undefined, but is '"+a+"'");}}return this;};this.hasStyleClass=function(s){var c;if(s&&typeof s==="string"&&this.mCustomStyleClassMap){c=s.match(r)||[];return c.length!==0&&c.every(function(a){return this.mCustomStyleClassMap[a];}.bind(this));}return false;};this.getMetadata().addPublicMethods(["addStyleClass","removeStyleClass","toggleStyleClass","hasStyleClass"]);};var P;function g(){if(!P){P=sap.ui.require("sap/ui/core/theming/Parameters");}if(P){return P._getScopes(true);}}function f(e,s,i){sap.ui.getCore().fireThemeScopingChanged({scopes:s,added:i,element:e});}return C;},true);
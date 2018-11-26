/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/dt/DesignTimeMetadata','sap/ui/dt/AggregationDesignTimeMetadata'],function(q,D,A){"use strict";var E=D.extend("sap.ui.dt.ElementDesignTimeMetadata",{metadata:{library:"sap.ui.dt"}});E.prototype.getDefaultData=function(d){var o=D.prototype.getDefaultData.apply(this,arguments);o.aggregations={layout:{ignore:true},dependents:{ignore:true},customData:{ignore:true},layoutData:{ignore:true},tooltip:{ignore:true}};return o;};E.prototype.hasAggregation=function(a){return!!this.getAggregations()[a];};E.prototype.getAggregation=function(a){return this.getAggregations()[a];};E.prototype.createAggregationDesignTimeMetadata=function(a){var d=this.getAggregation(a);return new A({libraryName:this.getLibraryName(),data:d});};E.prototype.getAggregations=function(){var a=this.getData().aggregations;var m=this.getData().associations||{};Object.keys(m).forEach(function(s){var b=m[s];if(b.aggregationLike){a[s]=b;}});return a;};E.prototype.getRelevantContainer=function(e){var g=this.getData().getRelevantContainer;if(!g||typeof g!=="function"){return e.getParent();}return g(e);};E.prototype.getAggregationAction=function(a,e,b){var v;var o=this.getAggregations();var c=[];for(var s in o){if(o[s].actions&&o[s].actions[a]){v=o[s].actions[a];if(typeof v==="function"){var d=[e];if(b){d=d.concat(b);}v=v.apply(null,d);}else if(typeof(v)==="string"){v={changeType:v};}if(v){v.aggregation=s;}c.push(v);}}return c;};E.prototype._getText=function(n){if(typeof n==="function"){return n();}else{return this.getLibraryText(n);}};E.prototype.getAggregationDescription=function(a,e){var c=this.getAggregation(a).childNames;if(typeof c==="function"){c=c.call(null,e);}if(c){return{singular:this._getText(c.singular),plural:this._getText(c.plural)};}};E.prototype.getName=function(e){var n=this.getData().name;if(typeof n==="function"){n=n.call(null,e);}if(n){return{singular:this._getText(n.singular),plural:this._getText(n.plural)};}};E.prototype.isAggregationIgnored=function(e,a){var m=this.getAggregations();var o=m[a];var i=(o)?o.ignore:false;if(!i||(i&&typeof i==="function"&&!i(e))){return false;}else{return true;}};E.prototype.getScrollContainers=function(){return this.getData().scrollContainers||[];};return E;},true);

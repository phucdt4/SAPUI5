/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Control','sap/ui/core/FragmentControlMetadata','sap/ui/model/base/ManagedObjectModel','sap/ui/core/util/XMLPreprocessor','sap/ui/model/json/JSONModel','sap/ui/core/Fragment','sap/ui/base/ManagedObject','sap/ui/base/DataType','sap/ui/core/FragmentProxy'],function(q,C,F,M,X,J,a,b,D,P){"use strict";var c={};function i(f,o){if(!c[f]){q.sap.require(f);c[f]=q.sap.getObject(f);}return c[f];}function p(t,v,n,o){var B=b.bindingParser(v,o,true);if(B&&typeof B==="object"){return B;}var V=v=B||v;var T=D.getType(t);if(T){if(T instanceof D){V=T.parseValue(v);}}else{throw new Error("Property "+n+" has unknown type "+t);}return typeof V==="string"?b.bindingParser.escape(V):V;}function d(m,n,E,I,v){var A=new J(E),o=I.getMetadata(),f=o.getAllAggregations(),h=o.getAllProperties(),s=o._mAllSpecialSettings;A.getVisitor=function(){return v;};A.getProperty=function(j,k){var r;j=this.resolve(j,k);j=j.substring(1);if(h.hasOwnProperty(j)){var l=h[j];if(!E.hasAttribute(j)){return l.defaultValue;}r=v.getResult(E.getAttribute(j))||E.getAttribute(j);if(r){var S=p(l.type,r,j);if(typeof S==="object"&&S.path){return r;}return S;}return null;}else if(f.hasOwnProperty(j)){var t=f[j];if(t.multiple===true&&t.type==="TemplateMetadataContext"){if(!E.hasAttribute(j)){return null;}return E.getAttribute(j);}return E.getAttribute(j);}else if(s.hasOwnProperty(j)){if(!E.hasAttribute(j)){return null;}r=v.getResult(E.getAttribute(j));if(r){return r;}return E.getAttribute(j);}};A.getContextName=function(){return n;};m[n]=A.getContext("/");}function g(o){var s={};s.models=o.oModels||{};s.bindingContexts=o.oBindingContexts||{};return s;}var e=C.extend("sap.ui.core.FragmentControl",{metadata:{aggregations:{_content:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}}},renderer:function(r,o){r.write("<div");r.writeControlData(o);r.writeClasses();r.write(">");var f=o.getAggregation(o.getMetadata().getCompositeAggregationName());if(f){r.renderControl(f);}r.write("</div>");}},F);e.prototype.applySettings=function(){this._bIsInitializing=true;var r=C.prototype.applySettings.apply(this,arguments);this._bIsInitializing=false;return r;};e.prototype.byId=function(I){return sap.ui.getCore().byId(a.createId(this.getId(),I));};e.prototype._getManagedObjectModel=function(){if(!this._oManagedObjectModel){this._oManagedObjectModel=new M(this);}return this._oManagedObjectModel;};e.prototype.getSuppressInvalidateAggregation=function(n,s){var m=this.getMetadata(),A=m.getAggregation(n)||m.getAllPrivateAggregations()[n];if(!A){return true;}s=m._suppressInvalidate(A,s);m._requestFragmentRetemplatingCheck(this,A);return s;};e.prototype.setProperty=function(n,v,s){var m=this.getMetadata(),o=m.getProperty(n);if(!o){return this;}s=this.getMetadata()._suppressInvalidate(o,s);if(C.prototype.getProperty.apply(this,[n])!==v){m._requestFragmentRetemplatingCheck(this,o);}return C.prototype.setProperty.apply(this,[n,v,s]);};e.prototype.bindAggregation=function(n,o){var m=this.getMetadata(),A=m.getAggregation(n)||m.getAllPrivateAggregations()[n],B=C.prototype.getBinding.apply(this,[n]);if(!B||(B&&B.getPath()!==o.path)){m._requestFragmentRetemplatingCheck(this,A);}return C.prototype.bindAggregation.apply(this,[n,o]);};e.prototype.unbindAggregation=function(n){var m=this.getMetadata(),A=m.getAggregation(n)||m.getAllPrivateAggregations()[n];if(this.isBound(n)){m._requestFragmentRetemplatingCheck(this,A,true);}return C.prototype.unbindAggregation.apply(this,[n]);};e.prototype.setAggregation=function(n,o,s){return C.prototype.setAggregation.apply(this,[n,o,this.getSuppressInvalidateAggregation(n,s)]);};e.prototype.addAggregation=function(n,o,s){return C.prototype.addAggregation.apply(this,[n,o,this.getSuppressInvalidateAggregation(n,s)]);};e.prototype.insertAggregation=function(n,o,I,s){return C.prototype.insertAggregation.apply(this,[n,o,I,this.getSuppressInvalidateAggregation(n,s)]);};e.prototype.removeAggregation=function(n,o,s){return C.prototype.removeAggregation.apply(this,[n,o,this.getSuppressInvalidateAggregation(n,s)]);};e.prototype.removeAllAggregation=function(n,s){return C.prototype.removeAllAggregation.apply(this,[n,this.getSuppressInvalidateAggregation(n,s)]);};e.prototype.destroyAggregation=function(n,s){return C.prototype.destroyAggregation.apply(this,[n,this.getSuppressInvalidateAggregation(n,s)]);};e.prototype.updateAggregation=function(n,s){var A=this.getMetadata().getAggregation(n);if(A&&A.type==="TemplateMetadataContext"){this.invalidate();return;}C.prototype.updateAggregation.apply(this,arguments);};e.prototype.setVisible=function(v){this.setProperty("visible",v);if(this.getParent()){this.getParent().invalidate();}return this;};e.prototype._destroyCompositeAggregation=function(){var s=this.getMetadata().getCompositeAggregationName(),o=this.getAggregation(s);if(o){o.destroy();}return this;};e.prototype.updateBindings=function(){if(this._bIsInitializing){return;}var r=C.prototype.updateBindings.apply(this,arguments);for(var n in this.mBindingInfos){var A=this.getMetadata().getAggregation(n);if(A&&A.multiple&&!A._doesNotRequireFactory&&this.isBound(n)&&!this.getBinding(n)){this[A._sDestructor]();}}return r;};e.prototype._setCompositeAggregation=function(N){var s=this.getMetadata().getCompositeAggregationName();this._destroyCompositeAggregation();if(!this._oManagedObjectModel){this._getManagedObjectModel();}if(q.isArray(N)){this.setAggregation(s,null);return;}if(N){N.setModel(this._oManagedObjectModel,"$"+this.alias);N.bindObject("$"+this.alias+">/");}var t=this;this.setAggregation(s,N);var t=this;N._getPropertiesToPropagate=function(){var o=b.prototype._getPropertiesToPropagate.apply(this,arguments),B={},m={},f;for(var n in o.oBindingContexts){var h=o.oBindingContexts[n];if(h){f=h.getModel();if(f instanceof M&&f.getRootObject()instanceof e&&"$"+t.alias!==n){continue;}B[n]=o.oBindingContexts[n];}}for(var n in o.oModels){var f=o.oModels[n];if(f&&f instanceof M&&f.getRootObject()instanceof e&&"$"+t.alias!==n){continue;}m[n]=o.oModels[n];}o.oBindingContexts=B;o.oModels=m;return o;};this.invalidate();};e.prototype._initCompositeSupport=function(s){var m=this.getMetadata(),A=m.getCompositeAggregationName(),I=false;if(s&&A){var n=s[A];if(n&&n.localName==="FragmentDefinition"){this._destroyCompositeAggregation();this._setCompositeAggregation(sap.ui.xmlfragment({sId:this.getId(),fragmentContent:s[A],oController:this}));I=true;}delete s[A];}if(!I){this._destroyCompositeAggregation();this._setCompositeAggregation(sap.ui.xmlfragment({sId:this.getId(),fragmentContent:this.getMetadata()._fragment,oController:this}));}};e.prototype.requestFragmentRetemplating=function(f){if(f){this.fragmentRetemplating();return;}var A=this.getMetadata().getMandatoryAggregations(),B=true;for(var n in A){B=typeof this.getBindingInfo(n)==="object";if(!B){break;}}if(B){this.fragmentRetemplating();}};e.prototype.fragmentRetemplating=function(){var m=this.getMetadata(),f=m.getFragment();if(!f){throw new Error("Fragment "+f.tagName+" not found");}var o=this._getManagedObjectModel();var t=this;o.getContextName=function(){return t.alias;};this.setModel(o,this.alias);this.bindObject(this.alias+">/");o._mSettings=g(this._getPropertiesToPropagate());delete o._mSettings.models["$"+this.alias];delete o._mSettings.bindingContexts["$"+this.alias];this.setModel(null,this.alias);X.process(f.querySelector("*"),{},o._mSettings);var s={};s[m.getCompositeAggregationName()]=f;this._initCompositeSupport(s);};e.initialTemplating=function(E,v,f){var I=i(f),m={},o=I.getMetadata().getFragment();if(!o){throw new Error("Fragment "+f+" not found");}d(m,I.prototype.alias,E,I,v);var h=v["with"](m,true),j=I.getMetadata();h.visitChildNodes(o);var n=o.ownerDocument.createElementNS("http://schemas.sap.com/sapui5/extension/sap.ui.core.fragmentcontrol/1",j.getCompositeAggregationName());n.appendChild(o);E.appendChild(n);};e.helper={listContext:function(o){var B=o.getModel().getProperty(o.getPath());if(typeof B==="string"){B=b.bindingParser(B);}if(q.isArray(B)){var f=o.getModel().getProperty(o.getPath()+"/@binding");if(f){return f.getModel().getMetaModel().getMetaContext(f.getPath());}else{return undefined;}}if(typeof B==="object"){var v=o.getModel().getVisitor();var m=v.getSettings().models[B.model];if(m){return m.createBindingContext(B.path);}return null;}else{return undefined;}},listMetaContext:function(o){var B=o.getModel().getProperty(o.getPath());if(typeof B==="string"){B=b.bindingParser(B);}if(q.isArray(B)){var f=o.getModel().getProperty(o.getPath()+"/@binding");if(f){return f.getModel().getMetaModel().getMetaContext(f.getPath());}else{return undefined;}}if(typeof B==="object"){var v=o.getModel().getVisitor();B=b.bindingParser("{"+B.path+"}");var m=v.getSettings().models[B.model];if(m){var h=m.getMetaModel();if(h&&h.getMetaContext){return h.getMetaContext(B.path);}}return null;}else{return undefined;}},runtimeProperty:function(o,v){if(o.getModel().getContextName){return"{$"+o.getModel().getContextName()+">"+o.getPath()+"}";}return v;},runtimeBinding:function(o,v){return"{Name}";},runtimeListBinding:function(o,v){if(q.isArray(v)){var B=o.getModel().getProperty(o.getPath()+"/@binding");if(B){return"{path: '"+B.getPath()+"'}";}return null;}return v;}};e.helper.listMetaContext.requiresIContext=true;e.helper.runtimeProperty.requiresIContext=true;e.helper.runtimeListBinding.requiresIContext=true;e.helper.runtimeBinding.requiresIContext=true;return e;},true);
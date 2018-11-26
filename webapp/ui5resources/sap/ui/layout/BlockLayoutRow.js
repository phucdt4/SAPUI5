/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Control','./library','sap/ui/layout/BlockLayoutCellData'],function(q,C,l,B){"use strict";var a=C.extend("sap.ui.layout.BlockLayoutRow",{metadata:{library:"sap.ui.layout",properties:{scrollable:{type:"boolean",group:"Appearance",defaultValue:false},rowColorSet:{type:"sap.ui.layout.BlockRowColorSets",group:"Appearance"}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.layout.BlockLayoutCell",multiple:true,singularName:"content"}},associations:{accentCells:{type:"sap.ui.layout.BlockLayoutCell",multiple:true,singularName:"accentCell"}}}});a.prototype.init=function(){this._applyLayoutData={};};a.prototype.addContent=function(c){this._ensureLayoutData(c);return this.addAggregation("content",c);};a.prototype.insertContent=function(c,i){this._ensureLayoutData(c);return this.insertAggregation("content",c,i);};a.prototype.onBeforeRendering=function(){var c=this.getContent(),t=this;c.forEach(function(o,i){o._setParentRowScrollable(t.getScrollable());});this._calculateBreakpointRendering();};a.prototype.setRowColorSet=function(t){var A=Array.prototype.slice.call(arguments),o=C.prototype.setProperty.apply(this,["rowColorSet"].concat(A)),c="sapUiBlockLayoutBackground"+t,b=this.getParent(),s=b&&b.getBackground(),T=b&&b.indexOfAggregation("content",this),p=b&&b.getContent(),P=(T&&p[T-1])||null,n=(p&&p[T+1])||null,d=sap.ui.layout.BlockRowColorSets,e=Object.keys(d).map(function(k){return d[k];}),i=false;if(P&&P._hasStyleClass(c,s,i,t)){c+="Inverted";i=true;}e.forEach(function(f){var g="sapUiBlockLayoutBackground"+f,I=g+"Inverted";if(this._hasStyleClass(g,s,false,f)){this.removeStyleClass(g,true);}else if(this._hasStyleClass(I,s,true,f)){this.removeStyleClass(I,true);}},this);this.addStyleClass(c,true);if(n&&n._hasStyleClass(c,s,i,t)){n.setRowColorSet.apply(n,A);}this.invalidate();return o;};a.prototype.addAccentCell=function(i){var o,I=i&&i.getId?i.getId():i,b=Array.prototype.slice.call(arguments),c=sap.ui.layout.BlockBackgroundType,d=this.getParent(),L=d&&(d.getBackground()||"");o=this.addAssociation.apply(this,["accentCells"].concat(b));if(!d){return this;}if([c.Accent,c.Mixed].indexOf(L)===-1){q.sap.log.warning(I+" was not se as accent cell. Accent cells could be set only for 'Accent' and 'Mixed' layout backgrounds.");return this;}if(c.Mixed===L){this._processMixedCellStyles(I,this.getContent());}else if(c.Accent===L){this._processAccentCellStyles(this.getAccentCells(),this.getContent());}return o;};a.prototype._ensureLayoutData=function(c){var o=c.getLayoutData();if(!o||!(o instanceof B)){c.setLayoutData(new B());}};a.prototype._onParentSizeChange=function(c){this._currentSize=c;this._calculateBreakpointRendering();this.invalidate();};a.prototype._getCellArangementForCurrentSize=function(){if(!this._arrangements||!this._currentSize){return null;}return this._arrangements[this._currentSize];};a.prototype._calculateBreakpointRendering=function(){if(!this._currentSize){return;}this._arrangements={"S":this._calcArrangementForSize("S"),"M":this._calcArrangementForSize("M"),"L":this._calcArrangementForSize("L"),"XL":this._calcArrangementForSize("Xl")};};a.prototype._calcArrangementForSize=function(s){var c=this.getContent();if(c.length>=3&&s==="M"&&c.length<5){return this._generateArrangementForMCase();}else{return this._generateArrangement(s);}};a.prototype._generateArrangement=function(s){var L,I=0,f=[],b=[],A=[[]],c=this.getContent();c.forEach(function(o){L=o.getLayoutData();b.push(L["breakRowOn"+s+"Size"]);f.push(L["get"+s+"Size"]());});f.forEach(function(d,i){A[I].push(d);if(b[i+1]){I++;A[I]=[];}});return A;};a.prototype._generateArrangementForMCase=function(){var c=this.getContent();if(c.length===3&&this._isAllCellsHasSameWidth("M")){return[[1,1,1]];}else if(c.length===3){return[[1,1],[1]];}else if(c.length===4){return[[1,1],[1,1]];}};a.prototype._isAllCellsHasSameWidth=function(s){var c,b=this.getContent(),f=b[0].getLayoutData()["get"+s+"Size"]();for(var i=1;i<b.length;i++){c=b[i].getLayoutData()["get"+s+"Size"]();if(c!==f){return false;}}return true;};a.prototype._processMixedCellStyles=function(i,c){var b,p;if(!c||!c.length){q.sap.log.warning("No accent cells were set");return this;}b=this.getParent();p=b&&(b.hasStyleClass("sapUiBlockLayoutSizeL")||b.hasStyleClass("sapUiBlockLayoutSizeXL"));c.forEach(function(o){var d,u;if(p&&o.getId()===i&&o.getWidth()===1){o.addStyleClass("sapContrast").addStyleClass("sapContrastPlus");d=sap.ui.layout.BlockRowColorSets;u=this._hasStyleClass("sapUiBlockLayoutBackground"+d.ColorSet1,sap.ui.layout.BlockBackgroundType.Mixed,false,d.ColorSet1)||this._hasStyleClass("sapUiBlockLayoutBackground"+d.ColorSet1,sap.ui.layout.BlockBackgroundType.Mixed,true,d.ColorSet1);if(u){o.addStyleClass("sapUiBlockLayoutBackgroundContrast2");}}else if((!p||o.getId()!==i)&&(o.hasStyleClass("sapContrast")||o.hasStyleClass("sapContrastPlus"))){o.removeStyleClass("sapContrast").removeStyleClass("sapContrastPlus").removeStyleClass("sapUiBlockLayoutBackgroundContrast2");this.removeAssociation("accentCells",o);q.sap.log.warning(i+" was removed as accent cell. Only one cell at a time could be accented for Mixed layout background");}},this);return this;};a.prototype._processAccentCellStyles=function(A,r){var c,s,b,i=0,I=0,d=Array.prototype.slice.call(A);if(!A||!A.length){q.sap.log.warning("No accent cells were set");return this;}for(i=0;i<r.length;i++){c=r[i];s=c.getId();if(!d.length){break;}if(d.indexOf(s)>-1){I++;b="sapUiBlockLayoutBackgroundColorSetGray"+((I%2)+1);if(c.hasStyleClass(b)){continue;}d.splice(d.indexOf(s),1);c.removeStyleClass("sapUiBlockLayoutBackgroundColorSetGray1").removeStyleClass("sapUiBlockLayoutBackgroundColorSetGray2").addStyleClass(b);}}return this;};a.prototype._hasStyleClass=function(s,L,I,t){var b=sap.ui.layout.BlockBackgroundType,c=sap.ui.layout.BlockRowColorSets,i,S,e;if([b.Light,b.Mixed].indexOf(L)===-1){return this.hasStyleClass(s);}else if(this.hasStyleClass(s)){return true;}e=[[c.ColorSet1,c.ColorSet3],[c.ColorSet2,c.ColorSet4]];for(i=0;i<=e.length;i++){if(e[i]&&e[i].indexOf(t)>-1){break;}}if(!e[i]){return false;}S=e[i].map(function(d){return"sapUiBlockLayoutBackground"+d+(I?"Inverted":"");});return S.some(this.hasStyleClass,this);};return a;},true);

/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","./library","./FlexibleColumnLayout"],function(q,l,F){"use strict";var L=l.LayoutType;var a=function(f,s){var m={Normal:3,MasterDetail:2,SingleColumn:1},i,M;s||(s={});this._oFCL=f;this._defaultLayoutType=L.OneColumn;this._defaultTwoColumnLayoutType=[L.TwoColumnsBeginExpanded,L.TwoColumnsMidExpanded].indexOf(s.defaultTwoColumnLayoutType)!==-1?s.defaultTwoColumnLayoutType:L.TwoColumnsBeginExpanded;this._defaultThreeColumnLayoutType=[L.ThreeColumnsMidExpanded,L.ThreeColumnsEndExpanded].indexOf(s.defaultThreeColumnLayoutType)!==-1?s.defaultThreeColumnLayoutType:L.ThreeColumnsMidExpanded;if(["Normal","MasterDetail","SingleColumn"].indexOf(s.mode)!==-1&&!s.maxColumnsCount){M=m[s.mode];}else{M=s.maxColumnsCount?parseInt(s.maxColumnsCount,10):3;if(M<1||M>3){M=3;}}this._maxColumnsCount=M;i=s.initialColumnsCount?parseInt(s.initialColumnsCount,10):1;if(i<1||i>2||this._maxColumnsCount===1){i=1;}this._initialColumnsCount=i;};a._oInstances={};a.getInstanceFor=function(f,s){var i=f.getId();if(typeof a._oInstances[i]==="undefined"){a._oInstances[i]=new a(f,s);var d={onDestroy:function(){delete a._oInstances[i];}};f.addEventDelegate(d);}return a._oInstances[i];};a.prototype.getCurrentUIState=function(){var c=this._oFCL.getLayout();return this._getUIStateForLayout(c);};a.prototype.getNextUIState=function(n){var c=this._oFCL.getLayout(),i=this._initialColumnsCount,N;if(n===0){if(i===2&&this._canShowTwoColumns()){N=this._defaultTwoColumnLayoutType;}else{N=L.OneColumn;}}if(n===1){if(this._maxColumnsCount===1){N=L.MidColumnFullScreen;}else{if([L.TwoColumnsBeginExpanded,L.TwoColumnsMidExpanded].indexOf(c)!==-1){N=c;}else if([L.MidColumnFullScreen,L.EndColumnFullScreen].indexOf(c)!==-1){N=L.MidColumnFullScreen;}else{N=this._defaultTwoColumnLayoutType;}}}if(n===2){if(this._maxColumnsCount<3){N=L.EndColumnFullScreen;}else{if([L.ThreeColumnsMidExpandedEndHidden,L.ThreeColumnsBeginExpandedEndHidden].indexOf(c)!==-1){N=this._defaultThreeColumnLayoutType;}else if([L.ThreeColumnsMidExpanded,L.ThreeColumnsEndExpanded].indexOf(c)!==-1){N=c;}else if([L.MidColumnFullScreen,L.EndColumnFullScreen].indexOf(c)!==-1){N=L.EndColumnFullScreen;}else{N=this._defaultThreeColumnLayoutType;}}}if(n>2){N=L.EndColumnFullScreen;}return this._getUIStateForLayout(N);};a.prototype._getUIStateForLayout=function(s){var S=this._oFCL._getColumnWidthDistributionForLayout(s,true),c=S.join("/"),m=this._oFCL.getMaxColumnsCount();return{layout:s,maxColumnsCount:m,columnsSizes:this._getColumnsSizes(S),columnsVisibility:this._getColumnsVisibility(S),isFullScreen:this._getIsFullScreen(S),isLogicallyFullScreen:this._getIsLogicallyFullScreen(s),actionButtonsInfo:this._getActionButtonsInfo(c,m)};};a.prototype._getColumnsSizes=function(s){return{beginColumn:s[0],midColumn:s[1],endColumn:s[2]};};a.prototype._getColumnsVisibility=function(s){return{beginColumn:s[0]!==0,midColumn:s[1]!==0,endColumn:s[2]!==0};};a.prototype._getIsFullScreen=function(s){return s.indexOf(100)!==-1;};a.prototype._getIsLogicallyFullScreen=function(s){return[L.OneColumn,L.MidColumnFullScreen,L.EndColumnFullScreen].indexOf(s)!==-1;};a.prototype._getActionButtonsInfo=function(c,m){var M={fullScreen:null,exitFullScreen:null,closeColumn:null},e={fullScreen:null,exitFullScreen:null,closeColumn:null},E,s;if(this._maxColumnsCount===1){return{midColumn:M,endColumn:e};}if(m===1){M.closeColumn=this._defaultLayoutType;e.closeColumn=this._defaultTwoColumnLayoutType;}else{if(c==="67/33/0"||c==="33/67/0"){M.fullScreen=L.MidColumnFullScreen;M.closeColumn=this._defaultLayoutType;}if(c==="25/50/25"||c==="25/25/50"||c==="0/67/33"){e.fullScreen=L.EndColumnFullScreen;e.closeColumn=this._defaultTwoColumnLayoutType;}if(c==="0/100/0"){E=[L.TwoColumnsBeginExpanded,L.TwoColumnsMidExpanded,L.ThreeColumnsBeginExpandedEndHidden,L.ThreeColumnsMidExpandedEndHidden];s=this._oFCL._getLayoutHistory().getClosestEntryThatMatches(E)||this._defaultTwoColumnLayoutType;M.exitFullScreen=s;M.closeColumn=this._defaultLayoutType;}if(c==="0/0/100"){if(this._maxColumnsCount!==2){E=[L.ThreeColumnsMidExpanded,L.ThreeColumnsEndExpanded];s=this._oFCL._getLayoutHistory().getClosestEntryThatMatches(E)||this._defaultThreeColumnLayoutType;e.exitFullScreen=s;e.closeColumn=this._defaultTwoColumnLayoutType;}}}return{midColumn:M,endColumn:e};};a.prototype.getDefaultLayouts=function(){return{defaultLayoutType:this._defaultLayoutType,defaultTwoColumnLayoutType:this._defaultTwoColumnLayoutType,defaultThreeColumnLayoutType:this._defaultThreeColumnLayoutType};};a.prototype._canShowTwoColumns=function(){var c=this._oFCL._getControlWidth(),m=this._oFCL._getMaxColumnsCountForWidth(c||window.innerWidth);return m>1;};return a;},true);

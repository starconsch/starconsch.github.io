sap.ui.define(["sap/ui/base/Object"],BaseObject=>{"use strict";return BaseObject.extend("ch.starcons.sbase.js.JavaScriptHelper",{_aOutput:[],_oAppController:null,constructor:function(e){this._oAppController=e},runJavaScript:function(sJavaScript){this._aOutput=[];sJavaScript=sJavaScript.replaceAll("sbaseDBExec","this.sbaseDBExec");sJavaScript=sJavaScript.replaceAll("sbaseGetFile","this.sbaseGetFile");sJavaScript=sJavaScript.replaceAll("sbaseOutput","this.sbaseOutput");sJavaScript=sJavaScript.replaceAll("sbaseParseXML","this.sbaseParseXML");sJavaScript=sJavaScript.replaceAll("sbaseParseExcel","this.sbaseParseExcel");sJavaScript=sJavaScript.replaceAll("sbaseUnzip","this.sbaseUnzip");eval(sJavaScript);return this._aOutput},sbaseDBExec:function(e){return this._oAppController.getSQLiteDBHelper().executeSQL(e)},sbaseGetFile:function(e){return this._oAppController.getProperty("/database/javaScriptImportedFiles")[e]},sbaseOutput:function(e){this._aOutput.push(e)},sbaseParseXML:function(e,t){var s=new XMLParser({isArray:function(e,s,a,r){for(var i=0;i<t.length;i++){if(s===t[i]){return true}}}});return s.parse(e)},sbaseParseExcel:function(e,t){this._oAppController.getExcelHelper().generateTablesFromExcel(e).then(function(e){t(e)}.bind(this)).catch(function(e){throw e}.bind(this))},sbaseUnzip:function(e,t,s){var a=new JSZip;a.loadAsync(e).then(function(e){s(e.file(t))}.bind(this))}})});
//# sourceMappingURL=JavaScriptHelper.js.map
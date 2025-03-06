//@ui5-bundle ch/starcons/pfiles/Component-preload.js
sap.ui.require.preload({
	"ch/starcons/pfiles/Component.js":function(){
sap.ui.define(["sap/ui/core/UIComponent","ch/starcons/pfiles/model/models"],(e,i)=>{"use strict";return e.extend("ch.starcons.pfiles.Component",{metadata:{manifest:"json",interfaces:["sap.ui.core.IAsyncContentCreation"]},init(){e.prototype.init.apply(this,arguments);this.setModel(i.createDeviceModel(),"device");this.getRouter().initialize();if("serviceWorker"in navigator){navigator.serviceWorker.register("sw.js").then(function(){}.bind(this)).catch(function(){}.bind(this))}}})});
},
	"ch/starcons/pfiles/controller/App.controller.js":function(){
sap.ui.define(["ch/starcons/pfiles/controller/BaseController","sap/ui/Device","sap/f/FlexibleColumnLayoutSemanticHelper","sap/f/library"],(t,e,s,o)=>{"use strict";return t.extend("ch.starcons.pfiles.controller.App",{_oRouteArguments:null,_sContentDensityClass:null,_sLastRouteName:"",_sRouteName:"",getContentDensityClass:function(){if(this._sContentDensityClass===null){if(document.body.classList.contains("sapUiSizeCozy")||document.body.classList.contains("sapUiSizeCompact")){this._sContentDensityClass=""}else if(!e.system.Phone){this._sContentDensityClass="sapUiSizeCompact"}else{this._sContentDensityClass="sapUiSizeCozy"}}return this._sContentDensityClass},getCurrentRoute:function(){return{name:this._sRouteName,arguments:this._oRouteArguments}},getLastRoute:function(){return this._sLastRouteName},getUIHelper:function(){return s.getInstanceFor(this.byId("flexibleColumnLayout"),{defaultTwoColumnLayoutType:o.LayoutType.TwoColumnsMidExpanded,defaultThreeColumnLayoutType:o.LayoutType.ThreeColumnsMidExpanded})},onInit:function(){this.getView().addStyleClass(this.getContentDensityClass());this._loadModel();this.getRouter().attachBeforeRouteMatched(this._onBeforeRouteMatched,this);this.getRouter().attachRouteMatched(this._onRouteMatched,this)},onStateChanged:function(t){this.setProperty("/app/uistate",this.getUIHelper().getCurrentUIState());if(t.getParameters().isNavigationArrow){this._oRouteArguments.layout=t.getParameters().layout;this.getRouter().navTo(this._sRouteName,this._oRouteArguments)}},_loadModel:function(){jQuery.ajax({type:"GET",url:"model/App.model.json",processData:false,dataType:"json",async:false,success:function(t){this.getModel().setData(t);this.setProperty("/app/version",this.getOwnerComponent().getManifestEntry("/sap.app/applicationVersion/version"))}.bind(this)})},_onBeforeRouteMatched:function(t){var e=t.getParameters().arguments.layout;if(!e){this.setProperty("/app/uistate/layout",this.getUIHelper().getNextUIState(0).layout)}else{this.setProperty("/app/uistate/layout",e)}},_onRouteMatched:function(t){this._sLastRouteName=this._sRouteName;this._sRouteName=t.getParameters().name;this._oRouteArguments=t.getParameters().arguments;this.setProperty("/app/uistate",this.getUIHelper().getCurrentUIState())}})});
},
	"ch/starcons/pfiles/controller/BaseController.js":function(){
sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/core/UIComponent","sap/m/MessageBox","sap/ui/core/format/DateFormat"],function(e,t,r,n){"use strict";return e.extend("ch.starcons.pfiles.controller.BaseController",{clone:function(e){return JSON.parse(JSON.stringify(e))},createUUID:function(){var e=(new Date).getTime();var t="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){var r=(e+Math.random()*16)%16|0;e=Math.floor(e/16);return(t==="x"?r:r&3|8).toString(16)});return t},findObject:function(e,t,r,n){var o={object:null,index:-1};for(var s=0;s<e.length;s++){if(n&&e[s][r]===t||!n&&e[s][r].toLowerCase()===t.toLowerCase()){o.object=e[s];o.index=s;return o}}return o},getController:function(e){var t=this.getOwnerComponent().byId(`view${e}`);if(t){return t.getController()}else{return null}},getCurrentDate:function(){var e=new Date;e.setHours(0,0,0);return n.getDateInstance({pattern:"yyyy-MM-dd"}).format(e)},getCurrentTime:function(){var e=new Date;return n.getDateInstance({pattern:"HH:mm:ss"}).format(e)},getCurrentTimestamp:function(){return n.getDateTimeInstance({pattern:"yyyyMMddHHmmss"}).format(new Date)},getModel:function(e){if(!this.getView().getModel(e)){return this.getOwnerComponent().getModel(e)}return this.getView().getModel(e)},getProperty:function(e,t){return this.getModel().getProperty(e,t)},getResourceBundle:function(){return this.getModel("i18n").getResourceBundle()},getRouter:function(){return t.getRouterFor(this)},navToHome:function(){this.getRouter().navTo("Files",{layout:this.getController("App").getUIHelper().getNextUIState(0).layout})},setProperty:function(e,t,r,n){this.getModel().setProperty(e,t,r,n)},showMessage:function(e,t,n){if(!t){return}if(typeof t==="string"){if(t.toLowerCase().startsWith("i18n>")){t=this.getResourceBundle().getText(t.substring(5))}}else{t=t.toString()}if(e.toLowerCase()==="s"){r.success(t,{onClose:n})}else if(e.toLowerCase()==="w"){r.warning(t,{onClose:n})}else if(e.toLowerCase()==="e"){r.error(t,{onClose:n})}else if(e.toLowerCase()==="i"){r.information(t,{onClose:n})}},sortObjectArray:function(e,t){e.sort((e,r)=>{var n=e[t].toLowerCase();var o=r[t].toLowerCase();if(n<o){return-1}if(n>o){return 1}return 0})}})});
},
	"ch/starcons/pfiles/controller/Error.controller.js":function(){
sap.ui.define(["ch/starcons/pfiles/controller/BaseController"],function(n){"use strict";return n.extend("ch.starcons.pfiles.controller.Error",{onInit:function(){},onPressNavToHome:function(n){this.navToHome()}})});
},
	"ch/starcons/pfiles/controller/Files.controller.js":function(){
sap.ui.define(["ch/starcons/pfiles/controller/BaseController"],function(t){"use strict";return t.extend("ch.starcons.pfiles.controller.Files",{onInit:function(){this.getRouter().getRoute("Files").attachPatternMatched(this._onPatternMatched,this)},onPressOpenFooter:function(){sap.m.URLHelper.redirect("https://www.starcons.ch",true)},_asyncIteratorPromise:function(t){return new Promise(function(e,n){var i=[];this._asyncIteratorRecursive(t,e,n,i)}.bind(this))},_asyncIteratorRecursive:function(t,e,n,i){t.next().then(function(r){if(r.value){i.push(r);this._asyncIteratorRecursive(t,e,n,i)}else{e(i)}}.bind(this)).catch(function(t){n(t)}.bind(this))},_getRootDirectory:function(){return new Promise(function(t,e){navigator.storage.getDirectory().then(function(e){t(e)}.bind(this)).catch(function(t){e(t)}.bind(this))}.bind(this))},_refresh:function(){this._readDirectory().then(function(t){this.setProperty("/files/nodes",t)}.bind(this)).catch(function(t){this.showMessage("e",t)}.bind(this))},_onPatternMatched:function(t){document.title=`${this.getResourceBundle().getText("title")} - ${this.getResourceBundle().getText("files")}`;this._refresh()},_readDirectory:function(){return new Promise(function(t,e){var n=[];var i={count:0};this._getRootDirectory().then(function(r){this._readDirectoryRecursive(t,e,r,n,n,i,"/")}.bind(this)).catch(function(t){e(t)}.bind(this))}.bind(this))},_readDirectoryRecursive:function(t,e,n,i,r,s,o){s.count++;this._asyncIteratorPromise(n.entries()).then(function(n){for(var c=0;c<n.length;c++){var h=n[c].value[1];var u=n[c].value[0];if(h.kind==="directory"){var a=[];r.push({kind:h.kind,name:u,path:o,nodes:a});this._readDirectoryRecursive(t,e,h,i,a,s,`${o}${u}/`)}else{r.push({kind:h.kind,name:u,path:o})}}s.count--;if(s.count===0){t(i)}}.bind(this)).catch(function(t){e(t)}.bind(this))}})});
},
	"ch/starcons/pfiles/controller/Home.controller.js":function(){
sap.ui.define(["ch/starcons/pfiles/controller/BaseController"],function(t){"use strict";return t.extend("ch.starcons.pfiles.controller.Home",{onInit:function(){this.getRouter().getRoute("Home").attachPatternMatched(this._onPatternMatched,this)},_onPatternMatched:function(t){this.navToHome()}})});
},
	"ch/starcons/pfiles/i18n/i18n.properties":'appDescription=pFiles\nappTitle=pFiles\nbackToHome=Zur\\u00fcck zur Hauptseite\nerror=Fehler\nerrorOccured=Es ist ein Fehler aufgetreten!\nfiles=Dateien\ninfoText=\\u00a9 2025 Starcons GmbH. Alle Rechte vorbehalten\ntitle=Private Dateien\nversion=Version',
	"ch/starcons/pfiles/i18n/i18n_de.properties":'appDescription=pFiles\nappTitle=pFiles\nbackToHome=Zur\\u00fcck zur Hauptseite\nerror=Fehler\nerrorOccured=Es ist ein Fehler aufgetreten!\nfiles=Dateien\ninfoText=\\u00a9 2025 Starcons GmbH. Alle Rechte vorbehalten\ntitle=Private Dateien\nversion=Version',
	"ch/starcons/pfiles/i18n/i18n_de_CH.properties":'appDescription=pFiles\nappTitle=pFiles\nbackToHome=Zur\\u00fcck zur Hauptseite\nerror=Fehler\nerrorOccured=Es ist ein Fehler aufgetreten!\nfiles=Dateien\ninfoText=\\u00a9 2025 Starcons GmbH. Alle Rechte vorbehalten\ntitle=Private Dateien\nversion=Version',
	"ch/starcons/pfiles/i18n/i18n_en.properties":'appDescription=pFiles\nappTitle=pFiles\nbackToHome=Zur\\u00fcck zur Hauptseite\nerror=Fehler\nerrorOccured=Es ist ein Fehler aufgetreten!\nfiles=Dateien\ninfoText=\\u00a9 2025 Starcons GmbH. Alle Rechte vorbehalten\ntitle=Private Dateien\nversion=Version',
	"ch/starcons/pfiles/manifest.json":'{"_version":"1.65.0","sap.app":{"id":"ch.starcons.pfiles","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"1.0.0"},"title":"{{appTitle}}","description":"{{appDescription}}","resources":"resources.json","sourceTemplate":{"id":"@sap/generator-fiori:basic","version":"1.16.5","toolsId":"81221b00-accd-43e1-9551-3bccf13de590"}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"flexEnabled":true,"dependencies":{"minUI5Version":"1.133.0","libs":{"sap.m":{},"sap.ui.core":{},"sap.f":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"ch.starcons.pfiles.i18n.i18n"}},"":{"type":"sap.ui.model.json.JSONModel"}},"resources":{"css":[{"uri":"css/style.css"}]},"routing":{"config":{"routerClass":"sap.f.routing.Router","viewType":"XML","async":true,"viewPath":"ch.starcons.pfiles.view","controlAggregation":"beginColumnPages","controlId":"flexibleColumnLayout","clearControlAggregation":false,"bypassed":{"target":["error"]}},"routes":[{"name":"Home","pattern":"","target":["home"]},{"name":"Files","pattern":"files/layout/{layout}","target":["files"]}],"targets":{"home":{"viewType":"XML","viewId":"viewHome","viewName":"Home","transition":"show"},"files":{"viewType":"XML","viewId":"viewFiles","viewName":"Files","transition":"show"},"error":{"viewType":"XML","viewId":"viewError","viewName":"Error","transition":"show"}}},"rootView":{"viewName":"ch.starcons.pfiles.view.App","type":"XML","id":"viewApp"}}}',
	"ch/starcons/pfiles/model/models.js":function(){
sap.ui.define(["sap/ui/model/json/JSONModel","sap/ui/Device"],function(e,n){"use strict";return{createDeviceModel:function(){var i=new e(n);i.setDefaultBindingMode("OneWay");return i}}});
},
	"ch/starcons/pfiles/sw.js":function(){
self.addEventListener("fetch",function(e){});
},
	"ch/starcons/pfiles/view/App.view.xml":'<mvc:View controllerName="ch.starcons.pfiles.controller.App" xmlns:mvc="sap.ui.core.mvc" displayBlock="true" xmlns="sap.m" xmlns:f="sap.f"><Shell id="shell" appWidthLimited="false" busy="{/app/busy}" busyIndicatorDelay="0"><App id="app"><pages><f:FlexibleColumnLayout id="flexibleColumnLayout" layout="{/app/uistate/layout}" stateChange="onStateChanged" restoreFocusOnBackNavigation="true"/></pages></App></Shell></mvc:View>',
	"ch/starcons/pfiles/view/Error.view.xml":'<mvc:View controllerName="ch.starcons.pfiles.controller.Error" xmlns:mvc="sap.ui.core.mvc" displayBlock="true" xmlns="sap.m"><IllustratedMessage id="illustratedMessageError" title="{i18n>error}" description="{i18n>errorOccured}" illustrationType="sapIllus-ErrorScreen" enableVerticalResponsiveness="true"><additionalContent><Button id="buttonErrorNavToHome" text="{i18n>backToHome}" press="onPressNavToHome" type="Emphasized"/></additionalContent></IllustratedMessage></mvc:View>',
	"ch/starcons/pfiles/view/Files.view.xml":'<mvc:View controllerName="ch.starcons.pfiles.controller.Files" xmlns:mvc="sap.ui.core.mvc" displayBlock="true" xmlns="sap.m" xmlns:semantic="sap.f.semantic" xmlns:core="sap.ui.core"><semantic:SemanticPage id="semanticPageFiles" showFooter="true"><semantic:titleHeading><Title id="titleFiles" text="{i18n>title}"/></semantic:titleHeading><semantic:content><Tree id="treeFiles" items="{/files/nodes}"><headerToolbar><OverflowToolbar id="overflowToolbarFiles"><Title id="titleFilesList" text="{i18n>files}"/></OverflowToolbar></headerToolbar><StandardTreeItem id="standardTreeItemFiles" title="{name}" icon="{= ${kind}===\'directory\' ? \'sap-icon://folder-full\' : \'sap-icon://document\'}" press="onPressItem" type="Active"/></Tree></semantic:content><semantic:footerCustomActions><Button id="buttonFilesFooterVersion" text="{i18n>version}: {/app/version}" enabled="false"/><Button id="buttonFilesFooterText" text="{i18n>infoText}" press="onPressOpenFooter"/></semantic:footerCustomActions></semantic:SemanticPage></mvc:View>\n',
	"ch/starcons/pfiles/view/Home.view.xml":'<mvc:View controllerName="ch.starcons.pfiles.controller.Home" xmlns:mvc="sap.ui.core.mvc" displayBlock="true" xmlns="sap.m" xmlns:semantic="sap.f.semantic"><semantic:SemanticPage id="semanticPageHome"/></mvc:View>\n'
});
//# sourceMappingURL=Component-preload.js.map

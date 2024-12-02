sap.ui.define(["sap/ui/base/Object"],function(e){"use strict";return e.extend("ch.starcons.sbase.js.ExcelHelper",{_aLetters:["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],generateTablesFromExcel:function(e){return new Promise(function(t,n){var r=new ExcelJS.Workbook;r.xlsx.load(e).then(function(){var e=[];r.eachSheet(function(t){var n=[];var r=[];t.eachRow(function(o,a){if(a===1){for(var i=0;i<o.cellCount;i++){n.push(o.values[i+1])}}else if(a>1){var s={};for(var i=0;i<o.cellCount;i++){s[n[i]]=o.values[i+1]}r.push(s)}if(a===t.rowCount){e.push({table:t.name,rows:r})}})});t(e)}.bind(this)).catch(function(e){n(e)}.bind(this))}.bind(this))},generateExcelFromTable:function(e,t){return new Promise(function(n,r){var o=[];for(var a=0;a<e.columns.length;a++){o.push({header:e.columns[a],key:e.columns[a]})}var i=new ExcelJS.Workbook;i.creator=t.getText("excelExportTitle");i.lastModifiedBy=i.creator;i.created=new Date;i.modified=i.created;i.title=i.creator;var s=i.addWorksheet(i.title,{views:[{state:"frozen",ySplit:1}]});s.properties.defaultColWidth=20;s.columns=o;var c=s.columns.length;var l="";if(s.columns.length>26){l=this._aLetters[parseInt(c/26)-1];c=c-26}s.autoFilter={from:"A1",to:`${l+this._aLetters[c-1]}1`};for(a=0;a<e.rows.length;a++){s.addRow(e.rows[a])}s.getRow(1).font={bold:true};s.getRow(1).alignment={horizontal:"center"};i.xlsx.writeBuffer().then(function(e){n(e)}.bind(this)).catch(function(e){r(e)}.bind(this))}.bind(this))}})});
//# sourceMappingURL=ExcelHelper.js.map
function NumberLookup() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var range = sheet.getRange("A2:C");
  
  for (var i = 1; i <= range.getNumRows(); i++) {
    var number = range.getCell(i, 1).getValue();
    
    if (number == "") { continue; }
    
    var url      = "http://unlec.com?num=" + number;
    var response = UrlFetchApp.fetch(url).getContentText();
    
// If only the website was valid html
//    var doc      = XmlService.parse(response);
//    var html     = doc.getRootElement();
//
//    var rowElements = getElementsByTagName(html, 'tr');
//    
//    var carrier = getElementsByTagName(rowElements[14], 'td')[1];
    
    var carrier;
    var carrierIndex = response.indexOf('nn description');
    if (carrierIndex > -1) {
      carrier = response.slice(carrierIndex + 23, -1);
      carrier = carrier.replace(/&nbsp;/g, " ");
      carrier = carrier.slice(0, carrier.indexOf('<'));
    } else {
      carrier = 'Description not found';
    }
    
    var nnType;
    var nnTypeIndex = response.indexOf('nn type');
    if (nnTypeIndex > -1) {
      nnType = response.slice(nnTypeIndex + 16, -1);
      nnType = nnType.replace(/&nbsp;/g, " ");
      nnType = nnType.slice(0, nnType.indexOf('<'));
    } else {
      nnType = 'Type not found';
    }
    
    range.getCell(i, 2).setValue(carrier);
    range.getCell(i, 3).setValue(nnType);
  }
}


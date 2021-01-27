import * as xml2js from 'xml2js';
export class WsdlConsume {
  jsonObj: any = "";
  xmlStr: string = "";
  convertJson(xmlRequest: string) {
    var parseString = xml2js.parseString;
    var data: any;
    parseString(xmlRequest, function (err, result) {
      // console.log(JSON.stringify(result));
      data = result;
    });
    this.jsonObj = data;
    return this.jsonObj;
  }

  convertXml(jsonRequest) {
    try {
      var builder = new xml2js.Builder();
      var data = builder.buildObject(jsonRequest);
      // console.log(data);
      this.xmlStr = data;
      return this.xmlStr;
    } catch (error) {
      throw error;
    }

  }

}

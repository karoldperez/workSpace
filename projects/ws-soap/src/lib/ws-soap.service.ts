import { Injectable } from '@angular/core';
import { WsdlConsume } from './Models/wsdl-consume';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'text/xml',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true'
  })
};

@Injectable({
  providedIn: 'root'
})
export class WsSoapService {

  constructor(public http: HttpClient) { }

  getObject(xml: string) {
    return new Promise<string>((resolve, reject) => {
      if (xml != null && xml != '' && xml != undefined) {
        try {
          let contentRequest: WsdlConsume = new WsdlConsume();
          let bodyJson: any = '';
          bodyJson = contentRequest.convertJson(xml);
          resolve(bodyJson);
        } catch (error) {
          reject(error);
        }
      } else {
        reject('informacion incompleta');
      }
    });
  }

  getDataXMLTrans(xml: string, dataTransform: DataTransform) {
    return new Promise<string>((resolve, reject) => {
      if (xml != null && xml != '' && xml != undefined && dataTransform.arrayData.length > 0) {
        try {
          this.getObject(xml).then((json) => {
            let jsonString = JSON.stringify(json);
            const expRegular = /\[.+?]/g;
            dataTransform.arrayData.forEach((element, contador) => {
              const i = jsonString.lastIndexOf(element.name);
              if (i > 0) {
                const text1 = jsonString.substring(i).split(",");
                const text2 = text1[0].replace(expRegular, '["' + element.value + '"]');
                jsonString = jsonString.replace(text1[0], text2);
              }
              if (contador + 1 == dataTransform.arrayData.length) {
                const jsonObj = JSON.parse(jsonString);
                let contentRequest = new WsdlConsume();
                resolve(contentRequest.convertXml(jsonObj));
              }
            });
          }
          )
        } catch (error) {
          reject(error);
        }
      } else {
        reject('informacion incompleta');
      }
    });
  }

  wsSoap(endpoint: string, body: string) {
    return new Promise<string>((resolve, reject) => {
      if (endpoint != null && endpoint != '' && endpoint != undefined && body != null && body != '' && body != undefined) {
        try {
          this.http.post(endpoint, body, httpOptions).subscribe(data => {
            console.log('Datos resp: ', data);
          }, error => {
            if (error.status == 200) {
              const contentResponse = new WsdlConsume();
              resolve(contentResponse.convertJson(error.error.text));
            }
            else {
              reject(error);
            }
          });
        } catch (error) {
          reject(error);
        }
      } else {
        reject('informacion incompleta');
      }
    });
  }

  getObjectByElement(jsonResponse: any, element: string) {
    return new Promise<string>((resolve, reject) => {
      if (element != null && element != '' && element != undefined) {
        try {
          var xml2js = require("xml2js");
          var xpath = require("xml2js-xpath");

          let contentResponse = new WsdlConsume();
          let bodyString = '';
          bodyString = contentResponse.convertXml(jsonResponse);

          xml2js.parseString(bodyString, function (err, json) {
            var matches = xpath.find(json, "//" + element);
            resolve(matches);
          });

        } catch (error) {
          reject(error);
        }
      } else {
        reject('informacion incompleta');
      }
    });
  }

  getValueById(jsonResponse: any, element: string, id: string) {
    return new Promise<string>((resolve, reject) => {
      if (element != null && element != '' && element != undefined && id != null && id != '' && id != undefined) {
        try {
          var xml2js = require("xml2js");
          var xpath = require("xml2js-xpath");

          let contentResponse = new WsdlConsume();
          let bodyString: any = '';
          bodyString = contentResponse.convertXml(jsonResponse);

          xml2js.parseString(bodyString, function (err, json) {
            var matches = xpath.evalFirst(json, "//" + element, id);
            resolve(matches);
          });
        } catch (error) {
          reject(error);
        }
      } else {
        reject('informacion incompleta');
      }
    });
  }

}

export interface DataTransform {
  arrayData: Data[];
}

interface Data {
  name: string;
  value: string;
}

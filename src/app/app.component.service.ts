import {Injectable} from "@angular/core";
import {Jsonp, Http} from "@angular/http";


@Injectable()
export class HttpService {
    constructor (private _jsonp: Jsonp, private _http: Http) {}
    
    getJSONPMethod(url: string) {
        return this._jsonp.get(url)
            .map(res => res.json());
    }

    getMethod(url: string) {
        return this._http.get(url)
            .map(res => res.json());
    }
}
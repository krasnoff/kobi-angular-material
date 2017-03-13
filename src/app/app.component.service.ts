import {Injectable} from "@angular/core";
import {Jsonp} from "@angular/http";


@Injectable()
export class HttpService {
    constructor (private _jsonp: Jsonp) {}
    
    getJSONPMethod(url: string) {
        return this._jsonp.get(url)
            .map(res => res.json());
            
    }
}
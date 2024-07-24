import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CodecService {
  constructor() {}

  encode(str: string): string {
    return btoa(str);
  }

  decode(str: string): string {
    return atob(str);
  }

  encodeObject(obj: any): string {
    return btoa(JSON.stringify(obj));
  }

  decodeObject(str: string): any {
    return JSON.parse(atob(str));
  }

  isEncoded(str: string): boolean {
    return btoa(atob(str)) === str;
  }

  isEncodedObject(str: string): boolean {
    try {
      return JSON.stringify(JSON.parse(atob(str))) === str;
    } catch (e) {
      return false;
    }
  }
}

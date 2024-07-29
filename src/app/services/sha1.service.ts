import { Injectable } from '@angular/core';

const POW_2_24 = Math.pow(2, 24);
const POW_2_32 = Math.pow(2, 32);

@Injectable({
  providedIn: 'root',
})
export class Sha1Service {
  constructor() {}

  public hash(bufferOrString: any): string {
    let source =
      bufferOrString instanceof ArrayBuffer
        ? bufferOrString
        : this.string2ArrayBuffer(String(bufferOrString));

    let h0 = 0x67452301,
      h1 = 0xefcdab89,
      h2 = 0x98badcfe,
      h3 = 0x10325476,
      h4 = 0xc3d2e1f0,
      i: number,
      sbytes = source.byteLength,
      sbits = sbytes << 3,
      minbits = sbits + 65,
      bits = Math.ceil(minbits / 512) << 9,
      bytes = bits >>> 3,
      slen = bytes >>> 2,
      s = new Uint32ArrayBigEndian(slen),
      s8 = s.bytes,
      j: number,
      w = new Uint32Array(80),
      sourceArray = new Uint8Array(source);

    for (i = 0; i < sbytes; ++i) {
      s8[i] = sourceArray[i];
    }

    s8[sbytes] = 0x80;
    s.set(slen - 2, Math.floor(sbits / POW_2_32));
    s.set(slen - 1, sbits & 0xffffffff);

    for (i = 0; i < slen; i += 16) {
      for (j = 0; j < 16; ++j) w[j] = s.get(i + j);
      for (; j < 80; ++j)
        w[j] = this.lrot(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);

      let a = h0,
        b = h1,
        c = h2,
        d = h3,
        e = h4,
        f: number,
        k: number,
        temp: number;

      for (j = 0; j < 80; ++j) {
        if (j < 20) {
          f = (b & c) | (~b & d);
          k = 0x5a827999;
        } else if (j < 40) {
          f = b ^ c ^ d;
          k = 0x6ed9eba1;
        } else if (j < 60) {
          f = (b & c) ^ (b & d) ^ (c & d);
          k = 0x8f1bbcdc;
        } else {
          f = b ^ c ^ d;
          k = 0xca62c1d6;
        }

        temp = (this.lrot(a, 5) + f + e + k + w[j]) & 0xffffffff;
        e = d;
        d = c;
        c = this.lrot(b, 30);
        b = a;
        a = temp;
      }

      h0 = (h0 + a) & 0xffffffff;
      h1 = (h1 + b) & 0xffffffff;
      h2 = (h2 + c) & 0xffffffff;
      h3 = (h3 + d) & 0xffffffff;
      h4 = (h4 + e) & 0xffffffff;
    }

    return (
      this.hex(h0) + this.hex(h1) + this.hex(h2) + this.hex(h3) + this.hex(h4)
    );
  }

  private hex(n: number): string {
    let s = '';

    for (let i = 7; i >= 0; --i) s += ((n >>> (i << 2)) & 0xf).toString(16);

    return s;
  }

  private lrot(n: number, bits: number): number {
    return (n << bits) | (n >>> (32 - bits));
  }

  private string2ArrayBuffer(s: string): ArrayBuffer {
    s = s.replace(/[\u0080-\u07ff]/g, function (c: string) {
      let code = c.charCodeAt(0);
      return String.fromCharCode(0xc0 | (code >> 6), 0x80 | (code & 0x3f));
    });

    s = s.replace(/[\u0080-\uffff]/g, function (c: string) {
      let code = c.charCodeAt(0);
      return String.fromCharCode(
        0xe0 | (code >> 12),
        0x80 | ((code >> 6) & 0x3f),
        0x80 | (code & 0x3f)
      );
    });

    let n = s.length;
    let array = new Uint8Array(n);

    for (let i = 0; i < n; ++i) array[i] = s.charCodeAt(i);

    return array.buffer;
  }
}

class Uint32ArrayBigEndian {
  bytes: Uint8Array;

  constructor(length: number) {
    this.bytes = new Uint8Array(length << 2);
  }

  get(index: number): number {
    index <<= 2;

    return (
      this.bytes[index] * POW_2_24 +
      ((this.bytes[index + 1] << 16) |
        (this.bytes[index + 2] << 8) |
        this.bytes[index + 3])
    );
  }

  set(index: number, value: number) {
    let high = Math.floor(value / POW_2_24);
    let rest = value - high * POW_2_24;

    index <<= 2;

    this.bytes[index] = high;
    this.bytes[index + 1] = rest >> 16;
    this.bytes[index + 2] = (rest >> 8) & 0xff;
    this.bytes[index + 3] = rest & 0xff;
  }
}

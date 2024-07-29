import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { CodecService } from './services/codec.service';
import sha1 from 'sha1';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgbNavModule, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'base64-codec';
  enablePrettify = new FormControl(true);

  encoderInput = new FormControl('');

  encoderOutput: string = '';

  decoderInput = new FormControl('');
  decoderOutput: string = '';
  parsedOutput: string = '';

  hashingInput = new FormControl('');
  hashingAlgorithm = new FormControl('sha1');
  hashingOutput: string = '';

  constructor(private codecService: CodecService) {
    this.encoderInput.valueChanges.subscribe(() => this.encode());
    this.decoderInput.valueChanges.subscribe(() => this.decode());
  }

  encode() {
    this.encoderOutput = this.codecService.encode(
      this.encoderInput.value ?? ''
    );
  }

  decode() {
    this.decoderOutput = this.codecService.decode(
      this.decoderInput.value ?? ''
    );

    if (this.isValidJson(this.decoderOutput)) {
      this.parsedOutput = JSON.stringify(
        JSON.parse(this.decoderOutput),
        undefined,
        2
      );
    } else {
      this.parsedOutput = this.decoderOutput;
    }
  }

  isValidJson(str: string): boolean {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  }

  hash() {
    console.log(
      'Hashing input: ' +
        this.hashingInput.value +
        ' with algorithm: ' +
        this.hashingAlgorithm.value
    );
    this.hashingOutput = sha1(this.hashingInput.value + '');
  }

  select($event: any) {
    console.log($event.srcElement.select());
  }
}

import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { CodecService } from './services/codec.service';

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
  decoderInput = new FormControl('');

  encoderOutput: string = '';
  decoderOutput: string = '';
  parsedOutput: string = '';

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
}

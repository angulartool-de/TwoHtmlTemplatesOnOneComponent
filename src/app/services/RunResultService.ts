import {Injectable} from '@angular/core';
import {VariableBuilder} from "../classes/variable-builder";

@Injectable({
  providedIn: 'root'
})
export class RunResultService {

  constructor() {
  }

  RunResult(result: VariableBuilder): number {
    result.inputStr.set(result.nominalValue().toString()); // to get the correct HTML status
    return (result.nominalValue());
  }
}


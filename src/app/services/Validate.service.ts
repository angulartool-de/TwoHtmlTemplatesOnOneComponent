import {Injectable} from '@angular/core';
import {VariableBuilder} from "../classes/variable-builder";


@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() {
  }

  validate(obj: VariableBuilder): VariableBuilder {
    obj.inputStr.set((obj.inputStr().replace(/,/, '.'))); // to have German or English comma , & .
    obj.nominalValue.set(parseFloat(obj.inputStr()))
    return obj;
  }


}

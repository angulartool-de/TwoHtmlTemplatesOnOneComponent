import {signal} from "@angular/core";

export class VariableBuilder {

  /* for simple example no Interface will be used*/

  /* varName will be called within the HTML #FOR loop */
  public varName = signal('varName');
  public varLabel = signal('varLabel');
  public varSymbol = signal('varSymbol');

  /* unitBase will be similar to SI unit of the variable*/
  public readonly unitBase = signal('unitBase');

  public inputStr = signal('inputStr');
  /* calculated value based on the input value and unitActual */
  public nominalValue = signal(0);

  public onlyResult = signal<boolean>(false);

  constructor(varName: string, unitBase: string, nominalValue: number = 0, varLabel: string = '', varSymbol: string = '', onlyResult: boolean = false) {
    this.varName.set(varName);
    this.unitBase.set(unitBase);
    this.nominalValue.set(nominalValue);
    this.varLabel.set(varLabel);
    this.varSymbol.set(varSymbol);
    this.onlyResult.set(onlyResult);
    this.inputStr.set(nominalValue.toString());
  }
}

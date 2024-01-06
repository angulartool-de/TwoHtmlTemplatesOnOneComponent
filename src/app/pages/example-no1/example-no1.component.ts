import {Component, inject, OnInit, signal} from '@angular/core';
import {VariableBuilder} from "../../classes/variable-builder";
import {ValidateService} from "../../services/Validate.service";
import {RunResultService} from "../../services/RunResultService";
import {DecimalPipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {jgInputStringRestrictionDirective} from "../../directives/InputStringRestrictive.directive";
import {FormsModule} from "@angular/forms";
import {jgInputRestrictionDirective} from "../../directives/InputRestriction.directive";

@Component({
  selector: 'jg-example-no1',
  standalone: true,
  imports: [
    NgIf,
    NgOptimizedImage,
    jgInputStringRestrictionDirective,
    FormsModule,
    NgForOf,
    DecimalPipe,
    jgInputRestrictionDirective
  ],
  templateUrl: '../../html-templates/CommonTemplate.html',
  styleUrl: './example-no1.component.scss'
})
export class ExampleNo1Component implements OnInit {

  /* Initiate the requested variables for the complete formular
     Will be setup for each individual component  */

  public F = (new VariableBuilder('F', 'N', 0, 'Force', 'F'));
  public L = (new VariableBuilder('L', 'mm', 0, 'Length ', 'L'));
  public Mt = (new VariableBuilder('Mt', 'Nmm', 0, 'Bending-Moment', 'Mt'));


  /* Create the variable for binding for the common HTML
   Will be used unchanged for each individual component  */
  public htmlButtonName = signal('Example No.1 Component');
  public M = signal('Message'); // for logging propose at browser side, not console

  public htmlNameOfCalculation = signal('Bending-Moment Calc No. 1 e.g.');
  public jpgSource: string = "" // if a image will be shown
  public variableList: any[] = []; // List for the HTML scaffolding
  public visibleCalc = signal(false)

  private Validate = inject(ValidateService)  // will check and correct the correct number input for dot and comma
  private ResultService = inject(RunResultService)  // is used if RPN is used (not in this excample


  ngOnInit(): void {

    /*Create a variableList to get the Html scaffolding for variables and HTML codes */

    this.variableList.push(
      this.F,
      this.L,
      this.Mt
    )


    /* Will be used unchanged for each individual component
       as e.g. for store utilities not shown here  */

  }  // End of OnInit

  /* Code which will be used for each individual component*/


  /*Function keyup(obj) trigger by the HTML input*/
  keyup(obj: VariableBuilder): void {

    this.Validate.validate(obj)
    const FunctionCall = 'keyup_' + obj.varName();
    this.M.set('Validate: ' + ' ' + FunctionCall + '-> '); // for logging in browser, not console
    // this.M.set(this.M() +'Fx: '+' '+ FunctionCall+'-> '); // for logging in browser, not console

    try {
      /*this[FunctionCall](obj) will call a specified individual funktion in relation to the input */
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      this[FunctionCall](obj);

    } catch (e) {
      /* if no specified function wil lbe found, no error should occur and "standard" procedure "calc" will call */
      //  this.M.set(this.M() +': ErrorCatch ' );// for logging in browser, not console
      //that conversion is only for demo example
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment


      this.calc();

    }


  }

  public keyup_Mt(obj: VariableBuilder): void {

    const Mt = obj.nominalValue();    /* This kind of variable destruction is only for this example*/
    const L = this.L.nominalValue();  /* in real world a another RPN (return Polish Notation) Methode will be used */
    const x = Mt / L;
    this.F.nominalValue.set(x);
    this.ResultService.RunResult(this.F)       /*RPN Methode will also delegate the result correctly*/

    // this.M.set(this.M() + ' keyup_Mt() ' + Mt + ' --) ');    // for logging in browser, not console
  }


  /* general calc() will be used by a) tigger by more input changes or updating more variable results*/

  calc(): void {

    // this.M.set(this.M() + ' Calc() ');          // for logging in browser, not console
    const F = this.F.nominalValue();    /* This kind of variable destruction is only for this example*/
    const L = this.L.nominalValue();    /* in real world a another RPN (return Polish Notation) Methode will be used */

    this.Mt.nominalValue.set(F * L);             /*RPN Methode will also delegate the result correctly*/

    // this.M.set(this.M() + '.. ' + this.Mt.nominalValue());   // for logging in browser, not console

    this.ResultService.RunResult(this.Mt)
  }
}

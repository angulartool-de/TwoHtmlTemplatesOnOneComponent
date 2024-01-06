import {Component, inject, OnInit, signal} from '@angular/core';
import {VariableBuilder} from "../../classes/variable-builder";
import {ValidateService} from "../../services/Validate.service";
import {RunResultService} from "../../services/RunResultService";
import {DecimalPipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {jgInputStringRestrictionDirective} from "../../directives/InputStringRestrictive.directive";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'jg-example-no2',
  standalone: true,
  imports: [
    NgIf,
    NgOptimizedImage,
    jgInputStringRestrictionDirective,
    FormsModule,
    NgForOf,
    DecimalPipe
  ],
  templateUrl: '../../html-templates/CommonTemplate.html',
  styleUrl: './example-no2.component.scss'
})

export class ExampleNo2Component implements OnInit {

  /* Initiate the requested variables for the complete formular
     Will be setup for each individual component  */

  public D = (new VariableBuilder('D', 'N', 0, 'Diameter', 'D'));
  public r = (new VariableBuilder('r', 'mm', 0, 'Radius ', 'r'));
  public A = (new VariableBuilder('A', 'Nmm', 0, 'Area', 'A'));


  /* Create the variable for binding for the common HTML
   Will be used unchanged for each individual component  */
  public htmlButtonName = signal('Example No.2 with Added HTML Component');
  public M = signal('Message'); // for logging propose at browser side, not console

  public htmlNameOfCalculation = signal ('Circle Calculation No.2 e.g.');
  public jpgSource: string = "" // if a image will be shown
  public variableList: any[] = []; // List for the HTML scaffolding
  public visibleCalc = signal(false)

  private Validate = inject(ValidateService)  // will check and correct the correct number input for dot and comma
  private ResultService = inject(RunResultService)  // is used if RPN is used (not in this excample


  ngOnInit(): void {

    /*Create a variableList to get the Html scaffolding for variables and HTML codes */

    this.variableList.push(
      this.D,
      this.r,
      this.A
    )

    /* Will be used unchanged for each individual component
       as e.g. for store utilities not shown here  */

  }  // End of OnInit

  /* Code which will be used for each individual component*/


  /*Function keyup(obj) trigger by the HTML input*/
  keyup(obj: VariableBuilder): void {
    this.M.set('') ;

    this.Validate.validate(obj)

    if (this.A.varName() == obj.varName())  // in hope to get the cross references from added HTML to common HTML
    {
      this.A.inputStr.set(obj.inputStr());
      this.A.nominalValue.set(obj.nominalValue());
      obj = this.A ;   // reference of 'A' to obj

      this.M.set(this.M() + ' ?this.A = obj ')
    }

    this.M.set(this.M() +' obj.varName= ' + obj.varName());

    const FunctionCall = 'keyup_' + obj.varName();

    this.M.set(this.M() + ' Validate: ' + ' ' + FunctionCall + '-> '); // for logging in browser, not console
    this.M.set(this.M() + 'Fx: ' + ' ' + FunctionCall + '-> '); // for logging in browser, not console



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


  keyup_D(obj: VariableBuilder): void {
    this.r.nominalValue.set(this.D.nominalValue() / 2);  /* This kind of variable destruction is only for this example*/
    this.ResultService.RunResult(this.r);  /* in real world a another RPN (return Polish Notation) Methode will be used */
    this.M.set(this.M() + ' : SubSeq: keyup_D() '); // for logging in browser, not console
    this.calc()
  }

  keyup_r(obj: VariableBuilder): void {
    this.D.nominalValue.set(this.r.nominalValue() * 2);  /* This kind of variable destruction is only for this example*/
    this.ResultService.RunResult(this.D);  /* in real world a another RPN (return Polish Notation) Methode will be used */
    this.M.set(this.M() + ' : SubSeq: keyup_r() '); // for logging in browser, not console

    this.calc()
  }


  keyup_A(obj: VariableBuilder): void {

    this.A.nominalValue.set(this.A.nominalValue()) // try to re-trigger common template without success
    this.ResultService.RunResult(this.A);// try to re-trigger common template without success

    this.r.nominalValue.set(Math.pow((this.A.nominalValue() / Math.PI), 0.5));  /* This kind of variable destruction is only for this example*/
    this.ResultService.RunResult(this.r);  /* in real world a another RPN (return Polish Notation) Methode will be used */

    this.D.nominalValue.set(this.r.nominalValue() * 2)    /* This kind of variable destruction is only for this example*/
    this.ResultService.RunResult(this.D);  /* in real world a another RPN (return Polish Notation) Methode will be used */

    this.M.set(this.M() + ' : SubSeq: keyup_A() '); // for logging in browser, not console

    this.calc()
  }


  /* general calc() will be used by a) tigger by more input changes or updating more variable results*/
  calc(): void {
    this.M.set(this.M() + ' : SubSeq:calc() '); // for logging in browser, not console

    this.A.nominalValue.set(this.D.nominalValue() * this.D.nominalValue() * Math.PI / 4);     /*RPN Methode will also deligate the result correctly*/
    this.ResultService.RunResult(this.A)
  }

}

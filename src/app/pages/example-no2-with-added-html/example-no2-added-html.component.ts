import {Component} from '@angular/core';
import {ExampleNo2Component} from "./example-no2.component";
import {jgInputRestrictionDirective} from "../../directives/InputRestriction.directive";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'jg-example-no2-added-html',
  standalone: true,
  imports: [
    ExampleNo2Component,
    jgInputRestrictionDirective,
    FormsModule
  ],
  templateUrl: './example-no2-added-html.component.html',
  styleUrl: './example-no2.component.scss'
})
export class ExampleNo2AddedHTMLComponent extends ExampleNo2Component {

  constructor() {
    super();


  }


  // override keyup(obj: VariableBuilder){
  //   this.M.set(this.M()+' call of:'+obj.varName());  // only for demonstration reason
  //
  //   super.keyup(obj)
  //
  // }

}

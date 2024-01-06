import {Component} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {ExampleNo1Component} from "./pages/example-no1/example-no1.component";
import {ExampleNo2Component} from "./pages/example-no2-with-added-html/example-no2.component";
import {ExampleNo2AddedHTMLComponent} from "./pages/example-no2-with-added-html/example-no2-added-html.component";

@Component({
  selector: 'jg-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ExampleNo1Component, ExampleNo2Component, ExampleNo2AddedHTMLComponent, NgOptimizedImage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'TestAngular17';
}


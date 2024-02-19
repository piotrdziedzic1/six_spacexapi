import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainComponent } from "./main/main.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
        RouterModule,
        MainComponent,
    ],
})
export class AppComponent {
    
}

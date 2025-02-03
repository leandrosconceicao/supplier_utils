import { Routes } from '@angular/router';
import { FiscalComponent } from './pages/fiscal/fiscal.component';

export const routes: Routes = [
    {
        path: "fiscal",
        component: FiscalComponent
    },
    {
        path: "",
        component: FiscalComponent
    }
];

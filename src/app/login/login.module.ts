import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { firebaseConfig } from '../../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule} from '@angular/fire/auth';
import { LoginPage } from './login.page';
import { HttpClientModule} from "@angular/common/http";

@NgModule({
  imports: [
    AngularFireModule.initializeApp(firebaseConfig), 
    AngularFireAuthModule,
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: '',
        component: LoginPage
      }
    ])
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}

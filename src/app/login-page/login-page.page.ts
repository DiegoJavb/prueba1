import { ChatService, Message } from './../services/chat.service';
import { ChatPagePage } from './../chat-page/chat-page.page';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
})
export class LoginPagePage implements OnInit {
  credentialForm: FormGroup;

  constructor(
    private fb:FormBuilder,
    private router:Router,
    private alertControlles:AlertController,
    private loadingController:LoadingController,
    private chatService:ChatService,
  ) { }

  ngOnInit() {
    this.credentialForm =this.fb.group({
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(6)]]
    })
  }

  async signUp(){
    const loading = await this.loadingController.create();
    await loading.present();

    this.chatService.singUp(this.credentialForm.value)
    .then(user=>{
      loading.dismiss();
      this.router.navigateByUrl('/chat-page',{replaceUrl:true});
    },async err => {
      loading.dismiss();
      const alert= await this.alertControlles.create({
        header:'sign up failed',
        message:err.message,
        buttons:['Ok']
      });
      await alert.present();
    }
    );
  }

  async signIn(){
    const loading = await this.loadingController.create();
    await loading.present();

    this.chatService.signIn(this.credentialForm.value)
    .then(user=>{
      loading.dismiss();
      this.router.navigateByUrl('/chat-page',{replaceUrl:true});
    },async err => {
      loading.dismiss();
      const alert= await this.alertControlles.create({
        header:':(',
        message:err.message,
        buttons:['Ok']
      });
      await alert.present();
    }
    );
  }

  get email(){
    return this.credentialForm.get('email');
  }

  get password(){
    return this.credentialForm.get('password');
  }

}

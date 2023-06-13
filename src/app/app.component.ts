import { Component, OnInit } from '@angular/core';

import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { FilesService } from './services/files.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  imgURL = 'https://www.w3schools.com/howto/img_avatar.png';
  showImg = true;

  imgFile = '';

  constructor(
    private authService: AuthService,
    private fileService: FilesService,
    private tokenService: TokenService
  ){}

  ngOnInit(): void {
    const token = this.tokenService.getToken();
    if(token){
      this.authService.getProfile()
        .subscribe()
    }
  }

  /*onLoaded(img:string){
    //console.log('esta llegando al padre', img);
  }*/
  toggleImg(){
    this.showImg = !this.showImg;
  }

  downloadPDF(){
    this.fileService.getFile('my-pdf', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf')
    .subscribe();
  }
  onLoad(event: Event): void {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.fileService.uploadFile(file)
        .subscribe(res => {
          console.log(res);
          this.imgFile = res.location;
        });
    }
  }
}

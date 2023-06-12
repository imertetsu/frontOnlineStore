import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, AfterViewInit, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent {

  @Input() img = '';
  @Output() loaded = new EventEmitter<string>();
  counter = 0;
  counterFn: number | undefined;

  constructor(){
    //before render - run once
    //console.log('constructor', 'imgValue =>', this.img);
  }

  onErrorImg(){
    this.img = '../../../assets/images/default-img.png';
    //console.log(this.parrafoDefault);
  }

  imgLoaded(img:string){
    //console.log('imagen loaded');
    this.loaded.emit(img);
  }
}

  /* ngOnInit(): void {
    //before render - run once
    //async
    console.log('ngOnInit', 'imgValue =>', this.img);
    this.counterFn = window.setInterval(()=>{
      this.counter +=1;
      console.log("contador" + this.counter);
    }, 1000);
  }
  ngOnChanges(changes: SimpleChanges): void {
    //run while there is any update
    //console.log(changes, 'ngOnChanges', 'imgValue =>', this.img);
  }
  ngAfterViewInit(): void {
    //after render
    //console.log('ngAfterViewInit', 'imgValue =>', this.img);
  }
  ngOnDestroy(): void {
    //console.log('ngOnDestroy');
    //delete component
    window.clearInterval(this.counterFn);
  }*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs';
import { saveAs } from 'file-saver';

interface File {
  originalname: string;
  filename: string;
  location: string;
}

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getFile(name: string, url: string, type: string){
    //con esto solo tenemos el contenido del archivo
    return this.httpClient.get(url, { responseType: 'blob'})
      .pipe(
        //con esto lo descargamos
        tap(content => {
          const blob = new Blob([content], { type });
          saveAs(blob, name);
        }),
        //como ya no se necesita el contenido lo transformamos en true cuando se descargue
        map(()=> true)
      );
  }
  uploadFile(file: Blob){
    const form = new FormData();
    form.append('file', file);
    return this.httpClient.post<File>(`https://young-sands-07814.herokuapp.com/api/files/upload`, form, {
      /*headers: {
        'Content-type': 'multipart/form-data'
      }*/
    });
  }
}

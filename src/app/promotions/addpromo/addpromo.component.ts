import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Promo } from 'src/app/models/promotion-model';
import { FilesService } from 'src/app/services/files.service';
import { PromotionService } from 'src/app/services/promotion.service';



@Component({
  selector: 'app-addpromo',
  templateUrl: './addpromo.component.html',
  styleUrls: ['./addpromo.component.css']
})
export class AddpromoComponent implements OnInit {

  selectedFile:any;
  name!: string;
  description!: string;
  obj:Promo=new Promo();

  constructor(private service:PromotionService, private form:FormBuilder, private fileservice:FilesService) { }

  onFileSelected(event:any){
    if (event.target.files.length > 0){
      const file = event.target.files[0];
      this.selectedFile=file;
    }
    
  }

  onUpload(){
    const promo= new Promo();
    const formData = new FormData();
    formData.append('file',this.selectedFile);
    this.fileservice.postFile(formData).subscribe(data=>{
    promo.nom=this.name;
    promo.description=this.description;
    promo.image=data.imgUrl;
    this.service.Ajouter(promo).subscribe(data=>{
      console.log('it works')
    })
    })
    

  }
  ajouter(f:NgForm){

  }
  ngOnInit(): void {
  }

  
}
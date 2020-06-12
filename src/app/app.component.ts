import { Component } from '@angular/core';
import { FormBuilder,AbstractControl, FormGroup,FormControl, Validators } from '@angular/forms';
import {ShortningUrlService} from "./services/shortning-url.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'UrlShortner';
  submitted = false;
  UrlshortnerForm: FormGroup;
  shortenedUrl="";
  processing=false;
  error_msg="";

  constructor(private formBuilder: FormBuilder,private service:ShortningUrlService) {
  }

  ngOnInit() {
    this.UrlshortnerForm = this.formBuilder.group({
      long_url: ['', [Validators.required]],
    });

  }

  get f() { return this.UrlshortnerForm.controls; }


  onSubmit() {
    this.submitted = true;
    this.error_msg="";

    // stop here if form is invalid
    if (this.UrlshortnerForm.invalid) {
      return;
    }
    let url_input=this.UrlshortnerForm.value['long_url']
    this.processing=true;
    this.service.shortenUrl(url_input).subscribe(
      (result: any) => {
        let short_url:string=result['link'];
        //alert(short_url);
        this.shortenedUrl=short_url;
        this.processing=false;
      },
      (error: any) => {
        this.processing=false;
        this.error_msg=error['error']['description'];
      }
    );
  }
  checkContent(){
    let form_data=this.UrlshortnerForm.value
    //if(form_data['long_url']===''){
      this.shortenedUrl="";
      this.error_msg="";
    //}
  }

}



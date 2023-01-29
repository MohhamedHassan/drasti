import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/screens/auth/services/auth.service';

@Component({
  selector: 'app-send-now',
  templateUrl: './send-now.component.html',
  styleUrls: ['./send-now.component.scss']
})
export class SendNowComponent implements OnInit {
  sendnowForm:FormGroup
  submitLoading=false
  submited=false
  constructor(private fb:FormBuilder,
    private authService:AuthService,
    private router:Router,
    private toastr:ToastrService) { }

  ngOnInit(): void {
    this.sendnowForm=this.fb.group({
      name:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      message:['',Validators.required]
    })
  }
  senMsg() {
    this.submited=true
    if(this.sendnowForm.valid) {
      this.submitLoading=true
      this.authService.contact_us(this.sendnowForm.value).subscribe(
        res =>  {
          this.toastr.success('تم الارسال بنجاح')
          this.router.navigate(['/'])
        }, err => {
          this.submitLoading=false
        }
      )
      
    }
  }
}

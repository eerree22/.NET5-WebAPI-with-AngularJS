import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';

@Component({
  selector: 'app-payment-detail-form',
  templateUrl: './payment-detail-form.component.html',
  styles: [
  ]
})
export class PaymentDetailFormComponent implements OnInit {

  constructor(public service:PaymentDetailService,private toaster:ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){

    if (this.service.formData.paymentDetailsId == 0)//如果畫面上的隱藏欄位(paymentDetailsId)中的值為0代表是新增 
    {
      this.insertRecord(form);
    } 
    else //不為0則為修改
    {
      this.updateRecord(form);
    }
  }

  insertRecord(form:NgForm)
  {
    this.service.postPaymentDetail().subscribe({
      next: (v) => {
        this.toaster.success('信用卡資料新增成功','信用卡詐騙網站')
        this.resetForm(form);//清空左邊表單和建立空的MODEL
        this.service.refreshList();//讓右邊列表在資料更新後同步更新
      },
      error: (e) => console.log(e)
    });
  }

  updateRecord(form:NgForm)
  {
    this.service.putPaymentDetail().subscribe({
      next: (v) => {
        this.toaster.success('信用卡資料修改成功','信用卡詐騙網站')
        this.resetForm(form);//清空左邊表單和建立空的MODEL
        this.service.refreshList();//讓右邊列表在資料更新後同步更新
      },
      error: (e) => console.log(e)
    });
  }

  resetForm(form:NgForm)
  {
    form.form.reset();
    this.service.formData = new PaymentDetail();
  }
}

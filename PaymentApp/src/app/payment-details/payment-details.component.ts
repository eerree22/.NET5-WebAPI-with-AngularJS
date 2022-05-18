import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetail } from '../shared/payment-detail.model';
import { PaymentDetailService } from '../shared/payment-detail.service';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styles: [
  ]
})
export class PaymentDetailsComponent implements OnInit {

  constructor(public service:PaymentDetailService,private toaster:ToastrService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }

  updateForm(selectedRecord:PaymentDetail)
  {
    this.service.formData = Object.assign({},selectedRecord);
  }

  onDelete(id:number)
  {
    if (confirm('確定要刪除該信用卡資料嗎?')) 
    {
      this.service.deletePaymentDetail(id).subscribe({
        next: (v) => {
          this.toaster.error('信用卡資料刪除成功','信用卡詐騙網站')
          this.service.refreshList();//讓右邊列表在資料更新後同步更新
        },
        error: (e) => console.log(e)
      });
    }
  }
}

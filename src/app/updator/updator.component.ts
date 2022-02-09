import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {NgForm} from "@angular/forms";

interface Item {
  description: string;
  quantity: number;
  cost: number;
  share: number;
}

@Component({
  selector: 'app-updator',
  templateUrl: './updator.component.html',
  styleUrls: ['./updator.component.css']
})
export class UpdatorComponent implements OnInit {
  groceries: Array<Item> = [];
  total_share_cost: number = 0;

  constructor(config: NgbModalConfig, private modalService: NgbModal, private route: ActivatedRoute) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        let groceries_list = JSON.parse(atob(decodeURIComponent(params['emb'])));
        for (let i = 0; i < groceries_list.length; i++) {
          groceries_list[i].share = groceries_list[i].share || 0;
          this.total_share_cost += groceries_list[i].share;
        }
        this.groceries = groceries_list;
        this.refresh_total_share_cost();
      });
  }

  open(content: any) {
    this.modalService.open(content);
  }

  refresh_total_share_cost() {
    for (let i = 0; i < this.groceries.length; i++) {
      let per_share = this.groceries[i].cost / this.groceries[i].quantity;
      this.total_share_cost += per_share * this.groceries[i].share;
    }
  }

  update_share(index: number, item_form: NgForm) {
    this.groceries[index].share = item_form.value.share;
    this.refresh_total_share_cost();
  }

  serialize_groceries_list() {
    alert(encodeURIComponent(btoa(JSON.stringify(this.groceries))));
  }
}

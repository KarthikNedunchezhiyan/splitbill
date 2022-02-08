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
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        let groceries_list = JSON.parse(atob(decodeURIComponent(params['emb'])));
        for (let i = 0; i < groceries_list.length; i++)
          groceries_list[i].share = groceries_list[i].share || 0;
        this.groceries = groceries_list;
      });
  }

  open(content: any) {
    this.modalService.open(content);
  }

  update_share(index: number, item_form: NgForm) {
    let per_share = this.groceries[index].cost / this.groceries[index].quantity;
    this.total_share_cost -= per_share * this.groceries[index].share;

    this.groceries[index].share = item_form.value.share;
    this.total_share_cost += per_share * this.groceries[index].share;
  }
}

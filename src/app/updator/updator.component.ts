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

  constructor(config: NgbModalConfig, private modalService: NgbModal, private route: ActivatedRoute) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        let groceries_list = JSON.parse(atob(decodeURIComponent(params['emb'])));
        for (let i = 0; i < groceries_list.length; i++)
          if (groceries_list[i].share == undefined)
            groceries_list[i].share = -1;

        this.groceries = groceries_list;
      });
  }

  open(content: any) {
    this.modalService.open(content);
  }

  update_share(index: number, item_form: NgForm) {
    if (item_form.value.split_mode.length)
      this.groceries[index].share = item_form.value.split_mode === "opt_out" ? 0 : -1;
    else
      this.groceries[index].share = item_form.value.share;
  }

  share_cost(index: number) {
    return ((this.groceries[index].cost / this.groceries[index].quantity) * this.groceries[index].share).toFixed(2);
  }

  serialize_groceries_list() {
    let serialized_groceries_data = encodeURIComponent(btoa(JSON.stringify(this.groceries)));
    console.log(serialized_groceries_data);
    navigator.clipboard.writeText(serialized_groceries_data);
    alert("Hash copied to clipboard!");
  }
}

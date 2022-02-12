import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';

interface Item {
  description: string;
  quantity: number;
  cost: number;
}

@Component({
  selector: 'app-initiator',
  templateUrl: './initiator.component.html',
  styleUrls: ['./initiator.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class InitiatorComponent implements OnInit {
  groceries: Array<Item> = [];
  bill_total = 0;

  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
  }

  open(content: any) {
    this.modalService.open(content);
  }

  add_grocery_item(product_details: Item) {
    this.groceries.push(product_details);
    this.bill_total += product_details.cost;
  }

  remove_grocery_item(item_index: number) {
    let item = this.groceries.splice(item_index, 1)[0];
    this.bill_total -= item.cost;
  }

  item_submit(item_form: NgForm) {
    this.add_grocery_item(item_form.value);
    item_form.reset();
  }

  serialize_groceries_list() {
    let serialized_string = encodeURIComponent(btoa(JSON.stringify(this.groceries)));
    navigator.clipboard.writeText(`/updater?emb=${serialized_string}`);
    alert("Url copied to clipboard!");
  }
}

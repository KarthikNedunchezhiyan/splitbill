import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {ClipboardService} from 'ngx-clipboard';

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

  constructor(config: NgbModalConfig, private modalService: NgbModal, private clipboardService: ClipboardService) {
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
    let serialized_string = `/updater?emb=${encodeURIComponent(btoa(JSON.stringify(this.groceries)))}`;
    console.log(serialized_string);
    let copy_status = this.clipboardService.copyFromContent(serialized_string);
    alert(copy_status ? "✅ Copied to URL to clipboard" : "⚠️ Unable to copy URL to clipboard!");
  }
}

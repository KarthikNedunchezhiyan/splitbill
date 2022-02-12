import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";

interface Item {
  description: string;
  quantity: number;
  cost: number;
  share: number;
  share_cost: number;
}

@Component({
  selector: 'app-tally',
  templateUrl: './tally.component.html',
  styleUrls: ['./tally.component.css']
})
export class TallyComponent implements OnInit {
  groceries_hash_list: Array<[string, string]> = [];

  groceries_final_list: Array<Array<Item>> = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  add_hash(hash_form: NgForm) {
    this.groceries_hash_list.push([hash_form.value.name, hash_form.value.hash]);
    hash_form.reset();
  }

  generate_bill() {
    let groceries_list: Array<Array<Item>> = this.groceries_hash_list.map(hash => JSON.parse(atob(decodeURIComponent(hash[1]))));
    for (let i = 0; i < groceries_list[0].length; i++) {
      let quantity = groceries_list[0][i].quantity;
      let shares = 0;
      let fair_share_indexes = [];
      for (let j = 0; j < groceries_list.length; j++) {
        if (groceries_list[j][i].share === -1) {
          fair_share_indexes.push(j);
        } else {
          shares += groceries_list[j][i].share;
        }
      }

      if (quantity - shares < 0) {
        alert(`"${groceries_list[0][i].description}" not tallied! "${shares - quantity}" is over-claimed!`);
        return;
      }

      if (fair_share_indexes.length === 0 && shares != quantity) {
        alert(`"${groceries_list[0][i].description}" not tallied! "${quantity - shares}" quantity is unclaimed!`);
        return;
      }

      for (let j = 0; j < fair_share_indexes.length; j++) {
        groceries_list[fair_share_indexes[j]][i].share = (quantity - shares) / fair_share_indexes.length;
      }

      for (let j = 0; j < groceries_list.length; j++) {
        groceries_list[j][i].share_cost = Number(((groceries_list[j][i].share / groceries_list[j][i].quantity) * groceries_list[j][i].cost).toFixed(2));
      }
    }

    this.groceries_final_list = groceries_list;
  }

  get_total_cost() {
    let total_cost = 0;
    for (let i = 0; i < this.groceries_final_list[0].length; i++) {
      total_cost += this.groceries_final_list[0][i].cost;
    }

    return total_cost.toFixed(2);
  }

  get_total_share_cost(index: number) {
    let total_share_cost = 0;
    for (let i = 0; i < this.groceries_final_list[index].length; i++) {
      total_share_cost += this.groceries_final_list[index][i].share_cost;
    }

    return total_share_cost.toFixed(2);
  }
}

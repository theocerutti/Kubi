import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Form, FormControl } from '@angular/forms';

import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public health: object | string = {};
  public healthy: string = null;

  public products: object[] = [];

  public imagePath: string = '';
  public formError: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.refreshState();
    this.searchProducts();
    setInterval(() => {
      this.refreshState();
    }, 1000);
  }

  private refreshState() {
    this.http.get<object>(environment.api_endpoint + '/health')
      .subscribe(
        (res: object) => {
          this.health = res;
          this.healthy = 'good-job-bro';

          if (!!res['mysql_migrations'] && res['mysql_migrations'] != "healthy")
            this.healthy = 'not-that-bad';
          if (!!res['mysql'] && res['mysql'] != "healthy")
            this.healthy = 'argh';
        },
        (err) => {
          this.health = 'Failed to request backend';
          this.healthy = 'argh';
          console.error(err);
        },
      );
  }

  public searchProducts(query: string = '') {
    // quick and dirty polling
    this.http.get<object[]>(environment.api_endpoint + '/product?q=' + query)
      .subscribe(
        (products: object[]) => {
          this.products = products;
        },
        (err) => {
          this.products = [];
          console.error(err);
        },
      );
  }

  public createProduct(data: object) {
    if (data['name'].length == 0 || data['description'].length == 0 || data['image'].length == 0) {
      this.formError = 'Missing param';
      return;
    }

    const body = {
      'name': data['name'],
      'description': data['description'],
      'image': data['image'],
    };
    console.log('New product:', body);

    this.http.post<object>(environment.api_endpoint + '/product', body)
      .subscribe(
        (product: object) => {
          this.imagePath = '';
          this.formError = '';
        },
        (err) => {
          this.formError = err.error.message;
          console.error(err);
        },
      );
  }

  public removeProduct(id: string) {
    console.log(id)

    this.http.delete<object>(environment.api_endpoint + '/product/' + id)
      .subscribe(
        () => {
          this.products = this.products.filter((p) => p['id'] != id)
        },
        (err) => {
          console.error(err);
        },
      );
  }

  public getRandomImagePath() {
    return this.http.get<object[]>('https://api.thecatapi.com/v1/images/search?size=full')
      .toPromise()
      .then((data: object) => {
        this.imagePath = data[0]["url"];
      });
  }

}

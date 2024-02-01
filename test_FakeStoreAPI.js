//https://fakestoreapi.com/docs
import http from "k6/http";
import { check } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export let options = {
    stages: [
        { duration: '1m', target: 5 }, // simulate ramp-up of traffic from 0 to 5 users over 1 minute
        { duration: '1m30s', target: 5}, // stay at 5 users for 1minutes 30 seconds
    ],
};

export default function () {
    //USER LOGIN
    const user_login_success = {
        method: 'POST',
        url: 'https://fakestoreapi.com/auth/login',
        body: {
            username: 'mor_2314',
            password: '83r5^_',
          },
    };

    const user_login_failed = {
        method: 'POST',
        url: 'https://fakestoreapi.com/auth/login',
        body: {
            username: 'mitha',
            password: 'password123',
          },
    };

    //PRODUCTS
    const add_new_products = {
        method: 'POST',
        url: 'https://fakestoreapi.com/products',
        body: {
            title : 'Add new product',
            price : 17.5,
            description : 'add new product',
            image : 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fnew-product&psig=AOvVaw35mZ2y4pNHPgMnEL0KmS8H&ust=1694747601990000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCNDGkPmQqYEDFQAAAAAdAAAAABAI',
            category : 'electronic'
          },
    };

    const get_all_products = {
        method: 'GET',
        url: 'https://fakestoreapi.com/products',
    };

    const get_single_products = {
        method: 'GET',
        url: 'https://fakestoreapi.com/products/2',
    };

    const update_products = {
        method: 'PATCH',
        url: 'https://fakestoreapi.com/products/2',
        body: {
            title : 'Update product',
            price : 16,
            description : 'update product',
            image : 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fnew-product&psig=AOvVaw35mZ2y4pNHPgMnEL0KmS8H&ust=1694747601990000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCNDGkPmQqYEDFQAAAAAdAAAAABAI',
            category : 'electronic'
          },
    };

    const delete_products = {
        method: 'DELETE',
        url: 'https://fakestoreapi.com/products/2',
    };
    
    // const get_request = {
    //     method: 'GET',
    //     url: 'https://fakestoreapi.com/products',
    // };

    const response = http.batch([user_login_success, user_login_failed, add_new_products, get_all_products, get_single_products, update_products, delete_products]);
    check(response[0], {
        'POST User login success': (r) => r.status === 200,
    });

    check(response[1], {
        'POST User login failed': (r) => r.status === 401,
    });
    
    check(response[2], {
        'POST New products': (r) => r.status === 200,
    });

    check(response[3], {
        'GET All products': (r) => r.status === 200,
    });
    
    check(response[4], {
        'GET Single products': (r) => r.status === 200,
    });

    check(response[5], {
        'Update Products': (r) => r.status === 200,
    });

    check(response[6], {
        'Delete Products': (r) => r.status === 200,
    });

}

export function handleSummary(data) {
    return {
      "summary.json": JSON.stringify(data),
      "result.html": htmlReport(data),
      stdout: textSummary(data, { indent: " ", enableColors: true })
    };
  }
import http from "k6/http";
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.1/index.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

const base_url = "https://fakestoreapi.com";

export let options = {
    stages : [
        { duration: '5s', target: 1 },
    ]
}
export default function() {
    //LOGIN
    describe("POST User login success", () => {
        let url = base_url + `/auth/login`;
        let body = {
            username: 'mor_2314',
            password: '83r5^_',
        };
        let params = {};
        let response = http.post(url, body, params);

        //PRINT API RESPONSE
        console.log("==== RESPONSE BODY ====");
        console.log(response.body);
        console.log("==== END OF RESPONSE BODY ====");

        expect(response.status).to.equal(200);        
    });

    describe("POST User login failed", () => {
        let url = base_url + `/auth/login`;
        let body = {
            username: 'mitha',
            password: 'password123',
        };
        let params = {};
        let response = http.post(url, body, params);

        //PRINT API RESPONSE
        console.log("~~~ RESPONSE BODY ~~~");
        console.log(response.body);
        console.log("~~~ END OF RESPONSE BODY ~~~");

        expect(response.status).to.equal(401);        
    });
}

//create a html report
export function handleSummary(data) {
    return {
      "summary.json": JSON.stringify(data),
      "result.html": htmlReport(data),
      stdout: textSummary(data, { indent: " ", enableColors: true })
    };
}
/*
[rewrite_local]
^https:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/.+$) url script-response-body https://raw.githubusercontent.com/pxx917144686/xx/refs/heads/main/pxx.js
^https:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/.+$) url script-request-header https://raw.githubusercontent.com/pxx917144686/xx/refs/heads/main/pxx.js

[MITM]
hostname = api.revenuecat.com

*/
let obj = {};

if (typeof $response == "undefined") {
  delete $request.headers["x-revenuecat-etag"];
  delete $request.headers["X-RevenueCat-ETag"];
  obj.headers = $request.headers;
} else {
  let body = JSON.parse($response.body || "{}");
  if (body && body.subscriber) {
    let date = {
      "expires_date": "2999-01-01T00:00:00Z",
      "original_purchase_date": "2021-01-01T00:00:00Z",
      "purchase_date": "2021-01-01T00:00:00Z",
      "ownership_type": "PURCHASED",
      "store": "app_store"
    };
    
    let subscriber = body.subscriber;
    let bundle_id = $request.headers["X-Client-Bundle-ID"]
      ? $request.headers["X-Client-Bundle-ID"]
      : $request.headers["User-Agent"].match(/^[%a-zA-Z0-9]+/)[0];
    
const list = [
  { "app_name": "PutApp", "bundle_id": "com.maliquankai.appdesign", "product_id": "com.maliquankai.appdesign", "entitlements": ["premium_design", "full_access"], "version": "3.0.0" },
  { "app_name": "1Blocker", "bundle_id": "blocker.ios.iap.lifetime", "product_id": "app.pxx917144686", "entitlements": ["premium", "Full_access_app"], "version": "5.8" },
  { "app_name": "Ereasy", "bundle_id": "background.remover.bg.eraser", "product_id": "app.pxx917144686", "entitlements": ["premium", "Full_access_app"], "version": "2.0.0" }
];

    
    for (let data of list) {
      if (bundle_id == data.bundle_id || bundle_id == data.app_name) {
        let product_id = data.product_id;
        let entitlements = data.entitlements;
        
        subscriber.subscriptions[(product_id)] = date;
        
        for (let entitlement of entitlements) {
          subscriber.entitlements[(entitlement)] = date;
          subscriber.entitlements[(entitlement)].product_identifier = product_id;
        }
        break;
      }
    }
    
    obj.body = JSON.stringify(body);
  }
}

$done(obj);

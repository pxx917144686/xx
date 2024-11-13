/*
[rewrite_local]
^https:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/.+$) url script-response-body https://raw.githubusercontent.com/pxx917144686/xx/refs/heads/main/CareServer.js
^https:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/.+$) url script-request-header https://raw.githubusercontent.com/pxx917144686/xx/refs/heads/main/CareServer.js

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
    body.request_date_ms = 1731508607644;
    body.request_date = "2024-11-13T14:36:47Z";
    body.subscriber = {
      "non_subscriptions": {
        "ShellBoxKit.Lifetime": [
          {
            "id": "179e59550d",
            "is_sandbox": true,
            "purchase_date": "2024-11-13T14:05:56Z",
            "original_purchase_date": "2024-11-13T14:05:56Z",
            "store": "app_store",
            "store_transaction_id": "2000000773897213"
          }
        ]
      },
      "first_seen": "2024-11-13T13:52:22Z",
      "original_application_version": "51",
      "other_purchases": {
        "ShellBoxKit.Lifetime": {
          "purchase_date": "2024-11-13T14:05:56Z"
        }
      },
      "management_url": null,
      "subscriptions": {
        "ShellBoxKit.Year": {
          "is_sandbox": false,
          "ownership_type": "PURCHASED",
          "expires_date": "2099-09-09T09:09:09Z",
          "original_purchase_date": "2024-09-09T09:09:09Z",
          "store_transaction_id": "490001314520000",
          "purchase_date": "2024-09-09T09:09:09Z",
          "store": "app_store"
        }
      },
      "entitlements": {
        "ssh_pro": {
          "expires_date": "2099-09-09T09:09:09Z",
          "product_identifier": "ShellBoxKit.Year",
          "purchase_date": "2024-09-09T09:09:09Z"
        }
      },
      "original_purchase_date": "2024-06-18T10:05:24Z",
      "original_app_user_id": "$RCAnonymousID:f17435b819b0490aaa70cb04025e7938",
      "last_seen": "2024-11-13T13:52:22Z"
    };
    
    obj.body = JSON.stringify(body);
  }
}

$done(obj);

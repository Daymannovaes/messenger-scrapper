const _ = require('lodash');
const fetch = require('node-fetch');

const FACEBOOK_URL = "https://www.messenger.com/api/graphqlbatch/";

module.exports.fetchMessagesBefore = function({ userId, cookies, before, fb_dtsg }) {
    return fetch("https://www.messenger.com/api/graphqlbatch/", {
        "headers":{
            "accept": "*/*",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9,pt;q=0.8,sv;q=0.7,nl;q=0.6",
            "content-type": "application/x-www-form-urlencoded",
            "cookie": decodeURIComponent(cookies),
        },
        "referrerPolicy": "origin-when-cross-origin",
        "body": `batch_name=MessengerGraphQLThreadFetcher&__user=100000158064376&__a=1&__dyn=5V8ReQicFoHG4Q9UrEwlg9odpbGAdy8-QjFwgoqzob4q2i5U4e2CGwEyFojyR88xK5WAAzoOuVWxeUW2y4EF1m2WdxK4rzoKjG2e5UC4bzazp8nwkEG9KewBx66E4zwxwxgeFUlGfy8mzoaEbQm2O1DypUhKHxCq2qFoy6oswgElxm9yUvy88ESbwgUgUoU-U-Ux5wKK2afzk6eicyo94umUlwPzp4fzaG9BK6o-6UGUmz8aEbGGu2K7UW8z8yVXAye2y2C9hEKUdUyfKUy2mu4UK&__req=z&__be=-1&__pc=PHASED%3Amessengerdotcom_pkg&__rev=4276003&fb_dtsg=${fb_dtsg}&jazoest=26581717897111108711027372535865817245100828655571178367&queries=%7B%22o0%22%3A%7B%22doc_id%22%3A%222056093651101502%22%2C%22query_params%22%3A%7B%22id%22%3A%22${userId}%22%2C%22message_limit%22%3A100%2C%22load_messages%22%3Atrue%2C%22load_read_receipts%22%3Afalse%2C%22before%22%3A${before}%7D%7D%7D`,
        "method": "POST",
    })
    .then(res => res.text())
    .then(res => res.replace(`{
   "successful_results": 1,
   "error_results": 0,
   "skipped_results": 0
}`, ''))
    .then(res => JSON.parse(res))
    .then(res => _.get(res, 'o0.data.message_thread.messages'))
    .then(res => ({
        page_info: res.page_info,
        nodes: res.nodes.map(node => _.omit(node, [
            "ad_client_token",
            "ad_id",
            "blob_attachments",
            "commerce_message_type",
            "customizations",
            "extensible_attachment",
            "is_sponsored",
            "montage_reply_data",
            "page_admin_sender",
            "platform_xmd_encoded",
            "replied_to_message",
            "sticker",
            "tags_list",
            "ttl",
            "unread",
            "message_source_data",
        ]))
    }))
}

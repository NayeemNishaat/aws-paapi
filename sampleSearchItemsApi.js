/**
 * Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

// Run `npm install` locally before executing following code with `node sampleSearchItemsApi.js`

/**
 * This sample code snippet is for ProductAdvertisingAPI 5.0's SearchItems API
 * For more details, refer:
 * https://webservices.amazon.com/paapi5/documentation/search-items.html
 */

const dotenv = require("dotenv");
dotenv.config();
const {
  sendSuccessNotification,
  sendFailNotification
} = require("./discord.js");
var ProductAdvertisingAPIv1 = require("./src/index");

var defaultClient = ProductAdvertisingAPIv1.ApiClient.instance;

// Specify your credentials here. These are used to create and sign the request.
defaultClient.accessKey = process.env.ACCESS_KEY;
defaultClient.secretKey = process.env.SECRET_KEY;

/**
 * PAAPI Host and Region to which you want to send request.
 * For more details refer: https://webservices.amazon.com/paapi5/documentation/common-request-parameters.html#host-and-region
 */
defaultClient.host = "webservices.amazon.ae";
defaultClient.region = "eu-west-1";

var api = new ProductAdvertisingAPIv1.DefaultApi();

// Request Initialization
var searchItemsRequest = new ProductAdvertisingAPIv1.SearchItemsRequest();
var searchItemsRequest2 = new ProductAdvertisingAPIv1.SearchItemsRequest();

/** Enter your partner tag (store/tracking id) and partner type */
searchItemsRequest2["PartnerTag"] = searchItemsRequest["PartnerTag"] =
  "eclipse0d-21";
searchItemsRequest2["PartnerType"] = searchItemsRequest["PartnerType"] =
  "Associates";

/** Specify Keywords */
// searchItemsRequest["Keywords"] = "Harry Potter";
// searchItemsRequest2["Keywords"] = "Farcry 3";

/**
 * Specify the category in which search request is to be made
 * For more details, refer: https://webservices.amazon.com/paapi5/documentation/use-cases/organization-of-items-on-amazon/search-index.html
 */
// searchItemsRequest["SearchIndex"] = "Books";
// searchItemsRequest2["SearchIndex"] = "VideoGames";

/** Specify item count to be returned in search result */
searchItemsRequest2["ItemCount"] = searchItemsRequest["ItemCount"] = 5;

/**
 * Choose resources you want from SearchItemsResource enum
 * For more details, refer: https://webservices.amazon.com/paapi5/documentation/search-items.html#resources-parameter
 */
searchItemsRequest2["Resources"] = searchItemsRequest["Resources"] = [
  "Images.Primary.Medium",
  "ItemInfo.Title",
  "Offers.Listings.Price"
];

let prevData;
let prevData2;

let timer1;
let timer2;
let timer3;

const initiateSearch = (parsedData) => {
  const timeout1 = () => {
    timer1 = setTimeout(() => {
      api.searchItems(searchItemsRequest).then(
        function (data) {
          const searchItemsResponse =
            ProductAdvertisingAPIv1.SearchItemsResponse.constructFromObject(
              data
            );

          if (searchItemsResponse["Errors"] !== undefined) {
            return sendFailNotification(
              searchItemsResponse["Errors"][0]["Message"]
            );
          }

          const extractedData = searchItemsResponse.SearchResult.Items.map(
            (item) => ({
              imageURL: item.Images.Primary.Medium.URL,
              productName: item.ItemInfo.Title.DisplayValue,
              price: item.Offers.Listings[0].Price.DisplayAmount,
              productURL: item.DetailPageURL,
              keywords: searchItemsRequest["Keywords"]
            })
          );

          console.log(
            "Is different result for 1st request?",
            JSON.stringify(prevData) !== JSON.stringify(extractedData)
          );

          if (JSON.stringify(prevData) !== JSON.stringify(extractedData)) {
            sendSuccessNotification(extractedData);

            prevData = extractedData;
          }
        },
        function (error) {
          console.log(JSON.stringify(error["response"]["text"], null, 1));
          if (
            error["response"] !== undefined &&
            error["response"]["text"] !== undefined
          ) {
            sendFailNotification(
              JSON.stringify(error["response"]["text"], null, 1)
            );
          }
        }
      );
      timeout1();
    }, 20000);
  };

  const timeout2 = () => {
    timer2 = setTimeout(() => {
      api.searchItems(searchItemsRequest2).then(
        function (data) {
          const searchItemsResponse =
            ProductAdvertisingAPIv1.SearchItemsResponse.constructFromObject(
              data
            );

          if (searchItemsResponse["Errors"] !== undefined) {
            return sendDiscordNotification(
              searchItemsResponse["Errors"][0]["Message"]
            );
          }

          const extractedData = searchItemsResponse.SearchResult.Items.map(
            (item) => ({
              imageURL: item.Images.Primary.Medium.URL,
              productName: item.ItemInfo.Title.DisplayValue,
              price: item.Offers.Listings[0].Price.DisplayAmount,
              productURL: item.DetailPageURL,
              keywords: searchItemsRequest["Keywords"]
            })
          );

          console.log(
            "Is different result for 2nd request?",
            JSON.stringify(prevData2) !== JSON.stringify(extractedData)
          );

          if (JSON.stringify(prevData2) !== JSON.stringify(extractedData)) {
            sendSuccessNotification(extractedData);

            prevData2 = extractedData;
          }
        },
        function (error) {
          console.log(JSON.stringify(error["response"]["text"], null, 1));
          if (
            error["response"] !== undefined &&
            error["response"]["text"] !== undefined
          ) {
            sendFailNotification(
              JSON.stringify(error["response"]["text"], null, 1)
            );
          }
        }
      );

      timeout2();
    }, 20000);
  };

  clearTimeout(timer1);
  clearTimeout(timer2);
  clearTimeout(timer3);

  if (parsedData.keywords1) {
    searchItemsRequest["Keywords"] = parsedData.keywords1;
    parsedData.searchIndex1 &&
      (searchItemsRequest["SearchIndex"] = parsedData.searchIndex1);
    parsedData.brand1 && (searchItemsRequest["Brand"] = parsedData.brand1);
    parsedData.merchant1 &&
      (searchItemsRequest["Merchant"] = parsedData.merchant1);
    parsedData.minprice1 &&
      (searchItemsRequest["MinPrice"] = +parsedData.minprice1);
    parsedData.maxprice1 &&
      (searchItemsRequest["MaxPrice"] = +parsedData.maxprice1);
    parsedData.percent1 &&
      (searchItemsRequest["MinSavingPercent"] = +parsedData.percent1);

    timeout1();
  }

  if (parsedData.keywords2) {
    searchItemsRequest2["Keywords"] = parsedData.keywords2;
    parsedData.searchIndex2 &&
      (searchItemsRequest["SearchIndex"] = parsedData.searchIndex2);
    parsedData.brand2 && (searchItemsRequest["Brand"] = parsedData.brand2);
    parsedData.merchant2 &&
      (searchItemsRequest["Merchant"] = parsedData.merchant2);
    parsedData.minprice2 &&
      (searchItemsRequest["MinPrice"] = +parsedData.minprice2);
    parsedData.maxprice2 &&
      (searchItemsRequest["MaxPrice"] = +parsedData.maxprice2);
    parsedData.percent2 &&
      (searchItemsRequest["MinSavingPercent"] = +parsedData.percent2);

    timer3 = setTimeout(() => {
      timeout2();
    }, 10000);
  }
};

module.exports = initiateSearch;

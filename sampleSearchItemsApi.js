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
// const { sendDiscordNotification } = require("./discord.js");
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
searchItemsRequest["Keywords"] = "Harry Potter";
searchItemsRequest2["Keywords"] = "Farcry 3";

/**
 * Specify the category in which search request is to be made
 * For more details, refer: https://webservices.amazon.com/paapi5/documentation/use-cases/organization-of-items-on-amazon/search-index.html
 */
searchItemsRequest["SearchIndex"] = "Books";
searchItemsRequest2["SearchIndex"] = "VideoGames";

/** Specify item count to be returned in search result */
searchItemsRequest2["ItemCount"] = searchItemsRequest["ItemCount"] = 1;

/**
 * Choose resources you want from SearchItemsResource enum
 * For more details, refer: https://webservices.amazon.com/paapi5/documentation/search-items.html#resources-parameter
 */
searchItemsRequest2["Resources"] = searchItemsRequest["Resources"] = [
  "Images.Primary.Medium",
  "ItemInfo.Title",
  "Offers.Listings.Price"
];

const timeout = () => {
  setTimeout(() => {
    api.searchItems(searchItemsRequest).then(
      function (data) {
        const searchItemsResponse =
          ProductAdvertisingAPIv1.SearchItemsResponse.constructFromObject(data);

        const extractedData = {
          imageURL:
            searchItemsResponse.SearchResult.Items[0].Images.Primary.Medium.URL,
          productName:
            searchItemsResponse.SearchResult.Items[0].ItemInfo.Title
              .DisplayValue,
          price:
            searchItemsResponse.SearchResult.Items[0].Offers.Listings[0].Price
              .DisplayAmount,
          productURL: searchItemsResponse.SearchResult.Items[0].DetailPageURL,
          Keywords: searchItemsRequest["Keywords"]
        };

        console.log(extractedData);
      },
      function (error) {
        console.log(error);
      }
    );

    api.searchItems(searchItemsRequest2).then(
      function (data) {
        const searchItemsResponse =
          ProductAdvertisingAPIv1.SearchItemsResponse.constructFromObject(data);

        const extractedData = {
          imageURL:
            searchItemsResponse.SearchResult.Items[0].Images.Primary.Medium.URL,
          productName:
            searchItemsResponse.SearchResult.Items[0].ItemInfo.Title
              .DisplayValue,
          price:
            searchItemsResponse.SearchResult.Items[0].Offers.Listings[0].Price
              .DisplayAmount,
          productURL: searchItemsResponse.SearchResult.Items[0].DetailPageURL,
          Keywords: searchItemsRequest["Keywords"]
        };

        console.log(extractedData);
      },
      function (error) {
        console.log(error);
      }
    );

    timeout();
  }, 2000);
};

timeout();

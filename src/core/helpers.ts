import * as rp from 'request-promise';
import { bitCoinapiKey } from './constants'
export function requestFromServer(url, headers?): any {
    return new Promise((resolve, reject ) => {
        const requestOptions = {
            method: 'GET',
            uri: url,
          };
          if(headers) {
            requestOptions['headers'] = {
            'X-CMC_PRO_API_KEY': bitCoinapiKey
          };
          requestOptions['qs'] =  {
            'start': '1',
            'limit': '1'
          }
          }
          rp(requestOptions).then(response => {
            console.log('API call response:', response);
            resolve(JSON.parse(response))
          }).catch((err) => {
            console.log('API call error:', err.message);
            reject(err)
          });
    });

}

export function filterLocalBtcData(obj, btcPrice, usdInrFXRate) {
if (!obj.data) 
return []; // no data than return empty array

let totalProfit : number = 0
let btcQuantity : number = 0;

// iterate and set seller list data
const sellerDataArray = obj.data && obj.data.ad_list
? obj.data.ad_list
: [];

sellerDataArray.map(({data}) => {

// btc amount in INR from localbitcoin
const maxAmountAvailable : number = data.max_amount_available

// atleast 1000 INR btc to be sell available , otherwise initiating txn is of no
// use
if (maxAmountAvailable > 1000) {

const calcBtcRateUsd : number = (Number(data.temp_price) / usdInrFXRate);
const btcQty : number = Number(data.max_amount_available) / (btcPrice * usdInrFXRate);
const priceDiff : number = Math.abs(btcPrice - calcBtcRateUsd);
const profitInr = btcQty * priceDiff * usdInrFXRate;

if (btcPrice <= calcBtcRateUsd) { // our buying price is less than selling price
// add totalProfit and btc quantity
totalProfit = totalProfit + profitInr;
btcQuantity = btcQuantity + btcQty;
// return { profit_inr: profitInr, calc_btc_rate_usd: calcBtcRateUsd,
// btc_qty: btcQty, max_amount_available: maxAmountAvailable,
// temp_price_usd: data.temp_price_usd, temp_price: data.temp_price }
}
}
})
return {totalProfit, btcQuantity};
}
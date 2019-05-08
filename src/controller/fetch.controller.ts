
 import { fetchDataUrl, exchangeApiUrl, bitcoinUrl } from '../core/constants'
import model from './../models/data';
 import { filterLocalBtcData,requestFromServer } from '../core/helpers'
export async function fetchData() {
  console.log('Function Called.....');
   const exchangeRes = await requestFromServer(exchangeApiUrl);
   const exchangeRate = exchangeRes.rates['INR'].rate;
   console.log('Exchange recieved :', exchangeRate);
   const bitCointRes = await requestFromServer(bitcoinUrl, true);
   const btxPrice = bitCointRes.data[0].quote['USD'].price;
   console.log('Bit Coint res :', btxPrice);
   const resp = await requestFromServer(fetchDataUrl);
  const val = filterLocalBtcData(resp, btxPrice	, exchangeRate);
  console.log('Value recieved :', val);
  await model.create(val)
  return val;
}
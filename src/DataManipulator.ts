import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: Number,
  price_def: Number,
  timestamp: Date,
  upper_bound: Number,
  lower_bound: Number,
  ratio: Number,
  trigger_alert: Number | undefined,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]): Row {
      const price_abc = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price)/2;
      const price_def = (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price)/2;
      const ratio = price_abc/price_def;
      const upper_bound = 1.1;
      const lower_bound = 0.9;
      return {
        price_abc,
        price_def,
        ratio,
        timestamp: serverResponds[0].timestamp > serverResponds[1].timestamp ? serverResponds[0].timestamp : serverResponds[1].timestamp,
        upper_bound,
        lower_bound,
        trigger_alert: (ratio > upper_bound || ratio < lower_bound) ? ratio : undefined,
      };
  }
}

import { useContract } from "./useContract";
import Counter from "../contracts/Counter.json";
import CounterAddress from "../contracts/CounterAddress.json";
import abi from "../contracts/abi.json";
let minterAddress = "0x0a89DE93dc853cbbC5D9cFaB3c683f529882F1Fe";

// export interface for smart contract
export const useCounterContract = () =>
  useContract(abi.abi, minterAddress);

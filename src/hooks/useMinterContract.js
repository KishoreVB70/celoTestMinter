import { useContract } from "./useContract";
import abi from "../contracts/abi.json";
let minterAddress = "0x0a89DE93dc853cbbC5D9cFaB3c683f529882F1Fe";

// export interface for smart contract
export const useMinterContract = () =>
  useContract(abi.abi, minterAddress);

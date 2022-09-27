import React, { useEffect } from "react";
import { Container, Nav } from "react-bootstrap";
import { useContractKit } from "@celo-tools/use-contractkit";
import { Notification } from "./components/ui/Notifications";
import Wallet from "./components/Wallet";
import Cover from "./components/Cover";
import Counter from "./components/Counter";
import { useBalance, useCounterContract } from "./hooks";
import "./App.css";
import { useState } from "react";

const App = function AppWrapper() {
  let contractAddress = "0x0a89DE93dc853cbbC5D9cFaB3c683f529882F1Fe";
  const { address, destroy, connect, performActions, kit } = useContractKit();
  const { balance } = useBalance();
  const minterContract = useCounterContract();

  const [nftID, setNftId] = useState("");
  const [inputToken, setInputToken] = useState("");
  const [inputAddress, setinputAddress] = useState("");

  const mintNFT = async() => {
    try {
      await performActions(async (kit) => {
          const {defaultAccount} = kit;
          await minterContract.methods.mint().send({from: defaultAccount});
          getCount();
      });
    } catch (e) {
      console.log({e});
      }
  }

  const getApproval = async() => {
    try {
      await performActions(async (kit) => {
          const {defaultAccount} = kit;
          await minterContract.methods.approve(inputAddress, inputToken).send({from: defaultAccount});
      });
    } catch (e) {
      console.log({e});
      }
  }

  const getCount = async() => {
    const value =  await minterContract.methods.getId().call();
    setNftId(value);
  }

  useEffect(() => {
    try {
        if (minterContract) {
            getCount()
        }
    } catch (error) {
        console.log({error});
    }
}, [minterContract]);

  return (
    <>
      <Notification />
      {address ? (
        <Container fluid="md">
          <Nav className="justify-content-end pt-3 pb-5">
            <Nav.Item>
              {/*display user wallet*/}
              <Wallet
                address={address}
                amount={balance.CELO}
                symbol="CELO"
                destroy={destroy}
              />
            </Nav.Item>
          </Nav>
          {/* display cover */}
          <main>
          <div className="addressContainer">
                <p className='minterAddress'>Minter Contract Address: {contractAddress}</p>
            </div>
            <p >Last minted NFT Id: {nftID}</p>
            <p>Click to mint your own NFT👇</p>
            <button onClick={mintNFT} className='mintButton' >Mint an NFT</button>
            <p>Click here to give approval to the Loan mintercontract 👇</p>
            <input placeholder='token Id' value={inputToken}  onChange={(e) => setInputToken(e.target.value)} />
            <input placeholder='Contract Address' value={inputAddress}  onChange={(e) => setinputAddress(e.target.value)} />
            <button onClick={getApproval} >Give Approval</button>
          </main>
        </Container>
      ) : (
        // display cover if user is not connected
        <div className="App">
          <header className="App-header">
            <Cover connect={connect} />
          </header>
        </div>
      )}
    </>
  );
};

export default App;

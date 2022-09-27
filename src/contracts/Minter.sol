//SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Minter is ERC721URIStorage{
    constructor() ERC721("someToken", "STK") {}

    uint public tokenId;

    function mint() public{
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, "https://jsonkeeper.com/b/DNIE");
        tokenId++;
    }

    function getId() public view returns(uint){
        return tokenId;
    }

}
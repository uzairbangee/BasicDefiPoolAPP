// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract UzairToken is ERC20 {

    constructor() ERC20("UzairToken", "UZT") {
        _mint(msg.sender, 1000000000000000000000000);
    }
}
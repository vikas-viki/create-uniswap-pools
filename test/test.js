/* eslint-disable prettier/prettier */
const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("TokenSale", function () {
  let tokenSale;
  let owner;
  let acc1;
  let acc2;
  let acc3;
  const TOTAL_SUPPLY = 100000;
  const TOKEN_PRICE = 1000000000000;
  const DURATION = 10000000000;

  before(async function () {
    [owner, acc1, acc2, acc3] = await ethers.getSigners();

    const TokenSaleFactory = await ethers.getContractFactory("TokenSale");
    tokenSale = await TokenSaleFactory.deploy(TOTAL_SUPPLY, TOKEN_PRICE, DURATION);

    await tokenSale.deployed();
  });

  it("should check for successful purchase1", async function () {
    const value = ethers.utils.parseEther('0.01');

    const ts = await tokenSale.connect(acc3).ts();
    const cp = await tokenSale.connect(acc3).checkTokenPrice();
    await tokenSale.connect(acc1).purchaseToken(await owner.getAddress(), { value });
    const cpAfter = await tokenSale.connect(acc3).checkTokenPrice();

    const balance = await tokenSale.connect(acc1).checkTokenBalance(acc1.address);
    const percentageTokenDecrease = value.div(TOKEN_PRICE) * 100 / ts;
    const halfOfDecrease = percentageTokenDecrease * 50 / 100;
    console.log("Purchase 1");
    console.log("Value: " + balance);
    console.log("percentageTokenDecrease: " + percentageTokenDecrease);
    console.log("half of decrease: " + halfOfDecrease);
    console.log("total price increase: " + halfOfDecrease * cp / 100);
    console.log("Current price: " + cpAfter + "\n");

    expect(balance).to.equal(value.div(TOKEN_PRICE));
  });


  it("should check for successful purchase2", async function () {
    const value = ethers.utils.parseEther('0.0105');

    const cp = await tokenSale.connect(acc2).checkTokenPrice();
    const ts = await tokenSale.connect(acc3).ts();
    await tokenSale.connect(acc2).purchaseToken(await owner.getAddress(), { value });

    const balance = await tokenSale.connect(acc2).checkTokenBalance(acc2.address);
    const cpAfter = await tokenSale.connect(acc3).checkTokenPrice();

    const percentageTokenDecrease = Math.trunc(value.div(cp) * 100 / ts);
    const halfOfDecrease = Math.trunc(percentageTokenDecrease * 50 / 100);
    console.log("Purchase 1");
    console.log("Value: " + balance);
    console.log("percentageTokenDecrease: " + percentageTokenDecrease);
    console.log("half of decrease: " + halfOfDecrease);
    console.log("total price increase: " + halfOfDecrease * cp / 100);
    console.log("Current price: " + cpAfter + "\n");

    expect(balance).to.equal(value.div(cp));
  });

  it("should check for successful purchase3", async function () {
    const value = ethers.utils.parseEther('0.011025');

    const cp = await tokenSale.connect(acc3).checkTokenPrice();
    const ts = await tokenSale.connect(acc3).ts();
    await tokenSale.connect(acc3).purchaseToken(await owner.getAddress(), { value });
    const balance = await tokenSale.connect(acc3).checkTokenBalance(acc3.address);
    const cpAfter = await tokenSale.connect(acc3).checkTokenPrice();

    const percentageTokenDecrease = Math.trunc(value.div(cp) * 100 / ts);
    const halfOfDecrease = percentageTokenDecrease * 50 / 100;
    console.log("Purchase 1");
    console.log("Value: " + balance);
    console.log("percentageTokenDecrease: " + percentageTokenDecrease);
    console.log("half of decrease: " + halfOfDecrease);
    console.log("total price increase: " + halfOfDecrease * cp / 100);
    console.log("Current price: " + cpAfter + "\n");

    expect(balance).to.equal(value.div(cp));
  });

  it("Should check for correct token Price Increase", async function () {
    const cp = await tokenSale.connect(acc3).checkTokenPrice();
    console.log("Current price: " + cp);
  });

});

const hre = require("hardhat");

async function main() {
  const TOKEN = await hre.ethers.getContractFactory("Token");
  const wds = await TOKEN.deploy("WebDevSolutions", "WDS");

  const yt = await TOKEN.deploy("Youtube", "YT");

  console.log("WDS Address: ", (await wds).address);
  console.log("YT Address: ", (await yt).address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

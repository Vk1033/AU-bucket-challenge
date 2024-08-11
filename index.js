const { ethers } = require("ethers");
const bucketABI = require("./bucketABI.json");
const vkoinABI = require("./vkoinABI.json");
require("dotenv").config();

// Connect to Sepolia testnet
const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);

// Set up a wallet
const privateKey = process.env.TEST_PRIVATE_KEY;
const wallet = new ethers.Wallet(privateKey, provider);

const bucketAddress = "0x1235694654FD7Bb80a67Fc7b0A6FAb7B072d3Ef7";
const vkoinAddress = "0x15e8445561279bfaf1a54fa6999851535ee9319a";

// Connect to the contract
const bucket = new ethers.Contract(bucketAddress, bucketABI, wallet);
const vkoin = new ethers.Contract(vkoinAddress, vkoinABI, wallet);

async function main() {
  // Approve the bucket contract to spend VKOIN
  const approveTx = await vkoin.approve(bucketAddress, ethers.parseEther("10"));
  console.log("Approving VKOIN to spend...");
  await approveTx.wait();
  console.log("VKOIN approved.");

  // Deop VKOIN into the bucket
  const depositTx = await bucket.drop(vkoinAddress, ethers.parseEther("10"));
  console.log("Depositing VKOIN...");
  await depositTx.wait();
  console.log("VKOIN deposited.");
}

main().catch(console.error);

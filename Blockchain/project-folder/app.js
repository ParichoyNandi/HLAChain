const web3 = new Web3("http://127.0.0.1:7545");
const contractAddress = "0xb03dD5d5A6E65a9e036252857c8C9c11B510D83B";
const abi = [
    {
        "inputs": [],
        "name": "storedData",
        "outputs": [
            { "internalType": "uint256", "name": "", "type": "uint256" }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "x", "type": "uint256" }
        ],
        "name": "set",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "get",
        "outputs": [
            { "internalType": "uint256", "name": "", "type": "uint256" }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }
];
const simpleStorage = new web3.eth.Contract(abi, contractAddress);
async function setStorage() {
    const value = document.getElementById("inputValue").value;
    if (!value) {
        alert("Please enter a value to store.");
        return;
    }

    const accounts = await web3.eth.getAccounts();
    await simpleStorage.methods.set(value).send({ from: accounts[0] });

    document.getElementById("output").innerText = `Value ${value} stored successfully!`;
}
async function getStorage() {
    const value = await simpleStorage.methods.get().call();
    document.getElementById("output").innerText = `Stored value: ${value}`;
}

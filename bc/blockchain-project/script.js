const BoneMarrowDonation = artifacts.require("BoneMarrowDonation");

module.exports = async function (callback) {
    try {
        const instance = await BoneMarrowDonation.deployed();

        // Get available accounts
        const accounts = await web3.eth.getAccounts();

        // Use the first account as the sender for the transaction
        const fromAddress = accounts[0];

        // Add demo data
        await instance.registerDonor("PArichoy", 25, "O+", "A1, B1", "Healthy", { from: fromAddress });
        await instance.registerReceiver("Riya", 21, "O+", "A1, B1", "Leukemia", { from: fromAddress });

        // Verify the data
        let donors = await instance.getAllDonors();
        console.log("Donors:", donors);

        let receivers = await instance.getAllReceivers();
        console.log("Receivers:", receivers);

        callback();
    } catch (error) {
        console.error(error);
        callback(error);
    }
};

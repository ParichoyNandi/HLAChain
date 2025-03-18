// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BoneMarrowDonation {
    // Struct for storing donor details
    struct Donor {
        address walletAddress;
        string name;
        uint256 age;
        string bloodType;
        string hlaMarkers;
        string healthStatus;
        string matchStatus; // e.g., "Matched" or "Unmatched"
        bool isRegistered;
    }

    // Struct for storing receiver details
    struct Receiver {
        address walletAddress;
        string name;
        uint256 age;
        string bloodType;
        string hlaMarkers;
        string condition; // Disease requiring transplant
        string matchStatus; // e.g., "Matched" or "Unmatched"
        bool isRegistered;
    }

    // Events
    event DonorRegistered(address indexed donorAddress, string name);
    event ReceiverRegistered(address indexed receiverAddress, string name);
    event MatchFound(address indexed donorAddress, address indexed receiverAddress);

    // Mappings for storing donors and receivers
    mapping(address => Donor) public donors;
    mapping(address => Receiver) public receivers;

    // List of all donors and receivers for admin access
    address[] public donorList;
    address[] public receiverList;

    // Modifier to check admin privileges
    address public admin;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only the admin can perform this action.");
        _;
    }

    constructor() {
        admin = msg.sender; // Set the contract deployer as the admin
    }

    // Function for donors to register
    function registerDonor(
        string memory _name,
        uint256 _age,
        string memory _bloodType,
        string memory _hlaMarkers,
        string memory _healthStatus
    ) public {
        require(!donors[msg.sender].isRegistered, "Donor is already registered.");
        donors[msg.sender] = Donor({
            walletAddress: msg.sender,
            name: _name,
            age: _age,
            bloodType: _bloodType,
            hlaMarkers: _hlaMarkers,
            healthStatus: _healthStatus,
            matchStatus: "Unmatched",
            isRegistered: true
        });
        donorList.push(msg.sender);
        emit DonorRegistered(msg.sender, _name);
    }

    // Function for receivers to register
    function registerReceiver(
        string memory _name,
        uint256 _age,
        string memory _bloodType,
        string memory _hlaMarkers,
        string memory _condition
    ) public {
        require(!receivers[msg.sender].isRegistered, "Receiver is already registered.");
        receivers[msg.sender] = Receiver({
            walletAddress: msg.sender,
            name: _name,
            age: _age,
            bloodType: _bloodType,
            hlaMarkers: _hlaMarkers,
            condition: _condition,
            matchStatus: "Unmatched",
            isRegistered: true
        });
        receiverList.push(msg.sender);
        emit ReceiverRegistered(msg.sender, _name);
    }

    // Admin function to match donors and receivers
    function matchDonorToReceiver(address _donor, address _receiver) public onlyAdmin {
        require(donors[_donor].isRegistered, "Donor is not registered.");
        require(receivers[_receiver].isRegistered, "Receiver is not registered.");
        require(
            keccak256(abi.encodePacked(donors[_donor].bloodType)) ==
            keccak256(abi.encodePacked(receivers[_receiver].bloodType)),
            "Blood type does not match."
        );
        require(
            keccak256(abi.encodePacked(donors[_donor].hlaMarkers)) ==
            keccak256(abi.encodePacked(receivers[_receiver].hlaMarkers)),
            "HLA markers do not match."
        );

        donors[_donor].matchStatus = "Matched";
        receivers[_receiver].matchStatus = "Matched";

        emit MatchFound(_donor, _receiver);
    }

    // Function to get all donors
    function getAllDonors() public view returns (Donor[] memory) {
        Donor[] memory donorArray = new Donor[](donorList.length);
        for (uint256 i = 0; i < donorList.length; i++) {
            donorArray[i] = donors[donorList[i]];
        }
        return donorArray;
    }

    // Function to get all receivers
    function getAllReceivers() public view returns (Receiver[] memory) {
        Receiver[] memory receiverArray = new Receiver[](receiverList.length);
        for (uint256 i = 0; i < receiverList.length; i++) {
            receiverArray[i] = receivers[receiverList[i]];
        }
        return receiverArray;
    }
}

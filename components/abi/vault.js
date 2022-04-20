export default function VaultContractABI() {
	return [
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_symbol",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "_token",
                    "type": "address"
                },
                {
                    "internalType": "address[]",
                    "name": "excludedAddresses",
                    "type": "address[]"
                },
                {
                    "internalType": "uint8",
                    "name": "cycleDepth",
                    "type": "uint8"
                },
                {
                    "internalType": "address",
                    "name": "Swap_Router_Address",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "addLPTokenAmount",
                    "type": "uint256"
                },
                {
                    "internalType": "address[]",
                    "name": "pathOverride",
                    "type": "address[]"
                }
            ],
            "name": "addLPAndTransfer",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "addLPTokenAmount",
                    "type": "uint256"
                },
                {
                    "internalType": "address[]",
                    "name": "pathOverride",
                    "type": "address[]"
                }
            ],
            "name": "addLPExternal",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "allCycles",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "title",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "cycleID",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "disbursementRate",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "disbursementAmount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint16",
                    "name": "year",
                    "type": "uint16"
                },
                {
                    "internalType": "uint8",
                    "name": "month",
                    "type": "uint8"
                },
                {
                    "internalType": "uint256",
                    "name": "timestamp",
                    "type": "uint256"
                },
                {
                    "internalType": "uint16",
                    "name": "endYear",
                    "type": "uint16"
                },
                {
                    "internalType": "uint8",
                    "name": "endMonth",
                    "type": "uint8"
                },
                {
                    "internalType": "uint256",
                    "name": "endTimestamp",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "totalTicks",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "tokensPerTick",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "sourceAddress",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "contractAddy",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "approveContract",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "cakeLpTokenAddress",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "callReward",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "circulationExcludedAddresses",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "exchangeToken",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "exchangeTokenAmount",
                    "type": "uint256"
                }
            ],
            "name": "convertEthToContractToken2",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "currentTimestamp",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "decimals",
            "outputs": [
                {
                    "internalType": "uint8",
                    "name": "",
                    "type": "uint8"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "genesisDate",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "genesisTimestamp",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "pure",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getCirculatingSupply",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getCurrentCycle",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "title",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "cycleID",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "disbursementRate",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "disbursementAmount",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint16",
                            "name": "year",
                            "type": "uint16"
                        },
                        {
                            "internalType": "uint8",
                            "name": "month",
                            "type": "uint8"
                        },
                        {
                            "internalType": "uint256",
                            "name": "timestamp",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint16",
                            "name": "endYear",
                            "type": "uint16"
                        },
                        {
                            "internalType": "uint8",
                            "name": "endMonth",
                            "type": "uint8"
                        },
                        {
                            "internalType": "uint256",
                            "name": "endTimestamp",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "totalTicks",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "tokensPerTick",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct xMooneyVault.CycleSchedule",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "exchangeToken",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "contractTokenAmount",
                    "type": "uint256"
                },
                {
                    "internalType": "address[]",
                    "name": "pathOverride",
                    "type": "address[]"
                }
            ],
            "name": "getEstimatedEthToBuySourceToken",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "exchangeToken",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "contractTokenAmount",
                    "type": "uint256"
                }
            ],
            "name": "getEstimatedEthforContractToken",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint16",
                    "name": "year",
                    "type": "uint16"
                },
                {
                    "internalType": "uint8",
                    "name": "month",
                    "type": "uint8"
                },
                {
                    "internalType": "uint8",
                    "name": "day",
                    "type": "uint8"
                },
                {
                    "internalType": "uint8",
                    "name": "minute",
                    "type": "uint8"
                },
                {
                    "internalType": "uint8",
                    "name": "second",
                    "type": "uint8"
                }
            ],
            "name": "getMaxTokensThatShouldBeCirculatingInFuture",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getMaxTokensThatShouldNowBeCirculating",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getNextMaxTokenRelease",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getSchedule",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "title",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "cycleID",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "disbursementRate",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "disbursementAmount",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint16",
                            "name": "year",
                            "type": "uint16"
                        },
                        {
                            "internalType": "uint8",
                            "name": "month",
                            "type": "uint8"
                        },
                        {
                            "internalType": "uint256",
                            "name": "timestamp",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint16",
                            "name": "endYear",
                            "type": "uint16"
                        },
                        {
                            "internalType": "uint8",
                            "name": "endMonth",
                            "type": "uint8"
                        },
                        {
                            "internalType": "uint256",
                            "name": "endTimestamp",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "totalTicks",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "tokensPerTick",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct xMooneyVault.CycleSchedule[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "maxReleaseSize",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_tokenAddress",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_addressToQuery",
                    "type": "address"
                }
            ],
            "name": "queryERC20Balance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "releaseTokens",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "destination",
                    "type": "address"
                }
            ],
            "name": "sendLPAndTokenToDestination",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "newTokenAddress",
                    "type": "address"
                }
            ],
            "name": "setToken",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "cycleDepth",
                    "type": "uint256"
                }
            ],
            "name": "setTokenSchedule",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "title",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "cycleID",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "disbursementRate",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "disbursementAmount",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint16",
                            "name": "year",
                            "type": "uint16"
                        },
                        {
                            "internalType": "uint8",
                            "name": "month",
                            "type": "uint8"
                        },
                        {
                            "internalType": "uint256",
                            "name": "timestamp",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint16",
                            "name": "endYear",
                            "type": "uint16"
                        },
                        {
                            "internalType": "uint8",
                            "name": "endMonth",
                            "type": "uint8"
                        },
                        {
                            "internalType": "uint256",
                            "name": "endTimestamp",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "totalTicks",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "tokensPerTick",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct xMooneyVault.CycleSchedule[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "internalType": "address[]",
                    "name": "pathOverride",
                    "type": "address[]"
                }
            ],
            "name": "swapTokenForEthPub",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "tokenAddress",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "recipient",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "transferAnyERC20Token",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "destination",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "transferContractTokens",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address payable",
                    "name": "thisAddress",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "transferNativeToken",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "uniswapLPRouter",
            "outputs": [
                {
                    "internalType": "contract IUniswapV2Router01",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "uniswapRouter",
            "outputs": [
                {
                    "internalType": "contract IUniswapV2Router02",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "newCakeLPAddress",
                    "type": "address"
                }
            ],
            "name": "updateCakeLpTokenAddress",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "newRewardAmount",
                    "type": "uint256"
                }
            ],
            "name": "updateCallerReward",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address[]",
                    "name": "_excluded",
                    "type": "address[]"
                }
            ],
            "name": "updateExcludedAddresses",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "newAmount",
                    "type": "uint256"
                }
            ],
            "name": "updateMaxTokenRelease",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "stateMutability": "payable",
            "type": "receive"
        }
    ]
}
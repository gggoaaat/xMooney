import { Button, Divider, FormControl, FormLabel, Input, Link, Text } from "@chakra-ui/react";
import { m } from "framer-motion";
import Moralis from "moralis";
import { useState, useEffect } from "react";
import { useERC20Balances, useMoralis, useMoralisWeb3Api } from "react-moralis";

import CustomContainer from "./CustomContainer";

export default function Transactions({ user }) {

    const Web3Api = useMoralisWeb3Api();    
    const BASE_URL = "something.com"
    const [transactions, setTransactions] = useState([]);

    const fetchTransactions = async () => {
        const data = await Web3Api.account.getTransactions({
            chain: "mainnet",
            address: user.get('ethAddress'),
            limit: 25
        }).catch(e => console.log(e))
        if(data.balance)
        {
            setTransactions(Moralis.Units.FromWei(data.balance))            
        }
    }

    useEffect(() => {
        fetchTransactions();
        // fetchERC20Balances({
        //     params: {
        //         chain: "mainnet",
        //         address: user.get('ethAddress')
        //     }
        // })
    }, [])

    console.log(transactions)
    
    return (
        <CustomContainer>
            <Text mb="6" fontSize="xl" fontWeight="bold"><b>&nbsp; MY Last Transactions:</b></Text>
            {transactions && transactions.map(transaction => (
                <div key={transaction.hash}>
                    <Link href={`${BASE_URL}${transaction.hash}`}>{transaction.hash}</Link>
                    <Divider></Divider>
                </div>
                
            ))}
        </CustomContainer>
    )
}
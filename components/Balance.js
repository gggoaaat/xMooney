import { Button, Divider, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { m } from "framer-motion";
import Moralis from "moralis";
import { useState, useEffect } from "react";
import { useERC20Balances, useMoralis, useMoralisWeb3Api } from "react-moralis";

import CustomContainer from "./CustomContainer";

export default function Balance({ user }) {

    const Web3Api = useMoralisWeb3Api();
    const { fetchERC20Balances, data } = useERC20Balances();
    const [ethBalance, setEthBalance] = useState(0);

    const fetchNativeBalance = async () => {
        const result = await Web3Api.account.getNativeBalance({
            chain: process.env.NEXT_PUBLIC_CHAIN,
            address: user.get('ethAddress')
        }).catch(e => console.log(e))
        
        if (result.balance) {
            // console.log("Native Balance");
            // console.log(user.get('ethAddress'));
            // console.log(result);
            setEthBalance(Moralis.Units.FromWei(result.balance))
        }
    }

    useEffect(() => {
        fetchNativeBalance();
        fetchERC20Balances({
            params: {
                chain: process.env.NEXT_PUBLIC_CHAIN,
                address: user.get('ethAddress')
            }
        })
    }, [])

    // console.log(data)

    return (
        <CustomContainer>
            <Text mb="6" fontSize="xl" fontWeight="bold"><b>&nbsp; MY ETH Balance:</b></Text>
            {ethBalance && <Text>{ethBalance} BNB</Text>}
            <Divider></Divider>
            {data && data.map(token => (
                <div key={token.symbol}>
                    <Text><b>{token.symbol}</b> - {Moralis.Units.FromWei(token.balance)} </Text>
                </div>
            ))}
        </CustomContainer>
    )
}
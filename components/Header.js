import { Button, Center, Flex, Text } from "@chakra-ui/react";
import Moralis from "moralis";
import ContractABI from "./abi/vault"

import {
    ArrowForwardIcon
} from "@chakra-ui/icons";

export default function Header({ user, logout, isLoggingOut }) {

    const ReleaseTokens = async function() {
        const ABI = ContractABI(); // Add ABI of 0xdAC17F958D2ee523a2206206994597C13D831ec7

        const options = {
            contractAddress: process.env.vaultContractAddres,
            functionName: "releaseTokens",
            abi: ABI,
            params: { },
        };
        await Moralis.enableWeb3();
        const transaction = await Moralis.executeFunction(options);
        console.log(transaction.hash);
        // --> "0x39af55979f5b690fdce14eb23f91dfb0357cb1a27f387656e197636e597b5b7c"
        
        // Wait until the transaction is confirmed
        await transaction.wait();
        
        // // Read new value
        // const message = await Moralis.executeFunction(readOptions);
        // console.log(message);
    }

    return (
        <header>
            <Flex px="10" py="6" justifyContent="space-between" bg="#000" color="white">
                <Center>
                    <Text fontSize="xl" fontWeight="bold">{process.env.title}</Text>
                </Center>
                <Center>
                    <Button mr="5" ml="4" rightIcon={<ArrowForwardIcon />} colorScheme='teal' variant='outline' disabled={isLoggingOut} onClick={ReleaseTokens}>Release Tokens</Button>
                    <Text>
                        {user.getUsername()}
                    </Text>
                    <Button ml="4" colorScheme="blackAlpha" disabled={isLoggingOut} onClick={logout}>Logout</Button>
                </Center>
            </Flex>
        </header>
    )
}

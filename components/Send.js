import { Box, Button, Divider, FormControl, FormLabel, Image, Input, Link, NumberIncrementStepper, NumberDecrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text, useToast } from "@chakra-ui/react";
import Moralis from "moralis";
import { useState, useEffect } from "react";
import { useWeb3Transfer } from "react-moralis";

import CustomContainer from "./CustomContainer";

export default function Send({ user }) {

    const [amount, setAmount] = useState(0);
    const [receiver, setReceiver] = useState('');

    const handleChange = (value) => setAmount(value);

    const toast = useToast();

    const {fetch, isFetching} = useWeb3Transfer({
        amount: Moralis.Units.ETH(amount),
        receiver: receiver,
        type: 'native'
    })
    
    return (
        <CustomContainer>
            <Text mb="6" fontSize="xl" fontWeight="bold"><b>&nbsp; Send Eth:</b></Text>
            <form onSubmit={async e =>  {
                e.preventDefault();
                await Moralis.enableWeb3();
                fetch({
                    onSuccess: () => {
                        toast({
                            title: "ETH Sent",
                            description: " Fresh",
                            status: 'success',
                            duration: 9000,
                            isClosable: true
                            
                        });
                        setReceiver('');
                    },
                    onError: (error) => {
                        toast({
                            title: "Error.",
                            description: error,
                            status: 'error',
                            duration: 9000,
                            isClosable: true                            
                        });
                    }
                })               
            }}> 
            <FormControl mt="6" mb="6">
                   <FormLabel htmlFor="amount">
                       Amount of ETH
                   </FormLabel>
                   <NumberInput step={0.1} onChange={handleChange}>
                    <NumberInputField id="amount" value={amount}/>
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                   </NumberInput>
                   <FormLabel htmlFor="receiver">Send To</FormLabel>
                   <Input id="receiver" type="text" placeholder="Receiver Address" value={receiver} onChange={e => setReceiver(e.target.value)}></Input>
               </FormControl>
               <Button mt="4" type="submit" colorScheme="blackAlpha" disabled={isFetching}>Send</Button>
            </form>
        </CustomContainer>
    )
}
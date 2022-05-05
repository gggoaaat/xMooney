import { Box } from "@chakra-ui/react";

export default function CustomContainer({children}){
    return (
        <Box bg="white" width="full" height="full" px="1" py="1" rounded="lg" shadow="lg" textAlign="left">
            {children}
        </Box>
    )
}
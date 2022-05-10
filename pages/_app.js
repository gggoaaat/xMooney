import { ChakraProvider } from '@chakra-ui/react'
import { MoralisProvider } from 'react-moralis'
import '../styles/three.css'

function MyApp({ Component, pageProps }) {
  

  return (
    <ChakraProvider>
      <MoralisProvider appId={process.env.NEXT_PUBLIC_APPID} serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}>
        <Component {...pageProps} />
      </MoralisProvider>
      
    </ChakraProvider>
  )
}

export default MyApp
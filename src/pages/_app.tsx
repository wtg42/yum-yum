import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";

import { ChakraProvider } from '@chakra-ui/react'
import { SideBarProvider } from "../utils/SideBarProvider.tsx"


const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <SideBarProvider>
        <Component {...pageProps} />
      </SideBarProvider>
    </ChakraProvider>
  );
};

export default api.withTRPC(MyApp);

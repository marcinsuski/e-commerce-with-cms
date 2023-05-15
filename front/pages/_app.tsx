import type { AppProps } from "next/app";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
body {
  margin: 0;
  padding: 0; 
  font-family: 'Poppins', sans-serif;
  background-color: #eee;
}
`;

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <GlobalStyles />
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </>
    );
}

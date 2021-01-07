import { ChakraProvider, Container } from "@chakra-ui/react";
import buildApiClient from "../api/build-client";

import Header from "../components/header";

function MyApp({ Component, pageProps, currentUser }) {
  return (
    <ChakraProvider>
      <div>
        <Header currentUser={currentUser} />
        <Container className="container">
          <Component {...pageProps} currentUser={currentUser} />
        </Container>
      </div>
    </ChakraProvider>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const apiClient = buildApiClient(ctx.req);
  try {
    const { data } = await apiClient.get(`/api/users/currentuser`);

    let pageProps = {};
    // getInitialProps function for the child page
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(
        ctx,
        apiClient,
        data.currentUser
      );
    }

    return {
      pageProps,
      currentUser: data.currentUser,
    };
  } catch (e) {
    console.log("error occurred");
    throw e;
  }
};

export default MyApp;

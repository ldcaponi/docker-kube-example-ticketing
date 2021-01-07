import React from "react";
import Link from "next/link";
import { Flex, Box, Link as ChakraLink } from "@chakra-ui/react";

export default function Header({ currentUser }) {
  const links = [
    !currentUser && { label: "Sign Up", href: "/auth/signup" },
    !currentUser && { label: "Sign In", href: "/auth/signin" },
    currentUser && { label: "Sell Tickets", href: "/tickets/new" },
    currentUser && { label: "My Orders", href: "/orders" },
    currentUser && { label: "Sign Out", href: "/auth/signout" },
  ]
    .filter((i) => i)
    .map(({ label, href }) => (
      <Box ml={2} key={label}>
        <Link href={href}>
          <ChakraLink fontSize="xl" color="teal.500">
            {label}
          </ChakraLink>
        </Link>
      </Box>
    ));

  return (
    <Flex
      px={2}
      alignItems="center"
      h="60px"
      as="nav"
      className="navbar navbar-light bg-light"
    >
      <Box>
        <Link href="/">
          <ChakraLink fontSize="xl" className="navbar-brand">
            Git Tix
          </ChakraLink>
        </Link>
      </Box>

      <Flex as={Box} ml="auto">
        {links}
      </Flex>
    </Flex>
  );
}

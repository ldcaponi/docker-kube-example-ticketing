import Link from "next/link";
import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  Link as ChakraLink,
} from "@chakra-ui/react";

function HomePage({ currentUser, tickets }) {
  return (
    <div>
      <Heading>Tickets</Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Price</Th>
            <Th>View</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tickets.map((t) => (
            <Tr key={t.id}>
              <Td>{t.title}</Td>
              <Td>{t.price}</Td>
              <Td>
                <Link href="/tickets/[ticketId]" as={`/tickets/${t.id}`}>
                  <ChakraLink>View</ChakraLink>
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
}

HomePage.getInitialProps = async ({ req }, client, currentUser) => {
  const { data } = await client.get("/api/tickets");
  return { tickets: data };
};

export default HomePage;

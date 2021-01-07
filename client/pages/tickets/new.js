import React, { useState } from "react";
import useRequest from "../../hooks/use-request";
import Router from "next/router";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Box,
} from "@chakra-ui/react";

const NewTicket = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const onBlur = (e) => {
    const value = parseFloat(price);
    if (isNaN(value)) {
      return;
    }

    setPrice(value.toFixed(2));
  };

  const { doRequest, errors } = useRequest({
    url: "/api/tickets",
    method: "post",
    body: {
      title,
      price,
    },
    onSuccess: () => Router.push("/"),
  });
  return (
    <div>
      <Heading>Create a Ticket</Heading>
      <Box
        as="form"
        py={3}
        onSubmit={(e) => {
          e.preventDefault();
          doRequest();
        }}
      >
        <FormControl id="title">
          <FormLabel>Title</FormLabel>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormControl>
        <FormControl mb="3" id="price">
          <FormLabel>Price</FormLabel>
          <Input
            value={price}
            onBlur={onBlur}
            onChange={(e) => setPrice(e.target.value)}
          />
        </FormControl>
        {errors}
        <Button type="submit" colorScheme="blue">
          Submit
        </Button>
      </Box>
    </div>
  );
};

export default NewTicket;

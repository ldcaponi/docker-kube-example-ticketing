import axios from "axios";
import { useState } from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Flex,
  Box,
  AlertDescription,
} from "@chakra-ui/react";

export default function useRequest({ url, method, body, onSuccess }) {
  const [errors, setErrors] = useState(null);

  const doRequest = async (extraProps = {}) => {
    try {
      setErrors(null);
      const response = await axios[method](url, { ...body, ...extraProps });

      if (onSuccess) {
        return onSuccess(response.data);
      }

      return response.data;
    } catch (e) {
      console.error(e);
      setErrors(
        <Alert my={3} status="error">
          <AlertIcon />

          <div>
            <AlertTitle mr={2}>Oops!</AlertTitle>
            <Box as="ul" pl={5}>
              {e.response.data.errors.map((err) => (
                <li key={err.message}>{err.message}</li>
              ))}
            </Box>
          </div>
        </Alert>
      );
    }
  };

  return { doRequest, errors };
}

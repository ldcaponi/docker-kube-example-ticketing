import axios from "axios";
import { useState } from "react";

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
        <div className="alert alert-danger">
          <h4>Oops...</h4>
          <ul className="my-0">
            {e.response.data.errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
}

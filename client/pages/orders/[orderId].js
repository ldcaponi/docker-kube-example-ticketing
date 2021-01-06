import Router from "next/router";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import useRequest from "../../hooks/use-request";

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();

    const timerInterval = setInterval(findTimeLeft, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  const { doRequest, errors } = useRequest({
    url: "/api/payments",
    method: "post",
    body: { orderId: order.id },
    onSuccess: () => {
      Router.push("/orders");
    },
  });

  if (timeLeft < 0) {
    return <div>Order Expired</div>;
  }
  return (
    <div>
      Time left to order: {timeLeft}
      <div>
        <StripeCheckout
          token={({ id }) => doRequest({ token: id })}
          stripeKey="pk_test_DLBL8Lt8sTOzNFg5ZY3S3yVs"
          amount={order.ticket.price * 100}
          email={currentUser.email}
        />
      </div>
      {errors}
    </div>
  );
};

OrderShow.getInitialProps = async (context, client, currentUser) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data, currentUser };
};

export default OrderShow;

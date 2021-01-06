const OrderIndex = ({ orders }) => {
  return (
    <ul>
      {orders.map((o) => (
        <li key={o.id}>
          {o.ticket.title} - {o.status}
        </li>
      ))}
    </ul>
  );
};

OrderIndex.getInitialProps = async (ctx, client) => {
  const { data } = await client.get("/api/orders");

  return { orders: data };
};

export default OrderIndex;

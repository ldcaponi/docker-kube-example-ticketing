import Link from "next/link";
import React from "react";

function HomePage({ currentUser, tickets }) {
  return (
    <div>
      <h1>Tickets</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((t) => (
            <tr key={t.id}>
              <td>{t.title}</td>
              <td>{t.price}</td>
              <td>
                <Link href="/tickets/[ticketId]" as={`/tickets/${t.id}`}>
                  <a>View</a>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

HomePage.getInitialProps = async ({ req }, client, currentUser) => {
  const { data } = await client.get("/api/tickets");
  return { tickets: data };
};

export default HomePage;

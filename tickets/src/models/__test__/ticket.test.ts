import { Ticket } from "../Ticket";

it("implements optimistic currency control", async (done) => {
  // Create instance of ticket
  const ticket = Ticket.build({ title: "concert", price: 5, userId: "123" });

  // Save it to DB
  await ticket.save();

  // Fetch it twice
  const first = await Ticket.findById(ticket.id);
  const second = await Ticket.findById(ticket.id);

  // make two separate changes
  first!.set({ price: 10 });
  second!.set({ price: 15 });

  // save the first, expect to work as expected
  await first!.save();

  try {
    // save the second, expect it to fail
    await second!.save();
  } catch (e) {
    return done();
  }

  throw new Error("Should not reach this point");
});

it("increments version number on multiple saves", async () => {
  // Create instance of ticket
  const ticket = Ticket.build({ title: "concert", price: 5, userId: "123" });

  // Save it to DB
  await ticket.save();

  expect(ticket.version).toEqual(0);

  await ticket.save();

  expect(ticket.version).toEqual(1);

  await ticket.save();

  expect(ticket.version).toEqual(2);
});

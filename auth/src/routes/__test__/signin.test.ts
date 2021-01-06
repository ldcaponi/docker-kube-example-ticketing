import request from "supertest";
import { app } from "../../app";

it("fails with email that does not exist", async () => {
  return request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "validPassword",
    })
    .expect(400);
});

it("fails with existing user but incorrect password", async () => {
  const EMAIL = "test@test.com";
  const PASSWORD = "password";

  await request(app)
    .post("/api/users/signup")
    .send({
      email: EMAIL,
      password: PASSWORD,
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({
      email: EMAIL,
      password: "bad",
    })
    .expect(400);
});

it("responds with cookie when correct password supplied", async () => {
  const EMAIL = "test@test.com";
  const PASSWORD = "password";

  await request(app)
    .post("/api/users/signup")
    .send({
      email: EMAIL,
      password: PASSWORD,
    })
    .expect(201);

  const res = await request(app)
    .post("/api/users/signin")
    .send({
      email: EMAIL,
      password: PASSWORD,
    })
    .expect(200);

  expect(res.get("Set-Cookie")).toBeDefined();
});

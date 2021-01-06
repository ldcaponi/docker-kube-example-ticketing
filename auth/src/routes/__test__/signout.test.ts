import request from "supertest";
import { app } from "../../app";

it("clears cookie after signing out", async () => {
  const EMAIL = "test@test.com";
  const PASSWORD = "password";

  await request(app)
    .post("/api/users/signup")
    .send({
      email: EMAIL,
      password: PASSWORD,
    })
    .expect(201);

  const res = await request(app).post("/api/users/signout").send().expect(200);

  expect(res.get("Set-Cookie")[0]).toBe(
    "express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
  );
});

import request from "supertest";
import { app } from "../../app";

it("clears cookie after signing out", async () => {
  const EMAIL = "test@test.com";
  const PASSWORD = "password";

  const cookie = await global.signin(EMAIL, PASSWORD);

  const res = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(res.body.currentUser.email).toEqual(EMAIL);
});

it("responds with null when not authenticated", async () => {
  const res = await request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(200);

  expect(res.body.currentUser).toEqual(null);
});

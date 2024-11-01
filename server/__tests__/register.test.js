const { describe, it, beforeEach, expect } = require("@jest/globals")
const request = require("supertest")
const app = require("../app")
const { User } = require("../models")

describe("UserController", () => {
  beforeEach(async () => {
    await User.destroy({ where: {}, force: true })
  })

  it("success POST /user/register", async () => {
    const response = await request(app)
      .post("/register")
      .send({
        username: "yukihiro",
        email: "yukihiro@mail.com",
        password: "123456",
      })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty("message", "Register Success")
    expect(response.body).toHaveProperty("username", "yukihiro")
  })

  it("failed POST /user/register", async () => {
    const response = await request(app)
      .post("/register")
      .send({
        username: "yukihiro",
        email: "",
        password: "123456", // Field email dihilangkan untuk memicu error
      })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty("message", "Email is required")
  })
})

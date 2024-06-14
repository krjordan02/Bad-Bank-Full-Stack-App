const sample = require("./index");
describe("Test", () => {
  test("works", () => {
    expect(sample.sample()).toEqual("Test");
  });
});
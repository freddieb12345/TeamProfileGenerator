const Manager = require("../lib/Manager");

test("The Office phone number can be set through the constructor", () => {
  const test = 100;
  const e = new Manager("freddie", 1, "hello@me.com", test);
  expect(e.number).toBe(test);
});

test("getRole() should return Manager", () => {
    const test = "Manager";
    const e = new Manager("Freddie", 1, "hello@me.com", 100);
    expect(e.getRole()).toBe(test);
});

test("Can get the office number using getOffice()", () => {
    const test = 100;
    const e = new Manager("Freddie", 1, "hello@me.com", test);
    expect(e.getNumber()).toBe(test);
  });
const Intern = require("../lib/Intern");

test("The school can be set through the constructor", () => {
  const test = "UCLA";
  const e = new Intern("hello", 1, "hello@me.com", test);
  expect(e.school).toBe(test);
});

test("getRole() should return Intern", () => {
  const test = "Intern";
  const e = new Intern("Freddie", 1, "hello@me.com", "UCLA");
  expect(e.getRole()).toBe(test);
});

test("Can get the school using getSchool()", () => {
  const test = "UCLA";
  const e = new Intern("Freddie", 1, "hello@me.com", test);
  expect(e.getSchool()).toBe(test);
});
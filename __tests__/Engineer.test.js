const Engineer = require("../lib/Engineer");

test("The github account can be set through the constructor", () => {
  const test = "GitHubUser";
  const e = new Engineer("Freddie", 1, "hello@me.com", test);
  expect(e.github).toBe(test);
});

test("getRole() should return Engineer", () => {
  const test = "Engineer";
  const e = new Engineer("Freddie", 1, "hellot@me.com", "GitHubUser");
  expect(e.getRole()).toBe(test);
});

test("Can get the GitHub username using getGithub()", () => {
  const test = "GitHubUser";
  const e = new Engineer("Freddie", 1, "hello@me.com", test);
  expect(e.getGithub()).toBe(test);
});
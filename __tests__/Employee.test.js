const Employee = require("../lib/Employee");
 
describe("Employee", () => {
    it("Can start creating new employee", () => {
        const e = new Employee();
        expect(typeof(e)).toBe("object");
    });
    it("Name can be set via constructor", () => {
        const name = "Freddie";
        const e = new Employee(name);
        expect(e.name).toBe(name);
    });
    it("ID can be set via constructor", () => {
        const test = 100;
        const e = new Employee("hello", test);
        expect(e.id).toBe(test);
    });
    it("Email can be set via constructor", () => {
        const test = "hello@me.com";
        const e = new Employee("Freddie", 1, test);
        expect(e.email).toBe(test);
    });
    describe("getName", () => {
        it("Can get the name using getName()", () => {
            const test = "Freddie";
            const e = new Employee(test);
            expect(e.getName()).toBe(test);
        });
    });
    describe("getId", () => {
        it("Can get the id using getId()", () => {
            const test = 100;
            const e = new Employee("Freddie", test);
            expect(e.getId()).toBe(test);
        });
    });
    describe("getEmail", () => {
        it("Can get the email using getEmail()", () => {
            const test = "hello@me.com";
            const e = new Employee("hello", 1, test);
            expect(e.getEmail()).toBe(test);
        });
    });
    describe("getRole", () => {
        it("getRole() returns Employee", () => {
            const test = "Employee";
            const e = new Employee("Freddie", 1, "hello@me.com");
            expect(e.getRole()).toBe(test);
        });
    });

})
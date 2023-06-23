import { describe, expect, test } from "vitest";
import { readMessage } from "../dice";
import { regex } from "../server";

describe("validate regex", () => {
  describe("Valid", () => {
    test("2d10", () => {
      expect("!roll 2d10".match(regex)).not.toEqual(null);
    });
    test("9d100", () => {
      expect("!roll 9d100".match(regex)).not.toEqual(null);
    });
  });
  describe("inValid", () => {
    test("0d10", () => {
      expect("!roll 0d10".match(regex)).toBeNull();
    });
    test("10d100", () => {
      expect("!roll 10d100".match(regex)).toBeNull();
    });
    test("10d1000", () => {
      expect("!roll 10d1000".match(regex)).toBeNull();
    });
  });
});

describe("Valid dice", () => {
  describe("Multiple dice", () => {
    test("1d20", () => {
      let response = readMessage("1d20");
      expect(response !== undefined).toBe(true);
    });

    test("3d100", () => {
      let response = readMessage("3d100");
      expect(response !== undefined).toBe(true);
    });

    test("9d8", () => {
      let response = readMessage("9d8");
      expect(response !== undefined).toBe(true);
    });
  });

  describe("Single dice", () => {
    test("d20", () => {
      let response = readMessage("d20");
      expect(response !== undefined).toBe(true);
    });

    test("d100", () => {
      let response = readMessage("d100");
      expect(response !== undefined).toBe(true);
    });

    test("d8", () => {
      let response = readMessage("d8");
      expect(response !== undefined).toBe(true);
    });
  });
});

describe("Invalid dice", () => {
  describe("Number of dice", () => {
    test("0d100", () => {
      let response = readMessage("0d100");
      expect(response).toBeUndefined();
    });

    test("0d0", () => {
      let response = readMessage("0d0");
      expect(response).toBeUndefined();
    });

    test("20d0", () => {
      let response = readMessage("20d0");
      expect(response).toBeUndefined();
    });
  });

  describe("Dice sides", () => {
    test("2d0", () => {
      let response = readMessage("2d0");
      expect(response).toBeUndefined();
    });

    test("8d11", () => {
      let response = readMessage("8d11");
      expect(response).toBeUndefined();
    });

    test("d101", () => {
      let response = readMessage("d101");
      expect(response).toBeUndefined();
    });
  });
});

import { describe, expect, test } from "vitest";
import { readMessage } from "../dice";

describe("Valid dice", () => {
  test("1d20", () => {
    let response = readMessage("!roll 1d20");
    expect(response !== undefined).toBe(true);
  });

  test("3d100", () => {
    let response = readMessage("!roll 3d100");
    expect(response !== undefined).toBe(true);
  });

  test("d10", () => {
    let response = readMessage("!roll d10");
    expect(response !== undefined).toBe(true);
  });
});

describe("Invalid dice number", () => {
  test("0d100", () => {
    let response = readMessage("!roll 0d100");
    expect(response).toBeUndefined();
  });

  test("0d0", () => {
    let response = readMessage("!roll 0d0");
    expect(response).toBeUndefined();
  });

  test("10d0", () => {
    let response = readMessage("!roll 10d0");
    expect(response).toBeUndefined();
  });
});

describe("Invalid dice sides", () => {
  test("2d0", () => {
    let response = readMessage("!roll 2d0");
    expect(response).toBeUndefined();
  });

  test("8d11", () => {
    let response = readMessage("!roll 8d11");
    expect(response).toBeUndefined();
  });

  test("d101", () => {
    let response = readMessage("!roll d101");
    expect(response).toBeUndefined();
  });
});

import { fileList } from "@/lib/file-list";
import { compareFiles, getRandomInt, isChecked } from "@/lib/utils";
import { randomUUID } from "crypto";

describe("compareFiles", () => {
  it("should return true for files with the same ID and body", () => {
    const randomIndex = getRandomInt(fileList.length);
    const randomId = randomUUID();
    const fileA = { ...fileList[randomIndex], id: randomId };
    const fileB = { ...fileList[randomIndex], id: randomId };

    expect(compareFiles(fileA, fileB)).toBe(true);
  });

  it("should return false for files with the different ID and body", () => {
    const randomIdA = randomUUID();
    const randomIdB = randomUUID();

    const fileA = { ...fileList[0], id: randomIdA };
    const fileB = { ...fileList[1], id: randomIdB };

    expect(compareFiles(fileA, fileB)).toBe(false);
  });

  it("should return false for files with the different ID and same body", () => {
    const randomIndex = getRandomInt(fileList.length);
    const randomIdA = randomUUID();
    const randomIdB = randomUUID();

    const fileA = { ...fileList[randomIndex], id: randomIdA };
    const fileB = { ...fileList[randomIndex], id: randomIdB };

    expect(compareFiles(fileA, fileB)).toBe(false);
  });
});

describe("isChecked", () => {
  it("should return false when selected is 0", () => {
    expect(isChecked(0, 5)).toBe("false");
  });

  it("should return true when selected is equal to the max", () => {
    expect(isChecked(5, 5)).toBe("true");
  });

  it("should return indeterminate when selected is equal to the max", () => {
    expect(isChecked(3, 5)).toBe("indeterminate");
  });

  it("should return false when selected is 0 and max is 0", () => {
    expect(isChecked(0, 0)).toBe("false");
  });

  it("should return properly when parameters are out of bounds", () => {
    expect(isChecked(-1, 5)).toBe("false");
    expect(isChecked(8, 5)).toBe("true");
  });
});

import { CheckboxProps } from "@/components/Checkbox";
import { FileType, GetFileType } from "@/lib/types";
import { randomUUID } from "crypto";

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

const compareFiles = (a: GetFileType, b: GetFileType) => {
  return (
    a.id === b.id &&
    a.name === b.name &&
    a.device === b.device &&
    a.path === b.path &&
    a.status === b.status
  );
};

const isChecked = (selected: number, max: number): CheckboxProps["checked"] => {
  if (selected <= 0) return "false";
  if (selected >= max) return "true";
  return "indeterminate";
};

const addUuidToFiles = (fileList: FileType[]) => {
  return fileList.map((file) => ({ ...file, id: randomUUID() }));
};

export { compareFiles, isChecked, getRandomInt, addUuidToFiles };

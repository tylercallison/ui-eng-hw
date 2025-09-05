import { CheckboxProps } from "@/components/Checkbox";
import { GetFileType } from "@/app/api/files/route";

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
  if (selected === 0) return "false";
  if (selected === max) return "true";
  return "indeterminate";
};

export { compareFiles, isChecked };

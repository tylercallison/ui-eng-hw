import { Checkbox, CheckboxProps } from "./Checkbox";
import { ChangeEventHandler } from "react";
import { FileType } from "@/lib/types";
import { TableCell } from "./TableCell";

type TableRowProps = {
  file: FileType;
  index: number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  checked: CheckboxProps["checked"];
};

const TableRow = ({ file, index, onChange, checked }: TableRowProps) => {
  return (
    <tr
      key={index}
      className="border-t border-gray-200 hover:bg-gray-50 has-checked:bg-gray-100 dark:hover:bg-gray-900 dark:has-checked:bg-gray-800"
    >
      <TableCell className="p-4">
        <Checkbox
          checked={checked}
          onChange={onChange}
          disabled={file.status !== "available"}
        />
      </TableCell>
      <TableCell>{file.name}</TableCell>
      <TableCell>{file.device}</TableCell>
      <TableCell className="flex items-center justify-between gap-2 py-4">
        {file.path}
        {file.status === "available" && (
          <figure className="mr-2 h-6 w-6 rounded-full bg-green-400" />
        )}
      </TableCell>
      <TableCell className="capitalize">{file.status}</TableCell>
    </tr>
  );
};

export { TableRow, type TableRowProps };

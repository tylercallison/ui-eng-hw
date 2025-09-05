import { Checkbox, CheckboxProps } from "./Checkbox";
import { Dispatch, SetStateAction, useRef } from "react";
import { TableCell } from "./TableCell";
import clsx from "clsx";
import { GetFileType } from "@/app/api/files/route";
import { compareFiles } from "@/lib/utils";

type TableRowProps = {
  file: GetFileType;
  index: number;
  setSelected: Dispatch<SetStateAction<GetFileType[]>>;
  checked: Exclude<CheckboxProps["checked"], "indeterminate">;
};

const TableRow = ({ file, index, checked, setSelected }: TableRowProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const disabled = file.status !== "available";

  const handleRowOnChange = (checked: boolean, file: GetFileType) => {
    if (ref.current) ref.current.checked = checked;

    if (checked) setSelected((old) => [...old, file]);
    else setSelected((old) => old.filter((f) => !compareFiles(f, file)));
  };

  const handleRowClick = () => {
    if (disabled) return;

    switch (checked) {
      case "true":
        handleRowOnChange(false, file);
        break;
      case "false":
        handleRowOnChange(true, file);
        break;
    }
  };

  return (
    <tr
      key={index}
      className={clsx(
        "border-t border-gray-200 has-checked:bg-gray-100 dark:hover:bg-gray-900 dark:has-checked:bg-gray-800",
        {
          "cursor-pointer hover:bg-gray-50": !disabled,
        },
      )}
      onClick={handleRowClick}
    >
      <TableCell className="p-4">
        <Checkbox checked={checked} disabled={disabled} ref={ref} />
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

"use client";

import { isChecked, compareFiles } from "@/lib/utils";
import { Checkbox } from "./Checkbox";
import { DownloadButton } from "./DownloadButton";
import { TableRow, TableRowProps } from "./TableRow";
import { useState, ChangeEvent } from "react";
import { GetFileType } from "@/app/api/files/route";

type TableProps = {
  files: GetFileType[];
};

const Table = ({ files }: TableProps) => {
  const [selected, setSelected] = useState<GetFileType[]>([]);

  const maxSelectable = files.filter((f) => f.status === "available").length;

  const selectAllToggle = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked)
      setSelected(files.filter((f) => f.status === "available"));
    else setSelected([]);
  };

  const handleRowOnChange = (
    e: ChangeEvent<HTMLInputElement>,
    file: GetFileType,
  ) => {
    if (e.target.checked) setSelected([...selected, file]);
    else setSelected((old) => old.filter((f) => !compareFiles(f, file)));
  };

  return (
    <div className="flex flex-col overflow-x-scroll border border-gray-200">
      <div className="m-4 flex items-center gap-8">
        <div className="flex items-center justify-center gap-2 text-xl">
          <Checkbox
            checked={isChecked(selected.length, maxSelectable)}
            onChange={selectAllToggle}
            id="select-all"
          />
          <label htmlFor="select-all" className="cursor-pointer">
            {selected.length === 0
              ? "None Selected"
              : `Selected ${selected.length}`}
          </label>
        </div>

        <DownloadButton selected={selected} />
      </div>
      <table>
        <thead>
          <tr className="border-t border-gray-200">
            <th></th>
            <th className="py-4 text-start text-lg font-normal">Name</th>
            <th className="py-4 text-start text-lg font-normal">Device</th>
            <th className="py-4 text-start text-lg font-normal">Path</th>
            <th className="py-4 text-start text-lg font-normal">Status</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file, index) => (
            <TableRow
              key={file.id}
              file={file}
              index={index}
              onChange={(e) => handleRowOnChange(e, file)}
              checked={
                selected.some((f) => compareFiles(f, file)) ? "true" : "false"
              }
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { Table, type TableRowProps };

'use client';

import { isChecked, compareFiles } from '@/lib/utils';
import { Checkbox } from './Checkbox';
import { DownloadButton } from './DownloadButton';
import { TableRow, TableRowProps } from './TableRow';
import { useState, ChangeEvent } from 'react';
import { GetFileType } from '@/app/api/files/route';

type TableProps = {
  files: GetFileType[];
};

const Table = ({ files }: TableProps) => {
  const [selected, setSelected] = useState<GetFileType[]>([]);

  const maxSelectable = files.filter((f) => f.status === 'available').length;

  const selectAllToggle = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked)
      setSelected(files.filter((f) => f.status === 'available'));
    else setSelected([]);
  };

  const handleRowOnChange = (
    e: ChangeEvent<HTMLInputElement>,
    file: GetFileType
  ) => {
    if (e.target.checked) setSelected([...selected, file]);
    else setSelected((old) => old.filter((f) => !compareFiles(f, file)));
  };

  return (
    <div className='flex flex-col border border-gray-200 overflow-x-scroll'>
      <div className='flex items-center gap-8 m-4'>
        <div className='flex items-center justify-center gap-2 text-xl'>
          <Checkbox
            checked={isChecked(selected.length, maxSelectable)}
            onChange={selectAllToggle}
            id='select-all'
          />
          <label htmlFor='select-all' className='cursor-pointer'>
            {selected.length === 0
              ? 'None Selected'
              : `Selected ${selected.length}`}
          </label>
        </div>

        <DownloadButton selected={selected} />
      </div>
      <table>
        <thead>
          <tr className='border-t border-gray-200'>
            <th></th>
            <th className='text-start font-normal text-lg py-4'>Name</th>
            <th className='text-start font-normal text-lg py-4'>Device</th>
            <th className='text-start font-normal text-lg py-4'>Path</th>
            <th className='text-start font-normal text-lg py-4'>Status</th>
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
                selected.some((f) => compareFiles(f, file)) ? 'true' : 'false'
              }
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { Table, type TableRowProps };

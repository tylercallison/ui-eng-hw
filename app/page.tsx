'use client';

import { Checkbox } from '@/components/Checkbox';
import { compareFiles, isChecked } from '@/lib/utils';
import { fileList } from '@/lib/file-list';
import { FileType } from '@/lib/types';
import { ChangeEvent, useState } from 'react';
import { DownloadButton } from '@/components/DownloadButton';

export default function Home() {
  const [selected, setSelected] = useState<FileType[]>([]);

  const maxSelectable = fileList.filter((f) => f.status === 'available').length;

  const selectAllToggle = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked)
      setSelected(fileList.filter((f) => f.status === 'available'));
    else setSelected([]);
  };

  return (
    <>
      <header></header>
      <main className='flex flex-col mx-auto container h-full justify-center'>
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
                <th className='text-start text-lg py-4'>Name</th>
                <th className='text-start text-lg py-4'>Device</th>
                <th className='text-start text-lg py-4'>Path</th>
                <th className='text-start text-lg py-4'>Status</th>
              </tr>
            </thead>
            <tbody>
              {fileList.map((file, index) => (
                <tr
                  key={index}
                  className='border-t border-gray-200 hover:bg-gray-100 has-checked:bg-gray-200'
                >
                  <td className='p-4'>
                    <Checkbox
                      checked={
                        selected.some((f) => compareFiles(f, file))
                          ? 'true'
                          : 'false'
                      }
                      onChange={(e) => {
                        if (e.target.checked) setSelected([...selected, file]);
                        else
                          setSelected((old) =>
                            old.filter((f) => !compareFiles(f, file))
                          );
                      }}
                      disabled={file.status !== 'available'}
                    />
                  </td>
                  <td className='py-4'>{file.name}</td>
                  <td className='py-4 '>{file.device}</td>
                  <td className='flex items-center justify-between gap-2 py-4'>
                    {file.path}
                    {file.status === 'available' && (
                      <figure className='rounded-full bg-green-400 h-6 w-6 mr-2' />
                    )}
                  </td>
                  <td className='py-4 capitalize'>{file.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <footer></footer>
    </>
  );
}

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
        <div className='flex flex-col p-4 border border-gray-200'>
          <div className='flex items-center gap-8 mb-4'>
            <div className='flex items-center justify-center gap-2'>
              <Checkbox
                checked={isChecked(selected.length, maxSelectable)}
                onChange={selectAllToggle}
              />
              {selected.length === 0
                ? 'None Selected'
                : `Selected ${selected.length}`}
            </div>

            <DownloadButton selected={selected} />
          </div>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Device</th>
                <th>Path</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {fileList.map((file, index) => (
                <tr key={index}>
                  <td>
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
                  <td>{file.name}</td>
                  <td>{file.device}</td>
                  <td>
                    <div>
                      {file.path}
                      {file.status === 'available' && (
                        <figure className='rounded-full bg-green-400 h-4 w-4' />
                      )}
                    </div>
                  </td>
                  <td className='capitalize'>{file.status}</td>
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

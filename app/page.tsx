'use client';

import { compareFiles } from '@/lib/compare-files';
import { fileList } from '@/lib/file-list';
import { FileType } from '@/lib/types';
import { useState } from 'react';

export default function Home() {
  const [selected, setSelected] = useState<FileType[]>([]);

  return (
    <div>
      <header></header>
      <main>
        <div>
          <h2>Selected {selected.length}</h2>
          <button>Download Selected</button>
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
                  <input
                    type='checkbox'
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
                    {file.status === 'scheduled' && (
                      <figure className='rounded-full bg-green-400 h-4 w-4' />
                    )}
                  </div>
                </td>
                <td>{file.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      <footer></footer>
    </div>
  );
}

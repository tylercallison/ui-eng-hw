import { FileType } from '@/lib/types';
import { Download } from 'lucide-react';

type DownloadButtonProps = {
  selected: FileType[];
};

const DownloadButton = ({ selected }: DownloadButtonProps) => {
  return (
    <button
      onClick={() =>
        alert(selected.map((f) => `${f.device}: ${f.path}`).join('\n'))
      }
      disabled={selected.length === 0}
      className='flex items-center justify-center gap-2 cursor-pointer rounded hover:bg-gray-100 dark:hover:bg-gray-900 p-2 text-xl disabled:cursor-not-allowed'
    >
      <Download />
      Download Selected
    </button>
  );
};

export { DownloadButton, type DownloadButtonProps };

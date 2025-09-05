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
    >
      <Download />
      Download Selected
    </button>
  );
};

export { DownloadButton, type DownloadButtonProps };

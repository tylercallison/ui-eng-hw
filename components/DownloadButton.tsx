import { GetFileType } from "@/lib/types";
import { Download } from "lucide-react";

type DownloadButtonProps = {
  selected: GetFileType[];
};

const DownloadButton = ({ selected }: DownloadButtonProps) => {
  return (
    <button
      onClick={() =>
        alert(selected.map((f) => `${f.device}: ${f.path}`).join("\n"))
      }
      disabled={selected.length === 0}
      className="flex cursor-pointer items-center justify-center gap-2 rounded p-2 text-xl hover:bg-gray-100 disabled:cursor-not-allowed dark:hover:bg-gray-900"
    >
      <Download />
      Download Selected
    </button>
  );
};

export { DownloadButton, type DownloadButtonProps };

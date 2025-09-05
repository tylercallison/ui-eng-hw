type FileType = {
  name: string;
  device: string;
  path: string;
  status: "available" | "scheduled";
};

type GetFileType = FileType & {
  id: `${string}-${string}-${string}-${string}-${string}`;
};

type GetFilesRequestType = { files: GetFileType[] };

export type { FileType, GetFileType, GetFilesRequestType };

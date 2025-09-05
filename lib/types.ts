type FileType = {
  name: string;
  device: string;
  path: string;
  status: "available" | "scheduled";
};

type GetFileType = FileType & {
  id: `${string}-${string}-${string}-${string}-${string}`;
};

export type { FileType, GetFileType };

import { fileList } from "@/lib/file-list";
import { FileType } from "@/lib/types";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

export type GetFileType = FileType & {
  id: `${string}-${string}-${string}-${string}-${string}`;
};

export type GetFilesRequestType = { files: GetFileType[] };

export async function GET(): Promise<NextResponse<GetFilesRequestType>> {
  return NextResponse.json({
    files: fileList.map((file) => ({ ...file, id: randomUUID() })),
  });
}

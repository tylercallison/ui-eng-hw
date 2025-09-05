import { fileList } from "@/lib/file-list";
import { GetFilesRequestType } from "@/lib/types";
import { addUuidToFiles } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse<GetFilesRequestType>> {
  return NextResponse.json({
    files: addUuidToFiles(fileList),
  });
}

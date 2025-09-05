import { fileList } from "@/lib/file-list";
import { GetFilesRequestType } from "@/lib/types";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse<GetFilesRequestType>> {
  return NextResponse.json({
    files: fileList.map((file) => ({ ...file, id: randomUUID() })),
  });
}

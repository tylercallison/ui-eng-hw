import { Table } from "@/components/Table";
import { GetFilesRequestType } from "./api/files/route";

export default async function Home() {
  const response = await fetch("http://localhost:3000/api/files");
  const data = (await response.json()) as GetFilesRequestType;

  return (
    <main className="container mx-auto flex h-full flex-col justify-center">
      <Table files={data.files} />
    </main>
  );
}

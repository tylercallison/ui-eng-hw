import { Table } from "@/components/Table";
import { fileList } from "@/lib/file-list";
import { addUuidToFiles } from "@/lib/utils";

export default function Home() {
  // API call removed for builds when localhost is not available
  const files = addUuidToFiles(fileList);

  return (
    <main className="container mx-auto flex h-full flex-col justify-center">
      <Table files={files} />
    </main>
  );
}

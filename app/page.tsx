import { Table } from '@/components/Table';
import { GetFilesRequestType } from './api/files/route';

export default async function Home() {
  const response = await fetch('http://localhost:3000/api/files');
  const data = (await response.json()) as GetFilesRequestType;

  return (
    <main className='flex flex-col mx-auto container h-full justify-center'>
      <Table files={data.files} />
    </main>
  );
}

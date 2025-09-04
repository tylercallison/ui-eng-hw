import { FileType } from './types';

function compareFiles(a: FileType, b: FileType) {
  return (
    a.name === b.name &&
    a.device === b.device &&
    a.path === b.path &&
    a.status === b.status
  );
}

export { compareFiles };

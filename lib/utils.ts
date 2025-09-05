import { CheckboxProps } from '@/components/Checkbox';
import { FileType } from './types';

const compareFiles = (a: FileType, b: FileType) => {
  return (
    a.name === b.name &&
    a.device === b.device &&
    a.path === b.path &&
    a.status === b.status
  );
};

const isChecked = (selected: number, max: number): CheckboxProps['checked'] => {
  if (selected === 0) return 'false';
  if (selected === max) return 'true';
  return 'indeterminate';
};

export { compareFiles, isChecked };

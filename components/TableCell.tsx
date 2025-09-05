import clsx from 'clsx';
import { ReactNode } from 'react';

type TableCellProps = {
  children: ReactNode;
  className?: string;
};

const TableCell = ({ children, className }: TableCellProps) => {
  return <td className={clsx('py-4', className)}>{children}</td>;
};

export { TableCell, type TableCellProps };

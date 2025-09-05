import clsx from 'clsx';
import { ChangeEventHandler, useRef } from 'react';

type CheckboxProps = {
  checked: 'true' | 'false' | 'indeterminate';
  onChange?: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  className?: string;
};

const isIndeterminate = (state: CheckboxProps['checked']) => {
  return state === 'indeterminate';
};

const Checkbox = ({
  checked,
  onChange,
  disabled,
  className,
}: CheckboxProps) => {
  const ref = useRef<HTMLInputElement>(null);

  if (ref.current) {
    ref.current.indeterminate = isIndeterminate(checked);
  }

  return (
    <input
      type='checkbox'
      ref={ref}
      checked={isIndeterminate(checked) ? false : checked === 'true'}
      aria-checked={isIndeterminate(checked) ? 'mixed' : checked}
      onChange={onChange}
      disabled={disabled}
      className={clsx(className, {
        'cursor-pointer': !disabled,
        'cursor-not-allowed': disabled,
      })}
    />
  );
};

export { Checkbox, type CheckboxProps };

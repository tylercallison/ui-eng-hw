import clsx from "clsx";
import { ChangeEventHandler, RefObject } from "react";

type CheckboxProps = {
  checked?: "true" | "false" | "indeterminate";
  onChange?: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  className?: string;
  id?: string;
  ref?: RefObject<HTMLInputElement | null>;
};

const isIndeterminate = (state: CheckboxProps["checked"]) => {
  return state === "indeterminate";
};

const Checkbox = ({
  checked,
  onChange,
  disabled,
  className,
  id,
  ref,
}: CheckboxProps) => {
  if (ref?.current) {
    ref.current.indeterminate = isIndeterminate(checked);
  }

  const handleMangedChecked = () => {
    if (checked === undefined) return undefined;

    return isIndeterminate(checked) ? false : checked === "true";
  };

  return (
    <input
      type="checkbox"
      ref={ref}
      checked={handleMangedChecked()}
      aria-checked={isIndeterminate(checked) ? "mixed" : checked}
      onChange={onChange}
      readOnly={onChange === undefined}
      disabled={disabled}
      id={id}
      className={clsx(className, {
        "cursor-pointer": !disabled,
        "cursor-not-allowed": disabled,
      })}
    />
  );
};

export { Checkbox, type CheckboxProps };

import clsx from "clsx";
import { Check, Minus } from "lucide-react";
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
    <div className="flex">
      <input
        type="checkbox"
        ref={ref}
        checked={handleMangedChecked()}
        aria-checked={isIndeterminate(checked) ? "mixed" : checked}
        onChange={onChange}
        readOnly={onChange === undefined}
        disabled={disabled}
        id={id}
        className="hidden"
      />
      <label
        htmlFor={id}
        className={clsx(
          className,
          "flex h-6 w-6 items-center justify-center rounded border",
          {
            "bg-blue-500": checked !== "false",
            "cursor-pointer": !disabled,
            "cursor-not-allowed": disabled,
          },
        )}
      >
        {checked === "true" && (
          <Check size={16} stroke="white" strokeWidth={4} />
        )}
        {checked === "indeterminate" && (
          <Minus size={16} stroke="white" strokeWidth={4} />
        )}
      </label>
    </div>
  );
};

export { Checkbox, type CheckboxProps };

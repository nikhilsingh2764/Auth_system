import clsx from "clsx";

function Input({

    label, // Displays the field name above the input.

    type = "text",

    placeholder,

    value, //Makes the input a controlled component.

    onChange, // Runs whenever the input value changes.

    onBlur,  // Runs when the input loses focus. Commonly used for validation.

    name,

    error,  //Displays validation errors from React Hook Form or Zod.

    disabled = false,  // Prevents typing while an API request is in progress.

    className,

}) {

    return (

        <div className="space-y-2">

            <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700"
            >
                {label}
            </label>

            <input

                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                disabled={disabled}

                className={clsx(

                    "w-full rounded-lg border px-4 py-3 outline-none transition",
                    "focus:border-blue-500 focus:ring-2 focus:ring-blue-200",

                    error ? "border-red-500" : "border-gray-300",

                    disabled && "cursor-not-allowed bg-gray-100",

                    className
                )}
            />
            {error && (<p className="text-sm text-red-500"> {error} </p>)}
        </div>

    );

}

export default Input;
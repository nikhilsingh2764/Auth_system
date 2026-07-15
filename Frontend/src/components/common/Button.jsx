import clsx from "clsx";  //Combines CSS class names conditionally.

function Button({

    children,  // Represents everything written between <Button>...</Button>.

    type = "button",

    onClick,

    disabled = false, // Prevents user interaction.
 
    loading = false,  // Prevents multiple API requests by disabling the button.

    className,

}) {

    return (

        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={clsx(
                "w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition",
                "hover:bg-blue-700",
                "disabled:cursor-not-allowed",
                "disabled:opacity-60",
                className
            )}
        >
            {  loading ? "Loading..." : children }
        </button>

    );

}

export default Button;
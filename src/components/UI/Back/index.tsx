interface ButtonInterface {
    className?: string;
    text: string;
    onClick: () => void;
}

export const Button = ({ className, text, onClick, ...rest }: ButtonInterface) => {
    return (
        <button
        {...rest}
            className={
                `
                    ${className}
                    hover:bg-accent/70 border-none rounded-xl py-2 px-4 min-w-[150px] 
                    hover:cursor-pointer text-white transition-all duration-200 ease-in-out
                `
            }
            onClick={onClick}
            type='button'
            aria-label='Customize'
        >
            {text}
        </button>
    );
};

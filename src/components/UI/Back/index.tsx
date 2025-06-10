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
                    bg-accent/70 hover:bg-accent border-none rounded-xl py-2 px-4 min-w-[150px] 
                    hover:cursor-pointer text-main
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

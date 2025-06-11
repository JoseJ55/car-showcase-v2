import { motion } from 'motion/react';
import type React from 'react';

interface BgContainerInterface {
    className?: string;
    children: React.ReactNode;
}

export const BgContainer = ({ className, children, ...rest }: BgContainerInterface) => {
    return (
        <motion.div
            className={
                `
                    ${className}
                    w-fit h-fit p-10 flex flex-col justify-center items-start bg-black/40 rounded-xl
                    pointer-events-auto text-white overflow-hidden border-accent border-[1px]
                    backdrop-blur-sm
                `
            }
            {...rest}
        >
            {children}
        </motion.div>
    );
};

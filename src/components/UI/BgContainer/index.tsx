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
                    w-fit h-fit p-10 flex flex-col justify-center items-start bg-faded rounded-xl
                    pointer-events-auto text-main overflow-hidden
                `
            }
            {...rest}
        >
            {children}
        </motion.div>
    );
};

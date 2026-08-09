const NeoButton = ({ children, className = '', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button
            className={`px-10 py-4 border-4 border-neo-black rounded-none text-neo-black font-black uppercase text-xl shadow-[6px_6px_0px_0px_var(--color-neo-black)] transition-all hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0px_0px_var(--color-neo-black)] active:translate-y-2 active:translate-x-2 active:shadow-none ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default NeoButton;

import NeoButton from "@/components/neobutton";

export default function Home() {
    return (
        <main className="max-w-3xl mx-auto p-8 space-y-12 min-h-screen flex flex-col justify-center">
            <header className="flex flex-col items-center space-y-6 text-center">
                <h1 className="text-6xl font-sans font-black tracking-tighter text-neo-black border-4 border-neo-black bg-neo-yellow inline-block px-8 py-3 shadow-[8px_8px_0px_0px_var(--color-neo-black)] -rotate-2">
                    Pastebin
                </h1>
                <p className="text-lg font-gmono text-neo-black bg-neo-pink border-4 border-neo-black inline-block px-6 py-2 shadow-[4px_4px_0px_0px_var(--color-neo-black)] rotate-1">
                    A tool for sharing some text...
                </p>
            </header>

            <form className="flex flex-col space-y-8 pt-4">
                <label htmlFor="paste-content" className="sr-only">
                    Paste content
                </label>
                {/*only show when link is available*/}
                <div className="gap-2 hidden"> 
                    <p className="text-white">Link:</p>
                    <a href="" className="text-blue-300 italic" id="linkID"></a>
                </div>

                <textarea
                    id="paste-content"
                    cols={80}
                    rows={10}
                    className="w-full p-6 border-4 border-neo-black bg-neo-white text-neo-black font-bold text-lg rounded-none outline-none shadow-[8px_8px_0px_0px_var(--color-neo-black)] transition-transform focus:-translate-y-1 focus:-translate-x-1 focus:shadow-[12px_12px_0px_0px_var(--color-neo-black)] resize-y"
                    placeholder="Paste Here..."
                />

                <div className="flex flex-row space-x-6 justify-center">
                    <NeoButton className="bg-neo-green" type="submit">
                        Save
                    </NeoButton>
                    <NeoButton className="bg-neo-orange" type="button">
                        Discard
                    </NeoButton>
                </div>
            </form>
        </main>
    );
}

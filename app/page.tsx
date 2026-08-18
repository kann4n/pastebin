"use client";

import NeoButton from "@/components/neobutton";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
    const [content, setContent] = useState("");
    const [pasteId, setPasteId] = useState<string | null>(null);
    const [sameID, setSameID] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        if (!content.trim()) return;

        setIsLoading(true);
        setPasteId(null);
        setSameID(false);

        try {
            const response = await fetch("/api/pastes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ content }),
            });

            const data = await response.json();

            if (data.success) {
                setPasteId(data.id);
                setContent("");
            } else if (response.status === 409 || data.status === 409) {
                setSameID(true);
            } else {
                console.error(data.error);
            }
        } catch (error) {
            console.error("Failed to submit paste", error);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <main className="max-w-3xl mx-auto p-8 space-y-12 min-h-screen flex flex-col justify-center">
            <header className="flex flex-col items-center space-y-6 text-center">
                <h1 className="text-6xl font-sans font-black tracking-tighter text-neo-black border-4 border-neo-black bg-neo-yellow inline-block px-8 py-3 shadow-[8px_8px_0px_0px_var(--color-neo-black)] -rotate-2">
                    Pastebin
                </h1>
                <p className="text-lg font-gmono text-neo-black bg-neo-pink border-4 border-neo-black inline-block px-6 py-2 shadow-[4px_4px_0px_0px_var(--color-neo-black)] rotate-1">
                    A tool for sharing some text...
                </p>

                <div className="flex">
                    <Link href="/all" className="text-neo-white text-sm hover:underline">
                        #all
                    </Link>
                </div>
            </header>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col space-y-8 pt-4"
            >
                <label htmlFor="paste-content" className="sr-only">
                    Paste content
                </label>

                {pasteId && (
                    <div className="gap-2 flex flex-col p-4 border-4 border-neo-black bg-neo-white shadow-[4px_4px_0px_0px_var(--color-neo-black)]">
                        <p className="text-neo-black font-bold">
                            Your link is ready:
                        </p>
                        <Link
                            href={`/${pasteId}`}
                            className="text-blue-600 font-bold italic underline"
                        >
                            {typeof window !== "undefined"
                                ? window.location.origin 
                                : ""}
                            /{pasteId}
                        </Link>
                    </div>
                )}
                
                {sameID && (
                    <p className="text-neo-yellow font-bold bg-neo-black p-2">
                        Oops, bad luck! We generated an ID that&apos;s already taken. Smash that button again for a new one                    </p>
                )}

                <textarea
                    id="paste-content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    cols={80}
                    rows={10}
                    className="w-full p-6 border-4 border-neo-black bg-neo-white text-neo-black font-bold text-lg rounded-none outline-none shadow-[8px_8px_0px_0px_var(--color-neo-black)] transition-transform focus:-translate-y-1 focus:-translate-x-1 focus:shadow-[12px_12px_0px_0px_var(--color-neo-black)] resize-y"
                    placeholder="Paste Here..."
                    required
                />

                <div className="flex flex-row space-x-6 justify-center">
                    <NeoButton
                        className="bg-neo-green disabled:opacity-50 disabled:cursor-not-allowed"
                        type="submit"
                        disabled={isLoading || !content.trim()}
                    >
                        {isLoading ? "Creating..." : "Get Link"}
                    </NeoButton>
                </div>
            </form>
        </main>
    );
}

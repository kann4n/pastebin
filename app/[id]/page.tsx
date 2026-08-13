import clientPromise from "@/lib/mongodb";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function PastePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const client = await clientPromise;
    const db = client.db("pastebin");
    const paste = await db.collection("pastes").findOne({ id });

    if (!paste) {
        notFound();
    }

    return (
        <main className="flex flex-col justify-center min-h-screen max-w-3xl mx-auto p-8 space-y-12">
            <header className="flex flex-col items-center space-y-6 text-center">
                <h1 className="-rotate-2 inline-block px-8 py-3 bg-neo-yellow border-4 border-neo-black shadow-[8px_8px_0px_0px_var(--color-neo-black)] text-4xl font-sans font-black tracking-tighter text-neo-black">
                    Paste: {id}
                </h1>
                <p className="font-bold text-gray-400">
                    Created on {new Date(paste.createdAt).toLocaleDateString()}
                </p>
            </header>

            <div className="flex flex-col pt-4 space-y-8">
                <div className="w-full p-6 border-4 border-neo-black bg-neo-white text-neo-black font-bold text-lg shadow-[8px_8px_0px_0px_var(--color-neo-black)]">
                    <pre className="whitespace-pre-wrap font-gmono overflow-x-auto">
                        {paste.content}
                    </pre>
                </div>

                <div className="flex justify-center space-x-6">
                    <Link
                        href="/"
                        className="bg-neo-pink px-8 py-3 font-bold border-4 border-neo-black shadow-[4px_4px_0px_0px_var(--color-neo-black)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_0px_var(--color-neo-black)] transition-transform text-neo-black"
                    >
                        Create New Paste
                    </Link>
                </div>
            </div>
        </main>
    );
}
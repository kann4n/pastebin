import clientPromise from "@/lib/mongodb";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AllPastesPage() {
    const LIMIT = 10;
    const client = await clientPromise;
    const db = client.db("pastebin");
    
    const pastes = await db.collection("pastes")
        .find({}, { projection: { _id: 0 } })
        .sort({ createdAt: -1 })
        .limit(LIMIT)
        .toArray();

    return (
        <main className="flex flex-col min-h-screen max-w-4xl mx-auto p-8 space-y-12">
            <header className="flex flex-col items-center space-y-6 text-center">
                <h1 className="-rotate-2 inline-block px-8 py-3 bg-neo-yellow border-4 border-neo-black shadow-[8px_8px_0px_0px_var(--color-neo-black)] text-4xl font-sans font-black tracking-tighter text-neo-black">
                    Recent Pastes
                </h1>
                <p className="font-bold text-gray-400">
                    Showing the {pastes.length} newest snippets
                </p>
            </header>

            {pastes.length === 0 ? (
                <div className="text-center font-bold text-xl text-neo-black">
                    No pastes found! Be the first to create one.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                    {pastes.map((paste) => (
                        <div 
                            key={paste.id} 
                            className="flex flex-col p-6 border-4 border-neo-black bg-neo-white text-neo-black shadow-[8px_8px_0px_0px_var(--color-neo-black)]"
                        >
                            <div className="flex justify-between items-center mb-4 pb-4 border-b-4 border-neo-black">
                                <span className="font-bold text-xl">#{paste.id}</span>
                                <span className="text-sm font-bold text-gray-500">
                                    {new Date(paste.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            
                            <pre className="whitespace-pre-wrap font-gmono overflow-hidden line-clamp-4 mb-6 text-sm">
                                {paste.content}
                            </pre>
                            
                            <Link
                                href={`/${paste.id}`}
                                className="mt-auto bg-neo-pink text-center px-6 py-2 font-bold border-4 border-neo-black shadow-[4px_4px_0px_0px_var(--color-neo-black)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_var(--color-neo-black)] transition-transform text-neo-black"
                            >
                                View Paste
                            </Link>
                        </div>
                    ))}
                </div>
            )}

            <div className="flex justify-center pt-8">
                <Link
                    href="/"
                    className="bg-neo-yellow px-8 py-3 font-bold border-4 border-neo-black shadow-[4px_4px_0px_0px_var(--color-neo-black)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_0px_var(--color-neo-black)] transition-transform text-neo-black"
                >
                    Create New Paste
                </Link>
            </div>
        </main>
    );
}
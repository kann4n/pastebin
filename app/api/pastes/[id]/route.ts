import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const client = await clientPromise;
        const db = client.db("pastebin");

        const { id } = await params;
        
        const paste = await db.collection("pastes").findOne({ id });
        console.log("id", id, "paste", paste);
        if (!paste) {
            return NextResponse.json(
                { error: "Paste not found or has expired." },
                { status: 404 },
            );
        }

        return NextResponse.json(
            {
                success: true,
                id: paste.id,
                content: paste.content,
                createdAt: paste.createdAt,
            },
            { status: 200 },
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 },
        );
    }
}

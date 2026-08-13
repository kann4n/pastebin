import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { generateBase62 } from "@/lib/utils";

export async function POST(request: NextRequest) {
    try {
        const client = await clientPromise;
        const db = client.db("pastebin");

        const body = await request.json();

        if (!body.id) {
            const generatedId = generateBase62(3);
            body.id = generatedId;
        }

        if (!body.content) {
            return NextResponse.json(
                { error: "Content is empty" },
                { status: 400 },
            );
        }

        const bodySize = Buffer.byteLength(body.content, "utf8");
        const idSize = Buffer.byteLength(body.id, "utf8");

        if (bodySize > 32768) {
            return NextResponse.json(
                { error: "Payload Too Large: Maximum 32 KB allowed." },
                { status: 413 },
            );
        }

        if (idSize > 16) {
            return NextResponse.json(
                { error: "ID Too Large: Maximum 16 characters allowed." },
                { status: 413 },
            );
        }

        const paste = await db.collection("pastes").findOne({ id: body.id });

        if (paste) {
            return NextResponse.json(
                { error: "ID already exists" },
                { status: 409 },
            );
        }

        const newPaste = {
            id: body.id,
            content: body.content,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        await db.collection("pastes").insertOne(newPaste);

        return NextResponse.json(
            { success: true, id: body.id, message: "Paste created successfully" },
            { status: 201 },
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 },
        );
    }
}

import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import bg from "@/public/bg.png";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
    variable: "--font-space-grotesk",
    subsets: ["latin"],
});

// Note: Space Mono requires both 400 and 700 if you want normal and bold text
const spaceMono = Space_Mono({
    variable: "--font-space-mono",
    weight: ["400", "700"], 
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Pastebin",
    description: "Paste any text you want",
};

// Fixed the typing for standard Next.js App Router layouts
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${spaceMono.variable} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col relative">
                
                <div className="fixed inset-0 -z-10">
                    <Image 
                        src={bg} 
                        alt="background" 
                        fill 
                        priority
                        className="object-cover" 
                    />
                </div>
                
                {children}
            </body>
        </html>
    );
}
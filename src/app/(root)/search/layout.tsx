import DetailsHeader from "@/components/DetailsHeader";
import type { Metadata } from "next";


export const metadata: Metadata = {
    title: "Search",
    description: "Searcb Flights",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <DetailsHeader />
            {children}
        </div>
    );
}

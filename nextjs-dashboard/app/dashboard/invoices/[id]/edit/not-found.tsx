import { FaceFrownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex flex-col h-full items-center justify-center gap-2">
            <FaceFrownIcon className="w-10 text-gray-400" />
            <h2>404 Not Found</h2>
            <p>Could not find the requested invoice.</p>
            <Link
                href="/dashboard/invoices"
                className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-950"
            >
                Go Back
            </Link>
        </main>
    );
}
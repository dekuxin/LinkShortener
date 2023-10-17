import { ColumnDef } from "@tanstack/react-table";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { urlDoc } from "@/pages/index.tsx";
import { auth, db } from "@/firebaseConfig";
import { getDocs, query, where, collection, doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";


async function deleteURL(urlCode: string) {
	const urlQuery = query(
		collection(db, "url"),
		where("shortenedURL", "==", urlCode),
	);
	const docs = await getDocs(urlQuery);
	let counter = 0;
	docs.forEach(async (docu) => {

		if (counter !== 0) return;
		counter++;
		await deleteDoc(doc(db, 'url', docu.id))
	});

	if (!auth.currentUser) return
	
	const userRef = doc(db, 'users', auth.currentUser!.uid)
	const userData = await getDoc(userRef);
	if (userData.exists()) {
		await setDoc(userRef, {
			urls: userData.data().urls.filter((url:urlDoc) => url.shortenedURL !== urlCode)
		});
	}
}

export const columns: ColumnDef<urlDoc>[] = [
	{
		accessorKey: "shortenedURL",
		header: "Shortened URL Code",
	},
	{
		accessorKey: "originalURL",
		header: "Original URL",
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const url = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem onClick={() => deleteURL(url.shortenedURL)}>
							Delete
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={() =>
								navigator.clipboard.writeText(window.location.origin +"/" + url.shortenedURL)
							}>
							Copy shortened URL
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() =>
								navigator.clipboard.writeText(url.originalURL)
							}>
							Copy original URL
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
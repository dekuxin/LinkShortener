import { Input } from "../ui/input";
import { Button } from "../ui/button";
import React, {useState} from "react"
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { getRandomString } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast"
import AlertSuccess from "./AlertSuccess";

function UrlShortener({uid}:{uid: string | null | undefined}) {

    const [search, setSearch] = useState<string>("")
    const { toast } = useToast();
    const [response, setResponse] = useState<string | null>("")

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        addURL({originalURL: search.trim()})
    }

    async function addURL({ originalURL }: { originalURL: string }): Promise<void> {
        try {
            // Add new url to database
            const urlID: string = crypto.randomUUID();
            const urlShortened: string = getRandomString();
            const urlRef = doc(db, 'url', urlID)
            await setDoc(urlRef, {
                originalURL,
                shortenedURL: urlShortened,
                id: urlID,
                createdAt: serverTimestamp(),
                createdBy: uid || 'Anonymous'
            })

            // Add it to user doc
            if (uid) {
                const userRef = doc(db, 'users', uid)
                const userData = await getDoc(userRef)
                if (userData.exists()) {
                    await setDoc(userRef, {
                        urls: [...userData.data().urls, {originalURL, shortenedURL: urlShortened, id: urlID}]
                    })
                }
            }

            setResponse(window.location.origin + "/" + urlShortened);

            
        } catch (e) {
            console.error(e)
            toast({
				variant: "destructive",
				title: "Uh oh! Something went wrong.",
				description: "There was a problem with your request.",
				action: (
					<ToastAction altText="Try again">Try again</ToastAction>
				),
			});
        }
    }

    return (
		<>
			{response && <AlertSuccess url={response} />}
			<form
				onSubmit={handleSubmit}
				className="flex flex-col w-full md:flex-row md:max-w-[75%] md:px-0 px-4 my-10 items-center gap-4 ">
				<Input
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					type="text"
					className="md:flex-1 shadow-sm w-full"
					placeholder="Enter URL"
				/>
				<Button
					disabled={search.length === 0}
					type="submit"
					className="md:w-auto w-full">
					Shorten URL
				</Button>
			</form>
		</>
	);
}

export default UrlShortener;
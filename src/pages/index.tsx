import Navbar from "@/components/src/Navbar";
import UrlList from "@/components/src/UrlList";
import UrlShortener from "@/components/src/UrlShortener";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/firebaseConfig";
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { login } from "@/lib/login";

export type urlDoc = {
	originalURL: string;
	shortenedURL: string;
	id: string;
	createdAt: object | string | number;
	createdBy?: string;
}

function LandingPage() {

    const [user, loading] = useAuthState(auth, {
        onUserChanged: async (userChanged) => {
            if(!userChanged) return
            const userRef = doc(db, 'users', userChanged?.uid)
            const docSnap = await getDoc(userRef)
            if (docSnap.exists()) return
            
            await setDoc(userRef, {
                urls: []
            })
        }
    });

    const [userUrls, setUserUrls] = useState<urlDoc[]>([])

    useEffect(() => {
        if (!user) return
        const userRef = doc(db, 'users', user.uid)
        const unsub = onSnapshot(userRef, doc => {
            if(doc.exists()) setUserUrls(doc.data().urls)
        })
        
        return () => unsub()
    }, [,user])

	return (
		<div className="h-full flex items-center flex-col">
			<div className="w-full bg-primary-foreground mb-5 sticky top-0 shadow-sm">
				<Navbar
					src={user?.photoURL || null}
					name={user?.displayName || null}
				/>
			</div>
			<p className="w-full text-center md:w-3/4 px-4 md:px-0">
				Shorten your URLs for free. <br /> To get to a specific URL, just type
				in the URL bar : {window.location.origin}<span className="font-bold">/yourURLcode</span>
			</p>
			<UrlShortener uid={user?.uid} />
			{loading ? (
				<div>Loading</div>
			) : user ? (
				<UrlList URLs={userUrls} />
			) : (
				<div className="flex flex-col items-center gap-4">
					<h3>
						To save your urls, please login with your google
						account.
					</h3>
					<Button onClick={login}>Login</Button>
				</div>
			)}
		</div>
	);
}

export default LandingPage;

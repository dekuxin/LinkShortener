import { db } from "@/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import {  useParams } from "react-router-dom";
import {useEffect, useState} from "react"


function RedirectLink() {

    const [origin, setOrigin] = useState<string>("")

    async function findUrl(urlCode: string) {
        
        const urlQuery = query(
			collection(db, "url"),
			where("shortenedURL", "==", urlCode),
		);
        const docs = await getDocs(urlQuery)
        let counter = 0 
        console.log(docs.empty)
        if (docs.empty) return window.location.replace("/404/unknown_link")
        
        docs.forEach((doc) => {
            setOrigin(doc.data().originalURL);
            if (counter !== 0) return;
            window.location.replace(doc.data().originalURL)
            counter ++
        })
    }

    const { link } = useParams<string>()
    
    useEffect(() => {
        if(link) findUrl(link)
    }, [])
    return <>
        {link}: Redirecting to {origin}
    </>
}

export default RedirectLink;
import { useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useSearchEvent = () => {
	const [event, setEvent] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const showToast = useShowToast();

	const getSearchEvent = async ({ eventId, eventName }) => {
		setIsLoading(true);
		setEvent(null);
		try {
			const q = eventId 
				? query(collection(firestore, "events"), where("id", "==", eventId)) 
				: query(collection(firestore, "events"), where("name", "==", eventName))			
			const querySnapshot = await getDocs(q);
			if (querySnapshot.empty) return showToast("Error", "User not found", "error");
			querySnapshot.forEach((doc) => {
				setEvent(doc.data());
			});
		} catch (error) {
			showToast("Error", error.message, "error");
			setEvent(null);
		} finally {
			setIsLoading(false);
		}
	};

	return { isLoading, getSearchEvent, event, setEvent };
};

export default useSearchEvent;

import { useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGroupEvents = () => {
	const showToast = useShowToast();
	const [event, setEvent] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const getGroupEvents = async (groupId) => {
		setIsLoading(true);
		setEvent(null);
		try {
			const q = query(collection(firestore, "events"), where("groupId", "==", groupId));
			const querySnapshot = await getDocs(q);
			// if (querySnapshot.empty) return showToast("Error", "User not found", "error");
			const newValues = [];
			querySnapshot.forEach((doc) => {
				newValues.push(doc.data());
			});
			setEvent(newValues);
		} catch (error) {
			showToast("Error", error.message, "error");
			setEvent(null);
		} finally {
			setIsLoading(false);
		}
	};

	return { isLoading, getGroupEvents, event, setEvent };
};

export default useGroupEvents;

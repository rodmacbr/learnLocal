import { useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDocs, query } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useSearchListGroup = () => {
	const [listGroup, setListGroup] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const showToast = useShowToast();

	const getSearchListGroup = async () => {
		setIsLoading(true);
		setListGroup(null);
		try {
			const q = query(collection(firestore, "groups"));
			const querySnapshot = await getDocs(q);
			// if (querySnapshot.empty) return showToast("Error", "User not found", "error");
			const newValues = [];
			querySnapshot.forEach((doc) => {
				newValues.push(doc.data());
			});
			setListGroup(newValues);
		} catch (error) {
			showToast("Error", error.message, "error");
			setListGroup(null);
		} finally {
			setIsLoading(false);
		}
	};

	return { isLoading, getSearchListGroup, listGroup, setListGroup };
};

export default useSearchListGroup;

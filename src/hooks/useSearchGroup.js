import { useState } from "react";
import useShowToast from "./useShowToast";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useSearchGroup = () => {
	const [group, setGroup] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const showToast = useShowToast();

	const getSearchGroup = async ({groupId, groupName}) => {
		setIsLoading(true);
		setGroup(null);
		try {
			const q = groupId 
				? query(collection(firestore, "groups"), where("id", "==", groupId)) 
				: query(collection(firestore, "groups"), where("name", "==", groupName))			
			const querySnapshot = await getDocs(q);
			if (querySnapshot.empty) return showToast("Error", "User not found", "error");
			querySnapshot.forEach((doc) => {
				setGroup(doc.data());
			});
		} catch (error) {
			showToast("Error", error.message, "error");
			setGroup(null);
		} finally {
			setIsLoading(false);
		}
	};

	return { isLoading, getSearchGroup, group, setGroup };
};

export default useSearchGroup;

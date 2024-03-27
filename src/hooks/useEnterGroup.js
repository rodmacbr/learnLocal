import { useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useEnterGroup = (group) => {
	const [isUpdating, setIsUpdating] = useState(false);
	const authUser = useAuthStore((state) => state.user);
	const showToast = useShowToast();

	const handleUseEnterGroup = async () => {
		if (isUpdating) return;
		setIsUpdating(true);

		try {
			const postRef = doc(firestore, "groups", group.id);
			await updateDoc(postRef, {
				members: arrayUnion(authUser.uid)
			});
		} catch (error) {
			showToast("Error", error.message, "error");
		} finally {
			setIsUpdating(false);
		}
	};

	return { handleUseEnterGroup, isUpdating };
};

export default useEnterGroup;

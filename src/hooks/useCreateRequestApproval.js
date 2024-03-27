import { useState } from "react";
import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import { firestore } from "../firebase/firebase";

function useCreateRequestApproval() {
	const showToast = useShowToast();
	const [isLoading, setIsLoading] = useState(false);
	const authUser = useAuthStore((state) => state.user);
	const { uid } = authUser;

	const handleCreateRequestApproval = async (reason, location, event) => {
		if (isLoading) return;
		setIsLoading(true);

		const newRequestApproval = {
            reason: reason,
			location: location,
            idEvent: event.id,
            status: "pending",
			createdBy: uid,
			createdAt: Date.now(),
		};

		try {

			const reqApprovalDocRef = await addDoc(collection(firestore, "event_candidates"), newRequestApproval);
            console.log("reqApprovalDocRef", reqApprovalDocRef);

			await updateDoc(reqApprovalDocRef, { id: reqApprovalDocRef.id });

			const userDocRef = await doc(firestore, "users", authUser.uid);

			await updateDoc(userDocRef, { eventRequests: arrayUnion(reqApprovalDocRef.id) });

			const eventDocRef = await doc(firestore, "events", event.id);

			await updateDoc(eventDocRef, { eventRequests: arrayUnion(reqApprovalDocRef.id) });

			showToast("Success", "Your request was successfully submitted", "success");
		} catch (error) {
			showToast("Error", error.message, "error");
		} finally {
			setIsLoading(false);
		}
	};

	return { isLoading, handleCreateRequestApproval };
}

export default useCreateRequestApproval;
import { useState } from "react";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import { firestore } from "../firebase/firebase";

function useGetRequestApproval() {
	const showToast = useShowToast();
    const [request, setRequest] = useState();
	const [isLoadingGetRequestApproval, setIsLoadingGetRequestApproval] = useState(false);
	const authUser = useAuthStore((state) => state.user);
	const { uid } = authUser;

	const handleGetRequestApproval = async (eventId) => {
		if (isLoadingGetRequestApproval) return;
		setIsLoadingGetRequestApproval(true);

        console.log("eventId", eventId);

		try {

            const q = query(collection(firestore, "event_candidates"), where("idEvent", "==", eventId));
            const querySnapshot = await getDocs(q);

            const requests = [];
            querySnapshot.forEach((doc) => {
                requests.push({ ...doc.data()});
            });

            console.log("requests", requests);

            setRequest(requests);            

			// showToast("Success", "Your request was successfully submitted", "success");
		} catch (error) {
			showToast("Error", error.message, "error");
		} finally {
			setIsLoadingGetRequestApproval(false);
		}
	};

	return { isLoadingGetRequestApproval, handleGetRequestApproval, request, setRequest };
}

export default useGetRequestApproval;
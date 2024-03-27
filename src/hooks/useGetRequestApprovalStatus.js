import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import { firestore } from "../firebase/firebase";

function useGetRequestApprovalStatus() {
	const showToast = useShowToast();
    const [requestStatus, setRequestStatus] = useState();
	const [isLoadingGetRequestApproval, setIsLoadingGetRequestApproval] = useState(false);
	const authUser = useAuthStore((state) => state.user);
	const { uid } = authUser;

	const handleGetRequestApprovalStatus = async (event) => {
		if (isLoadingGetRequestApproval) return;
		setIsLoadingGetRequestApproval(true);

		try {
            const userDocRef = await getDoc(doc(firestore, "users", uid));

            const userEventRequest = userDocRef.data().eventRequests

            const eventRequests = event.eventRequests

            if(eventRequests && userEventRequest){

                const request = userEventRequest.find(elemento => eventRequests.includes(elemento) || null)
    
                const reqApprovalDocRef = await getDoc(doc(firestore, "event_candidates", request));
    
                const status = reqApprovalDocRef.data().status;
    
                setRequestStatus(status)
            } else {
                setRequestStatus("not requested")
            }

			// showToast("Success", "Your request was successfully submitted", "success");
		} catch (error) {
			showToast("Error", error.message, "error");
		} finally {
			setIsLoadingGetRequestApproval(false);
		}
	};

	return { isLoadingGetRequestApproval, handleGetRequestApprovalStatus, requestStatus, setRequestStatus };
}

export default useGetRequestApprovalStatus;
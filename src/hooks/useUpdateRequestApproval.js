import { useState } from "react";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import { firestore } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

function useUpdateRequestApproval() {
    const showToast = useShowToast();
    const [isLoadingUpdateRequestApproval, setIsLoadingUpdateRequestApproval] = useState(false);
    const authUser = useAuthStore((state) => state.user);
    const { uid } = authUser;
    const navigate = useNavigate();

    const handleUpdateRequestApproval = async ({request, option}) => {
        if (isLoadingUpdateRequestApproval) return;
        setIsLoadingUpdateRequestApproval(true);

        try {
            const requestRef = doc(firestore, "event_candidates", request.id);

            await updateDoc(requestRef, {
                status: option,
            });

            if(option === "yes"){
                const eventRef = doc(firestore, "events", request.idEvent);

                await updateDoc(eventRef, {
                    members: arrayUnion(request.createdBy)
                });
                
                const userRef = doc(firestore, "users", request.createdBy);

                await updateDoc(userRef, {
                    events: arrayUnion(request.idEvent)
                });

            }

            showToast("Success", option === "yes" ? "User approved" : "User denied", "success");

        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsLoadingUpdateRequestApproval(false);
        }
    };

    return { isLoadingUpdateRequestApproval, handleUpdateRequestApproval };
}

export default useUpdateRequestApproval;



/* import { useState } from "react";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import { firestore } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

function useUpdateRequestApproval() {
	const showToast = useShowToast();
    const [updatedRequest, setUpdateRequest] = useState();
	const [isLoadingUpdateRequestApproval, setIsLoadingUpdateRequestApproval] = useState(false);
	const authUser = useAuthStore((state) => state.user);
	const { uid } = authUser;
	const navigate = useNavigate();

	const handleUpdateRequestApproval = async ({request, option}) => {
		if (isLoadingUpdateRequestApproval) return;
		setIsLoadingUpdateRequestApproval(true);

		try {
			const requestRef = doc(firestore, "event_candidates", request.id);

			await updateDoc(requestRef, {
				status: option,
			});

			if(option === "yes"){
				const eventRef = doc(firestore, "events", request.idEvent);
	
				await updateDoc(eventRef, {
					members: arrayUnion(request.createdBy)
				});
				
				const userRef = doc(firestore, "users", request.createdBy);
	
				await updateDoc(userRef, {
					events: arrayUnion(request.idEvent)
				});
	
				setUpdateRequest(true)
			}

			navigate(0)
			showToast("Success", option === "yes" ? "User approved" : "User denied", "success");

		} catch (error) {
			showToast("Error", error.message, "error");
		} finally {
			setIsLoadingUpdateRequestApproval(false);
		}
	};

	return { isLoadingUpdateRequestApproval, handleUpdateRequestApproval, updatedRequest, setUpdateRequest };
}

export default useUpdateRequestApproval; */
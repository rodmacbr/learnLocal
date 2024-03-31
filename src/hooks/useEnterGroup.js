import { useState, useEffect } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useEnterGroup = (group) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [isMember, setIsMember] = useState(false);
    const authUser = useAuthStore((state) => state.user);
    const showToast = useShowToast();

    useEffect(() => {
        const checkMembership = async () => {
            try {
                const groupRef = doc(firestore, "groups", group.id);
                const groupDoc = await getDoc(groupRef);
                if (groupDoc.exists()) {
                    const groupData = groupDoc.data();
                    if (groupData.members.includes(authUser.uid)) {
                        setIsMember(true);
                    }
                }
            } catch (error) {
                showToast("Error", "Failed to check group membership", "error");
            }
        };

        checkMembership();
    }, [group.id, authUser.uid, showToast]);

    const handleUseEnterGroup = async () => {
        if (isUpdating || isMember) return;
        setIsUpdating(true);

        try {
            const postRef = doc(firestore, "groups", group.id);
            await updateDoc(postRef, {
                members: arrayUnion(authUser.uid)
            });
            showToast("Success", "Joined the group successfully", "success");
            setIsMember(true);
        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsUpdating(false);
        }
    };

    return { handleUseEnterGroup, isUpdating, isMember };
};

export default useEnterGroup;



/* import { useState } from "react";
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
 */
import { useState } from "react";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useLeaveGroup = (group) => {
    const [isLeaving, setIsLeaving] = useState(false);
    const showToast = useShowToast();
    const authUser = useAuthStore((state) => state.user);

    const handleLeaveGroup = async () => {
        if (isLeaving) return;
        setIsLeaving(true);

        try {
            const groupRef = doc(firestore, "groups", group.id);
            await updateDoc(groupRef, {
                members: arrayRemove(authUser.uid)
            });
            showToast("Success", "Left the group successfully", "success");
        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsLeaving(false);
        }
    };

    return { handleLeaveGroup, isLeaving };
};

export default useLeaveGroup;

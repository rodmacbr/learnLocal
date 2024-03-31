import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Textarea,
	useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/authStore";
import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import { useNavigate } from 'react-router-dom';

const CreateGroup = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [groupDescription, setGroupDescription] = useState("");
	const [groupName, setGroupName] = useState("");
	const showToast = useShowToast();
	const { isLoading, handleCreateGroup } = useCreateGroup();
	const navigate = useNavigate()

	const handleGroupCreation = async () => {
		try {
			await handleCreateGroup(groupName, groupDescription);
			onClose();
			setGroupName("");
			setGroupDescription("");
			navigate(0)
		} catch (error) {
			showToast("Error", error.message, "error");
		}
	};

	return (
		<>
			<Button
				background={"#319795"}
				cursor="pointer"
				p={2}
				mr={4}
				w={24}
				_hover={{ bg: "#4FD1C5" }}
				boxShadow='outline'
				onClick={onOpen}
			>
				Create Group
			</Button>

			<Modal isOpen={isOpen} onClose={onClose} size='xl'>
				<ModalOverlay />

				<ModalContent bg={"black"} border={"1px solid gray"}>
					<ModalHeader>Create Group</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
                        <Input 
                            placeholder='Group Name'
                            type='text' 
                            onChange={(e) => setGroupName(e.target.value)}
                            max={20}
                            mb={5}
                         />

                        <Textarea
							placeholder='Group description...'
							value={groupDescription}
							onChange={(e) => setGroupDescription(e.target.value)}
						/>
					</ModalBody>

					<ModalFooter>
						<Button mr={3} mb={5} onClick={handleGroupCreation} isLoading={isLoading}>
							Create Group
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default CreateGroup;

function useCreateGroup() {
	const showToast = useShowToast();
	const [isLoading, setIsLoading] = useState(false);
	const authUser = useAuthStore((state) => state.user);
	const { uid } = authUser;

	const handleCreateGroup = async (groupName, groupDescription) => {
		if (isLoading) return;
		setIsLoading(true);

		const newGroup = {
			name: groupName.toLowerCase(),
			description: groupDescription,
			members: [uid],
			createdAt: Date.now(),
			createdBy: authUser.uid,
		};

		try {

			const postDocRef = await addDoc(collection(firestore, "groups"), newGroup);

			await updateDoc(postDocRef, { id: postDocRef.id });

			const userDocRef = await doc(firestore, "users", authUser.uid);
			
			await updateDoc(userDocRef, { groups: arrayUnion(postDocRef.id) });

			showToast("Success", "Group created successfully", "success");
		} catch (error) {
			showToast("Error", error.message, "error");
		} finally {
			

			setIsLoading(false);
		}
	};

	return { isLoading, handleCreateGroup };
}

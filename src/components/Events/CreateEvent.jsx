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
import { useNavigate } from 'react-router-dom'

const CreateEvent = (groupId) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [eventDescription, setEventDescription] = useState("");
	const [eventName, setEventName] = useState("");
	const [date, setDate] = useState("");
	const [price, setPrice] = useState("");
	const showToast = useShowToast();
	const { isLoading, handleCreateEvent } = useCreateEvent();
	const navigate = useNavigate()

	const handleEventCreation = async () => {
		try {
			await handleCreateEvent(groupId, eventName, date, price, eventDescription);
			onClose();
			setEventName("");
			setPrice("");
			setEventDescription("");
			setDate("");
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
				w={20}
				_hover={{ bg: "#4FD1C5" }}
				boxShadow='outline'
				onClick={onOpen}
			>
				Create
			</Button>

			<Modal isOpen={isOpen} onClose={onClose} size='xl'>
				<ModalOverlay />

				<ModalContent bg={"black"} border={"1px solid gray"}>
					<ModalHeader>Create Event</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
                        <Input 
                            placeholder='Event Name'
                            type='text' 
                            onChange={(e) => setEventName(e.target.value)}
                            max={20}
                            mb={5}
                         />

						<Input 
							type={"date"} 
							size='sm'
							onChange={(e) => setDate(e.target.value)}
							mb={5} 
							p={5} 
							rounded={5}
						/>

						<Input 
							type={"number"}
							size='sm'
							placeholder='Event price'
							value={price}
							onChange={(e) => setPrice(e.target.value)}
							mb={5} 
							p={5} 
							rounded={5}
						/>

                        <Textarea
							placeholder='Event description...'
							value={eventDescription}
							onChange={(e) => setEventDescription(e.target.value)}
						/>
					</ModalBody>

					<ModalFooter>
						<Button mr={3} mb={5} onClick={handleEventCreation} isLoading={isLoading}>
							Create Event
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default CreateEvent;

function useCreateEvent() {
	const showToast = useShowToast();
	const [isLoading, setIsLoading] = useState(false);
	const authUser = useAuthStore((state) => state.user);
	const { uid } = authUser;

	const handleCreateEvent = async (groupId, eventName, date, price, eventDescription) => {
		if (isLoading) return;
		setIsLoading(true);

		const newEvent = {
			name: eventName.toLowerCase(),
			description: eventDescription,
			date: date,
			price: price,
			members: [uid],
			groupId: groupId.groupId,
			createdAt: Date.now(),
			createdBy: authUser.uid,
		};

		try {

			const eventDocRef = await addDoc(collection(firestore, "events"), newEvent);

			console.log("eventDocRef", eventDocRef);


			await updateDoc(eventDocRef, { id: eventDocRef.id });


			const groupDocRef = await doc(firestore, "groups", groupId.groupId);
			console.log("groupDocRef", groupDocRef);
			
	
			await updateDoc(groupDocRef, { events: arrayUnion(eventDocRef.id) });


			const userDocRef = await doc(firestore, "users", authUser.uid);
			console.log("userDocRef", userDocRef);
			

			await updateDoc(userDocRef, { events: arrayUnion(eventDocRef.id) });

			showToast("Success", "Event created successfully", "success");
		} catch (error) {
			showToast("Error", error.message, "error");
		} finally {
			


			setIsLoading(false);
		}
	};

	return { isLoading, handleCreateEvent };
}

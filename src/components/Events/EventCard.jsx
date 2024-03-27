import {
	Button,
	Box,
	Flex,
	FormControl,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Text,
	Textarea,
	VStack,
	useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useShowToast from "../../hooks/useShowToast";
import { formatedDate } from "../../utils/formatedDate";
import useCreateRequestApproval from "../../hooks/useCreateRequestApproval";
import useGetRequestApprovalStatus from "../../hooks/useGetRequestApprovalStatus";
import { capitalizeWords } from "../../utils/capitalizeWords";
import useAuthStore from "../../store/authStore";

const EventCard = ({ event, setEvent, width="100%" }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const showToast = useShowToast();
	const navigate = useNavigate();
	const [ location, setLocation ] = useState("");
	const [ reason, setReason ] = useState("");
	const { isLoading, handleCreateRequestApproval } = useCreateRequestApproval();
	const { handleGetRequestApprovalStatus, requestStatus } = useGetRequestApprovalStatus();
	const authUser = useAuthStore((state) => state.user);
	const { uid } = authUser;

	useEffect(() => {
		if(isOpen) handleGetRequestApprovalStatus(event);
	}, [isOpen]);

	useEffect(() => {
		if(isOpen) {
			const isGroupOwner = event.createdBy === uid;			
			isGroupOwner && navigate(`/event/${event.id}`)
		}
	}, [isOpen, event.createdBy, event.id, uid]);

	const handleRequestApproval = async (e) => {
		e.preventDefault()
		try {
			await handleCreateRequestApproval(reason, location, event);
			setLocation("");
			setReason("");
			navigate(0)
			onClose();
		} catch (error) {
			showToast("Error", error.message, "error");
		}
	};

	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInLeft'>
				<ModalOverlay />
				<ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
					<ModalHeader>Join Event</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						{requestStatus === "yes" &&
							<Text m={5} textAlign={"center"}>Your request was accepted</Text>
						}
						{requestStatus === "no" &&
							<Text m={5} textAlign={"center"}>Your request was denied</Text>
						}
						{requestStatus === "pending" &&
							<Text m={5} textAlign={"center"}>Your request is pending</Text>
						}
						{requestStatus === "not requested" && <form>
							<FormControl>
								<FormLabel>Why do you want to join the event ?</FormLabel>
								<Input
									my={5}
									placeholder={"Inform your location..."}
									fontSize={14}
									value={location}
									onChange={(e) => setLocation(e.target.value)}
								/>
								<Textarea
									placeholder='Reason...'
									value={reason}
									onChange={(e) => setReason(e.target.value)}
									required
								/>
							</FormControl>

							<Flex w={"full"} justifyContent={"center"} gap={5}>
								<Button w={20} my={4} onClick={onClose}>
									Quit
								</Button>
								<Button type='submit' w={20} my={4} isLoading={isLoading} onClick={(e) => handleRequestApproval(e)}>
									Join
								</Button>
							</Flex>
						</form>}

					</ModalBody>
				</ModalContent>
			</Modal>
				
			<Flex 
				justifyContent={"space-between"} 
				alignItems={"center"} 
				borderRadius={6} 
				boxShadow='outline' 
				w={width}
				h={100} 
				p={5} 
				mt={5}
				cursor={"pointer"}
				_hover={{ bg: "whiteAlpha.400" }}
				onClick={onOpen}
			>
				<Flex alignItems={"center"} gap={2}>
					<VStack spacing={2} gap={10} flexDirection={"row"}>
						<VStack spacing={2} alignItems={"flex-start"}>
							<Box fontSize={12} fontWeight={"bold"}>
								{capitalizeWords(event.name)}
							</Box>
							<Box fontSize={11} color={"gray.500"}>
								{formatedDate(event.date)}
							</Box>
							<Box fontSize={11} color={"gray.500"}>
								{event.members?.length} enrolled
							</Box>
						</VStack>
						<VStack spacing={2} alignItems={"flex-start"}>
							<Box fontSize={11} color={"gray.500"}>
								{event.description}
							</Box>
							<Box fontSize={11} color={"gray.500"}>
								<Text as='b'>Price: </Text>{event.price === "0" ? "free" : "$" + event.price }
							</Box>
						</VStack>
					</VStack>
				</Flex>
			</Flex>
		</>
	);
};

export default EventCard;

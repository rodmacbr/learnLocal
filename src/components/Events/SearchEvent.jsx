import {
	Box,
	Button,
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
	Tooltip,
	useDisclosure,
} from "@chakra-ui/react";
import useSearchEvent from "../../hooks/useSearchEvent";
import { useRef } from "react";
import EventCard from "./EventCard";

const SearchEvent = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const searchRef = useRef(null);
	const { event, isLoading, getSearchEvent, setEvent } = useSearchEvent();

	const handleSearchGroup = (e) => {
		e.preventDefault();
		getSearchEvent({eventName: searchRef.current.value.toLowerCase()});
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
				Search
			</Button>

			<Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInLeft'>
				<ModalOverlay />
				<ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
					<ModalHeader>Search Event</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<form onSubmit={handleSearchGroup}>
							<FormControl>
								<FormLabel>Event Name</FormLabel>
								<Input 
									placeholder='Type the name of the event...' 
									ref={searchRef} 
								/>
							</FormControl>

							<Flex w={"full"} justifyContent={"flex-end"}>
								<Button type='submit' ml={"auto"} size={"sm"} my={4} isLoading={isLoading}>
									Search Event
								</Button>
							</Flex>
						
						</form>
						{event && <EventCard event={event} setEvent={setEvent} w={"full"} />}
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default SearchEvent;

import { Button, Container, Flex, Input, InputGroup, InputRightElement, Text, useDisclosure } from "@chakra-ui/react";
import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useShowToast from "../../hooks/useShowToast";
import useSearchGroup from "../../hooks/useSearchGroup";
import useGroupEvents from "../../hooks/useGroupEvents";
import CreateEvent from "../../components/Events/CreateEvent"
import SearchEvent from "../../components/Events/SearchEvent"
import EventCard from "../../components/Events/EventCard"
import { capitalizeWords } from "../../utils/capitalizeWords";

const GroupPage = () => {
	// const { isCommenting, handlePostComment } = usePostComment();
	const showToast = useShowToast();
	// const authUser = useAuthStore((state) => state.user);
	// const { isOpen, onOpen, onClose } = useDisclosure();
	const { isLoading, getSearchGroup, group } = useSearchGroup();
	const { getGroupEvents, event, setEvent } = useGroupEvents();
	const { id } = useParams();

	useEffect(() => {
		(async () => {
			try {
				await getSearchGroup({groupId:id});
			} catch (error) {
				showToast("Error", error.message, "error");
			}
		})();
	}, []);

	useEffect(() => {
		(async () => {
			try {
				await getGroupEvents(id);
			} catch (error) {
				showToast("Error", error.message, "error");
			}
		})();
	}, []);

	console.log("event", event);
	console.log("group", group);


	return (
		<Container maxW='container.lg' py={5} h={"full"}>
			<Flex py={10} px={4} pl={{ base: 4, md: 10 }} w={"full"} mx={"auto"} justifyContent={"space-between"} flexDirection={"row"}>

				<Text fontWeight={"bold"} fontSize={"2xl"}>
					{group && capitalizeWords(group.name)}
				</Text>

				<Flex flexDirection={"row"}>
					<SearchEvent />
					<CreateEvent groupId={group?.id} />
				</Flex>
	
			</Flex>

			{event && <Flex key={id} pl={{ base: 4, md: 10 }} h={"80%"} w={"full"} mx={"auto"} flexDirection={"column"}>
				{event.map((event) => <EventCard key={event?.id} event={event} setEvent={setEvent} width="70%" />)}
			</Flex>}

			{!event && <Flex pl={{ base: 4, md: 10 }} h={"80%"} w={"full"} mx={"auto"} flexDirection={"column"}>
				No events, be the first to create one!
			</Flex>}
		</Container>
	);
};

export default GroupPage;



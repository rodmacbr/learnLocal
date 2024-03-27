import { Container, Flex, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useShowToast from "../../hooks/useShowToast";
import useGetRequestApproval from "../../hooks/useGetRequestApproval";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";
import { capitalizeWords } from "../../utils/capitalizeWords";
import EventCardApproval from "../../components/Events/EventCardApproval";

const EventPage = () => {
	const showToast = useShowToast();
	const { id } = useParams();
	const { request, setRequest, handleGetRequestApproval } = useGetRequestApproval();

	useEffect(() => {
		(async () => {
			try {
				await handleGetRequestApproval(id);
			} catch (error) {
				showToast("Error", error.message, "error");
			}
		})();
	}, []);

	// const { userProfile } = useGetUserProfileById();

	// console.log("userProfile", userProfile);
	console.log("request", request);

	const filteredArray =  request?.filter(item => item.status === "pending");

	return (
		<Container maxW='container.lg' py={5} h={"full"}>
			<Flex py={10} px={4} pl={{ base: 4, md: 10 }} w={"full"} mx={"auto"} justifyContent={"space-between"} flexDirection={"row"}>

				<Text fontWeight={"bold"} fontSize={"2xl"}>
					Approve the entry of new members
				</Text>
	
			</Flex>

			{filteredArray && <Flex key={id} pl={{ base: 4, md: 10 }} h={"80%"} w={"full"} mx={"auto"} flexDirection={"column"}>
				{filteredArray.map((item) => <EventCardApproval key={item?.id} request={item} />)}
			</Flex>}

			{!filteredArray && <Flex pl={{ base: 4, md: 10 }} h={"80%"} w={"full"} mx={"auto"} flexDirection={"column"}>
				Nothing here, for now.
			</Flex>}
		</Container>
	);
};

export default EventPage;

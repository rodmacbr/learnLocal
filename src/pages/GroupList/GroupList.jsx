import { Container, Grid, Flex, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import GroupCard from "../../components/Group/GroupCard"
import useShowToast from "../../hooks/useShowToast";
import useSearchListGroup from "../../hooks/useSearchListGroup";
import SearchGroup from "../../components/Group/SearchGroup";
import CreateGroup from "../../components/Group/CreateGroup";
 
const GroupPage = () => {
	const showToast = useShowToast();
	const { isLoading, getSearchListGroup, listGroup, setListGroup } = useSearchListGroup();
	
	useEffect(() => {
		(async () => {
			try {
				await getSearchListGroup();
			} catch (error) {
				showToast("Error", error.message, "error");
			}
		})();
	}, []);


	return (
		<Container maxW='container.lg' py={5} h={"full"}>
			<Flex py={10} px={4} pl={{ base: 4, md: 10 }} w={"full"} mx={"auto"} justifyContent={"space-between"} flexDirection={"row"}>

				<Text fontWeight={"bold"} fontSize={"2xl"}>
					List of Groups
				</Text>

				<Flex flexDirection={"row"}>
					<SearchGroup />
					<CreateGroup />
				</Flex>
	
			</Flex>

			{listGroup && 
				<Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4} px={{ base: 4, md: 10 }}>
					{listGroup?.map((group) => <GroupCard key={group?.id} group={group} setGroup={setListGroup} />)}
				</Grid>
			}


			{!listGroup && <Flex py={10} px={{ base: 4, md: 10 }} h={"80%"} w={"full"} mx={"auto"} flexDirection={"column"}>
				No group, be the first to create one!
			</Flex>}

		</Container>
	);
};

export default GroupPage;



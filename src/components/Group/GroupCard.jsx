import { Box, Button, Flex, VStack } from "@chakra-ui/react";
import { capitalizeWords } from "../../utils/capitalizeWords";
import useEnterGroup from "../../hooks/useEnterGroup";
import { useNavigate } from 'react-router-dom'

const GroupCard = ({ group, setGroup }) => {
	const { handleUseEnterGroup } = useEnterGroup(group);
	const navigate = useNavigate()

	const onEnterGroup = async () => {
		await handleUseEnterGroup();
		navigate(`/group/${group.id}`)
	};

	return (
		<Flex justifyContent={"space-between"} h={150} alignItems={"center"} borderRadius={6} boxShadow='outline' w={"full"} p={5} mt={5}>
			<Flex flexDirection={"column"} w={"full"}>
				<Flex alignItems={"center"} gap={2} p={4}>
					<VStack spacing={2} gap={10} flexDirection={"row"} w="full">
						<VStack spacing={2} alignItems={"flex-start"} w={"1/2"}>
							<Box fontSize={12} fontWeight={"bold"}>
								{capitalizeWords(group.name)}
							</Box>
							<Box fontSize={11} color={"gray.500"}>
								{group.members.length} members
							</Box>
						</VStack>
						<Box fontSize={11} color={"gray.500"} w={"1/2"}>
							{group.description}
						</Box>
					</VStack>
				</Flex>
				<Box p={3}>
					<Button
						fontSize={13}
						bg={"transparent"}
						p={2}
						w={"full"}
						h={"max-content"}
						fontWeight={"medium"}
						background={"#319795"}
						_hover={{ bg: "#4FD1C5" }}
						cursor={"pointer"}
						onClick={() => onEnterGroup()}
					>
						Join
					</Button>
				</Box>
			</Flex>
		</Flex>
	);
};

export default GroupCard;

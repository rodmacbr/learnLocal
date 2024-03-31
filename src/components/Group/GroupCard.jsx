import { Box, Button, Flex, VStack, Spinner } from "@chakra-ui/react";
import { capitalizeWords } from "../../utils/capitalizeWords";
import useEnterGroup from "../../hooks/useEnterGroup";
import useLeaveGroup from "../../hooks/useLeaveGroup";
import { useNavigate } from "react-router-dom";

const GroupCard = ({ group, setGroup }) => {
    const { handleUseEnterGroup, isMember: isJoining, isUpdating: isJoiningUpdating } = useEnterGroup(group);
    const { handleLeaveGroup, isMember: isLeaving, isUpdating: isLeavingUpdating } = useLeaveGroup(group);
    const navigate = useNavigate();

    const onJoinGroup = async () => {
        await handleUseEnterGroup();
        navigate(`/group/${group.id}`);
    };

    const onLeaveGroup = async () => {
        try {
            await handleLeaveGroup();
            // Navigate back to the groups page after leaving the group
            navigate('/groups');
        } catch (error) {
            console.error('Error navigating after leaving group:', error);
            // If an error occurs during navigation, log it and navigate the user to the home page
            navigate('/'); // or navigate to the home page
        }
    };
    

    return (
        <Flex justifyContent={"space-between"} h={150} alignItems={"center"} borderRadius={6} boxShadow="outline" w={"full"} p={5} mt={5}>
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
                {(isJoiningUpdating || isLeavingUpdating) ? (
                    <Spinner size="sm" />
                ) : (
                    <Box p={3}>
                        {isJoining ? (
                            <>
                                <Button fontSize={13} bg={"transparent"} p={2} w={"full"} h={"max-content"} fontWeight={"medium"} cursor={"pointer"} onClick={() => onLeaveGroup()}>
                                    Leave Group
                                </Button>
                                <Button fontSize={13} bg={"transparent"} p={2} w={"full"} h={"max-content"} fontWeight={"medium"} background={"#319795"} _hover={{ bg: "#4FD1C5" }} cursor={"pointer"} onClick={() => navigate(`/group/${group.id}`)}>
                                    View Group
                                </Button>
                            </>
                        ) : (
                            <Button isLoading={isJoiningUpdating} fontSize={13} bg={"transparent"} p={2} w={"full"} h={"max-content"} fontWeight={"medium"} background={"#319795"} _hover={{ bg: "#4FD1C5" }} cursor={"pointer"} onClick={() => onJoinGroup()}>
                                Join
                            </Button>
                        )}
                    </Box>
                )}
            </Flex>
        </Flex>
    );
};

export default GroupCard;







/* import { Box, Button, Flex, VStack } from "@chakra-ui/react";
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

export default GroupCard; */
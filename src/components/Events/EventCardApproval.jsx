/* eslint-disable no-mixed-spaces-and-tabs */
import {
	Button,
	Box,
	Flex,
	Text,
	VStack,
	useDisclosure,
  } from "@chakra-ui/react";
  import { useEffect } from "react";
  import useShowToast from "../../hooks/useShowToast";
  import { capitalizeWords } from "../../utils/capitalizeWords";
  import useAuthStore from "../../store/authStore";
  import useUpdateRequestApproval from "../../hooks/useUpdateRequestApproval";
  
  const EventCardApproval = ({ request }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const showToast = useShowToast();
	const authUser = useAuthStore((state) => state.user);
	const { handleUpdateRequestApproval, isLoadingUpdateRequestApproval } = useUpdateRequestApproval();
	const { uid } = authUser;
  
	useEffect(() => {
	  // You may want to add additional logic here if needed
	}, []);
  
	const handleApproval = (option) => {
	  handleUpdateRequestApproval({ request, option })
		.then(() => {
		  showToast("Request updated successfully");
		  onClose();
		})
		.catch((error) => {
		  showToast("Failed to update request: " + error.message);
		});
	};
  
	return (
	  <>
		<Flex
		  justifyContent={"space-between"}
		  alignItems={"center"}
		  borderRadius={6}
		  boxShadow="outline"
		  w={"70%"}
		  h={100}
		  p={5}
		  mt={5}
		  onClick={onOpen}
		>
		  <VStack spacing={2} gap={10} flexDirection={"row"}>
			<VStack spacing={2} alignItems={"flex-start"}>
			  <Box fontSize={12} fontWeight={"bold"}>
				{capitalizeWords(request.createdBy)}
			  </Box>
			  <Box fontSize={11} color={"gray.500"}>
				{request.status}
			  </Box>
			</VStack>
			<VStack spacing={2} alignItems={"flex-start"}>
			  <Box fontSize={11} color={"gray.500"}>
				<Text fontWeight={"bold"} fontSize={"sm"}>
				  Reason:
				</Text>
				{request.reason}
			  </Box>
			  <Box fontSize={11} color={"gray.500"}>
				<Text fontWeight={"bold"} fontSize={"sm"}>
				  Location:{" "}
				  <span fontWeight={"normal"}>{request.location}</span>
				</Text>
			  </Box>
			</VStack>
		  </VStack>
  
		  <Flex alignItems={"center"} gap={2} flexDirection={"column"}>
			<Text>Approved ?</Text>
  
			<VStack spacing={2} gap={2} flexDirection={"row"}>
             <Button
				fontSize={13}
				bg={"transparent"}
				p={0}
				h={"max-content"}
				fontWeight={"medium"}
				color={"blue.400"}
				cursor={"pointer"}
				_hover={{ color: "white" }}
				onClick={() => handleApproval("no")}
				isLoading={isLoadingUpdateRequestApproval}
             >
				No
			  </Button>
			  <Button
				fontSize={13}
				bg={"transparent"}
				p={0}
				h={"max-content"}
				fontWeight={"medium"}
				color={"blue.400"}
				cursor={"pointer"}
				_hover={{ color: "white" }}
				onClick={() => handleApproval("yes")}
				isLoading={isLoadingUpdateRequestApproval}
			  >
				Yes
			  </Button>
			</VStack>
          </Flex>
		</Flex>
      </>
	);
  };
  
  export default EventCardApproval;
  


/* import {
	Button,
	Box,
	Flex,
	FormControl,
	FormLabel,
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
import useUpdateRequestApproval from "../../hooks/useUpdateRequestApproval";
import { capitalizeWords } from "../../utils/capitalizeWords";
import useAuthStore from "../../store/authStore";

const EventCardApproval = ({ request }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const showToast = useShowToast();
	// const navigate = useNavigate();
	// const { isLoading, handleCreateRequestApproval } = useCreateRequestApproval();
	const { isLoadingUpdateRequestApproval, handleUpdateRequestApproval, updatedRequest, setUpdateRequest } = useUpdateRequestApproval();
	const authUser = useAuthStore((state) => state.user);
	const { uid } = authUser;


	return (
		<>				
			<Flex 
				justifyContent={"space-between"} 
				alignItems={"center"} 
				borderRadius={6} 
				boxShadow='outline' 
				w={"70%"} 
				h={100} 
				p={5} 
				mt={5}
				onClick={onOpen}
			>
				<Flex alignItems={"center"} gap={2}>
					<VStack spacing={2} gap={10} flexDirection={"row"}>
						<VStack spacing={2} alignItems={"flex-start"}>
							<Box fontSize={12} fontWeight={"bold"}>
								{capitalizeWords(request.createdBy)}
							</Box>
							<Box fontSize={11} color={"gray.500"}>
								{request.status}
							</Box>
						</VStack>
						<VStack spacing={2} alignItems={"flex-start"}>
							<Box fontSize={11} color={"gray.500"}>
								<Text fontWeight={"bold"} fontSize={"sm"}>Reason:</Text>
								{request.reason}
							</Box>
							<Box fontSize={11} color={"gray.500"}>
								<Text fontWeight={"bold"} fontSize={"sm"}>
									Location: <span fontWeight={"normal"}>{request.location}</span>
								</Text>
							</Box>
						</VStack>
					</VStack>
				</Flex>

				<Flex alignItems={"center"} gap={2} flexDirection={"column"}>
					<Text>Approved ?</Text>

					<VStack spacing={2} gap={2} flexDirection={"row"}>
						<Button
							fontSize={13}
							bg={"transparent"}
							p={0}
							h={"max-content"}
							fontWeight={"medium"}
							color={"blue.400"}
							cursor={"pointer"}
							_hover={{ color: "white" }}
							onClick={() => handleUpdateRequestApproval({ request, option: "no" })}
							// isLoading={isLoadingUpdateRequestApproval}
						>
							No
						</Button>
						<Button
							fontSize={13}
							bg={"transparent"}
							p={0}
							h={"max-content"}
							fontWeight={"medium"}
							color={"blue.400"}
							cursor={"pointer"}
							_hover={{ color: "white" }}
							onClick={() => handleUpdateRequestApproval({ request, option: "yes" })}
							// isLoading={isLoadingUpdateRequestApproval}
						>
							Yes
						</Button>
					</VStack>
				</Flex>

			</Flex>
		</>
	);
};

export default EventCardApproval;
 */
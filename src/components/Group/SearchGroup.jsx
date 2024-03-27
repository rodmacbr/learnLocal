import {
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
	useDisclosure,
} from "@chakra-ui/react";
import useSearchGroup from "../../hooks/useSearchGroup";
import { useRef } from "react";
import GroupCard from "./GroupCard";

const SearchGroup = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const searchRef = useRef(null);
	const { group, isLoading, getSearchGroup, setGroup } = useSearchGroup();

	const handleSearchGroup = (e) => {
		e.preventDefault();
		getSearchGroup({groupName: searchRef.current.value.toLowerCase()});
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
					<ModalHeader>Search Group</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<form onSubmit={handleSearchGroup}>
							<FormControl>
								<FormLabel>Group Name</FormLabel>
								<Input 
									placeholder='Type the name of the group...' 
									ref={searchRef} 
								/>
							</FormControl>

							<Flex w={"full"} justifyContent={"flex-end"}>
								<Button type='submit' ml={"auto"} size={"sm"} my={4} isLoading={isLoading}>
									Search Group
								</Button>
							</Flex>
						</form>
						{group && <GroupCard group={group} setGroup={setGroup} />}

					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default SearchGroup;

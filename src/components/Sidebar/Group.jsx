import { Box, Link, Tooltip } from "@chakra-ui/react";
import { GroupIcon } from "../../assets/constants";
import { Link as RouterLink } from "react-router-dom";

const Group = () => {
	return (
		<Tooltip
			hasArrow
			label={"Group"}
			placement='right'
			ml={1}
			openDelay={500}
			display={{ base: "block", md: "none" }}
		>
			<Link
				display={"flex"}
				to={"/group"}
				as={RouterLink}
				alignItems={"center"}
				gap={4}
				_hover={{ bg: "whiteAlpha.400" }}
				borderRadius={6}
				p={2}
				w={{ base: 10, md: "full" }}
				justifyContent={{ base: "center", md: "flex-start" }}
			>
				<GroupIcon />
				<Box display={{ base: "none", md: "block" }}>Group List</Box>
			</Link>
		</Tooltip>
	);
};

export default Group;

import React, { useState } from "react";
import styled from "styled-components";
import { SidebarData } from "../components/SidebarData";
import SubMenu from "../components/SubMenu";
import { IconContext } from "react-icons/lib";
import * as AiIcons from "react-icons/ai";

const SidebarNav = styled.nav`
	background: #15171c;
	width: 250px;
	height: 100vh;
	position: fixed;
	top: 0;
	left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
	transition: 350ms;
	z-index: 20; /* Ensure it's above the overlay */
`;

const SidebarWrap = styled.div`
	width: 100%;
`;

const FilterButton = styled.button`
	position: absolute;
	top: 100px;
	left: 10px;
	z-index: 30; /* Ensure it's above the overlay and sidebar */
	background-color: #0417aa; /* Green */
	color: white;
	padding: 10px 24px;
	border: none;
	cursor: pointer;
	font-size: 16px;
	display: ${({ sidebar }) => (sidebar ? "none" : "block")};
`;

const CloseIcon = styled(AiIcons.AiOutlineClose)`
	position: absolute;
	top: 10px;
	right: 10px;
	cursor: pointer;
`;

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	opacity: ${({ sidebar }) => (sidebar ? "1" : "0")};
	visibility: ${({ sidebar }) => (sidebar ? "visible" : "hidden")};
	transition: opacity 350ms, visibility 350ms;
	z-index: 10; /* Ensure it's below the sidebar */
`;

const Sidebar = () => {
	const [sidebar, setSidebar] = useState(false);

	const showSidebar = () => setSidebar(!sidebar);

	return (
		<>
			<IconContext.Provider value={{ color: "#fff" }}>
				<FilterButton onClick={showSidebar} sidebar={sidebar}>
					Filter Here
				</FilterButton>
				<Overlay sidebar={sidebar} onClick={showSidebar} />
				<SidebarNav sidebar={sidebar}>
					<SidebarWrap>
						<CloseIcon onClick={showSidebar} />
						{SidebarData.map((item, index) => (
							<SubMenu item={item} key={index} />
						))}
					</SidebarWrap>
				</SidebarNav>
			</IconContext.Provider>
		</>
	);
};

export default Sidebar;

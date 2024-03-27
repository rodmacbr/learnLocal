import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import PageLayout from "./Layouts/PageLayout/PageLayout";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import GroupList from "./pages/GroupList/GroupList";
import GroupPage from "./pages/GroupPage/GroupPage";
import EventPage from "./pages/EventPage/EventPage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";

function App() {
	const [authUser] = useAuthState(auth);

	return (
		<PageLayout>
			<Routes>
				<Route path='/' element={authUser ? <HomePage /> : <Navigate to='/auth' />} />
				<Route path='/auth' element={!authUser ? <AuthPage /> : <Navigate to='/' />} />
				<Route path='/:username' element={<ProfilePage />} />
				<Route path='/group' element={authUser ? <GroupList /> : <Navigate to='/auth' />} />
				<Route path='/group/:id' element={authUser ? <GroupPage /> : <Navigate to='/auth' />} />
				<Route path='/event/:id' element={authUser ? <EventPage /> : <Navigate to='/auth' />} />
			</Routes>
		</PageLayout>
	);
}

export default App;

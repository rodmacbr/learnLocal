# LearnLocal

LearnLocal is a community-driven platform designed to facilitate collaborative learning and knowledge sharing among individuals with diverse interests and backgrounds. By connecting users with complementary skills and interests, LearnLocal empowers communities to engage in meaningful interactions and share expertise.

## Features

LearnLocal offers the following features to users:

- User Profiles: Users can create and customize their profiles to showcase their skills and interests.

- Posts: Users can create posts to ask questions or start discussions on various topics.

- Likes and Comments: Users can interact with posts by liking them or leaving comments.

- Search: LearnLocal provides a search feature that allows users to look for other users and discover new groups based on their interests.

- Groups: Users can create and join groups related to their communities, cities and others to connect with like-minded individuals.

- Learning Events: Within groups, users can create learning events such as workshops, seminars, or meetups to facilitate knowledge exchange.

- Event Participation: Users can request to join learning events, and event owners can accept or decline these requests.

## Technologies Used

The following technologies are utilized in the development of the app:

- React: LearnLocal's frontend is developed using React, a popular JavaScript library for building user interfaces. React's component-based architecture allows for the creation of modular and reusable UI components, enabling a flexible and efficient development process.

- Firebase: Firebase is a comprehensive platform provided by Google that offers a suite of backend services including authentication, real-time database, and cloud storage. LearnLocal leverages Firebase for user authentication, data storage, and file hosting, ensuring secure and reliable access to user accounts and application data.

- Vite: Vite is a next-generation build tool that optimizes the frontend development workflow by providing lightning-fast build times and instant server start.

- Chakra UI: Chakra UI is a simple and modular component library for building React applications with a focus on accessibility and developer experience. LearnLocal integrates Chakra UI to create consistent and visually appealing user interfaces.

- Zustand: Zustand is a lightweight and fast state management library for React applications. LearnLocal leverages Zustand to manage complex application state, enabling efficient data handling and seamless synchronization across components.


## Getting Started

To get started with LearnLocal, follow these steps:

1. Clone the repository to your local machine:

git clone https://github.com/your-username/learnlocal.git

2. Navigate to the project directory:

cd learnlocal

3. Install dependencies using npm:

npm install

4. Set up Firebase for authentication, storage, and Firestore database:

   - Authentication: Go to the Firebase Console, create a new project, and enable authentication using email/password or other methods as per requirements. Obtain your Firebase configuration details.

   - Storage: Set up Firebase Storage in the Firebase Console. Enable it and adjust the security rules as needed. Obtain your Firebase configuration details.

   - Firestore Database: Set up Firestore Database in the Firebase Console. Create a collection for users, posts, groups and events and configure security rules. Obtain your Firebase configuration details.

5. Create a `.env` file in the root directory of the project and add your Firebase configuration details as environment variables:

REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id


6. Start the development server:

npm run dev

7. Open your web browser and visit http://localhost:5173/ to view the app.


## Acknowledgements

This project is based on the Instagram Clone app developed by burakorkmez that can be found in the repository https://github.com/burakorkmez/instagram-clone. I acknowledge his contribution to the development of this project.

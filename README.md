# Security Advisory System


## Description
This project is a React-based web application designed to assist Duke IT professionals in managing security advisories and remediation information. The application includes user authentication and profile management, leveraging a context for user profile data. It features a responsive interface with routing handled by react-router-dom, providing various pages such as Home, About, Settings, and detailed CVE information. The Table component offers paginated and sortable views of CVE data, with filters and dynamic sidebar functionality. The application integrates with backend services for data fetching and user authentication, ensuring a seamless and secure user experience. The UI is enhanced with custom CSS for a polished and professional look, making it intuitive for IT professionals to navigate and use.



#### Home Page
![image info](front-end/public/Screenshotofhomepage.png)
#### CVE Page
![image info](front-end/public/Screenshotoflearnmore.png)
#### Settings
![image info](front-end/public/Screenshotofvendors.png)
![image info](front-end/public/Screenshotofnotifications.png)
#### Table
![image info](front-end/public/Screenshotoftable.png)

## Installation
We have Dockerfiles set up for both the frontend (React) and backend (Rails) directories. These are independent applications that are managed together using Docker Compose.

To build and start the project, run the following commands in the root directory:
`docker-compose build`
`docker-compose up`
This will install all necessary dependencies and start the project.

Once the containers are up and running, you can access the react application in your browser at http://localhost:3000

## Future Development
- Integration of User Authorization to only permit certain groups to configure remediation messages.
- Add a list of effected products for each Vulnerbility
- Create mobile interface
- Support more sources of Data beyong CVE Details and CISA KEV catalog

## Contributing
We welcome contributions! Please follow these steps:

Fork the repository.
Create a new branch (`git checkout -b feature-branch`).
Make your changes.
Submit a pull request.

## Authors and acknowledgment
- William Chen - Initial Work - WilliamChenn
- Brian Kim - Initial Work - 
- Katherine Yu - Initial Work - 
- Ananya Agrawal - Initial Work - 
- Kelly Shahu - Initial Work - 
- Duke University IT Security Office

## License
For open source projects, say how it is licensed.

## Project status
Active development. We are continuously adding new features and improving the application. If you are interested in contributing, please contact us!

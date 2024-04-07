[![MIT License][license-shield]][license-url]

## About

The Smart Brain server acts as the backbone of the Smart Brain application, providing the necessary API endpoints to handle requests and responses of the application.

- Handle Requests and Responses, ensuring smooth communication between the Smart Brain application and the server
- Face Detection with Clarifai API. By fetching data from the Clarifai API, it enables accurate and reliable identification of faces in images processed by the application.
- Connect to PostgreSQL Database, enabling fluid interaction with the database for storing and retrieving user information. This connection facilitates efficient data management and ensures the integrity and security of user data.
- Manage User Authentication and Registration with the database integration. It securely stores user information, handles user authentication requests, and facilitates user registration processes, ensuring a uninterrupted and secure user experience.

### Built With

- [![Node][Node.js]][Node-url]

- [![RESTful-API][RESTful-API.com]][RESTful-API-url]

- [![Clarifai][Clarifai.com]][Clarifai-url]

- [![PostgreSQL][PostgreSQL.org]][PostgreSQL-url]

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/huongnguyen1709/smart-brain-server.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run the Project
   ```sh
   npm start
   ```

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [Clarify-AI](https://clarifai.com/explore)

<!-- MARKDOWN LINKS & IMAGES -->

[license-shield]: https://img.shields.io/badge/license-MIT-blue?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[Node.js]: https://img.shields.io/badge/Node-20232A?style=for-the-badge&logo=nodedotjs
[Node-url]: https://nodejs.org/en
[RESTful-API.com]: https://img.shields.io/badge/RESTful%20API-20232A?style=for-the-badge
[RESTful-API-url]: https://konghq.com/learning-center/api-gateway/what-is-restful-api
[Clarifai.com]: https://img.shields.io/badge/AI--Clarifai%20Model-20232A?style=for-the-badge&logo=clarifai&logoColor=blue
[Clarifai-url]: https://clarifai.com/clarifai/models
[PostgreSQL.org]: https://img.shields.io/badge/PostgreSQL-20232A?style=for-the-badge&logo=postgresql&logoColor=green
[PostgreSQL-url]: https://www.postgresql.org/

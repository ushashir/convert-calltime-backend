# NODE-SQ011B-AIRTIME-2-CASH-APP-

### NAMING CONVENTION

- All succesful operation should return the `status code` with `message: "Success`
### API ENDPOINTS ROUTE

- *signup* **POST** `/api/users`
- *login* **POST** `/api/users/login`
- *reset password* **POST** `/api/users/forgotpassword`

### TESTING

- Use this sample user to run test
`
{
    "firstName": "test",
    "lastName": "test",
    "userName": "test",
    "email": "test@gmail.com",
    "phone": "04165593275",
    "password": "test",
    "confirmPassword": "test"
}
`

### START PRISMA COMMANDS
- yarn prisma migrate dev
- yarn prisma generate

## AIRTIME TO CASH REF DOCS
- [AIRTIME-TOCASH GIRA PROJECT URL](https://jira.decagonhq.dev/secure/RapidBoard.jspa?rapidView=176&projectKey=ATC2&view=planning&selectedIssue=ATC2-33&issueLimit=100)

- [AIRTIME-TOCASH PROJECT FIGMA URL](https://www.figma.com/file/qtiluzL9qRhyiMzVuPEwhV/Airtime-to-Cash-Design?node-id=0%3A1)
- [Airtime to cash PRD](https://docs.google.com/document/d/1XRH2oDxvHMMrMaVwqVRb3i1nseflHh7NZW3sHKenl04/edit)
## PRISMA DOCUMENTATION
- Run `npx prisma db push` to connet to online db
- Run `npx prisma migrate dev --name init` to migrate local db

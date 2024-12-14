# DevTinder Api's

## authRouter

- POST/signup
- POST/login
- POST/logout

## profileRouter

- GET profile/view
- PATCH profile/edit
- PATCH profile/password

## connectionRequestRouter

- POST /request/send/intersted/:userId
- POST /request/send/ignored/:userId
- POST /request/send/accepted/:requestId
- POST /request/send/rejected/:requestId

## userRouter

- GET /user/connections
- GET /user/requests
- GET /user/feed - Gets you the profiles of the other users on platform

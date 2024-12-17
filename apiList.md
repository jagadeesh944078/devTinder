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

- POST /request/send/:status/:userId
- POST /request/review/:status/:requestId

## userRouter

- GET /user/requests/received
- GET /user/requests
- GET /user/feed - Gets you the profiles of the other users on platform
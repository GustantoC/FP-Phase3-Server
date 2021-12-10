## API Reference

## List of APIs

#### Login

| Type   | Path     | Description               |
| :----- | :------- | :------------------------ |
| `POST` | '/login' | [Login user](#login-user) |

#### Users

| Type   | Path         | Description                                               |
| :----- | :----------- | :-------------------------------------------------------- |
| `GET`  | '/users'     | [Get all user (can be queried for roles)](#get-all-users) |
| `GET`  | '/users/:id' | [Get detail of user with id `:id`](#get-user)             |
| `POST` | '/users'     | [Create new user (register)](#create-user)                |
| `PUT`  | '/users/:id' | [Update status of the user](#change-user-status)          |

### Trips

| Type   | Path     | Description                      |
| :----- | :------- | :------------------------------- |
| `GET`  | '/trips' | [Get all trip](#get-trips)       |
| `POST` | '/trips' | [Create New Trip](#create-trips) |

#### Staffs

| Type   | Path          | Description                                        |
| :----- | :------------ | :------------------------------------------------- |
| `POST` | '/staffs'     | [Create new Staff](#create-staff)                  |
| `PUT`  | '/staffs/:id' | [Change the role of the staff](#change-staff-role) |

#### History

| Type  | Path                 | Description                                           |
| :---- | :------------------- | :---------------------------------------------------- |
| `GET` | '/histories'         | [Get all history](#get-list-of-history)               |
| `GET` | '/histories/:userId' | [Get history from the userId](#get-history-by-userid) |

#### Location

| Type   | Path                 | Description                                                         |
| :----- | :------------------- | :------------------------------------------------------------------ |
| `GET`  | '/locations'         | [Get all locations](#get-list-of-locations)                         |
| `GET`  | '/locations/:userId' | [Get the detail location of `userId`](#get-location-user-of-userid) |
| `POST` | '/locations'         | [Adding new location (Admin Only)](#create-new-location)            |

### Quarantine

| Type   | Path                               | Description                                                                    |
| :----- | :--------------------------------- | :----------------------------------------------------------------------------- |
| `GET`  | '/quarantines'                     | [Get quarantineDetails for userId](#get-quarantinedetail-for-userId)           |
| `PUT`  | '/quarantines/:userId'             | [Changing QuarantineDetail of userId](#update-quarantine-detail-for-user)      |

### List of Roles

- Admin
- OfficerAirport
- DriverWisma
- DriverHotel
- OfficerHotel
- OfficerWisma
- HealthOfficial
- User

### List of User status

- ArrivalProcedure
- Interview
- Interviewed
- Exit Terminal
- On route
- Briefing
- Quarantine
- SwabPertama
- SwabKedua

##

##

# Login User

[Back to list of API](#list-of-apis)

```http
  POST /login
```

| Body       | Type     | Description               |
| :--------- | :------- | :------------------------ |
| `email`    | `string` | **Required**. Login User  |
| `password` | `string` | **Required**. Login email |

### Response

#### `200` - OK

````json
[
  {
    "role": |> One of the list of Status <|,
    "access_token": "string"
  }
]

### Error
#### `400` - BadParameter
```json
{
  "message": "Email is required"
}
- OR -
{
  "message": "Password is required"
}
````

#### `401` - Unauthorized

```json
{
  "message": "Invalid email or password"
}
```

---

# Get all users

[Back to list of API](#list-of-apis)

```http
  GET /users
```

| Header         | Type     | Description                     |
| :------------- | :------- | :------------------------------ |
| `access_token` | `string` | **Required**. Your access_token |

| Query  | Type     | Description                  |
| :----- | :------- | :--------------------------- |
| `role` | `string` | **Optional**. Query the role |

### Response

#### `200` - OK

```json
[
  {
    "id": "integer",
    "name": "string",
    "passportNumber": "string",
    "role": |> One of the list of Roles <|,
    "email": "string",
    "phoneNumber": "string",
    "status": |> One of the list of Status <|
  },
  ...
]
```

---

---

# Get user

[Back to list of API](#list-of-apis)

```http
  GET /users/:id
```

| Header         | Type     | Description                     |
| :------------- | :------- | :------------------------------ |
| `access_token` | `string` | **Required**. Your access_token |

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `intger` | **Required**. Id of user to fetch |

### Response

#### `200` - OK

```json
{
  "id": "integer",
  "name": "string",
  "passportNumber": "string",
  "role": |> One of the list of Roles <|,
  "email": "string",
  "phoneNumber": "string",
  "status": |> One of the list of Status <|
}
```

### Error

#### `404` - NotFound

```json
{
  "message": "Can't find user"
}
```

---

# Create User

[Back to list of API](#list-of-apis)

```http
  POST /users
```

| Body             | Type     | Description                        |
| :--------------- | :------- | :--------------------------------- |
| `name`           | `string` | **Required**. User Name            |
| `passportNumber` | `string` | **Required**. User Passport Number |
| `email`          | `string` | **Required**. User Email           |
| `password`       | `string` | **Required**. User Password        |
| `phoneNumber`    | `string` | **Required**. User Phone Number    |

Note : `role` is not needed because on  
create the default for role in this **Endpoint**  
and `status` of `ArrivalProcedure`

### Response

#### `201` - Created

```json
{
  "id": "integer",
  "name": "string",
  "passportNumber": "string",
  "role": "User",
  "email": "string",
  "phoneNumber": "string",
  "status": "ArrivalProcedure"
}
```

### Error

#### `400` - BadParameter

```json
{
  "message": "Name is required"
}
- OR -
{
  "message": "Passport is required"
}
- OR -
{
  "message": "Email is required"
}
- OR -
{
  "message": "Email is not valid"
}
- OR -
{
  "message": "Email is already used"
}
- OR -
{
  "message": "Password is required"
}
- OR -
{
  "message": "Password must be at least 6 characters"
}
- OR -
{
  "message": "Phone Number is required"
}
```

---

# Change User Status

[Back to list of API](#list-of-apis)

```http
  PUT /users/:id
```

| Header         | Type     | Description                     |
| :------------- | :------- | :------------------------------ |
| `access_token` | `string` | **Required**. Your access_token |

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `intger` | **Required**. Id of User to change |

### Response

#### `200` - OK

```json
{
  "id": "integer",
  "name": "string",
  "passportNumber": "string",
  "role": "User",
  "email": "string",
  "phoneNumber": "string",
  "status": |> One of the list of Status <|
}
```

### Error

#### `401` - Unauthorized

```json
{
  "message": "Token Invalid"
}
```

#### `403` - Forbidden

```json
{
  "message": "You can't change user status"
}
```

#### `404` - NotFound

```json
{
  "message": "Can't find user"
}
- OR - 
{
  "message": "User not on active quarantine"
}
```

---

# GET Trips

[Back to list of API](#list-of-apis)

```http
  GET /trips
```

| Header         | Type     | Description                     |
| :------------- | :------- | :------------------------------ |
| `access_token` | `string` | **Required**. Your access_token |

Note : Getting the trips is based on the access_token

### Returns

#### `200` - Created

```json
{
  "id": "integer", //User Id
  "name": "string", //User Name
  "tripOrigin": "string",
  "tripDestination": "string",
  "createdAt": "date"
}
```

### Error

#### `403` - Forbidden

```json
{
  "message": "You are not an user"
}
```

---

# Create Trips

[Back to list of API](#list-of-apis)

```http
  POST /trips
```

| Header         | Type     | Description                     |
| :------------- | :------- | :------------------------------ |
| `access_token` | `string` | **Required**. Your access_token |

Note : creating new user trips based on the current access token

| Body              | Type     | Description                    |
| :---------------- | :------- | :----------------------------- |
| `tripOrigin`      | `string` | **Required**. Trip Origin      |
| `tripDestination` | `string` | **Required**. Trip destination |

### Returns

#### `201` - Created

```json
{
  "id": "integer",
  "tripOrigin": "string",
  "tripDestination": "string"
}
```

### Error

#### `400` - Bad Parameter

```json
{
  "message": "Please provide origin and destination"
}
```

#### `403` - Forbidden

```json
{
  "message": "You are not an user"
}
```

---

# Create Staff

[Back to list of API](#list-of-apis)

```http
  POST /staffs
```

| Body          | Type     | Description                                               |
| :------------ | :------- | :-------------------------------------------------------- |
| `name`        | `string` | **Required**. Staff Name                                  |
| `role`        | `string` | **Required**. Staff Role Only accepts from the list above |
| `email`       | `string` | **Required**. Staff Email                                 |
| `password`    | `string` | **Required**. Staff Password                              |
| `phoneNumber` | `string` | **Required**. Staff Phone Number                          |

Note : `passportNumber` and `status` is not needed because on  
create the default for role in this **Endpoint**

is `passportNumber` of `Staff`  
and `status` of `Active`

### Returns

#### `201` - Created

```json
{
  "id": "integer",
  "name": "string",
  "passportNumber": "Staff",
  "role": "string" || Only accepts from the list above,
  "email": "string",
  "phoneNumber": "string",
  "status": "Active"
}
```

### Error

#### `400` - BadParameter

```json
{
  "message": "Name is required"
}
- OR -
{
  "message": "Role is required"
}
- OR -
{
  "message": "Role is not accepted"
}
- OR -
{
  "message": "Email is required"
}
- OR -
{
  "message": "Email is not valid"
}
- OR -
{
  "message": "Email is already used"
}
- OR -
{
  "message": "Password is required"
}
- OR -
{
  "message": "Password must be at least 6 characters"
}
- OR -
{
  "message": "Phone Number is required"
}
```

---

# Change Staff Role

[Back to list of API](#list-of-apis)

```http
  PUT /staffs/:id
```

| Header         | Type     | Description                     |
| :------------- | :------- | :------------------------------ |
| `access_token` | `string` | **Required**. Your access_token |

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `intger` | **Required**. Id of User to change |

| Body   | Type     | Description                                   |
| :----- | :------- | :-------------------------------------------- |
| `role` | `string` | **Required**. The role of the staff to change |

### Response

#### `200` - OK

```json
{
  "id": "integer",
  "name": "string",
  "passportNumber": "Staff",
  "role": |> One of the list of Roles <|,
  "email": "string",
  "phoneNumber": "string",
  "status": "Active"
}
```

### Error

#### `400` - Bad Parameter

```json
{
  "message": "Role is not accepted"
}
```

#### `401` - Unauthorized

```json
{
  "message": "Token Invalid"
}
```

#### `404` - NotFound

```json
{
  "message": "Can't find user"
}
```

---

# Get list of history

[Back to list of API](#list-of-apis)

```http
  GET /histories
```

| Header         | Type     | Description                     |
| :------------- | :------- | :------------------------------ |
| `access_token` | `string` | **Required**. Your access_token |

Note: Only staff with role `admin` can access this

### Response

#### `200` - OK

```json
[
  {
    "id": "integer",
    "userId": "integer",
    "updatedBy": "integer",
    "description": "string",
    "createdAt": "dateTime",
    "updatedUser": { //from userId
      "id": "integer",
      "name": "string",
      "email": "string"
    },
    "updater": { //from updatedBy
      "id": "integer",
      "name": "string",
      "email": "string"
    }
  },
  ...
]
```

### Error

#### `401` - Unauthorized

```json
{
  "message": "Token Invalid"
}
```

#### `403` - Forbidden

```json
{
  "message": "You can't access this"
}
```

---

# Get history by userId

[Back to list of API](#list-of-apis)

```http
  GET /histories/:userId
```

| Header         | Type     | Description                     |
| :------------- | :------- | :------------------------------ |
| `access_token` | `string` | **Required**. Your access_token |

Note: Only staff with role `admin` can access this

| Parameter | Type     | Description                                  |
| :-------- | :------- | :------------------------------------------- |
| `userId`  | `intger` | **Required**. UserID of the history to check |

### Response

#### `200` - OK

```json
[
  {
    "id": "integer",
    "userId": "integer",
    "updatedBy": "integer",
    "description": "string",
    "createdAt": "dateTime",
    "updatedAt": "dateTime"
  },
  ...
]
```

### Error

#### `401` - Unauthorized

```json
{
  "message": "Token Invalid"
}
```

#### `403` - Forbidden

```json
{
  "message": "You can't access this"
}
```

#### `404` - NotFound

```json
{
  "message": "Can't find user"
}
```

---

# Get list of locations

[Back to list of API](#list-of-apis)

```http
  GET /locations
```

| Header         | Type     | Description                     |
| :------------- | :------- | :------------------------------ |
| `access_token` | `string` | **Required**. Your access_token |

### Response

#### `200` - OK

```json
[
  {
    "id": "integer",
    "name": "string",
    "address": "string",
    "type": "Wisma" || "Hotel"
  },
  ...
]
```

---

# Get location user of userId

[Back to list of API](#list-of-apis)

```http
  GET /locations/:userId
```

| Header         | Type     | Description                     |
| :------------- | :------- | :------------------------------ |
| `access_token` | `string` | **Required**. Your access_token |

| Parameter | Type     | Description                                 |
| :-------- | :------- | :------------------------------------------ |
| `userId`  | `intger` | **Required**. UserID of the location to get |

### Response

#### `200` - OK

```json
{
  "id": "integer",
  "name": "string",
  "address": "string",
  "type": "Wisma" || "Hotel"
}
```

### Error

#### `401` - Unauthorized

```json
{
  "message": "Token Invalid"
}
```

#### `404` - NotFound

```json
{
  "message": "Can't find user"
}
- OR -
{
  "message": "User is not on any location"
}
```

---

# Create new location

[Back to list of API](#list-of-apis)

```http
  POST /locations
```

| Header         | Type     | Description                     |
| :------------- | :------- | :------------------------------ |
| `access_token` | `string` | **Required**. Your access_token |

note: Only `admins` can create new locations

| Body      | Type     | Description                           |
| :-------- | :------- | :------------------------------------ |
| `name`    | `string` | **Required**. Location Name           |
| `address` | `string` | **Required**. Address of the location |
| `type`    | `string` | "Wisma" -or- "Hotel"                  |

### Response

#### `201` - OK

```json
{
  "id": "integer",
  "name": "string",
  "address": "string",
  "type": "wisma" || "hotel"
}
```

### Error

#### `401` - Unauthorized

```json
{
  "message": "Token Invalid"
}
```

#### `400` - Bad Parameter

```json
{
  "message": "Please enter a name for the location"
}
- OR -
{
  "message": "Please enter an address for the location"
}
```

---

# Get QuarantineDetail for UserId

[Back to list of API](#list-of-apis)

```http
  GET /quarantines
```

| Header         | Type     | Description                     |
| :------------- | :------- | :------------------------------ |
| `access_token` | `string` | **Required**. Your access_token |

note: only `User` can access this
note again : The data is based on the user accessing this

### Response

#### `200` - OK

```json
[
  {
    "id": "integer",
    "userId": "integer",
    "locationId": "integer" || nullable,
    "roomNumber": "string" || nullable,
    "quarantineUntil": "date" || nullable,
    "tripOrigin": "string" || nullable,
    "tripDestination": "string" || nullable,
    "isQuarantined": "boolean" || nullable,
    "createdAt": "date",
    "User": {
      "id": "integer",
      "name": "string",
      "email": "string",
      "phoneNumber": "string"
    },
    "QuarantineLocation": { || nullable
      "id": "integer",
      "name": "string",
      "address": "text",
      "type": "Wisma" || "Hotel"
    }
  },
  ...
]
```

### Error

#### `401` - Unauthorized

```json
{
  "message": "Token Invalid"
}
```

#### `403` - Forbidden

```json
{
  "message": "You can't access this"
}
```

#### `404` - NotFound

```json
{
  "message": "Can't find any data" 
}
```

---

# Update Quarantine Detail for User

[Back to list of API](#list-of-apis)

```http
  PUT /quarantines/:userId
```

| Header         | Type     | Description                     |
| :------------- | :------- | :------------------------------ |
| `access_token` | `string` | **Required**. Your access_token |

note: only `Officer(s)` can access this

| Parameter | Type      | Description                                     |
| :-------- | :-------- | :---------------------------------------------- |
| `userId`  | `integer` | **Required**. Id of user that wants to be added |

| Body              | Type     | Description          |
| :---------------- | :------- | :------------------- |
| `locationId`      | `integer` | LocationID to add   |
| `roomNumber`      | `string` | Room Number to add   |
| `quarantineUntil` | `date`   | Quarantine date ends |
| `tripOrigin`      | `string` | Trip Origin          |
| `tripDestination` | `string` | Trip Destination     |

### Response

#### `200` - OK

```json
{
  "id": "integer",
  "userId": "integer",
  "locationId": "integer",
  "roomNumber": "string",
  "quarantineUntil": "date",
  "tripOrigin": "string",
  "tripDestination": "string",
  "isQuarantined": "boolean"
}
```

### Error

#### `401` - Unauthorized

```json
{
  "message": "Token Invalid"
}
```

#### `403` - Forbidden

```json
{
  "message": "You can't access this"
}
```

#### `404` - NotFound

```json
{
  "message": "Can't find User with ID in quarantine"
}
- OR -
{
  "message": "Quarantine Location with ID  not found"
}
```

---

[Back to list of API](#list-of-apis)

### Global Error

#### `500` - Internal Server Error

```json
{
  "message": "Internal Server Error"
}
```

---

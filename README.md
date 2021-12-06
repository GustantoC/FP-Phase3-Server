
## API Reference

## List of APIs

#### Login

|Type|Path|Description|
|:-|:-|:-|
|`POST`|'/login'|[Login user](#login-user)|  

#### Users

|Type|Path|Description|
|:-|:-|:-|
|`GET`|'/users'|[Get all user (can be queried for roles)](#get-all-users)|
|`GET`|'/users/:id'|[Get detail of user with id `:id`](#get-user)|
|`POST`|'/users'|[Create new user (register)](#create-user)|
|`PUT`|'/users/:id'|[Update status of the user](#change-user-status)|

#### Staffs

|Type|Path|Description|
|:-|:-|:-|
|`POST`|'/staffs'|[Create new Staff](#create-staff)|
|`PUT`|'/staffs/:id'|[Change the role of the staff](#change-staff-role)|

#### History
|Type|Path|Description|
|:-|:-|:-|
|`GET`|'/histories'|[Get all history](#get-list-of-history)|
|`GET`|'/histories/:userId'|[Get history from the userId](#get-history-by-userid)| 


#### Location

|Type|Path|Description|
|:-|:-|:-|
|`GET`|'/locations'|[Get all locations](#get-list-of-locations)|
|`GET`|'/locations/:userId'|[Get the detail location of `userId`](#get-location-user-of-userid)|
|`POST`|'/locations'| [Adding new location (Admin Only)](#create-new-location)| 


### Quarantine

|Type|Path|Description|
|:-|:-|:-|
|`POST`|'/quarantines/:userId/:locationId'| [Creating a Quarantine Detail for the user](#create-quarantinedetail-for-user) |
|`PUT`|'/quarantines/:userId'| [Changing QuarantineDetail of userId](#update-quarantine-detail-for-user) | 

### List of Roles

- Admin
- OfficerAirport
- DriverWisma
- DriverHotel
- OfficerHotel
- OfficerWisma
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

```http
  POST /login
```

|Body|Type|Description|
|:-|:-|:-|
| `email` | `string` | **Required**. Login User |
| `password` | `string` | **Required**. Login email |

### Response
#### `200` - OK
```json
[
  {
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
```
#### `401` - Unauthorized
```json
{
  "message": "Invalid email or password"
}
```


---

# Get all users

```http
  GET /users
```

|Header|Type|Description|
|:-|:-|:-|
|`access_token`|`string`|**Required**. Your access_token|

|Query|Type|Description|
|:-|:-|:-|
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

#### `404` - Not Found
```json
{
  "message":
}
```

---

---

# Get user

```http
  GET /users/:id
```

|Header|Type|Description|
|:-|:-|:-|
|`access_token`|`string`|**Required**. Your access_token|

|Parameter|Type|Description|
|:-|:-|:-|
| `id`| `intger`|**Required**. Id of user to fetch|


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

```http
  POST /users
```

|Body|Type|Description|
|:-|:-|:-|
| `name` | `string` | **Required**. User Name |
| `passportNumber` | `string` | **Required**. User Passport Number |
| `email` | `string` | **Required**. User Email |
| `password` | `string` | **Required**. User Password |
| `phoneNumber` | `string` | **Required**. User Phone Number |

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

```http
  PUT /users/:id
```

|Header|Type|Description|
|:-|:-|:-|
|`access_token`|`string`|**Required**. Your access_token|

|Parameter|Type|Description|
|:-|:-|:-|
| `id`| `intger`|**Required**. Id of User to change|


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

# Create Staff

```http
  POST /staffs
```

|Body|Type|Description|
|:-|:-|:-|
| `name` | `string` | **Required**. Staff Name |
| `role` | `string` | **Required**. Staff Role Only accepts from the list above |
| `email` | `string` | **Required**. Staff Email |
| `password` | `string` | **Required**. Staff Password |
| `phoneNumber` | `string` | **Required**. Staff Phone Number |

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

```http
  PUT /staff/:id
```

|Header|Type|Description|
|:-|:-|:-|
|`access_token`|`string`|**Required**. Your access_token|

|Parameter|Type|Description|
|:-|:-|:-|
| `id`| `intger`|**Required**. Id of User to change|

|Body|Type|Description|
|:-|:-|:-|
| `role`| `string`|**Required**. The role of the staff to change|


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

```http
  GET /histories
```

|Header|Type|Description|
|:-|:-|:-|
|`access_token`|`string`|**Required**. Your access_token|
Note: Only staff with role `admin` can access this

### Response
#### `200` - OK
```json
[
  {
    "id": "integer",
    "userId": "integer",
    "updatedBy": "string" || Name of the user,
    "description": "string",
    "createdAt": "dateTime"
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

```http
  GET /histories/:userId
```

|Header|Type|Description|
|:-|:-|:-|
|`access_token`|`string`|**Required**. Your access_token|
Note: Only staff with role `admin` can access this

|Parameter|Type|Description|
|:-|:-|:-|
| `userId`| `intger`|**Required**. UserID of the history to check|


### Response 
#### `200` - OK
```json
{
  "id": "integer",
  "userId": "integer",
  "updatedUser": "name",
  "updatedBy": "string" || Name of the user,
  "description": "string",
  "createdAt": "dateTime"
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
  "message": "Can't find user"
}
```

---


# Get list of locations

```http
  GET /locations
```

|Header|Type|Description|
|:-|:-|:-|
|`access_token`|`string`|**Required**. Your access_token|


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

```http
  GET /locations/:userId
```

|Header|Type|Description|
|:-|:-|:-|
|`access_token`|`string`|**Required**. Your access_token|

|Parameter|Type|Description|
|:-|:-|:-|
| `userId`| `intger`|**Required**. UserID of the location to get|

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

```http
  POST /locations
```

|Header|Type|Description|
|:-|:-|:-|
|`access_token`|`string`|**Required**. Your access_token|  

note: Only `admins` can create new locations

|Body|Type|Description|
|:-|:-|:-|
| `name` | `string` | **Required**. Location Name |
| `address` | `string` | **Required**. Address of the location |
| `type` | `string` | "Wisma" -or- "Hotel" | 

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

# Create QuarantineDetail for User

```http
  POST /quarantines/:userId/:locationId
```

|Header|Type|Description|
|:-|:-|:-|
|`access_token`|`string`|**Required**. Your access_token|  

note: only `OfficerAirport` can access this


|Parameter|Type|Description|
|:-|:-|:-|
| `userId` | `integer` | **Required**. Id of user that wants to be added |
| `locationId` | `integer` | **Required**. Id of the location |

### Response
#### `201` - OK
```json
{
  "id": "integer",
  "userId": "integer",
  "locationId": "integer",
  "roomNumber": null
}
```

## Note : Default value for roomNumber is null

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
  "message": "User with ID not found"
}
- OR -
{
  "message": "Location with ID not found"
}
```
---

# Update Quarantine Detail for User

```http
  PUT /quarantines/:userId
```


|Header|Type|Description|
|:-|:-|:-|
|`access_token`|`string`|**Required**. Your access_token|  

note: only `OfficerHotel` or `OfficerWisma` can access this


|Parameter|Type|Description|
|:-|:-|:-|
| `userId` | `integer` | **Required**. Id of user that wants to be added |

|Body|Type|Description|
|:-|:-|:-|
| `roomNumber` | `string` |  Room Number to add |
| `totalDays` | `integer` |  Total days needed to be quarantined |
| `tripOrigin` | `string` |  Trip Origin |
| `tripDestination` | `string` | Trip Destination  |

### Response
#### `200` - OK
```json
{
  "id": "integer",
  "userId": "integer",
  "locationId": "integer",
  "roomNumber": "string",
  "totalDays": "integer",
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
  "message": "User with ID not found"
}
```
---



### Global Error

#### `500` - Internal Server Error

```json
{
  "message": "Internal Server Error"
}
```
---

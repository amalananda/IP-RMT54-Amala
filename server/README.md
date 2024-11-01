# IP-RMT54

[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=16526947&assignment_repo_type=AssignmentRepo)

# Individual Project (Server Side)

> Tuliskan API Docs kamu di sini

# Healing Ga Sih? API Documentation

## Models:

_User_

- username: string
- email: string, unique (required)
- password: string (required)

_Destination_

- name: string (required)
- description: text
- imageUrl: string

_Trip_

- userId: integer
- title: string
- startDate: date
- endDate: date

_TripDestination_

- name: string
- description: text
- imageUrl: string

## Relationship:

### **One-to-Many**

Relasi antara `User` dan `Trip`, dimana satu user bisa memiliki banyak trip.

### **Many-to-Many**

Relasi antara `Trip` dan `Destination`, melalui tabel penghubung TripDestination, karena satu Trip dapat memiliki banyak Destination, dan satu Destination bisa berada di banyak Trip.

---

## Endpoints:

List of available endpoints:

### User Endpoints:

- `POST /register`
- `POST /login` (requires authentication)

### Destination Endpoints (requires authentication):

- `GET /destination`
- `GET /destination/:id`

### Trip Endpoints:

- `GET /trip`
- `POST /trip`
- `GET /trip/my-trips`
- `GET /trip/:id`
- `PUT /trip/:id`

---

## 1. User Endpoints:

### 1.1. POST /register

Add a new user.

**Request:**

- Headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- Body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**Response (201 - Created):**

```json
{
  "id": 1,
  "username": "string"
}
```

**Response (400):**

```json
{
  "message": "Email is required"
}
```

### 1.2. POST /login

User login.

**Request:**

- Body:

```json
{
  "email": "string",
  "password": "string"
}
```

**Response (200 - OK):**

```json
{
  "access_token": "string"
}
```

**Response (400 - Bad Request):**

```json
{
  "message": "Email is required"
}
```

```json
{
  "message": "Password is required"
}
```

**Response (401 - Unauthorized):**

```json
{
  "message": "Invalid email/password"
}
```

## 2. Destination Endpoints:

### 2.1. GET /destination

Retrieve all destination (authentication required).

**Response (200 - OK):**

```json
[
  {
    "id": 1,
    "name": "Candi Borobudur",
    "description": "Candi Buddha terbesar di dunia yang menjadi situs warisan dunia UNESCO.",
    "imageUrl": "https://i.pinimg.com/564x/bc/58/e0/bc58e08f448baa3e80615f68acd32f8a.jpg"
  },
  {
    "id": 2,
    "name": "Lawang Sewu",
    "description": "Bangunan bersejarah dengan gaya arsitektur kolonial Belanda yang angker dan terkenal.",
    "imageUrl": "https://i.pinimg.com/564x/f3/26/d7/f326d7f7395df495741cce06250a1921.jpg"
  },
  {
    "id": 3,
    "name": "Dieng Plateau",
    "description": "Dataran tinggi di Jawa Tengah dengan pemandangan alam indah dan situs purbakala.",
    "imageUrl": "https://i.pinimg.com/564x/08/fd/3d/08fd3dd6797edbbc26f83449bc99b831.jpg"
  },
  {
    "id": 4,
    "name": "Pantai Karimunjawa",
    "description": "Kepulauan dengan pantai pasir putih dan kehidupan bawah laut yang menakjubkan.",
    "imageUrl": "https://i.pinimg.com/564x/09/69/da/0969daf61f46497d0192563a5f8d5963.jpg"
  },
  {
    "id": 5,
    "name": "Candi Prambanan",
    "description": "Kompleks candi Hindu terbesar di Indonesia, terletak dekat perbatasan Jawa Tengah dan Yogyakarta.",
    "imageUrl": "https://i.pinimg.com/564x/fc/68/d9/fc68d931b71dec8640745129067aae6b.jpg"
  },
  {
    "id": 6,
    "name": "Kampung Batik Laweyan",
    "description": "Kawasan wisata budaya yang terkenal dengan kerajinan batik khas Solo.",
    "imageUrl": "https://i.pinimg.com/564x/4b/99/0a/4b990a46619205b1dcd5b3d22a6aba32.jpg"
  },
  {
    "id": 7,
    "name": "Pantai Menganti",
    "description": "Pantai eksotis dengan pasir putih dan pemandangan perbukitan di Kebumen, Jawa Tengah.",
    "imageUrl": "https://i.pinimg.com/564x/b6/a4/99/b6a4992dbcb202089e71e05b9673272a.jpg"
  },
  {
    "id": 8,
    "name": "Gunung Merbabu",
    "description": "Gunung berapi yang populer untuk pendakian dengan pemandangan yang indah di puncaknya.",
    "imageUrl": "https://i.pinimg.com/736x/83/e6/74/83e67412ee4c7cf6a10c051c5e7f1773.jpg"
  },
  {
    "id": 9,
    "name": "Curug Lawe",
    "description": "Air terjun tersembunyi dengan suasana alami di daerah Ungaran, Semarang.",
    "imageUrl": "https://i.pinimg.com/736x/00/a7/b7/00a7b771e2f153b22a18a48764cdd00f.jpg"
  },
  {
    "id": 10,
    "name": "Brown Canyon",
    "description": "Area bekas tambang yang menyerupai Grand Canyon dengan tebing-tebing tinggi di Semarang.",
    "imageUrl": "https://i.pinimg.com/564x/6c/68/98/6c68983e462d0c21e2faf21d471ac7e0.jpg"
  }
]
```

### 2.2. GET /destination/:id

Retrieve all destination (authentication required).

**Request:**

- Params:

```json
{
  "id": "integer"
}
```

**Response (200 - OK):**

```json
  {
    "id": 1,
    "name": "Candi Borobudur",
    "description": "Candi Buddha terbesar di dunia yang menjadi situs warisan dunia UNESCO.",
    "imageUrl": "https://i.pinimg.com/564x/bc/58/e0/bc58e08f448baa3e80615f68acd32f8a.jpg"
  },
```

**Response (404 - Not Found):**

```json
{
  "message": "Destination not found"
}
```

**Response (500 - Not Found):**

```json
{
  "message": "Failed to retrieve destinations"
}
```

## 3. Trip Endpoints:

### 3.1. GET /trip

Retrieve all trip (authentication required).

**Request:**

- Headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

**Response (200 - OK):**

```json
[
  {
    "userId": 1,
    "title": "Trip to Jateng",
    "startDate": new Date(),
    "endDate": new Date(),
  }
]
```

### 3.2. POST /trip

Retrieve all trip (authentication required).

**Request:**

- Headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- Params:

```json
{
  "userId": "integer"
}
```

- Body:

```json
{
  "userId": 1,
  "title": "Trip to Jateng",
  "startDate": new Date(),
  "endDate": new Date(),
  "destinationIds": [1, 2]
}
```

**Response (201 - Created):**

```json
{
  "userId": 1,
  "title": "Trip to Jateng",
  "startDate": new Date(),
  "endDate": new Date(),
  "destinationIds": [1, 2]
  "destination": {
    "id": "1",
    "name": "Candi Borobudur",
    "description": "Candi Buddha terbesar di dunia yang menjadi situs warisan dunia UNESCO.",
    "imageUrl": "https://i.pinimg.com/564x/bc/58/e0/bc58e08f448baa3e80615f68acd32f8a.jpg",

    "id": "2",
    "name": "Lawang Sewu",
    "description": "Bangunan bersejarah dengan gaya arsitektur kolonial Belanda yang angker dan terkenal.",
    "imageUrl": "https://i.pinimg.com/564x/f3/26/d7/f326d7f7395df495741cce06250a1921.jpg"
  }
}
```

### 3.3. GET /trip/my-trips

Get a trip by userId

**Request:**

- Headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- Params:

```json
{
  "id": "integer"
}
```

- Body:

```json
{
  "userId": "integer",
  "title": "string",
  "startDate": "date",
  "endDate": "date",
  "destinationIds": "integer"
}
```

**Response (200 - OK):**

```json
{
  "userId": 1,
  "title": "Trip to Jateng",
  "startDate": new Date(),
  "endDate": new Date(),
  "destinationIds": [1, 2]
}
```

### 3.4. GET /trip/:id

Retrieve all trip (authentication required).

**Request:**

- Headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- Params:

```json
{
  "id": "integer"
}
```

- Body:

```json
[
  {
    "userId": 1,
    "title": "Trip to Jateng",
    "startDate": new Date(),
    "endDate": new Date(),
  }
]
```

**Response (200 - OK):**

### 3.5. PUT /trip/:id

Retrieve all trip (authentication required).

**Request:**

- Headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- Params:

```json
{
  "id": "integer"
}
```

- Body:

```json
[
  {
    "userId": 1,
    "title": "Trip to Jateng",
    "startDate": new Date(),
    "endDate": new Date(),
  }
]
```

**Response (200 - OK)**

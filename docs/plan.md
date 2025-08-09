```
club/
│
├── gateway/ # API Gateway to route all requests
│ ├── Dockerfile
│ └── src/
│  ├── index.ts
│  └── routes/
│
├── auth-service/ # Authentication service (login, JWT)
│ ├── Dockerfile
│ ├── src/
│ │ ├── controllers/
│ │ ├── routes/
│ │ ├── services/
│ │ ├── models/
│ │ ├── middlewares/
│ │ └── index.ts
│ └── prisma/ # DB schema and migrations
│ └── schema.prisma
│
├── user-service/ # Handles user profiles, roles
│ ├── Dockerfile
│ ├── src/
│ └── prisma/
│
├── club-service/ # Club creation, member management, roles
│ ├── Dockerfile
│ ├── src/
│ └── prisma/
│
├── event-service/ # Club events, RSVP, attendance
│ ├── Dockerfile
│ ├── src/
│ └── prisma/
│
├── post-service/ # Announcements, media posts
│ ├── Dockerfile
│ ├── src/
│ └── prisma/
│
├── file-service/ # Upload and serve posters/logos
│ ├── Dockerfile
│ ├── src/
│ └── uploads/ # Stored locally or integrate with MinIO/S3
│
├── notification-service/ # Email or in-app notifications (optional)
│ ├── Dockerfile
│ ├── src/
│
├── shared/ # Shared utilities across services
│ ├── utils/
│ └── types/
│
├── docker-compose.yml # Spins up all services
├── .env # Environment variables
└── README.md
```
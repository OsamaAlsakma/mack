## DRAGON Software Backend

### Setup Instructions

1. Install dependencies:
```bash
cd backend
npm install
```

2. Configure environment:
- Copy `.env.example` to `.env`
- Update database connection string and other variables

3. Setup database:
```bash
npx prisma migrate dev
npx prisma generate
```

4. Start development server:
```bash
npm run dev
```

### API Endpoints

#### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - User login

#### Projects
- GET `/api/projects` - List all projects
- GET `/api/projects/:id` - Get project details
- POST `/api/projects` - Create new project
- PUT `/api/projects/:id` - Update project
- POST `/api/projects/:id/images` - Upload project image

#### Services
- GET `/api/services` - List all services
- GET `/api/services/:id` - Get service details
- POST `/api/services` - Create new service
- PUT `/api/services/:id` - Update service

### Database Schema

Check `prisma/schema.prisma` for complete database structure.

### Features

- JWT Authentication
- File Upload (AWS S3)
- Email Service
- Real-time Updates (Socket.IO)
- Error Handling
- Request Validation
- Rate Limiting
- Logging
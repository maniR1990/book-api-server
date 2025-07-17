# Book API Server

A simple Express and TypeScript server using Prisma ORM to manage a collection of books.

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment**
   Create a `.env` file with your database connection string.
   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
   PORT=3000
   ```

3. **Generate Prisma client & run migrations**
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

4. **Start the server**
   ```bash
   npm run dev       # development with ts-node and nodemon
   # or
   npm run build && npm start
   ```

The server will start on `http://localhost:3000` by default.

## Database Schema

The Prisma schema defines a single `Book` model:

| Field       | Type      | Attributes                                |
|-------------|----------|--------------------------------------------|
| `id`        | `Int`    | Primary key, auto-increment                |
| `title`     | `String` | Book title                                 |
| `author`    | `String` | Author name                                |
| `status`    | `String?`| Reading status (`Read` or `Unread`)        |
| `description`| `String?`| Optional description                       |
| `addedAt`   | `DateTime`| Timestamp when added (defaults to `now()`) |

See `prisma/schema.prisma` for details.

## API Routes

All routes are prefixed with `/books`.

| Method & Path                         | Description                                   |
|--------------------------------------|-----------------------------------------------|
| `GET /books/getAllBooks`             | Retrieve all books                            |
| `POST /books/`                       | Create a new book (`title` and `author` required) |
| `PATCH /books/:id/status`            | Update a book's reading status                |
| `DELETE /books/:id`                  | Delete a book                                 |
| `GET /books/search?text=QUERY`       | Search by title or author                     |
| `GET /books/readStatus?status=Read`  | List books filtered by status (`Read` or `Unread`) |
| `GET /books/:id`                     | Retrieve a book by ID                         |

Request and response bodies are JSON.

## Development

- Lint the code with `npm run lint`.
- Compile TypeScript with `npm run build`.

Feel free to adapt the project to your needs!

# TodoList

Ung dung Todo List gom:

- Backend: Spring Boot, Java 21, MySQL
- Frontend: Next.js, React, TypeScript
- Database: MySQL 8.4

## Cau truc thu muc

```text
TodoList/
|-- TodoListBackend/      # Spring Boot API
|-- todolistfe/           # Next.js frontend
`-- docker-compose.yml    # Chay full stack bang Docker
```

## Chay bang Docker

Yeu cau:

- Docker Desktop
- Docker Compose

Chay toan bo du an:

```bash
docker compose up --build
```

Sau khi chay xong:

- Frontend: http://localhost:3000
- Backend: http://localhost:8080
- MySQL: `localhost:3306`

Tat container:

```bash
docker compose down
```

Tat container va xoa luon du lieu MySQL trong volume:

```bash
docker compose down -v
```

## Bien moi truong Docker

Tat ca bien moi truong chinh duoc set trong `docker-compose.yml`.

Backend:

```yaml
SPRING_DATASOURCE_URL: jdbc:mysql://mysql:3306/todolist?allowPublicKeyRetrieval=true&useSSL=false&serverTimezone=UTC
SPRING_DATASOURCE_USERNAME: root
SPRING_DATASOURCE_PASSWORD: root
```

Frontend:

```yaml
NEXT_PUBLIC_API_URL: http://localhost:8080
```

`NEXT_PUBLIC_API_URL` la URL backend ma browser se goi. Vi browser chay tren may host, dung `http://localhost:8080` la dung.

## Chay local khong dung Docker

Yeu cau:

- Java 21
- Node.js 22 hoac tuong duong
- MySQL dang chay local o port `3306`

Tao database:

```sql
CREATE DATABASE todolist;
```

Chay backend tren macOS/Linux:

```bash
cd TodoListBackend
./mvnw spring-boot:run
```

Chay backend tren Windows PowerShell:

```powershell
cd TodoListBackend
.\mvnw.cmd spring-boot:run
```

Chay frontend:

```bash
cd todolistfe
npm install
npm run dev
```

Frontend local:

```text
http://localhost:3000
```

Backend local:

```text
http://localhost:8080
```

## API chinh

Base URL:

```text
http://localhost:8080
```

Endpoints:

```text
GET    /todo
POST   /todo
PUT    /todo/{id}
DELETE /todo/{id}
PATCH  /todo/{id}/toggle
```

Query danh sach todo:

```text
GET /todo?keyword=test&completed=false&page=0&size=10&sort=createdAt,desc
```

## Loi thuong gap

Neu port `3000`, `8080`, hoac `3306` dang bi dung, hay tat service dang chay hoac doi port trong `docker-compose.yml`.

Neu muon reset database Docker:

```bash
docker compose down -v
docker compose up --build
```

Neu frontend khong goi duoc backend, kiem tra bien:

```text
NEXT_PUBLIC_API_URL=http://localhost:8080
```

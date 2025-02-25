# Music-forum Project

**A Spotify-integrated & server-side rendered web application**

---
## Table of contents

- Database Schema
- System Architecture
- Features
- Technology Stack
- Deployment
- Demo

## Database Schema
<img width="570" alt="螢幕擷取畫面 2024-07-19 153326" src="https://github.com/user-attachments/assets/e0b552b8-b000-45d7-9d75-dc3ec1f2a810">

## System Architecture
![Unnamed File (2)](https://github.com/user-attachments/assets/250f306b-1647-4a46-acb6-5f529ae6cfed)


## Features
### Role-Based Functionality

  **Unauthorized Visitor**
  - Search artists, albums and tracks via Spotify API
  - View all the songs or by genre
  - View the latest songs and the latest comments

  **Authorized User (log-in user)**
  - Add a song to favorite list (like a song)
  - Leave the comments

  **Admin**
  - Create, delete, edit songs and upload images
  - Create, delete, edit genres
  - Create, delete, edit comments
  - Set general user as admin

### Advanced Authentication
- Local authentication
- Google OAuth integration for sign-up/login

## Technology Stack
- **Frontend**: Server-Side Rendering (SSR)
- **Backend**: Node.js (Express.js framework)
- **Database**: MySQL
- **Authentication**: Local strategy & Google OAuth
- **API Integration**: Spotify API
- **Containerization**: Docker for easy deployment

## Deployment :
#### With Docker
1. 
```
docker pull bwdf64587p/music-forum:app_latest
docker pull bwdf64587p/music-forum:db
```
2.
```
docker-compose up --build
```

3. Access the app at 
```
http://localhost:3000
```

#### Locally
- git clone
- npm install
- npm start/npm run dev
- Access the app at 
```
http://localhost:3000
```

#### Test Account
accounts for easy testing:
- Admin: root@example.com / 12345678
- General User: user1@example.com / 12345678

---
## Demo
#### Spotify API Integration
![Demo_Spotify API](https://github.com/user-attachments/assets/8f8781b6-4c22-4372-8798-990e6cefe241)


#### Google OAuth Authentication & Admin Dashboard
![Demo_Google OAuth integration](https://github.com/user-attachments/assets/d04b6df6-bbaa-4014-a25a-0cccbd7758c6)


#### View Songs by Genre & Like Features
![Demo_3](https://github.com/user-attachments/assets/7bcffe09-5ffb-4f82-91e2-8a52e4aa89d7)


#### Authorization & Error Messages
![Demo_4](https://github.com/user-attachments/assets/dbd6f83e-f042-4bba-ab05-9d9c5a7df458)


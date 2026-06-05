AI-Powered Issue Management Platform

Overview

AI-Powered Issue Management Platform is a full-stack web application that helps teams manage issues, discussions, and AI-assisted troubleshooting.

The system allows users to:

Create issues
Update issues
Delete issues
Manage issue status
Add discussions
Search and filter issues
Generate AI-powered analysis using Google Gemini AI

---------------------------------------------------------

Tech Stack

Frontend

Next.js
React
TypeScript
Tailwind CSS
Axios

Backend

NestJS
TypeScript
PostgreSQL
Drizzle ORM

AI Integration

Google Gemini API

---------------------------------------------

Features

Issue Management

Create Issue
View Issues
View Issue Details
Edit Issue
Delete Issue
Update Status

Discussions

Add Discussion
View Discussions

AI Analysis

Generate:

Issue Summary
Possible Root Cause
Recommended Fix
Priority Assessment

using Google Gemini AI.


Dashboard

Total Issues
Open Issues
Closed Issues
High Priority Issues

Search & Filters

Search Issues
Filter by Status
Filter by Priority

-------------------------------------------------

Project Structure

issue-management-platform/

backend/

frontend/

README.md

-------------------------------------------------

Environment Variables

Backend (.env)

Create a `.env` file inside the backend folder:

DATABASE_URL=your_postgresql_connection_string

GEMINI_API_KEY=your_gemini_api_key

PORT=4000

Frontend (.env.local)

Create a `.env.local` file inside the frontend folder:

NEXT_PUBLIC_API_URL=http://localhost:4000

------------------------------------------------------

Database Setup

PostgreSQL

Create a PostgreSQL database.

Example:

issue_management_db

Update the DATABASE_URL in backend/.env.

Example:

DATABASE_URL=postgresql://username:password@localhost:5432/issue_management_db

-------------------------------------------------------------

Install Dependencies

Backend

cd backend

npm install


Frontend

cd frontend

npm install

-------------------------------------------------

Database Migration

Generate migrations:

npm run drizzle:generate

Run migrations:

npm run drizzle:migrate

----------------------------------------------------

Running the Application

Start Backend

cd backend

npm run start:dev

Backend runs on:

http://localhost:4000

Start Frontend

cd frontend

npm run dev

Frontend runs on:

http://localhost:3000

------------------------------------------

API Endpoints

Issues

GET /issues

GET /issues/:id

POST /issues

PATCH /issues/:id

DELETE /issues/:id

Discussions

GET /discussions/:issueId

POST /discussions

Analysis

POST /analysis/:issueId

--------------------------------------------

Deployment

Live Application

Frontend URL:

TO_BE_ADDED_AFTER_DEPLOYMENT

Backend URL:

TO_BE_ADDED_AFTER_DEPLOYMENT

Application URL:

TO_BE_ADDED_AFTER_DEPLOYMENT

--------------------------------------------



Author

Jithu Francis




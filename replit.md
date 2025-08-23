# Pi Tetris - AI-Driven Software Development Platform

## Overview

Pi Tetris is a comprehensive software development company specializing in AI-driven solutions. The platform serves as both a marketing website and content management system, showcasing services like AI/ML development, custom software development, mobile app development, and data engineering. The application features a public-facing website with service listings, case studies, team information, and client testimonials, along with an administrative interface for content management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing with separate public and admin sections
- **State Management**: TanStack Query (React Query) for server state management and caching
- **UI Framework**: Tailwind CSS with shadcn/ui component library using Radix UI primitives
- **Forms**: React Hook Form with Zod for validation and type safety
- **File Uploads**: Uppy integration for file management with Google Cloud Storage

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript throughout the entire stack
- **API Design**: RESTful API with organized route handlers
- **Authentication**: Replit OpenID Connect (OIDC) integration with Passport.js
- **Session Management**: Express sessions with PostgreSQL storage
- **Database ORM**: Drizzle ORM with type-safe schema definitions
- **File Storage**: Google Cloud Storage integration with custom ACL policies

### Data Storage
- **Primary Database**: PostgreSQL with Neon serverless connection
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Session Storage**: PostgreSQL table for user sessions
- **File Storage**: Google Cloud Storage for media assets and file uploads
- **Database Connection**: Connection pooling with Neon serverless WebSocket support

### Authentication & Authorization
- **Provider**: Replit OIDC for seamless integration within Replit environment
- **Session Strategy**: Server-side sessions with secure HTTP-only cookies
- **Admin Access**: Role-based access control with admin flag in user model
- **Security**: Session TTL management and secure cookie configuration

### Content Management
- **Models**: Comprehensive schema for services, case studies, team members, testimonials, clients, technologies, and categories
- **Rich Content**: Support for markdown content with rich text editing capabilities
- **Image Management**: Integrated file upload system with preview and management
- **Categorization**: Flexible category system for organizing different content types
- **Status Management**: Active/inactive toggles and featured content flags

## External Dependencies

### Cloud Services
- **Neon Database**: Serverless PostgreSQL hosting with WebSocket support
- **Google Cloud Storage**: Object storage for file uploads and media assets
- **Replit Infrastructure**: Authentication, deployment, and development environment

### Third-Party Libraries
- **UI Components**: Radix UI primitives for accessible component foundation
- **File Upload**: Uppy ecosystem for robust file handling and AWS S3 integration
- **Validation**: Zod for runtime type checking and schema validation
- **Styling**: Tailwind CSS with custom design system and CSS variables
- **Icons**: Lucide React for consistent iconography

### Development Tools
- **Build System**: Vite for fast development and optimized production builds
- **Type Safety**: TypeScript with strict configuration across client and server
- **Code Quality**: ESBuild for server bundling and optimization
- **Development**: Hot module replacement and development server integration
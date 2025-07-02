# Admin Panel Authentication System

## Overview
This admin panel uses a token-based authentication system with cookies for secure access control and Mantine notifications for better user experience.

## How it Works

### 1. Login Process
- Users access the admin panel through `/admin-login`
- Login form validates credentials with real-time validation
- Shows notifications for validation errors, login success, and failures
- Upon successful login, the admin token is stored in cookies as `admin_token`
- User is redirected to `/admin/dashboard` with success notification

### 2. Protected Routes
- All admin routes under `/admin/*` are protected by the `ProtectedRoute` component
- The component checks for the presence of `admin_token` in cookies
- If token exists: User can access the route
- If no token: User sees error notification and is redirected to `/admin-login`
- Catch-all route redirects any unmatched admin URLs to login

### 3. Logout Process
- Users can logout via the TopBar menu (user avatar dropdown)
- Shows confirmation notification before logout
- Logout removes the `admin_token` from cookies
- User is redirected to `/admin-login` after short delay

## Key Components

### ProtectedRoute Component
- Location: `src/AdminPanel/ProtectedRoute/ProtectedRoute.tsx`
- Checks for `admin_token` in cookies
- Shows loading state while checking authentication
- Displays error notification for unauthorized access
- Redirects to login if not authenticated

### Login Component
- Location: `src/AdminPanel/Login.tsx`
- Handles user login with email/password
- Real-time form validation with notifications
- Shows loading state during login process
- Stores token in cookies upon successful login
- Automatically redirects to dashboard if already logged in
- Shows notification when redirected from protected route

### TopBar Component
- Location: `src/AdminPanel/TopBar/TopBar.tsx`
- Contains logout functionality with confirmation
- Shows logout notification
- Removes token and redirects to login

## Notification System

### Types of Notifications:
1. **Success Notifications** (Green):
   - Login successful
   - Already logged in redirect

2. **Error Notifications** (Red):
   - Login failed
   - Validation errors (empty fields, invalid email)
   - Access denied for protected routes

3. **Warning Notifications** (Orange):
   - Login required when redirected from protected route

4. **Info Notifications** (Blue):
   - Logout confirmation
   - Already logged in status

### Notification Features:
- Auto-close after 2-4 seconds
- Clear titles and descriptive messages
- Color-coded for different types
- Non-intrusive design

## Security Features

1. **Token Storage**: Tokens are stored in cookies with 7-day expiration
2. **Route Protection**: All admin routes require authentication
3. **Automatic Redirects**: Users are redirected appropriately based on auth status
4. **Session Persistence**: Login state persists across browser sessions
5. **Catch-all Routes**: Unmatched admin routes redirect to login
6. **Form Validation**: Real-time validation prevents invalid submissions

## API Integration

The system expects the backend API to:
- Accept POST requests to `/admin-auth/login`
- Return a response with `{ token: "jwt_token_here" }`
- Validate the token on protected endpoints

## Usage

1. Navigate to `/admin-login`
2. Enter admin credentials (with real-time validation)
3. Upon successful login, you'll see a success notification and be redirected to dashboard
4. All admin routes will be accessible
5. Use the logout button in the top-right menu to sign out
6. Any direct access to admin routes without authentication will show error notification and redirect to login

## Environment Variables

Make sure to set the API base URL in your environment:
```
VITE_APP_API_BASE_URL=your_backend_api_url
```

## Error Handling

- **Network Errors**: Displayed as red notifications
- **Validation Errors**: Real-time feedback for form fields
- **Authentication Errors**: Clear messages for login failures
- **Access Denied**: Notifications when trying to access protected routes
- **Loading States**: Visual feedback during authentication checks and login process 
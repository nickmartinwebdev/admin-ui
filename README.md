# Admin UI

A React-based admin portal for testing user service functionality. Built with modern tools and best practices.

## 🚀 Tech Stack

- **React 18** with TypeScript (latest)
- **Mantine v7** for UI components
- **TanStack Router** for client-side routing
- **TanStack Query** for server state management
- **Zod v3** for schema validation
- **Storybook** for component development and testing
- **MSW (Mock Service Worker)** for API mocking
- **Vite** for build tooling
- **ESLint & Prettier** for code quality

## 📦 Features

- 🎨 Modern UI with Mantine components
- 🔄 Type-safe API calls with TanStack Query
- 📱 Responsive design with mobile support
- 🧪 Component testing with Storybook
- 🔧 Mock API with MSW for development
- 📝 Form validation with Zod schemas
- 🎯 TypeScript strict mode enabled
- 📊 User management interface
- ⚙️ Settings configuration panel

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ (recommended: use nvm)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nickmartinwebdev/admin-ui.git
   cd admin-ui
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run storybook` - Start Storybook
- `npm run build-storybook` - Build Storybook
- `npm run test` - Run tests
- `npm run coverage` - Generate test coverage

## 📁 Project Structure

```
src/
├── api/           # TanStack Query API functions
├── components/    # Reusable UI components
├── hooks/         # Custom React hooks
├── mocks/         # MSW mock handlers
├── pages/         # Page components
├── routes/        # TanStack Router route definitions
├── schemas/       # Zod validation schemas
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
└── main.tsx       # Application entry point
```

## 🧪 Development with Storybook

Storybook is configured with:
- Mantine theme integration
- MSW for API mocking
- Interactive controls
- Auto-generated documentation

Start Storybook:
```bash
npm run storybook
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=https://api.example.com
```

### API Integration

The application uses TanStack Query for API state management. Mock handlers are provided for development, but you can easily switch to real API endpoints by updating the `API_BASE` constant in `src/api/users.ts`.

### Theme Customization

Mantine theme can be customized in `src/main.tsx`. The application supports:
- Custom color schemes
- Responsive breakpoints
- Dark/light mode toggle
- Custom fonts and spacing

## 📋 User Management Features

- ✅ View user list with pagination
- ✅ Search and filter users
- ✅ User profile cards
- ✅ Role-based access indicators
- ✅ Status management (active/inactive/suspended)
- 🔄 CRUD operations (Create, Read, Update, Delete)
- 📊 User analytics dashboard

## 🎨 UI Components

Built with Mantine v7, featuring:
- Responsive navigation with AppShell
- Data tables with sorting and pagination
- Form components with validation
- Notification system
- Modal dialogs
- Loading states
- Error boundaries

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Deploy to Vercel

```bash
npm i -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
# Upload dist/ folder to Netlify
```

## 🧪 Testing Strategy

- **Unit Tests**: Vitest for component and utility testing
- **Integration Tests**: Testing Library for user interaction testing
- **Visual Tests**: Storybook for component visual testing
- **API Tests**: MSW for mocking API responses

## 📚 Learning Resources

- [Mantine Documentation](https://mantine.dev/)
- [TanStack Router](https://tanstack.com/router)
- [TanStack Query](https://tanstack.com/query)
- [Zod Documentation](https://zod.dev/)
- [Storybook Documentation](https://storybook.js.org/)
- [MSW Documentation](https://mswjs.io/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

If you have any questions or issues, please:
1. Check the existing issues
2. Create a new issue with detailed information
3. Join our community discussions

---

**Happy coding!** 🎉
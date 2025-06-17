# Homily.Build

> AI-powered homily creation platform for Catholic priests

[![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-green)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-blue)](https://tailwindcss.com/)

## 📖 About

Homily.Build is a comprehensive platform designed to help Catholic priests create meaningful, contextual homilies efficiently. The application integrates liturgical resources, AI-powered theme generation, and Catholic teaching materials to streamline the homily preparation process.

**📋 Full Project Documentation:** [Google Docs](https://docs.google.com/document/d/151xe6_dxZ1lHEBj-XKYCtUtzzmK9vIfWSyWGG5NNMVM/edit?tab=t.0)

## ✨ Features

- **Liturgical Integration** - Access readings and calendar with proper seasonal context
- **AI-Powered Themes** - Generate meaningful themes based on scripture
- **Multi-Context Support** - Create homilies for diverse audiences (parishes, students, events)
- **Faith Stories Database** - Curated stories from Butler's Lives of the Saints
- **Structured Workflow** - 6-step process from readings to final homily
- **Magisterium Resources** - Integrate Catechism and Church teaching

## 🛠️ Tech Stack

- **Framework:** Next.js 15.3.3 (App Router)
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Styling:** Tailwind CSS + shadcn/ui
- **Icons:** Lucide React
- **Language:** TypeScript/JavaScript

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Lolek-Productions/homily-build.git
   cd homily-build
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Contact fr.mccarty@gmail.com for database credentials and API keys.

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🏗️ Project Structure

```
homily-build/
├── app/                    # Next.js App Router pages
│   ├── (main)/            # Protected routes
│   │   ├── dashboard/     # User dashboard
│   │   ├── create/        # Homily creation workflow
│   │   └── calendar/      # Liturgical calendar
│   └── auth/              # Authentication pages
├── components/            # Reusable UI components
├── contexts/              # React Context providers
├── lib/                   # Utilities and configurations
│   ├── actions/           # Server actions
│   └── supabase/          # Database client setup
└── providers/             # App-level providers
```

## 🔧 External Services

- **[LitCal API](https://litcal.johnromanodorazio.com/api/dev/calendar)** - Liturgical calendar data
- **Supabase** - Database and authentication
- **OpenAI** - AI-powered content generation
- **Magisterium.com** - Catholic teaching resources

## 🤝 Contributing

We welcome contributions from the Catholic tech community!

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
   - Follow the coding standards in `PLANNING.md`
   - Keep files under 500 lines
   - Use TypeScript for new components
4. **Test your changes**
   ```bash
   npm run build
   npm run lint
   ```
5. **Commit your changes**
   ```bash
   git commit -m "feat: add your feature description"
   ```
6. **Open a pull request**

### Code Standards

- Use shadcn/ui components for UI elements
- Follow Next.js App Router conventions
- Implement proper error handling
- Document complex functions with JSDoc
- Use server actions for database operations

## 📧 Contact

For access credentials, technical support, or collaboration inquiries:

**Fr. Josh McCarty**  
📧 fr.mccarty@lolekproductions.org

## 📄 License

This project is developed for the Catholic Church community. Please contact the maintainers for licensing information.

---

*Built with ❤️ for the Catholic Church by Lolek Productions*

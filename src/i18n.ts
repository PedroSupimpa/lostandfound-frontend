import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          // Common
          "app.name": "Lost & Found",
          "app.description":
            "Connect with people who found your lost items or help others find their belongings.",

          // Header
          "header.search": "Search lost items...",
          "header.myPosts": "My Posts",
          "header.messages": "Messages",
          "header.newPost": "New Post",
          "header.profile": "Profile",
          "header.logout": "Logout",
          "header.login": "Login",
          "header.signup": "Sign Up",

          // Language
          "language.en": "English",
          "language.pt": "Portuguese",

          // CategoryFilterCard
          "filter.searchPlaceholder": "Search by title or description",
          "filter.category": "Category",
          "filter.allCategories": "All Categories",
          "filter.loadingCategories": "Loading categories...",
          "filter.location": "Location",
          "filter.selectLocation": "Select location",

          // ItemCard
          "itemCard.found": "Found",
          "itemCard.lost": "Lost",
          "itemCard.moreImages": "more",
          "itemCard.unknownLocation": "Unknown location",
          "itemCard.today": "Today",
          "itemCard.yesterday": "Yesterday",
          "itemCard.daysAgo": "days ago",
          "itemCard.contact": "Contact",
          "itemCard.details": "Details",

          // ItemsListContainer
          "itemsList.title": "Find Lost Items",
          "itemsList.noItemsFound": "No items found",
          "itemsList.adjustFilters": "Try adjusting your search filters",

          // LocationSearch
          "location.title": "Location selection",
          "location.description": "Select a location on the map",
          "location.searchPlaceholder": "Search for location",
          "location.selectRadius": "Select the radius",
          "location.select": "Select",
          "location.loading": "Loading...",

          // Login
          "login.welcomeBack": "Welcome Back",
          "login.enterCredentials":
            "Enter your credentials to access your account",
          "login.email": "Email",
          "login.emailPlaceholder": "youremail@example.com",
          "login.password": "Password",
          "login.passwordPlaceholder": "••••••••",
          "login.forgotPassword": "Forgot password?",
          "login.loggingIn": "Logging in...",
          "login.logIn": "Log in",
          "login.successful": "Login successful",
          "login.error": "An error occurred while logging in.",
          "login.invalidCredentials": "Invalid email or password.",

          // SignupForm
          "signup.createAccount": "Create your account",
          "signup.joinCommunity":
            "Join our community to find your lost items or help others",
          "signup.fullName": "Full Name",
          "signup.namePlaceholder": "John Doe",
          "signup.phone": "Phone (Optional)",
          "signup.phonePlaceholder": "(555) 123-4567",
          "signup.email": "Email",
          "signup.emailPlaceholder": "you@example.com",
          "signup.password": "Password",
          "signup.address": "Address (Optional)",
          "signup.streetAddress": "Street Address",
          "signup.number": "Number",
          "signup.zipCode": "Zip Code",
          "signup.creatingAccount": "Creating account...",
          "signup.createAccountButton": "Create Account",
          "signup.success": "Account created successfully! You can now log in.",
          "signup.error": "Error creating account",
          "signup.unexpectedError": "An unexpected error occurred",
        },
      },
      pt: {
        translation: {
          // Common
          "app.name": "Achados & Perdidos",
          "app.description":
            "Conecte-se com pessoas que encontraram seus itens perdidos ou ajude outros a encontrar seus pertences.",

          // Header
          "header.search": "Buscar itens perdidos...",
          "header.myPosts": "Meus Posts",
          "header.messages": "Mensagens",
          "header.newPost": "Novo Post",
          "header.profile": "Perfil",
          "header.logout": "Sair",
          "header.login": "Entrar",
          "header.signup": "Cadastrar",

          // Language
          "language.en": "Inglês",
          "language.pt": "Português",

          // CategoryFilterCard
          "filter.searchPlaceholder": "Buscar por título ou descrição",
          "filter.category": "Categoria",
          "filter.allCategories": "Todas as Categorias",
          "filter.loadingCategories": "Carregando categorias...",
          "filter.location": "Localização",
          "filter.selectLocation": "Selecionar localização",

          // ItemCard
          "itemCard.found": "Encontrado",
          "itemCard.lost": "Perdido",
          "itemCard.moreImages": "mais",
          "itemCard.unknownLocation": "Localização desconhecida",
          "itemCard.today": "Hoje",
          "itemCard.yesterday": "Ontem",
          "itemCard.daysAgo": "dias atrás",
          "itemCard.contact": "Contato",
          "itemCard.details": "Detalhes",

          // ItemsListContainer
          "itemsList.title": "Encontre Itens Perdidos",
          "itemsList.noItemsFound": "Nenhum item encontrado",
          "itemsList.adjustFilters": "Tente ajustar seus filtros de busca",

          // LocationSearch
          "location.title": "Seleção de localização",
          "location.description": "Selecione uma localização no mapa",
          "location.searchPlaceholder": "Buscar por localização",
          "location.selectRadius": "Selecione o raio",
          "location.select": "Selecionar",
          "location.loading": "Carregando...",

          // Login
          "login.welcomeBack": "Bem-vindo de Volta",
          "login.enterCredentials":
            "Digite suas credenciais para acessar sua conta",
          "login.email": "Email",
          "login.emailPlaceholder": "seuemail@exemplo.com",
          "login.password": "Senha",
          "login.passwordPlaceholder": "••••••••",
          "login.forgotPassword": "Esqueceu a senha?",
          "login.loggingIn": "Entrando...",
          "login.logIn": "Entrar",
          "login.successful": "Login realizado com sucesso",
          "login.error": "Ocorreu um erro ao fazer login.",
          "login.invalidCredentials": "Email ou senha inválidos.",

          // SignupForm
          "signup.createAccount": "Crie sua conta",
          "signup.joinCommunity":
            "Junte-se à nossa comunidade para encontrar seus itens perdidos ou ajudar outros",
          "signup.fullName": "Nome Completo",
          "signup.namePlaceholder": "João Silva",
          "signup.phone": "Telefone (Opcional)",
          "signup.phonePlaceholder": "(11) 98765-4321",
          "signup.email": "Email",
          "signup.emailPlaceholder": "voce@exemplo.com",
          "signup.password": "Senha",
          "signup.address": "Endereço (Opcional)",
          "signup.streetAddress": "Endereço",
          "signup.number": "Número",
          "signup.zipCode": "CEP",
          "signup.creatingAccount": "Criando conta...",
          "signup.createAccountButton": "Criar Conta",
          "signup.success":
            "Conta criada com sucesso! Você já pode fazer login.",
          "signup.error": "Erro ao criar conta",
          "signup.unexpectedError": "Ocorreu um erro inesperado",
        },
      },
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;

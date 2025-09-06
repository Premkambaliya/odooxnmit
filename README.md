# 🌱 EcoFinds - Sustainable Second-Hand Marketplace

![EcoFinds Logo](https://img.shields.io/badge/EcoFinds-Sustainable%20Marketplace-green?style=for-the-badge&logo=leaf)

## 🔗 Links

- 🚀 **Live Demo / Deploy Link**: [https://ecofinds-demo.vercel.app](https://ecofinds-demo.vercel.app)  
- 🎨 **Figma Design**: [View Figma Prototype]([https://www.figma.com/file/your-figma-link](https://www.figma.com/design/DTPG3EnZsGCmoRPZSl4mS2/Untitled?node-id=1-11&t=TQmVHOwQG2JtWvTN-1))

---

## 🌍 Project Vision

EcoFinds is a vibrant and trusted platform that revolutionizes the way people buy and sell pre-owned goods. Our mission is to foster a culture of sustainability by extending the lifecycle of products, reducing waste, and providing an accessible and convenient alternative to purchasing new items.

**Goal**: Become the go-to destination for a conscious community seeking unique finds and responsible consumption.

## 🎯 Mission Statement

Develop a user-friendly and engaging desktop and mobile application that serves as a central hub for buying and selling second-hand items. EcoFinds leverages intuitive design and essential features to connect buyers and sellers efficiently, promoting a circular economy and making sustainable choices easier for everyone.

## 🔧 Core Features

### 🔐 User Authentication & Profile
- **Secure Registration & Login**: Email and password authentication
- **Profile Creation**: Basic user profile with username
- **User Dashboard**: Complete profile management with editable fields

### 📦 Product Management
- **Product Listing Creation**: Create listings with title, description, category, price, and image
- **CRUD Operations**: View, edit, and delete personal product listings
- **Category Management**: Predefined categories for easy organization
- **Image Support**: Product image placeholders and upload functionality

### 🔍 Browse & Search
- **Product Feed**: Browse all available listings with basic information
- **Category Filtering**: Filter products by predefined categories
- **Keyword Search**: Search listings based on title keywords
- **Product Details**: Comprehensive product detail view

### 🛒 Shopping Experience
- **Shopping Cart**: Add and manage products in cart
- **Purchase History**: View previously purchased items
- **Secure Checkout**: Complete purchase workflow

## 🏗️ System Architecture

### Frontend
- **Framework**: React.js with modern hooks
- **Styling**: Tailwind CSS for responsive design
- **Icons**: Lucide React for consistent iconography
- **State Management**: React Context API / useState hooks

### Data Management
- **User Data**: Efficient user authentication and profile management
- **Product Data**: Optimized data structures for listings and categories
- **Search & Filter**: Fast search and filtering algorithms

## 📱 User Interface Screens

### 1. Authentication
- **Login/Sign Up Screen**
  - App logo and branding
  - Email and password inputs
  - Login button and sign-up link

### 2. Product Discovery
- **Product Listing Feed**
  - Header with logo and search bar
  - Category filter options
  - Product cards with image, title, and price
  - "+" button for new listings

### 3. Product Management
- **Add New Product Screen**
  - Form fields for product details
  - Category dropdown selection
  - Image upload placeholder
  - Submit listing button

- **My Listings Screen**
  - User's product listings
  - Edit and delete functionality
  - Add new product button

### 4. Product Details
- **Product Detail Screen**
  - Large product image
  - Complete product information
  - Price and category display
  - Purchase/cart actions

### 5. User Management
- **User Dashboard**
  - User profile information
  - Editable user fields
  - Account management options

### 6. Shopping
- **Shopping Cart**
  - Added products display
  - Product cards with basic info
  - Quantity management
  - Checkout functionality

- **Purchase History**
  - List of previously purchased items
  - Order details and status
  - Reorder functionality

## 🚀 Getting Started

### Prerequisites
- Node.js (v14.0.0 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ecofinds.git
   cd ecofinds
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production
```bash
npm run build
# or
yarn build
```

## 📱 Responsive Design

EcoFinds is built with mobile-first approach:
- **Mobile**: Optimized for smartphones and tablets
- **Desktop**: Full-featured desktop experience
- **Cross-platform**: Consistent experience across devices

## 🔒 Security Features

- Secure user authentication
- Data validation and sanitization
- Protected routes for user-specific content
- Secure image upload handling

## 🌿 Sustainability Focus

### Environmental Impact
- **Circular Economy**: Promote reuse and reduce waste
- **Carbon Footprint**: Reduce manufacturing demand
- **Community Building**: Foster sustainable consumption habits

### Features Supporting Sustainability
- **Product Lifecycle Extension**: Give items a second life
- **Local Trading**: Reduce shipping distances
- **Sustainability Metrics**: Track environmental impact

## 📊 Project Structure

```
ecofinds/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   ├── Products/
│   │   ├── Cart/
│   │   ├── Dashboard/
│   │   └── Common/
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Login.js
│   │   ├── ProductFeed.js
│   │   └── Dashboard.js
│   ├── hooks/
│   ├── utils/
│   ├── styles/
│   └── App.js
├── package.json
└── README.md
```

## 🛠️ Tech Stack

- **Frontend Framework**: React.js
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Create React App
- **Version Control**: Git
- **Package Manager**: npm/yarn

## 📋 Development Roadmap

### Phase 1: Core Features ✅
- [x] User authentication
- [x] Product listing creation
- [x] Basic browsing and search
- [x] User dashboard

### Phase 2: Enhanced Features 🚧
- [ ] Advanced search filters
- [ ] User ratings and reviews
- [ ] Real-time messaging between users
- [ ] Payment integration

### Phase 3: Advanced Features 🔮
- [ ] Mobile app development
- [ ] AI-powered recommendations
- [ ] Sustainability metrics
- [ ] Community features

## 🤝 Contributing

We welcome contributions to EcoFinds! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit your changes**
   ```bash
   git commit -m "Add your feature"
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open a Pull Request**

### Contribution Guidelines
- Follow existing code style and conventions
- Write clear commit messages
- Add tests for new features
- Update documentation as needed

## 🧪 Testing

Run the test suite:
```bash
npm test
# or
yarn test
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support & Contact

- **Email**: support@ecofinds.com
- **Issues**: [GitHub Issues](https://github.com/yourusername/ecofinds/issues)
- **Documentation**: [Wiki](https://github.com/yourusername/ecofinds/wiki)

## 🙏 Acknowledgments

- Thanks to all contributors who made this project possible
- Inspired by the global sustainability movement
- Built for hackathon participants and the open-source community



**Made with 💚 for a sustainable future**

*EcoFinds - Where sustainability meets convenience*

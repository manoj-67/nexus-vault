# Digital Locker Frontend Setup

## 🎨 Design Features Added

### Modern UI Components
- **Gradient Background**: Beautiful purple gradient background
- **Glass Morphism**: Semi-transparent cards with backdrop blur
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Smooth Animations**: Fade-in, slide-in, and hover effects

### Styled Components
1. **Navbar**: Modern navigation with hover effects
2. **Home Page**: Hero section with animated title and action buttons
3. **Upload Page**: Drag-and-drop file upload with progress indicator
4. **Document List**: Card-based layout with download/delete actions
5. **Footer**: Clean footer with branding

### Interactive Features
- **File Upload**: Full file upload functionality with validation
- **Document Management**: View, download, and delete documents
- **Loading States**: Spinners and loading indicators
- **Error Handling**: User-friendly error messages
- **Success Feedback**: Confirmation messages

## 🚀 How to Run

### 1. Start Backend (Spring Boot)
```bash
cd springapp
mvn clean package -DskipTests
java -Xmx256m -jar target/SpringBootEmp-0.0.1-SNAPSHOT.jar
```

### 2. Start Frontend (React)
```bash
cd reactapp
npm install
npm start
```

### 3. Access Application
- Frontend: http://localhost:8081
- Backend API: http://localhost:8080
- Swagger UI: http://localhost:8080/swagger-ui.html

## 📱 Features

### Upload Documents
- Drag and drop file upload
- Email validation
- File type restrictions (.pdf, .doc, .docx, .txt, .jpg, .png)
- File size limit (10MB)
- Progress indicators

### View Documents
- Grid layout of uploaded documents
- Document metadata display
- Download functionality
- Delete with confirmation

### Responsive Design
- Mobile-friendly navigation
- Adaptive layouts
- Touch-friendly buttons
- Optimized for all screen sizes

## 🎨 CSS Architecture

### Main Styles (`App.css`)
- Global styles and variables
- Component-specific styles
- Responsive breakpoints
- Color scheme and typography

### Animations (`animations.css`)
- Smooth transitions
- Hover effects
- Loading animations
- Interactive feedback

## 🔧 Customization

### Colors
Update the CSS variables in `App.css`:
```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --success-color: #28a745;
  --error-color: #dc3545;
}
```

### Animations
Modify animation timing in `animations.css`:
```css
.fade-in {
  animation: fadeIn 0.6s ease-out;
}
```

## 📦 Dependencies Used
- React Router DOM (navigation)
- Axios (HTTP requests)
- CSS3 (styling and animations)
- HTML5 (file upload)

## 🌟 Design Highlights
- **Modern Gradient UI**: Purple to blue gradient theme
- **Glass Morphism**: Translucent elements with blur effects
- **Micro-interactions**: Hover states and button animations
- **Accessibility**: Focus states and keyboard navigation
- **Performance**: Optimized CSS and minimal dependencies
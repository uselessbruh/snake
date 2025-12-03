# 🐍 Snake Game

A modern, responsive implementation of the classic Snake game built with vanilla JavaScript, HTML5 Canvas, and CSS3. Features smooth animations, multiple input methods, and a beautiful retro-modern design.

![Snake Game](https://img.shields.io/badge/Game-Snake-4CAF50?style=for-the-badge&logo=game&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## ✨ Features

- 🎮 **Multiple Control Options**
  - Keyboard controls (Arrow keys or WASD)
  - On-screen D-pad buttons (mobile-friendly)
  - Touch swipe gestures (mobile)
  
- 📱 **Fully Responsive**
  - Adapts to any screen size
  - Mobile-optimized controls and layout
  - Touch-friendly interface

- 🎨 **Modern Design**
  - Smooth animations and transitions
  - Checkerboard grid background
  - Detailed snake head with eyes
  - Apple-shaped food with shadow effects
  - Gradient buttons and overlays

- 🏆 **Game Features**
  - Score tracking with local storage
  - High score persistence
  - Progressive difficulty (speed increases with score)
  - Game over and restart functionality
  - Start screen with instructions

## 🎯 How to Play

1. **Start the Game**: Click/tap the "Play" button on the start screen
2. **Control the Snake**:
   - **Desktop**: Use Arrow keys or WASD keys
   - **Mobile**: Use the on-screen D-pad buttons or swipe gestures
3. **Objective**: Eat the red apples to grow longer and increase your score
4. **Avoid**:
   - Running into walls
   - Running into yourself
5. **Score**: Each apple is worth 10 points. The game speeds up as you score more!

## 🚀 Getting Started

### Prerequisites

No dependencies or build tools required! Just a modern web browser.

### Installation

1. **Clone or Download** the repository:
   ```bash
   git clone <repository-url>
   cd snake
   ```

2. **Open the game**:
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     # Python 3
     python -m http.server 8000
     
     # Python 2
     python -m SimpleHTTPServer 8000
     
     # Node.js (with http-server)
     npx http-server
     ```

3. **Play!** Navigate to `http://localhost:8000` (if using a server) or just double-click `index.html`

## 📁 Project Structure

```
snake/
│
├── index.html      # Main HTML structure
├── style.css       # Styling and responsive design
├── script.js       # Game logic and controls
└── README.md       # This file
```

## 🎮 Controls Reference

| Input Method | Controls |
|-------------|----------|
| **Keyboard** | Arrow Keys or WASD |
| **Mobile D-Pad** | On-screen buttons (↑ ↓ ← →) |
| **Touch Gestures** | Swipe in any direction on the canvas |

## 🔧 Configuration

You can customize the game by modifying these constants in `script.js`:

```javascript
const INTERNAL_SIZE = 600;      // Canvas size (600x600 pixels)
const TILE_SIZE = 25;           // Size of each grid tile
const TILE_COUNT = 24;          // Number of tiles (24x24 grid)
const INITIAL_SPEED = 180;      // Starting speed in milliseconds
```

### Difficulty Settings

- Initial game speed: `180ms` per move
- Minimum speed: `80ms` per move
- Speed increase: `2ms` faster per apple eaten

## 🎨 Design Highlights

- **Snake Head**: Features animated eyes that follow the direction of movement
- **Food Design**: Apple with realistic shading, highlights, and stem
- **Color Scheme**: Dark theme with green accents (#4CAF50)
- **Font**: Fredoka One (Google Fonts) for a playful, retro feel
- **Responsive Layout**: Automatically adjusts controls for screens under 800px width

## 💾 Data Persistence

The game uses **localStorage** to save your high score across sessions. Your best score will be remembered even after closing the browser!

## 🌐 Browser Compatibility

Tested and working on:
- ✅ Chrome/Edge (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🛠️ Technologies Used

- **HTML5 Canvas** - For rendering the game graphics
- **Vanilla JavaScript** - Game logic and event handling
- **CSS3** - Styling, animations, and responsive design
- **LocalStorage API** - High score persistence
- **Google Fonts** - Fredoka One typography

## 📈 Future Enhancements

Potential features for future versions:
- [ ] Sound effects and background music
- [ ] Multiple difficulty levels
- [ ] Power-ups (speed boost, invincibility, etc.)
- [ ] Obstacles and maze modes
- [ ] Leaderboard system
- [ ] Different snake skins/themes
- [ ] Pause functionality

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the project
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Created with ❤️ by a passionate developer

---

**Enjoy the game! 🐍🎮**

*Pro tip: Try to create patterns and plan your path ahead to achieve higher scores!*

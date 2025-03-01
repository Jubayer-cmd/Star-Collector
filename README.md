# Star-Collector Game

A web-based game built with Phaser.js, React, and TypeScript where players collect stars while avoiding bombs to achieve the highest score possible.

## Features

-   Engaging gameplay mechanics with star collection and bomb avoidance
-   Score tracking system with local storage for best scores
-   Responsive design that works across different screen sizes
-   Sound effects for enhanced gaming experience

## Technologies Used

-   React
-   TypeScript
-   Phaser.js (Game Engine)
-   Vite (Build Tool)

## Prerequisites

Before you begin, ensure you have the following installed:

-   Node.js (Latest LTS version)
-   npm or Bun package manager

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Jubayer-cmd/Star-Collector
cd Star-Collector
```

2. Install dependencies:

```bash
npm install
# or if using Bun
bun install
```

3. Start the development server:

```bash
npm run dev
# or
bun dev
```

4. Open your browser and navigate to `http://localhost:5173`

## How to Play

-   Use the arrow keys to move the player left and right
-   Press the up arrow key to jump
-   Collect stars to increase your score
-   Avoid bombs that appear after collecting all stars
-   Try to beat your best score!

## Game Controls

-   ← Left Arrow: Move Left
-   → Right Arrow: Move Right
-   ↑ Up Arrow: Jump

## Project Structure

```
src/
├── components/     # React components
├── config/         # Game configuration
├── constants/      # Game constants
├── game/           # Phaser game scenes
├── state/          # Game state management
└── main.tsx        # Application entry point
```

## Building for Production

To create a production build:

```bash
npm run build
# or
bun run build
```

The built files will be in the `dist` directory.

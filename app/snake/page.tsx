'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

type Position = { x: number; y: number };
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export default function SnakeGame() {
  const GRID_SIZE = 20;
  const CELL_SIZE = 20;
  const INITIAL_SNAKE: Position[] = [{ x: 10, y: 10 }];
  const INITIAL_DIRECTION: Direction = 'RIGHT';

  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    setFood(newFood);
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setGameOver(false);
    setScore(0);
    setIsPaused(false);
    generateFood();
  };

  const checkCollision = (head: Position, snakeBody: Position[]) => {
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      return true;
    }
    for (let segment of snakeBody) {
      if (head.x === segment.x && head.y === segment.y) {
        return true;
      }
    }
    return false;
  };

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused) return;

    setSnake((prevSnake) => {
      const head = { ...prevSnake[0] };

      switch (direction) {
        case 'UP':
          head.y -= 1;
          break;
        case 'DOWN':
          head.y += 1;
          break;
        case 'LEFT':
          head.x -= 1;
          break;
        case 'RIGHT':
          head.x += 1;
          break;
      }

      if (checkCollision(head, prevSnake)) {
        setGameOver(true);
        return prevSnake;
      }

      const newSnake = [head, ...prevSnake];

      if (head.x === food.x && head.y === food.y) {
        setScore((s) => s + 10);
        generateFood();
        return newSnake;
      }

      newSnake.pop();
      return newSnake;
    });
  }, [direction, food, gameOver, isPaused, generateFood]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        e.preventDefault();
        setIsPaused((p) => !p);
        return;
      }

       if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        e.preventDefault();
        setDirection((d) => (d !== 'DOWN' ? 'UP' : d));
      }
      
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        e.preventDefault();
        setDirection((d) => (d !== 'UP' ? 'DOWN' : d));
      }
      
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        setDirection((d) => (d !== 'RIGHT' ? 'LEFT' : d));
      }
      
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        setDirection((d) => (d !== 'LEFT' ? 'RIGHT' : d));
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  useEffect(() => {
    const interval = setInterval(moveSnake, 150);
    return () => clearInterval(interval);
  }, [moveSnake]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-4">
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-bold text-green-400 mb-2">🐍 Snake Game</h1>
        <p className="text-xl text-white">Score: {score}</p>
        <p className="text-sm text-gray-400 mt-2">
          Use arrow keys to move • Space to pause
        </p>
      </div>

      <div
        className="relative bg-black border-4 border-green-500 shadow-2xl"
        style={{
          width: GRID_SIZE * CELL_SIZE,
          height: GRID_SIZE * CELL_SIZE,
        }}
      >
        {snake.map((segment, i) => (
          <div
            key={i}
            className={`absolute ${i === 0 ? 'bg-green-400' : 'bg-green-500'}`}
            style={{
              width: CELL_SIZE - 2,
              height: CELL_SIZE - 2,
              left: segment.x * CELL_SIZE,
              top: segment.y * CELL_SIZE,
              borderRadius: i === 0 ? '4px' : '2px',
            }}
          />
        ))}

        <div
          className="absolute bg-red-500 rounded-full"
          style={{
            width: CELL_SIZE - 4,
            height: CELL_SIZE - 4,
            left: food.x * CELL_SIZE + 2,
            top: food.y * CELL_SIZE + 2,
          }}
        />

        {gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-red-500 mb-4">Game Over!</h2>
              <p className="text-xl text-white mb-6">Final Score: {score}</p>
              <button
                onClick={resetGame}
                className="px-6 py-3 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 transition"
              >
                Play Again
              </button>
            </div>
          </div>
        )}

        {isPaused && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60">
            <p className="text-3xl font-bold text-yellow-400">PAUSED</p>
          </div>
        )}
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={resetGame}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Restart
        </button>
        <Link
          href="/"
          className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
@echo off
title SafeRoute AI - React Vite Client (Port 5173)
echo ===================================================
echo   Starting SafeRoute React Client (Vite)
echo ===================================================
echo Web App URL: http://localhost:5173
echo.
cd /d "%~dp0client"
npm run dev
pause

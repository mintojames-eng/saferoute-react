@echo off
title SafeRoute Runner
echo ===================================================
echo           Starting SafeRoute Application           
echo ===================================================
echo.

echo [1/2] Starting Mock Database Server (port 3001)...
start "SafeRoute - Database (Port 3001)" cmd /k "npm.cmd run server"

timeout /t 2 /nobreak >nul

echo [2/2] Starting React Frontend (Vite)...
start "SafeRoute - Frontend (Port 5173)" cmd /k "npm.cmd run dev"

timeout /t 3 /nobreak >nul

echo Opening browser at http://localhost:5173...
start http://localhost:5173

echo.
echo ===================================================
echo SafeRoute is now running!
echo - Frontend:  http://localhost:5173
echo - Database:  http://localhost:3001/incidents
echo.
echo To stop the servers, close the opened command windows.
echo ===================================================
pause


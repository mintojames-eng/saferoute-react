@echo off
title SafeRoute MongoDB & React Runner
echo ===================================================
echo     Starting SafeRoute with MongoDB Storage        
echo ===================================================
echo.

echo [1/2] Starting SafeRoute MongoDB Backend API (Port 5000)...
start "SafeRoute - MongoDB Backend (Port 5000)" cmd /k "cd .. && python app.py"

timeout /t 3 /nobreak >nul

echo [2/2] Starting SafeRoute React Frontend (Port 5173)...
start "SafeRoute - Frontend (Port 5173)" cmd /k "npm.cmd run dev"

timeout /t 3 /nobreak >nul

echo Opening browser at http://localhost:5173...
start http://localhost:5173

echo.
echo ===================================================
echo SafeRoute is now running with MongoDB!
echo - Frontend UI:        http://localhost:5173
echo - MongoDB API Server: http://127.0.0.1:5000/status
echo - MongoDB Database:   mongodb://localhost:27017/saferoute
echo.
echo Open MongoDB Compass to inspect your live database!
echo To stop servers, close the opened command windows.
echo ===================================================
pause

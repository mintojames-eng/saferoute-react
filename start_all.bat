@echo off
title SafeRoute AI - 1-Click Full-Stack Launcher
echo ===================================================
echo   Launching SafeRoute AI Complete Full-Stack App
echo ===================================================
echo 1. Checking MongoDB...
netstat -ano | findstr :27017 >nul
if %ERRORLEVEL% NEQ 0 (
    echo Starting MongoDB on port 27017...
    start "MongoDB 8.3" /b "C:\Program Files\MongoDB\Server\8.3\bin\mongod.exe" --dbpath "C:\Users\minto\mongodb_data" --bind_ip 127.0.0.1 --port 27017
    timeout /t 2 /nobreak >nul
)

echo 2. Launching Express Server (Port 5000)...
start "SafeRoute Express Server (Port 5000)" cmd /k "cd /d %~dp0server && npm run dev"

echo 3. Launching React Client (Port 5173)...
start "SafeRoute React Client (Port 5173)" cmd /k "cd /d %~dp0client && npm run dev"

timeout /t 3 /nobreak >nul
echo 4. Opening browser at http://localhost:5173 ...
start http://localhost:5173
echo.
echo ===================================================
echo   SafeRoute Full-Stack is Running!
echo ===================================================

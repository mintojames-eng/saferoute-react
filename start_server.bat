@echo off
title SafeRoute AI - Express & Mongoose Server (Port 5000)
echo ===================================================
echo   Starting SafeRoute Node.js & Express REST Server
echo ===================================================
echo Server URL: http://127.0.0.1:5000
echo API Items:  http://127.0.0.1:5000/api/items
echo Database:   mongodb://127.0.0.1:27017/saferoute
echo.

REM Check if MongoDB is listening on 27017
netstat -ano | findstr :27017 >nul
if %ERRORLEVEL% NEQ 0 (
    echo [Notice] MongoDB is not running. Starting MongoDB background service...
    start /b "" "C:\Program Files\MongoDB\Server\8.3\bin\mongod.exe" --dbpath "C:\Users\minto\mongodb_data" --bind_ip 127.0.0.1 --port 27017
    timeout /t 2 /nobreak >nul
)

cd /d "%~dp0server"
npm run dev
pause

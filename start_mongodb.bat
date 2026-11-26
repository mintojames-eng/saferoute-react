@echo off
title MongoDB Server 8.3 (Port 27017)
echo ===================================================
echo   Starting SafeRoute Local MongoDB Server (27017)
echo ===================================================
echo Database Path: C:\Users\minto\mongodb_data
echo Port: 27017
echo.
"C:\Program Files\MongoDB\Server\8.3\bin\mongod.exe" --dbpath "C:\Users\minto\mongodb_data" --bind_ip 127.0.0.1 --port 27017
pause

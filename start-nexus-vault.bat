@echo off
echo ========================================
echo    NEXUS VAULT - ELITE DIGITAL FORTRESS
echo ========================================
echo.

echo [1/3] Starting Backend Server...
cd springapp
start "NEXUS-BACKEND" java -Xmx512m -jar target/SpringBootEmp-0.0.1-SNAPSHOT.jar

echo [2/3] Waiting for backend to initialize...
timeout /t 10 /nobreak > nul

echo [3/3] Starting Frontend Application...
cd ..\reactapp
start "NEXUS-FRONTEND" npm start

echo.
echo ========================================
echo    NEXUS VAULT DEPLOYMENT COMPLETE
echo ========================================
echo.
echo Backend:  http://localhost:8080
echo Frontend: http://localhost:3000
echo Swagger:  http://localhost:8080/swagger-ui.html
echo.
echo Press any key to exit...
pause > nul
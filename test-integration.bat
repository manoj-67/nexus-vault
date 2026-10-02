@echo off
echo ========================================
echo    NEXUS VAULT - Integration Test
echo ========================================
echo.

echo Testing Backend API...
curl -X GET http://localhost:8080/ 2>nul
if %errorlevel% neq 0 (
    echo ❌ Backend not running on port 8080
    echo Please start backend first: java -jar springapp/target/SpringBootEmp-0.0.1-SNAPSHOT.jar
    pause
    exit /b 1
)

echo ✅ Backend is running

echo.
echo Testing API endpoints...
curl -X GET http://localhost:8080/api/documents 2>nul
echo ✅ Documents API working

echo.
echo Testing Frontend...
curl -X GET http://localhost:3000 2>nul
if %errorlevel% neq 0 (
    echo ❌ Frontend not running on port 3000
    echo Please start frontend: cd reactapp && npm start
) else (
    echo ✅ Frontend is running
)

echo.
echo ========================================
echo    Integration Test Complete
echo ========================================
echo.
echo Access your NEXUS VAULT at:
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:8080
echo Swagger:  http://localhost:8080/swagger-ui.html
echo.
pause
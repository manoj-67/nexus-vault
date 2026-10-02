@echo off
echo Testing Document Management API
echo ================================

echo.
echo 1. Starting the application...
start /b java -Xmx256m -jar springapp\target\SpringBootEmp-0.0.1-SNAPSHOT.jar

echo Waiting for application to start...
timeout /t 15 /nobreak > nul

echo.
echo 2. Testing health endpoint...
curl -X GET http://localhost:8083/ 2>nul
echo.

echo.
echo 3. Testing status endpoint...
curl -X GET http://localhost:8083/status 2>nul
echo.

echo.
echo 4. Testing get all documents (should be empty initially)...
curl -X GET http://localhost:8083/api/documents 2>nul
echo.

echo.
echo 5. Testing file upload...
curl -X POST -F "file=@test-document.txt" -F "email=test@example.com" http://localhost:8083/api/upload 2>nul
echo.

echo.
echo 6. Testing get all documents again (should show uploaded document)...
curl -X GET http://localhost:8083/api/documents 2>nul
echo.

echo.
echo API testing completed!
echo Check Swagger UI at: http://localhost:8083/swagger-ui.html
pause
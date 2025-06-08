@REM powershell -Command cat dump_DTB.sql | docker exec -i projet-docker-kubernetes-db-1 psql -U postgres -d postgres
@REM exit

@echo off
setlocal

for /f "tokens=1" %%i in ('kubectl get pods --no-headers ^| findstr "db-"') do (
    set POD_NAME=%%i
)
echo Pod détecté : %POD_NAME%

:: Exécute la restauration depuis le fichier SQL
kubectl exec -i %POD_NAME% -- psql -U postgres -d postgres < dump_DTB.sql

echo ✅ Restauration terminée
pause

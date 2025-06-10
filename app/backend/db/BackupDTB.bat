@echo off
setlocal

for /f "tokens=1" %%i in ('kubectl get pods --no-headers ^| findstr "db-"') do (
    set POD_NAME=%%i
)
echo Pod détecté : %POD_NAME%

:: Effectue un dump de toutes les bases PostgreSQL et sauvegarde dans dump_DTB.sql
kubectl exec -i %POD_NAME% -- pg_dumpall -c -U postgres > dump_DTB.sql

echo ✅ Sauvegarde terminée : dump_DTB.sql
pause
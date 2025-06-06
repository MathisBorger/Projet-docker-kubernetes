powershell -Command docker compose -f DTBcompose.yaml up -d
TIMEOUT /T 45
powershell -Command cat dump_DTB.sql | docker exec -i projet-docker-kubernetes-db-1 psql -U postgres
exit
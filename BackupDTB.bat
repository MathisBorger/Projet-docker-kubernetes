powershell -Command docker exec -t projet-docker-kubernetes-db-1 pg_dumpall -c -U postgres > dump_DTB.sql
exit
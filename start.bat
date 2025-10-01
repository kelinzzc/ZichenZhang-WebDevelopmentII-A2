@echo off
echo 启动慈善活动平台...

echo 启动API服务器...
start cmd /k "cd api && npm run dev"

timeout /t 5

echo 启动客户端服务器...
start cmd /k "cd client && npm run dev"

echo 系统启动完成！
echo API服务器: http://localhost:3000
echo 客户端: http://localhost:3001
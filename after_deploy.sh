REPOSITORY=/home/ubuntu/st_backend
cd $REPOSITORY

npm install
pm2 start npm -- start
npm run typeorm migration:run -- -d ./dist/src/loaders/mysql.js
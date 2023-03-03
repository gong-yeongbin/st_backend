REPOSITORY=/home/ubuntu/st_backend
cd $REPOSITORY

npm install puppeteer --unsafe-perm
npm run typeorm migration:run -- -d ./dist/loaders/mysql.js
pm2 start npm -- start
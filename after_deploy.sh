REPOSITORY=/home/ubuntu/st_backend
cd $REPOSITORY

npm run build
npm install
pm2 start npm -- start
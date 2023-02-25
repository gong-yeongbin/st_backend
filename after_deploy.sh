REPOSITORY=/home/ubuntu/st_backend
cd $REPOSITORY

sudo npm run build
sudo npm install
pm2 start npm -- start
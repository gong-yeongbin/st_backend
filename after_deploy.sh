REPOSITORY=/home/ubuntu/stork-analysis
cd $REPOSITORY

npm run build
npm install
pm2 start npm -- start
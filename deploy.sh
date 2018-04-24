cd /var/www/node/zhoushan-bus-routes \
; git add -A \
; git commit -m "update user data" \
; git fetch \
; git pull \
; cd client/mobile_broswer \
; yarn \
&& yarn build \
&& cd ../.. \
&& cd server \
&& yarn \
&& pm2 restart src/app.js \
&& cd ..  \
; exit 0
cd /www/node/zhoushan-bus-routes \
; git add -A \
; git commit -m "update user data" \
; git fetch \
; git pull \
&& cd server_v2 \
&& yarn \
&& pm2 restart src/app.js \
&& cd ..  \
; exit 0
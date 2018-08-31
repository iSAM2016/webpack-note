#!/usr/bin/expect
#~/uat_static/wb/static/www
#spawn cp -ri ./static/* ./dist/static/
#echo 'Aftwebtb169'
#rsync -avzP  ./dist/  web@server01.bj.lejent.cc:/home/work/crm_static/
spawn rsync -avzP ./appActive/ work@inner57.bj.lejent.cc:~/uat_static/wb/static/www/appActive/
#rsync -avzP  ./dist/  web@server02.bj.lejent.cc::crm
expect "work@inner57.bj.lejent.cc's password:"
send "yh3yxHz\r"
interact






# address: ' web@inner57::wb_test',
# password: 'Aftwebtb169'

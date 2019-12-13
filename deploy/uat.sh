#!/usr/bin/expect
#~/uat_static/wb/static/www
#spawn cp -ri ./static/* ./dist/static/
#echo 'Aftwebtb169'
#rsync -avzP  ./dist/  web@server01.bj.XXX.cc:/home/work/crm_static/
spawn rsync -avzP ./appActive/ work@inner57.bj.XXX.cc:~/uat_static/wb/static/www/appActive/
#rsync -avzP  ./dist/  web@server02.bj.XXX.cc::crm
expect "work@inner57.bj.XXX.cc's password:"
send "yh3yxHz\r"
interact






# address: ' web@inner57::wb_test',
# password: 'Aftwebtb169'

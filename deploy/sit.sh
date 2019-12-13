#!/usr/bin/expect
spawn rsync -avzP ./appActive/ XXX@dev01.bj.XXX.cc:/data/static/wb/appActive/
#spawn rsync -avzP ./responsive XXX@dev229.bj.XXX.cc:/data/static/wb/

expect "XXX@dev01.bj.XXX.cc's password:"
#expect "XXX@dev229.bj.XXX.cc's password:"
send "XXX1801\r"
interact

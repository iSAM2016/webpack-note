#!/usr/bin/expect
spawn rsync -avzP ./appActive/ suhailong@dev01.bj.lejent.cc:/data/static/wb/appActive/
#spawn rsync -avzP ./responsive lizhuofeng@dev229.bj.lejent.cc:/data/static/wb/

expect "suhailong@dev01.bj.lejent.cc's password:"
#expect "lizhuofeng@dev229.bj.lejent.cc's password:"
send "afanti1801\r"
interact

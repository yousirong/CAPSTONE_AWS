clear
ll
sudo apt-get update
sudo apt-get upgrade
clear
sudo apt-get install nginx
clear
sudo service nginx status
clear
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | bash
출처: https://4eda.tistory.com/entry/Ubuntu-20041-LTS에서-nvm-nodejs-npm-설치와-제거하기 [Yo모조모]
clear
nvm list
ls -la
vi .bashrc 
source ~/.bashrc 
nvm list
nvm install --lts
node -v
npm install -g pm2
npm install -g npm@8.6.0
clear
sudo apt list --installed | grep mysql-server
sudo apt-get list --installed | grep mysql-server
sudo apt update
sudo apt install wget -y
wget https://dev.mysql.com/get/mysql-apt-config_0.8.12-1_all.deb
ls
sudo dpkg -i mysql-apt-config_0.8.12-1_all.deb
clear
sudo dpkg -i mysql-apt-config_0.8.12-1_all.deb
rm -rf mysql-apt-config_0.8.12-1_all.deb 
ll
clea
clear
ls -al
wget https://dev.mysql.com/get/mysql-apt-config_0.8.12-1_all.deb
sudo dpkg -i mysql-apt-config_0.8.12-1_all.deb
rm -rf mysql-apt-config_0.8.12-1_all.deb 
clear
ll
wget https://dev.mysql.com/get/mysql-apt-config_0.8.12-1_all.deb
sudo dpkg -i mysql-apt-config_0.8.12-1_all.deb
sudo apt-get update
sudo apt install -f mysql-client=5.7* mysql-community-server=5.7* mysql-server=5.7*
sudo apt-get remove --purge mysql*
sudo apt-get autoremove
sudo apt-get autoclean
sudo apt-get remove --purge mysql*
rm -rf mysql-apt-config_0.8.12-1_all.deb 
sudo apt-get remove --purge mysql*
sudo apt-get autoremove
sudo apt-get autoclean
sudo apt-cache search mysql-server
sudo apt-get install mysql-server-5.7
clear
wget https://dev.mysql.com/get/mysql-apt-config_0.8.12-1_all.deb
sudo dpkg -i mysql-apt-config_0.8.12-1_all.deb
sudo apt-get update
sudo apt-cache policy mysql-server

sudo apt-cache policy mysql-server
sudo apt update
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 467B942D3A79BD29
sudo apt update
sudo apt-cache policy mysql-server
sudo apt install -f mysql-client=5.7* mysql-community-server=5.7* mysql-server=5.7*
clear
sudo mysql_secure_installation
mysql -u root -p
clear
vi /etc/mysql/mysql.conf.d/mysqld.cnf 
sudo vi /etc/mysql/mysql.conf.d/mysqld.cnf
clear
sudo /etc/init.d/mysql restart

mysql -u root -p
clear
sudo vi /etc/mysql/mysql.conf.d/mysqld.cnf 
sudo service mysql restart
sudo service mysql status
clear
sudo vi /etc/mysql/mysql.conf.d/mysqld.cnf
sudo service mysql restart
sudo service mysql status
sudo vi /etc/mysql/mysql.conf.d/mysqld.cnf
sudo service mysql restart
clear
sudo apt update
python3 --version
pip3
sudo apt install python3-pip
clear
pip3
clear
python3 --version
clear
exit
clear
cd server/
ls
cd hufs/
ls
pwd
exit
cd python
ls
cd crawling
cd
cd crawling
ls
cd python
ls
cd python
li
ls
cd ..
cd server
ls
cd hufs
ls
cd ..
cd python
cd ..
cd python
ls
cd crawling
ls
ls
cd python
ls
ls
cd ..
cd var/log/
clear
;;
ll
cd nginx/
ls
vi error.log 
clear
vi access.log 
clear
cd ..
ls
vi auth.log 
clear
ls
vi kern.log 
claer
clear
ll
ls
vi btmp 
sudo vi btmp
last -f /var/log/wtmp 
docker
git -v
git --version
ls
mpstat
top
git checkout
cd front
sc hufs
cd hufs
ls
cd ..
cd server/hufs/controllers/
vim common.js 
cd ...
cd ..
cd server/hufs
vim app.js
cd ..
git reset --hard df4a33d0da6a82d7ed5ce4626542d1996020f57b
ls -al
cd server/hufs/controllers/
vim common.js 
clear
ls
google-chrome --version
rm -rf chromedriver
rm -rf chromedriver_linux64.zip 
clear
vi README.md 
clear
ls -al
cd server/
cd hufs/
ls
clear
nodemon app.js 
clear
ll
NODE_ENV=production pm2 start app.js --max-memory-restart 64M --name hufs -i 0 -o ./api.log -e ./api.log --merge-logs --watch
clear
ls
ls -al
clear
pm2 monit
clear
pm2 list
clear
pm2 list
pm2 monit
clear
exit
top
vim server/hufs/controllers/common.js 
top
cd front/hufs
ls
cd front
ls
mkdir hufs
cd hufs
vim index.html
ls
top
ps
ps -al
service --status-all
top
cd server/hufs
cd ..
cd server/hufs
ls
vim app.js
pm2 monit
vim app.js
node
port=3000 node
pm2 monit
node
git log
top
kill 1822
top
cd ..
ls
ls -al
cd server/hufs/
ls
cd server/hufs
vim .env
clear
cd server/
cd hufs/
ls
tail -f api.log 
clear
tail -f api.log 
clear
vi package.json 
clear
pm2 list
clear
nodemon app.js 
clear
NODE_ENV=production pm2 start app.js --max-memory-restart 64M --name “app_name" -i 0 -o ./api.log -e ./api.log --merge-logs
:q

NODE_ENV=production pm2 start app.js --max-memory-restart 64M --name hufs -i 0 -o ./api.log -e ./api.log --merge-logs --start
NODE_ENV=production pm2 start app.js --max-memory-restart 64M --name hufs -i 0 -o ./api.log -e ./api.log --merge-logs --watch
clear
exit
top
ls
ls -al
cd .pm2
ls
vim pm2.log
pm2 monit
cd server/hufs
cd ..
cd server/hufs
ls -al
vim .env
clear
pm2 list
pm2 monit
pm2 stop 0
pm2 delete 0
pm2 list
clear
ls
pm2 monit
clear
ls -al
rm -rf README.md 
rm -rf .git .gitignore 
ls -al
clear
ls -al
clear
exit
top
google-chrome --version
python3
python3 test.py
cd python
cd crawling
python3 test.py
python3
cd python
cd crawling
rm test.py
cd python
cd crawling
python3
sudo apt-get install xvfp
pip install xvfpwrapper
ubuntu apt update
apt update
pip install webdriver-manager
from selenium import webdriver
python3
google-chrome --version
wget -N https://chromedriver.storage.googleapis.com/101.0.4951.41/chromedriver_linux64.zip
unzip chromedriver_linux64.zip
rm chromedriver_linux64.zip
python3
pip3 install beautifulsoup4
python3
pip3 install pymysql
sudo apt-get install python3-pandas
python3 -V
pip3 -V
pip3 install pandas
cd python
cd crawling
python3
cd python
cd crawling
python3 test.py
rm test.py
python3 test.py
cd python3
cd crawling
cd python
cd crawling
python3
cd python
cd crawling
python3 test.py
cd python/crawling
vi test.py
cd python/crawling
vi test.py
python3 test.py
cd python/crawling
rm test.py
ls
python3 test.py
cd python/crawling
python3 test_selenium.py
cd python/crawling
rm test_selenium.py
ls
python3
cd python/crawling
vi test.py
python3 test.py
cd python/crawling
rm test.py
python3 print('hello world').py
rm print('hello world').py
mv print('hello world').py test1.py
rename ( a print('hello world').py
rm print'hello world'.py
rm printhelloworld.py
ls
rm 'print('\''hello world'\'').py'
ls
python3 hello.py
rm hello.py
pm2 list
clear
cd python/crawling
rm test.py
ls
cd python/crawling
python3 kakaomap_crawling.py
cd python/crawling
python3 kakaomap_crawling.py
cd python/crawling
rm kakaomap_crawling.py
python3 kakaomap.py
rm kakaomap.py
python3 kakaomap.py
cd python/crawling
rm kakaomap.py
ls
python3 kakaomap.py
clear
ls -al
vi .python_history
cd server/
ls
cd hufs/
ls
vi api.log 
clear
ls -al
vi .env 
clear
pm2 list
clear
cd ..
ls
cd ..
cd /var/log/
ls
vi syslog.1
vi kern.log
cd mysql/
ll
vu error.log 
vi error.log 
clear
cd ..
ls
cd nginx/
ls
vi error.log
cd ..
ls
vi apport.log
vi btmp
vi alternatives.log
clear
ls
vi ubuntu-advantage.log 
vi syslog
clear
df -h
find /home/ubuntu -size +100000 -print
find /var/log -size +100000 -print
sudo find /var/log -size +100000 -print
cd ..
ls
clear
exit
top
ls
ls -al
cd .pm2
ls
vim pm2.log
pm2 monit
cd ..
ls
cd front
ls
mp2 monit
ls -al
cd .pm2
ls -al
cd ..
cd .pm2
ls
vim pm2.log
cd python/crawling
rm kakaomap.py
cd python/crawling
rm kakaomap.py
cd server/hufs
ls
vim app.js
npm install
node app.js
ls
cd package.json
vim package.json
npm install
node app.js
npm
npm ls
node app.js
mkdir mmiddlewares
rename mmiddlewares
rename mmiddlewares middlewares
mv mmiddlewares middlewares
ls
node app.js
vim app.js
node app.js
top
cd server/hufs
pm2 start app.js
pm2 monit
top
pm2 start app.js
pm2 monit
pm2 status
pm2 delete 0
ls
ls -al
cd ..
ls
ls -al
cd .pm2
ls
vim pm2.log
ls
ls -al
find / -name ecosystem.config.js
/home/ubuntu/.nvm/versions/node/v16.14.2/lib/node_modules/pm2/lib/templates/sample-apps/http-server/ecosystem.config.js
cd /home/ubuntu/.nvm/versions/node/v16.14.2/lib/node_modules/pm2/lib/templates/sample-apps/http-server/ecosystem.config.js
vim /home/ubuntu/.nvm/versions/node/v16.14.2/lib/node_modules/pm2/lib/templates/sample-apps/http-server/ecosystem.config.js
cd /home/ubuntu/.nvm/versions/node/v16.14.2/lib/node_modules/pm2/
ls

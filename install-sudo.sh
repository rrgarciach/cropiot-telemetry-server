git clone https://gitlab.com/st42/termux-sudo
pkg install ncurses-utils -y
cd termux-sudo
cat sudo > /data/data/com.termux/files/usr/bin/sudo
chmod 700 /data/data/com.termux/files/usr/bin/sudo

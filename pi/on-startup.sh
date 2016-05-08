#!/usr/bin/env bash

cd "$(dirname "$0")"

# hide the mouse pointer
unclutter &

# start the pigpio daemon
sudo pigpiod

# start the uinput kernel module
sudo modprobe uinput

# start monitoring the GPIO
lxterminal --command="sudo python rotary_to_keypress.py" --title="GPIO"

# start the webserver
cd ../dist
lxterminal --command="python -m SimpleHTTPServer" --title="Webserver"
# --working-directory="$(dirname "$0")/../dist"

sleep 2

# Auto run the browser
xset s off
xset -dpms
xset s noblank
midori -e Fullscreen -a http://localhost:8000

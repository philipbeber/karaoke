#!/usr/bin/env bash

cd "$(dirname "$0")"

function install_pigpio {
  rm pigpio.zip
  sudo rm -rf PIGPIO
  wget abyz.co.uk/rpi/pigpio/pigpio.zip
  unzip pigpio.zip
  cd PIGPIO
  make -j4
  sudo make install
}

function apt_get_stuff {
  # You don't have to remove wolfram-engine but it makes apt-get update/upgrade a million times faster
  sudo apt-get remove wolfram-engine
  sudo apt-get update
  sudo apt-get upgrade
  sudo apt-get install nodejs npm python-gpiozero midori libudev-dev
}

function install_uinput {
  wget http://tjjr.fi/sw/python-uinput/releases/python-uinput-0.10.2.tar.gz
  tar -xzf python-uinput-0.10.2.tar.gz
  cd python-uinput-0.10.2
  python setup.py build
  sudo python setup.py install
  cd ..
}  

function set_autostart {
  if [ ! -f /etc/xdg/lxsession/LXDE/autostart.backup ]; then
    sudo cp /etc/xdg/lxsession/LXDE/autostart /etc/xdg/lxsession/LXDE/autostart.backup
  fi
  sudo cp autostart /etc/xdg/lxsession/LXDE/autostart
}


apt_get_stuff
install_uinput

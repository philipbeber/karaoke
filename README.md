# Campfire Karaoke

The campfire karaoke machine is a small device which displays lyrics and chords to aid singalongs around a fire.

## To run locally for testing purposes

Install NPM: https://www.npmjs.com/

`npm install -g bower grunt-cli`
`npm install`
`bower install`
`grunt serve`

Press 'X' to simulate clicking the hardware button.
Press 'N' to simulate anti-clockwise scroll.
Press 'M' to simulate clockwise scroll.

## Actual setup

You will need:

- Raspberry Pi 2
- Battery-powered projector
- Rotary encoder with push button (https://www.adafruit.com/products/377)
- White sheet
- Guitar
- Firewood

On the rotary encoder one side has three legs and the other has two. On the side with three legs connect the middle leg to ground. Connect the left leg to pin 8 (Broadcom numbering) and the right leg to pin 7.

On the side with two legs connect one leg to ground and the other to pin 2. Doesn't matter which way round they are connected.

Run `pi/setup-pi.sh`

This will install the necessary packages and set the Pi to run on-startup.sh when booting up.

Now run on-startup.sh or reboot to start the app. It has three parts:

1. A simple python program which runs as sudo which monitors the GPIO and translates movement of the wheel into key presses. Emulating key presses seemed like the easiest way to communicate from sudo to non-sudo without opening any security holes.

2. A simple webserver which serves the content in the dist folder to http://localhost:8000.

3. A browser running full-screen, pointed at http://localhost:8000.


Now connect the Pi to the projector, stretch the sheet between a couple trees, grab the guitar and start singing, while your friends make a nice fire to sit around.

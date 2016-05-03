from gpiozero import LED
from gpiozero import Button

import time
import pigpio
import rotary_encoder

import uinput

device = uinput.Device([
    uinput.KEY_X,
    uinput.KEY_N,
    uinput.KEY_M,
    ])

led = LED(17)
button = Button(2)

def pushedme():
    print('You pushed me')
    device.emit_click(uinput.KEY_X)


button.when_pressed = pushedme

pos = 0

def callback(way):
   global pos
   pos += way
   print("pos={}".format(pos))
   if way < 0:
       device.emit_click(uinput.KEY_N)
   else:
       device.emit_click(uinput.KEY_M)

pi = pigpio.pi()
decoder = rotary_encoder.decoder(pi, 7, 8, callback)

time.sleep(20)
decoder.cancel()
pi.stop()

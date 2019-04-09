#!/usr/bin/env python3


# + + + + + + + + + + + + + + + +
# Receive text via WebSocket and play it back
# on ...


import asyncio
import datetime
import websockets
import json
import colorsys
import sys

import time
import board
import neopixel

NUM_STRIPS = 10
LEDS_PER = 32

ADDR = 'localhost'
PORT = 8080
#5678

# Choose an open pin connected to the Data In of the NeoPixel strip, i.e. board.D18
# NeoPixels must be connected to D10, D12, D18 or D21 to work.
pixel_pin = board.D18

# The number of NeoPixels
num_pixels = NUM_STRIPS * LEDS_PER

# The order of the pixel colors - RGB or GRB. Some NeoPixels have red and green reversed!
# For RGBW NeoPixels, simply change the ORDER to RGBW or GRBW.
ORDER = neopixel.GRB

pixels = neopixel.NeoPixel(pixel_pin, num_pixels, brightness=0.2, auto_write=False,
                           pixel_order=ORDER)





print('Receive text via WebSocket and play it back on a 32x10 grid of WS2312b addressable LEDs.')


async def listen_messages1(websocket, path):
    while True:
        msg = await websocket.recv()
        await websocket.send('Hi, we got your message.')
        print('Received message from client.')
        try:
            decoded = bytearray(msg)
            print_receipt(decoded)
        except (ValueError, KeyError, TypeError):
            print("Data format error")

async def listen_messages(websocket, path):
    while True:
        msg = await websocket.recv()
        await websocket.send("Hi, we got your message.")
        print("Received message from client.")
        try:
            print(msg)
        except (ValueError, KeyError, TypeError):
            print("Data format error")


@asyncio.coroutine
def listen_messages999(ws, path):
    ws = yield from websockets.connect('ws://localhost:' + PORT + '/')
    while True:
        try:
            msg = yield from ws.recv()
            #await websocket.send('Hi, we got your message.')
            #print('Received message from client.')
            decoded = bytearray(msg)
            refresh_grid(decoded)
        finally:
            yield from ws.close()
        #except (ValueError, KeyError, TypeError):
        #    print("Data format error")


def from_rgb(rgb):
    #translates an rgb tuple of int to a tkinter friendly color code
    return "#%02x%02x%02x" % rgb

# def print_receipt(decoded_colors_array):
#     rows = 16
#     cols = 16
#     for i in range(rows):
#         for j in range(cols):
#             r = decoded_colors_array[i * cols + 3 * j + 0]
#             g = decoded_colors_array[i * cols + 3 * j + 1]
#             b = decoded_colors_array[i * cols + 3 * j + 2]
#             print((r, g, b))
# def print_receipt(decoded_colors_array):
#     NUM_STRIPS = 10
#     LEDS_PER = 32
#     for i in range(NUM_STRIPS):
#         for j in range(LEDS_PER):
#             c = decoded_colors_array[i * LEDS_PER + j]
#             print(f"{i * LEDS_PER + j} {c}")
#     print('--------')

def refresh_gridOLD(decoded_colors_array):
    for i in range(NUM_STRIPS):
        for j in range(LEDS_PER):
            c = decoded_colors_array[i * LEDS_PER + j]
            pixels[i] = c
    pixels.show()

def refresh_grid(colors_array):
    for i in range(len(colors_array)):
        pixels[i] = colors_array[i]
    pixels.show()


start_server = websockets.serve(listen_messages, ADDR, PORT)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()




# + + + + + + + + + + + + + + + + + + + + + + + +
# def main():
#     scroll_text()

# if __name__ == "__main__":
#     main()



# from tkinter import *

# sp = 2
# side = 24
# rows = 16
# cols = 16
# margin = 8
# wd = cols * side + (cols-1) * sp + 2 * margin
# ht = rows * side + (rows-1) * sp + 2 * margin
# gui = Tk()
# gui.geometry(str(wd) + "x" + str(ht))
# gui.title("Drawing from Websockets")
# c = Canvas(gui, bg="#000000", width=wd ,height=ht)
# c.pack()
# x0 = margin
# y0 = margin

# def refresh_grid(decoded_colors_array):
#     print('hello')
#     for s in range(rows):
#         py1 = y0 + s * (side + sp)
#         py2 = py1 + side
#         for t in range(cols):
#             r = decoded_colors_array[s * cols + 3 * t + 0]
#             g = decoded_colors_array[s * cols + 3 * t + 1]
#             b = decoded_colors_array[s * cols + 3 * t + 2]
#             color = from_rgb((r,g,b))
#             px1 = x0 + t * (side + sp)
#             px2 = px1 + side
#             c.create_rectangle(px1, py1, px2, py2, fill=color, outline="")
#     gui.update()

# gui.mainloop()

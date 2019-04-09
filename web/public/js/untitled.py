from math import pi, cos, floor

tick = 0

NUM_STRIPS = 10
LEDS_PER = 32

# ----------------
# wavy.js 
def get_wave_strip(row_offset):
  temp = [];
  for i in range (LEDS_PER):
    angle = 2 * pi * i / LEDS_PER + row_offset + tick
    shade = (cos(angle) / 2 + 0.5) * 225 + 30;
    temp.append(shade)
  return temp


# ----------------
# noise.js 
# noise_scale = 0.28
# def get_noise_strip():
#   let temp = []
#   for x in range(LEDS_PER):
#     noise_val = noise((m_x + x) * noise_scale, (m_y + strip_num) * noise_scale)
#     temp.append(round(noise_val * 255))
#   }
#   return temp
# }
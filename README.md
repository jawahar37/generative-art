# generative-art

Code allows us draw in ways that aren't possible in other mediums. It allows us to create images from simple rules that deliver beautiful results.
Code can compute and draw many elements consistently, incorporate randomness, and allow interaction; aspects hard to achieve through other mediums.

Check out https://jawahar37.github.io/generative-art to play around with these projects live.

## 10 PRINT
10 PRINT is a program written in the early 80s to run on a COMMODORE 64 system to generate a beautiful maze with a simple condition. ```10 PRINT CHR$ (205.5 + RND (1)); : GOTO 10```
It prints either a \ or a / with a 50% probability for each. The result is a perfect example of complex behaviour emerging from a simple rule.

## Spirograph
Tracing the path of a circle rolling along the perimeter of another circle delivers beautiful curves. This can be simulated using simple trigonometry.

## Square bloom
Inspired by the [work of Richard Vigniel (RVig)](https://rvig.art/), square bloom is the first attempt at a complex piece. It's rule is simple: pick a random spot and draw the biggest square possible that won't collide with any existing square. Repeat this process till it becomes hard to find a new spot.
The result is a collage of squares that shows the beauty of randomness constrained by order. The inputs let you control the parameters that define the image. While reasonable inputs give a beautiful pattern, "invalid" ones like negative numbers give rather chaotic but fun results.

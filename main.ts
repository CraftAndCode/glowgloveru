function Random() {
    music.ringTone(randint(131, 988))
    strip.setBrightness(255)
    strip.setPixelColor(randint(0, 9), neopixel.rgb(randint(0, 128), randint(0, 128), randint(0, 128)))
    strip.show()
    basic.pause(150 - Math.map(Math.abs(input.rotation(Rotation.Pitch)), 0, 90, 0, 100))
    music.stopAllSounds()
    basic.pause(150 - Math.map(Math.abs(input.rotation(Rotation.Pitch)), 0, 90, 0, 100))
}
function ScreenUpdate() {
    if (GloveMode == 1) {
        basic.showLeds(`
            . . . . .
            # . . # .
            # # # # #
            # . . . .
            . . . . .
            `)
    } else if (GloveMode == 2) {
        basic.showLeds(`
            . . . . .
            # # # . #
            # . # . #
            # . # # #
            . . . . .
            `)
    } else if (GloveMode == 3) {
        basic.showLeds(`
            . . . . .
            # . . . #
            # . # . #
            # # # # #
            . . . . .
            `)
    } else if (GloveMode == 4) {
        basic.showLeds(`
            . . . . .
            . . # # #
            . . # . .
            # # # # #
            . . . . .
            `)
    } else if (GloveMode == 5) {
        basic.showLeds(`
            . . . . .
            # . # # #
            # . # . #
            # # # . #
            . . . . .
            `)
    }
}
input.onButtonPressed(Button.A, function () {
    if (GloveMode == 5) {
        GloveMode = 1
    } else {
        GloveMode += 1
    }
    MusicPlaying = false
    music.stopAllSounds()
    music.setVolume(Mute * 255)
    music.playTone(262, music.beat(BeatFraction.Quarter))
    ScreenUpdate()
})
function ClawGlow() {
    for (let index = 0; index <= 63; index++) {
        if (input.buttonIsPressed(Button.B) || IsShaking) {
            return
        }
        pins.analogWritePin(AnalogPin.P2, index * 16)
        basic.pause(11 - Math.map(Math.abs(input.rotation(Rotation.Pitch)), 0, 90, 0, 10))
    }
    for (let index = 0; index <= 63; index++) {
        if (input.buttonIsPressed(Button.B) || IsShaking) {
            return
        }
        pins.analogWritePin(AnalogPin.P2, 1024 - index * 16)
        basic.pause(11 - Math.map(Math.abs(input.rotation(Rotation.Pitch)), 0, 90, 0, 10))
    }
}
function ColorFade(Color: number) {
    for (let index = 0; index <= 63; index++) {
        music.ringTone(262 + Math.map(Math.abs(input.rotation(Rotation.Pitch)), 0, 90, 0, 200))
        music.setVolume(Mute * (index * 4))
        if (input.buttonIsPressed(Button.A) || IsShaking) {
            return
        }
        strip.setBrightness(index)
        strip.showColor(Color)
        strip.show()
        basic.pause(10 - Math.map(Math.abs(input.rotation(Rotation.Pitch)), 0, 90, 0, 10))
    }
    for (let index = 0; index <= 63; index++) {
        music.ringTone(262 + Math.map(Math.abs(input.rotation(Rotation.Pitch)), 0, 90, 0, 200))
        music.setVolume(Mute * (128 - index * 4))
        if (input.buttonIsPressed(Button.A) || IsShaking) {
            return
        }
        strip.setBrightness(63 - index)
        strip.showColor(Color)
        strip.show()
        basic.pause(10 - Math.map(Math.abs(input.rotation(Rotation.Pitch)), 0, 90, 0, 10))
    }
}
function ClawBlink() {
    pins.digitalWritePin(DigitalPin.P2, 0)
    basic.pause(500 - Math.map(Math.abs(input.rotation(Rotation.Pitch)), 0, 90, 0, 170))
    pins.digitalWritePin(DigitalPin.P2, 1)
    basic.pause(500 - Math.map(Math.abs(input.rotation(Rotation.Pitch)), 0, 90, 0, 170))
}
function TwoColors(Color1: number, Color2: number) {
    for (let index = 0; index <= 5; index++) {
        music.ringTone(196)
        strip.setPixelColor(index * 2, Color1)
        strip.setPixelColor(index * 2 + 1, Color2)
        strip.show()
    }
    basic.pause(300 - Math.map(Math.abs(input.rotation(Rotation.Pitch)), 0, 90, 0, 150))
    music.stopAllSounds()
    basic.pause(300 - Math.map(Math.abs(input.rotation(Rotation.Pitch)), 0, 90, 0, 150))
    for (let index = 0; index <= 5; index++) {
        music.ringTone(131)
        strip.setPixelColor(index * 2, Color2)
        strip.setPixelColor(index * 2 + 1, Color1)
        strip.show()
    }
    basic.pause(300 - Math.map(Math.abs(input.rotation(Rotation.Pitch)), 0, 90, 0, 150))
    music.stopAllSounds()
    basic.pause(300 - Math.map(Math.abs(input.rotation(Rotation.Pitch)), 0, 90, 0, 150))
}
input.onButtonPressed(Button.AB, function () {
    if (Mute == 1) {
        Mute = 0
    } else {
        Mute = 1
    }
    music.setVolume(Mute * 255)
})
input.onButtonPressed(Button.B, function () {
    if (ClawMode == 4) {
        ClawMode = 1
    } else {
        ClawMode += 1
    }
    music.playTone(392, music.beat(BeatFraction.Quarter))
})
function Custom() {
    strip.clear()
    strip.show()
}
function Rainbow() {
    if (!(MusicPlaying)) {
        MusicPlaying = true
        music.startMelody(music.builtInMelody(Melodies.Nyan), MelodyOptions.Forever)
    }
    music.setTempo(Math.map(Math.abs(input.rotation(Rotation.Pitch)), 0, 90, 60, 180))
    strip.showRainbow(range1, range2)
    strip.easeBrightness()
    range1 += 2 + Math.map(Math.abs(input.rotation(Rotation.Pitch)), 0, 90, 0, 18)
    range2 += 2 + Math.map(Math.abs(input.rotation(Rotation.Pitch)), 0, 90, 0, 18)
    if (range1 > 360) {
        range1 = 0
        range2 = 348
    }
}
input.onGesture(Gesture.Shake, function () {
    MusicPlaying = false
    music.stopAllSounds()
    music.setVolume(Mute * 255)
    IsShaking = true
    for (let index = 0; index <= 10; index++) {
        strip.showColor(neopixel.colors(NeoPixelColors.Red))
        pins.digitalWritePin(DigitalPin.P2, 1)
        music.playTone(988, music.beat(BeatFraction.Sixteenth))
        music.playTone(784, music.beat(BeatFraction.Sixteenth))
        basic.pause(100 - index * 10)
        strip.showColor(neopixel.colors(NeoPixelColors.Black))
        music.playTone(880, music.beat(BeatFraction.Sixteenth))
        music.playTone(698, music.beat(BeatFraction.Sixteenth))
        pins.digitalWritePin(DigitalPin.P2, 0)
        basic.pause(100 - index * 10)
    }
    music.startMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.Once)
    basic.pause(750)
    IsShaking = false
})
let IsShaking = false
let MusicPlaying = false
let Mute = 0
let ClawMode = 0
let GloveMode = 0
let range2 = 0
let range1 = 0
let strip: neopixel.Strip = null
basic.showLeds(`
    . . . . .
    # . . # .
    # # # # #
    # . . . .
    . . . . .
    `)
strip = neopixel.create(DigitalPin.P1, 10, NeoPixelMode.RGB)
range1 = 0
range2 = 348
GloveMode = 1
ClawMode = 1
Mute = 1
basic.forever(function () {
    if (!(IsShaking)) {
        if (ClawMode == 1) {
            ClawGlow()
        } else if (ClawMode == 2) {
            ClawBlink()
        } else if (ClawMode == 3) {
            pins.digitalWritePin(DigitalPin.P2, 1)
        } else if (ClawMode == 4) {
            pins.digitalWritePin(DigitalPin.P2, 0)
        }
    }
})
basic.forever(function () {
    strip.setBrightness(63)
    if (!(IsShaking)) {
        if (GloveMode == 1) {
            Rainbow()
        } else if (GloveMode == 2) {
            Random()
        } else if (GloveMode == 3) {
            TwoColors(neopixel.colors(NeoPixelColors.Red), neopixel.colors(NeoPixelColors.Green))
        } else if (GloveMode == 4) {
            ColorFade(neopixel.colors(NeoPixelColors.Blue))
        } else if (GloveMode == 5) {
            Custom()
        }
    }
})

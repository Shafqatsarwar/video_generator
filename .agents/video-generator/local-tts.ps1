Add-Type -AssemblyName System.Speech
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
$text = $args[0]
$output = $args[1]
$synth.SetOutputToWaveFile($output)
$synth.Speak($text)
$synth.Dispose()

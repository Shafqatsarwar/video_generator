Add-Type -AssemblyName System.Speech
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer

$text = $args[0]
$output = $args[1]
$genderStr = $args[2] # "Female" or "Male"

if ($genderStr -eq "Male") {
    $synth.SelectVoiceByHints([System.Speech.Synthesis.VoiceGender]::Male)
} else {
    $synth.SelectVoiceByHints([System.Speech.Synthesis.VoiceGender]::Female)
}

$synth.SetOutputToWaveFile($output)
$synth.Speak($text)
$synth.Dispose()

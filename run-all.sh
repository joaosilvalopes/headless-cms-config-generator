#!/usr/bin/env bash

function run-in-new-tab() {
	window="$(xdotool search --class gnome-terminal | head -1)"
	xdotool windowfocus $window
	xdotool key ctrl+shift+t
	xdotool type "$*"
	xdotool key Return
}


run-in-new-tab 'cd client && npm run start'

cd server && npm run start


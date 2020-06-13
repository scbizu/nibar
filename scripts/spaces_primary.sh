#!/bin/sh

PATH=/usr/local/bin/:$PATH

# Check if yabai exists
if ! [ -x "$(command -v yabai)" ]; then
  echo "{\"error\":\"yabai binary not found\"}"
  exit 1
fi

SPACES_PRIMARY=$(yabai -m query --spaces --display 1)


BATTERY_PERCENTAGE=$(pmset -g batt | egrep '([0-9]+\%).*' -o --colour=auto | cut -f1 -d'%')
BATTERY_STATUS=$(pmset -g batt | grep "'.*'" | sed "s/'//g" | cut -c 18-19)
BATTERY_REMAINING=$(pmset -g batt | egrep -o '([0-9]+%).*' | cut -d\  -f3)

BATTERY_CHARGING=""
if [ "$BATTERY_STATUS" == "Ba" ]; then
  BATTERY_CHARGING="false"
elif [ "$BATTERY_STATUS" == "AC" ]; then
  BATTERY_CHARGING="true"
fi

TIME=$(date +"%H:%M")
DATE=$(date +"%a %d/%m")

echo $(cat <<-EOF
{
  "spaces_primary": $SPACES_PRIMARY,
   "battery": {
       "percentage": $BATTERY_PERCENTAGE,
       "charging": $BATTERY_CHARGING,
       "remaining": "$BATTERY_REMAINING"
   },
    "datetime": {
        "time": "$TIME",
        "date": "$DATE"
    }
}
EOF
)

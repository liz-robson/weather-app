import React from 'react'

export default function getDayOrNightIcon(
    iconName: string,
    dateTimeString: string,
) : string {
    const hours = new Date(dateTimeString).getHours(); // Get hours from the given date and time
    const isDayTime = hours > 6 && hours < 18; // Check if it is day time
    return isDayTime ? iconName.replace(/.$/, "d") : iconName.replace(/.$/, "n")
}

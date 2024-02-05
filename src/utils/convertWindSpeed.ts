export function convertWindSpeed(speedInMetresPerSecond: number) : string {
    const speedInKilometresPerHour = speedInMetresPerSecond * 3.6;
    return `${speedInKilometresPerHour.toFixed(0)}km/h`;
}
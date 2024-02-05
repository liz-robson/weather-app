export default function convertMetresToKilometres(visibilityInMetres: number) : string {
    const visibilityInKilometres = visibilityInMetres / 1000;
    return `${visibilityInKilometres.toFixed(0)}km`;
}
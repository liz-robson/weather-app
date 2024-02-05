
export default function convertKelvinToCelsius(tempinKelvin: number) : number {  
    return Math.round(tempinKelvin - 273.15);
}
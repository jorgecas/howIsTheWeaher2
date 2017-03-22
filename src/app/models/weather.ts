export class CurrentWeather {
    public Location: Location;

    public Temperature: number;
    public Condition: string;
    public Humidity: number;
    public WindSpeed: number;
    public WindDirection: string;
    public Pressure: number;
    public Precip: number;
    public Icon: string;
    public Date: Date;
    public Units: any;

    private DefaultValue: string = "n/a";

    constructor(location?: Location, condition?: string, temperature?: number, humidity?: number, windSpeed?: number, windDirection?: string, pressure?: number, precip?: number, date?: Date, icon?: string, units?: any) {
        this.Condition = condition || this.DefaultValue;
        this.Date = date;
        this.Humidity = humidity;
        this.Icon = icon;
        this.Location = location || new Location();
        this.Precip = precip;
        this.Pressure = pressure;
        this.Temperature = temperature;
        this.Units = units;
        this.WindDirection = windDirection;
        this.WindSpeed = windSpeed;
    }
}

export class DayWeather {
    public MaxTemperature: number;
    public MinTemperature: number;
    public Condition: string;
    public Icon: string;
    public Date: Date;

    constructor(maxTemp?: number, minTemp?: number, condition?: string, icon?: string, date?: Date) {
        this.MaxTemperature = maxTemp;
        this.MinTemperature = minTemp;
        this.Condition = condition;
        this.Icon = icon;
        this.Date = date;
    }
}

export class Forecast {
    public Days: DayWeather[];
    public Units: any;

    constructor(days?: DayWeather[], units?: any) {
        this.Days = days;
        this.Units = units;
    }
}
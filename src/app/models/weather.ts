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

    private DefaultValue: string = "n/a";    

    constructor(location?: Location, condition?: string, humidity?: number, windSpeed?: number, windDirection?: string, pressure?: number, precip?: number, date?: Date, icon?: string) {
        this.Location = location || new Location();
        this.Condition = condition || this.DefaultValue;
        this.Humidity = humidity;
        this.WindSpeed = windSpeed;
        this.WindDirection = windDirection;
        this.Pressure = pressure;
        this.Precip = precip;
        this.Date = date;
        this.Icon = icon;
    }
}

export class DayWeather {
    public MaxTemperature: number;
    public MinTemperature: number;
    public Condition: string;
    public Icon: string;
    public Date: Date;
}

export class Forecast {
    public Days: DayWeather[];

    constructor(days?: DayWeather[]) {
        this.Days = days;
    }
}
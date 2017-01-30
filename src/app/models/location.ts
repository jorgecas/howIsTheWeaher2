export class Location {
    public Id: string;
    public Country: string;
    public CountryCode: string;
    public City: string;
    public Region: string;
    public PostalCode: string;
    public Latitude: number;
    public Longitude: number;
    public TimeZone: string;

    public DefaultValue: string = "n/a";

    constructor(country?: string, countryCode?: string, city?: string, region?: string, postal?: string, lat?: number, lon?: number, timezone?: string, id?:string) {
        this.Country = country;
        this.CountryCode = countryCode;
        this.City = city;
        this.Region = region;
        this.PostalCode = postal;
        this.Latitude = lat;
        this.Longitude = lon;
        this.TimeZone = timezone;
        this.Id = id;
    }

    toString() {
        return `${this.City} - ${this.Region} - ${this.Country} ${this.CountryCode || ''} (${this.PostalCode || this.DefaultValue})`;
    }
}
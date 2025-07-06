/**
 *  WeatherController.js 使用的 model
 */
export class SunsetRecord {
    constructor(raw) {
        const loc = raw.records.locations.location?.[0];
        const time = loc?.time?.[0];

        this.county = loc?.CountyName ?? '未知';
        this.date = time?.Date ?? '無資料';
        this.sunsetTime = time?.SunSetTime ?? '無資料';
    }

    toString() {
        return `${this.date} ${this.county} 日沒時間為 ${this.sunsetTime}`;

    }
}
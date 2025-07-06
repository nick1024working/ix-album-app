import { SunraiseSunsetRecord } from '../models/SunraiseSunsetRecord.js';

/**
 * WeatherController：用於從中央氣象局 API 取得日出日沒資料的控制器。
 *
 * @param {Object} view - 處理畫面顯示的物件。
 * @param {Function} view.showSunraiseSunset - 必填。當資料成功取得時呼叫，傳入解析後的資料。
 * @param {Function} view.showError - 必填。當資料取得失敗時呼叫，傳入錯誤訊息字串。
 */
export class WeatherController {
    constructor(view) {
        this.Authorization = 'CWA-9EFA0518-69FE-45F6-9630-C62794BD9C0D';
        this.view = view;
    }

    /**
     * @return {SunraiseSunsetRecord}
     */
    async fetchSunraiseSunset(date) {
        try {
            const url = new URL('https://opendata.cwa.gov.tw/api/v1/rest/datastore/A-B0062-001');
            url.searchParams.set('Authorization', this.Authorization);
            url.searchParams.set('limit', '1');
            url.searchParams.set('CountyName', '臺北市');
            url.searchParams.set('Date', date);
            url.searchParams.set('parameter', 'SunRiseTime,SunSetTime');
            const res = await fetch(url);
            const data = await res.json();

            const record = new SunraiseSunsetRecord(data);
            this.view.showSunset(record);
        } catch (err) {
            this.view?.showError?.('讀取失敗');
        }
    }
}
import { API } from "@/apis/api";

import { IResponse } from "@/interfaces/response";

interface AddressCrawlStatus {
    isCrawling: boolean;
    start: Date | null;
    end: Date | null;
    duration: string;
    stat: Stat;
}

interface Stat {
    provinces: Unit;
    districts: Unit;
    wards: Unit;
}

interface Unit {
    length: number;
    size: string;
}

interface Province {
    province_name: string;
    province_id: number;
}

interface District {
    district_id: number;
    district_name: string;
    province_id: number;
}

interface Ward {
    ward_code: string;
    ward_name: string;
    district_id: number;
}

export async function getAddressCrawlStatus(): Promise<AddressCrawlStatus> {
    return API.get<IResponse<AddressCrawlStatus>>("/services/crawl-status").then((res) => res.data.data!);
}

export async function crawlAddresses(): Promise<AddressCrawlStatus> {
    return API.get<IResponse<AddressCrawlStatus>>("/services/crawl-addresses").then((res) => res.data.data!);
}

export async function getProvinces(): Promise<Province[]> {
    return API.get<Province[]>("/services/get-addresses/provinces").then((res) => res.data);
}

export async function getDistricts(): Promise<District[]> {
    return API.get<District[]>("/services/get-addresses/districts").then((res) => res.data);
}

export async function getWards(): Promise<Ward[]> {
    return API.get<Ward[]>("/services/get-addresses/wards").then((res) => res.data);
}

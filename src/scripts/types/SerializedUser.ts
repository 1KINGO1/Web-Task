import {Course} from "./Course";

export interface SerializedUser {
    id: string;
    favorite: boolean;
    course: Course;
    bg_color: string;
    note: string | null;
    gender: string | null;
    title: string | null;
    full_name: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
    postcode: number | null;
    coordinates: Coordinates | null;
    timezone: Timezone | null;
    email: string | null;
    b_date: string | null;
    age: number | null;
    phone: string | null;
    picture_large: string | null;
    picture_thumbnail: string | null;
}
export interface Coordinates {
    latitude: string;
    longitude: string;
}
export interface Timezone {
    offset: string;
    description: string;
}

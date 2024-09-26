import {SerializedUser} from "../types/SerializedUser";
import {Course} from "../types/Course";
import UnserializedUser from "../types/UnserializedUser";

export function serializeUserArray(users: UnserializedUser[]): SerializedUser[] {
  return users.map((user) => serializeUser(user));
}
export function connect(usersArray1: SerializedUser[], usersArray2: SerializedUser[]): SerializedUser[] {
    const resultArr = usersArray1;

    for (let user of usersArray2) {
        const existingUser = resultArr.find((u) => {
            return (u.id === user.id) || (
                u.full_name === user.full_name &&
                u.email === user.email &&
                u.phone === user.phone
            );
        });

        if (existingUser) continue;
        resultArr.push(user);
    }

    return resultArr;
}
function generateID(): string {
    return Math.floor(Math.random() * 100000) + "";
}
function getRandomCourse(): Course {
    const courses = Object.values(Course);
    const randomIndex = Math.floor(Math.random() * courses.length);
    return courses[randomIndex];
}
function getRandomColor(): string {
    const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}
function serializeUser(user: UnserializedUser): SerializedUser {
    return {
        id:                 typeof user?.id === "string" ? user.id : generateID(),
        favorite:           user!.favorite ?? false,
        course:             user?.course ?? getRandomCourse(),
        bg_color:           user?.bg_color ?? getRandomColor(),
        note:               user?.note ?? "Empty note",
        gender:             user?.gender ?? null,
        title:              user?.title ?? user?.name?.title ?? null,
        full_name:          user?.full_name ?? (user?.name?.first ? `${user?.name?.first} ${user?.name?.last}` : null),
        city:               user?.city ?? user?.location?.city ?? null,
        state:              user?.state ?? user?.location?.state ?? null,
        country:            user?.country ?? user?.location?.country ?? null,
        postcode:           +(user?.postcode ?? user?.location?.postcode ?? 0) || null,
        coordinates:        user?.coordinates ?? user?.location?.coordinates ?? null,
        timezone:           user?.timezone ?? user?.location?.timezone ?? null,
        email:              user?.email ?? null,
        b_date:             user?.b_date ?? user?.dob?.date ?? null,
        age:                user?.age ?? user?.dob?.age ?? null,
        phone:              user?.phone ?? null,
        picture_large:      user?.picture_large ?? user?.picture?.large ?? null,
        picture_thumbnail:  user?.picture_thumbnail ?? user?.picture?.medium ?? null,
    };
}

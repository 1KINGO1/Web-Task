import {User} from "./User";
import {SerializedUser} from "./SerializedUser";

type UnserializedUser = Partial<User> & Partial<SerializedUser>;

export default UnserializedUser;

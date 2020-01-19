import { User } from './models/User';
import axios from 'axios';

export const home: string = 'http://localhost:3000';

axios.post(home + "/users", {
    name: "myname",
    age: 20
});
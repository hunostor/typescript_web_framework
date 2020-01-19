import { User } from './models/User';

export const home: string = 'http://localhost:3000';

const user = new User({ name: 'new record', age: 0 });
//const user = new User({ id: 1 });

//user.set({ name: 'new name', age: 999 });

user.save();
import axios, { AxiosResponse } from 'axios';
import { home } from './../index';
import { Eventing } from './Eventing';

interface UserProps {
    id?: number;
    name?: string;
    age?: number;
}

export class User {
    public events: Eventing = new Eventing();
    
    constructor(private data: UserProps) {}

    get(propName: string): number | string {
        return this.data[propName];
    }

    set(update: UserProps): void {
        Object.assign(this.data, update);
    }

    fetch(): void {
        axios.get(home + "/users/" + this.get('id'))
            .then((response: AxiosResponse): void => {
                this.set(response.data);
            });
    }

    save(): void {
        const id = this.get('id');

        if(this.get('id')) {
            // put
            axios.put(home + `/users/${this.get('id')}`, this.data);
        } else {
            // poset
            axios.post(home + `/users`, this.data);
        }
    }
}

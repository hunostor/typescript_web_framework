import axios, { AxiosResponse } from 'axios';
import { home } from './../index';

interface UserProps {
    id?: number;
    name?: string;
    age?: number;
}

type Callback = () => void;

export class User {
    events: {[key: string]: Callback[] } = {};

    constructor(private data: UserProps) {}

    get(propName: string): number | string {
        return this.data[propName];
    }

    set(update: UserProps): void {
        Object.assign(this.data, update);
    }

    on(eventName: string, callback: Callback) {
        const handlers = this.events[eventName] || [];
        handlers.push(callback);
        this.events[eventName] = handlers;
    }

    trigger(eventName: string): void {
        const handlers = this.events[eventName];
        if(!handlers || handlers.length === 0) {
            return;
        }

        handlers.forEach(callback => {
            callback();
        });
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

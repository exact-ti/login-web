import { UserDetails } from '../model/userdetails.model';

export interface ILoginProvider<T> {

    login(usuario: string, password: string): T;

}
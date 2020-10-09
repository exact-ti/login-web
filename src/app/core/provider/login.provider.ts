export interface ILoginProvider<T> {

    login(usuario: string, password: string): T;

}
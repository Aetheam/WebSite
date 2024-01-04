export let connect = false;
export const connected = {
    isconnect(): boolean{
        return connect;
    },
    setConnected(value: boolean){
        connect = value;
    }
}
import { ActivityIndicator } from "react-native"

export const WithLoading = <T extends object>(Component: React.ComponentType<T>) => {
    return ( props: T & {isLoading: boolean}) => {
        return props.isLoading ? <ActivityIndicator size="large" color="blue"/> : <Component {...props as T} />;
    };
    }
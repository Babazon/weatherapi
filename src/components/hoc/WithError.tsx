import { Text } from "react-native"

export const WithError = <T extends object>(Component: React.ComponentType<T>) => {
    return ( props: T & {isError: boolean}) => {
        return props.isError ? <Text>An error happened</Text> : <Component {...props as T} />;
    };
}
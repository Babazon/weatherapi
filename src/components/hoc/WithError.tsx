import { Text } from "react-native"

export const WithError = <T extends object>(Component: React.ComponentType<T>) => {
    return (props: T & { isError: boolean }) => {
        return props.isError ? <Text testID="error-text">An error occurred.</Text> : <Component {...props as T} />;
    };
};

# Requirement
Create a function fetchApi that mimics an API call and correctly types the response

1. The function should take a generic type parameter T, representing the expected response data.
2. If the API returns an error, the data field should be never, and error should be a string.
3. If the API is successful, the data should contain the expected response type, and error should be never.

## Create a utility type DeepReadonly<T>

This should make all properties of an object recursively readonly.
Nested objects and arrays should also be deeply readonly.

## Create a type ExtractError<T>

This should extract the error field from an ApiResponse<T> if it exists.
If there is no error, it should return never.
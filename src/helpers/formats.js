

export const formatDate = date => new Date(date).toLocaleString();

export const formatString = (string, maxLength) => {
    return string.length > maxLength
        ? string.substring(0, maxLength) + '...'
        : string;
}

export const labelMixin = {
    methods: {
        // Function to transform camelCase input to title case
        getLabel(input) {
            // Split camelCase string into an array of words
            const words = input.split(/(?=[A-Z])/);
            // Capitalize the first letter of each word and join them back
            const result = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            return result;
        },
    },
};

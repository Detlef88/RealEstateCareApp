export const labelMixin = {
    methods: {
        getLabel(input) {
            const words = input.split(/(?=[A-Z])/);
            const result = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            return result;
        },
    },
};  
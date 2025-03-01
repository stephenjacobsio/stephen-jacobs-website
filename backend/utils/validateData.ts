export const validateContactForm = (data: {
    name?: string;
    email?: string;
    message?: string;
}): { valid: boolean; errors?: string[] } => {
    const errors: string[] = [];

    // Basic validation rules
    if (!data.name || data.name.trim().length < 2) {
        errors.push("Name must be at least 2 characters long.");
    }

    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.push("Invalid email address.");
    }

    if (!data.message || data.message.trim().length < 10) {
        errors.push("Message must be at least 10 characters long.");
    }

    return {
        valid: errors.length === 0,
        errors: errors.length > 0 ? errors : undefined,
    };
};
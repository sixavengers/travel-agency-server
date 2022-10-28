exports.registerUserService = async(data) => {
    try {
        const user = await User.create(data);
        return user;
    } catch (error) {
        throw error;
    }
}

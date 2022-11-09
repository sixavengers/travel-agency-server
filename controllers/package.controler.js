const createPackage = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({ messages: error?.messages });
    }
}
import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    try {
        const {success} = await ratelimit.limit(req.ip);
        if (!success) {
            return res.status(429).json({ message: "Too many requests. Please try again later." });
        }
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("Rate limiting error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export default rateLimiter;
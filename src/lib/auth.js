
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";

// Connect to MongoDB
const client = new MongoClient(process.env.MONGODB_URI || "mongodb://localhost:27017/bazardor");
const db = client.db("bazardor");

export const auth = betterAuth({
  database: db,
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    },
  },
});


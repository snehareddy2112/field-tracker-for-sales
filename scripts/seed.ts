import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import User from "../src/models/User";
import Lead from "../src/models/Lead";

import { users } from "../data/users";
import { leads } from "../data/leads";

dotenv.config({
  path: ".env.local",
});

async function seed() {
  try {
    //await mongoose.connect(process.env.MONGODB_URI!);
    await mongoose.connect(process.env.MONGODB_URI!, {
  dbName: "raha-field-tracker",
});

    console.log("✅ Connected to MongoDB");

    await User.deleteMany({});
    await Lead.deleteMany({});

    console.log("🗑️ Existing data removed");

    const createdUsers: Array<InstanceType<typeof User>> = [];

    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 12);

      const createdUser = await User.create({
        ...user,
        role: user.role as "branch_head" | "sales_associate",
        password: hashedPassword,
      });

      createdUsers.push(createdUser);
    }

    const branchHead = createdUsers.find(
      (user) => user.role === "branch_head"
    );

    await User.updateMany(
      {
        role: "sales_associate",
      },
      {
        manager: branchHead?._id,
      }
    );

    await Lead.insertMany(leads);

    console.log("✅ Users Seeded");
    console.log("✅ Leads Seeded");

    console.log("\n========== TEST CREDENTIALS ==========\n");

    users.forEach((user) => {
      console.log(`${user.role}`);
      console.log(`Email : ${user.email}`);
      console.log(`Password : ${user.password}`);
      console.log("--------------------------------------");
    });

    console.log("\n🌱 Database Seeded Successfully");

    process.exit(0);
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
}

seed();
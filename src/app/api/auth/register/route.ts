import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { registerSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input
    const validationResult = registerSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: validationResult.error.errors[0]?.message || "Invalid input",
        },
        { status: 400 }
      );
    }

    const { name, email, password, phone, role } = validationResult.data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Create user with profile based on role
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        phone: phone || null,
        role,
        ...(role === "STUDENT"
          ? {
              studentProfile: {
                create: {},
              },
            }
          : role === "TEACHER"
          ? {
              teacherProfile: {
                create: {
                  status: "PENDING",
                },
              },
            }
          : {}),
      },
      include: {
        studentProfile: role === "STUDENT" ? { select: { id: true } } : false,
        teacherProfile: role === "TEACHER" ? { select: { id: true } } : false,
      },
    });

    // Seed default platform settings if first user (likely admin setup)
    const settingsCount = await prisma.platformSetting.count();
    if (settingsCount === 0) {
      await prisma.platformSetting.createMany({
        data: [
          {
            key: "commission_percentage",
            value: "15",
            description: "Platform commission percentage on each payment",
          },
          {
            key: "max_classes_per_day_teacher",
            value: "8",
            description: "Maximum classes a teacher can have per day",
          },
          {
            key: "demo_class_duration",
            value: "30",
            description: "Default demo class duration in minutes",
          },
          {
            key: "scheduling_weeks_ahead",
            value: "4",
            description: "Number of weeks to schedule ahead",
          },
          {
            key: "buffer_between_classes",
            value: "15",
            description: "Buffer time in minutes between consecutive classes",
          },
        ],
      });
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        message: "Account created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create account. Please try again." },
      { status: 500 }
    );
  }
}

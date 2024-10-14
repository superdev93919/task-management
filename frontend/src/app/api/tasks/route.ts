import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_BACKEND_SERVER_URL;

export const GET = async () => {
  try {
    const response = await axios({
      method: "GET",
      url: "/tasks",
    });

    return NextResponse.json({
      data: response.data,
      status: "OK",
      message: "Get Tasks Successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "ERROR",
        message: "Server Error",
      },
      { status: 400 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const response = await axios({
      method: "POST",
      url: "/tasks",
      data: await req.json(),
    });
    return NextResponse.json({
      data: response.data,
      status: "OK",
      message: "Create New Task Successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "ERROR",
        message: "Server Error",
      },
      { status: 400 }
    );
  }
};

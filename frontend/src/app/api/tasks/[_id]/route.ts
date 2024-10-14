import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_BACKEND_SERVER_URL;

export const PUT = async (
  req: NextRequest,
  { params }: { params: { _id: string } }
) => {
  const _id = params._id;
  const body = await req.json();
  try {
    const response = await axios({
      method: "PUT",
      url: `/tasks/${_id}`,
      data: body,
    });
    return NextResponse.json({
      data: response.data,
      status: "OK",
      message: "Update Task Successfully.",
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

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { _id: string } }
) => {
  const _id = params._id;
  try {
    const response = await axios({
      method: "DELETE",
      url: `/tasks/${_id}`,
    });
    return NextResponse.json({
      status: "OK",
      message: "Deleted Task Successfully.",
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

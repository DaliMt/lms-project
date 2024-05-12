import { User } from "@/models/user";
import connectMongoDB from "@/lib/mongodb";

import { NextResponse } from "next/server";

//delete account
export async function DELETE(req,{params}){
    try {
        await connectMongoDB();
        await User.findByIdAndDelete(params.accountId);
        return NextResponse.json({message:"deleted success"},{status: 201});
    } catch (error) {
        console.log("[ACCOUNT_ID_DELETE]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

// update account
export async function PATCH(req, { params }) {
    try {
        const { accountId } = params;
        const values = await req.json();

        await connectMongoDB();
        const user = await User.findByIdAndUpdate(accountId, { ...values });
       
        return NextResponse.json(user, {
            message: "The account was updated succesfuly ",
          });

    } catch (error) {
        console.log("[ACCOUNT_ID]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }

}
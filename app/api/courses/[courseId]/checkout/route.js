import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import Course from "@/models/course";
import { Purchase, StripeCustomer } from "@/models/purchase";
import { stripe } from "@/lib/stripe";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req, { params }) {
  try {
    // const user = await currentUser();
    // if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }
    // const session = await getServerSession(authOptions);
    // const user = session?.data?.user._id; 

    const session = await getServerSession(authOptions);

    // Check if user session exists
    // if (!session || !session.data || !session.data.user || !session.data.user._id) {
    //   console.log("eroor cheackout :", session)
    //   console.log("eroor cheackout :", session.data)
    //   console.log("eroor cheackout :", session.data.user)
    //   console.log("eroor cheackout :", data.user._id)
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }

    const user = session.user;

    console.log("User data from checkout API:", user);

    console.log("userdata from cheack out api ::",user)

    const course = await Course.findOne({
      _id: params.courseId,
      isPublished: true,
    });
    const purchase = await Purchase.findOne({
      userId: user._id,
      courseId: params.courseId,
    });
    if (purchase) {
      return new NextResponse("Already Purchased", { status: 400 });
    }
    if (!course) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const lineItems = [
      {
        quantity: 1,
        price_data: {
          currency: "USD",
          product_data: {
            name: course.title,
          },
          unit_amount: Math.round(course.price * 100),
        },
      },
    ];

    let stripeCustomer = await StripeCustomer.findOne({ userId: user._id });

    if (!stripeCustomer) {
      const customer = await stripe.customers.create({
        email: user.email,
      });
      stripeCustomer = await StripeCustomer.create({
        userId: user._id,
        stripeCustomerId: customer.id,
      });
    }

    const session1 = await stripe.checkout.sessions.create({
        customer: stripeCustomer.stripeCustomerId,
        line_items: lineItems,
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.id}?success=1`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.id}?canceled=1`,
        metadata: {
            courseId: course.id,
            userId: user._id,
        },
    });

    return NextResponse.json({ url: session1.url });

  } catch (error) {
    console.log("COURSE_ID_CHECKOUT", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

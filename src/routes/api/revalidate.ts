import { createFileRoute } from "@tanstack/react-router";
import { env } from "cloudflare:workers";

import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";

const secret = env.SANITY_WEBHOOK_SECRET as string;

export const Route = createFileRoute("/api/revalidate")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        //validate signature from sanity
        // const signature = request.headers.get(SIGNATURE_HEADER_NAME) || "";
        // const body = await request.text();
        // console.log("Received body:", body);

        // if (!isValidSignature(body, signature, secret)) {
        //   console.log("Invalid signature");
        //   return new Response(JSON.stringify({ message: `Hello World!` }));
        // }

        console.log("Valid signature");
        // Process the webhook payload
        // Note: You would typically parse the body as JSON and handle it accordingly
        // For demonstration, we will just return a success response

        return new Response(
          JSON.stringify({ message: `Hello, World is success!` })
        );
      },
    },
  },
});

// const { isValidSignature, body } = await parseBody<{
//   _type: string;
//   cat: string;
// }>(request, secret);

//     if (!isValidSignature) {
//       return Response.json(
//         { success: false, message: "Invalid signature" },
//         { status: 401 }
//       );
//     }

//     try {
//       if (!body?._type || !body?.cat)
//         return Response.json({ message: "Incorrect type" });

//       const { _type, cat } = body;

//       switch (_type) {
//         case "catimage":
//           // always revalidate main page when an image is added
//           revalidatePath(`/`);

//           // cat can be "all" or a specific cat name
//           if (cat.length > 1) {
//             revalidatePath(`/all`);
//             return Response.json({
//               message: `Revalidated page for all cats`,
//             });
//           }

//           // revalidate page for specific cat
//           revalidatePath(`/${cat[0]}`);
//           return Response.json({
//             message: `Revalidated page for ${cat[0]}`,
//           });
//         case "catvideo":
//           revalidatePath(`/videos`);
//           return Response.json({ message: `Revalidated page for videos` });
//       }

//       return Response.json({ message: "Incorrect type" });
//     } catch (err) {
//       // If there was an error, Next.js will continue
//       // to show the last successfully generated page
//       return Response.json(
//         { message: "Error revalidating" },
//         { status: 500 }
//       );
//     }

//     return new Response("Hello, World!");
//   },
// },
// },
// });

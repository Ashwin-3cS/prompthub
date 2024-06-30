import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

// read the prompts (GET) 
export const GET = async (req , {params}) =>{ 
    try {
        await connectToDB();
        const prompt = await Prompt.findById(params.id).populate('creator');
        if(!prompt) return new Response("Prompt not found",{status : 404})
        return new Response(JSON.stringify(prompt),{status : 200})
    } catch (error) {
        return new Response ('Failed to fetch all prompts',{
            status : 500
        })
    }
}

//Patch the prompt (update)
export const PATCH = async (req , {params} )=> {
    const  { prompt, tag } = await req.json ();
    try {
        await connectToDB() ; 
        const existingPrompt  = await Prompt.findById(params.id);

        if(!existingPrompt) return new Response("Prompt not found",{status : 404})
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt),{status:200})
    } catch (error) {
        return new Response ('Failed to Update prompt',{
            status : 500
        })
    }
}


// export const DELETE = async (req, {params}) => {
//     try {
//         await connectToDB();
//         console.log(params)
//         await Prompt.findByIdAndRemove(params.id);
//         return new Response("Prompt deleted successfully")
//     } catch (error) {
//         return new Response("Failed to delete prompt",{
//             status : 500
//         })
//     }
// }

export const DELETE = async (req, { params }) => {
    try {
      await connectToDB();
  
      // Check if the prompt exists before deleting
      const existingPrompt = await Prompt.findById(params.id);
      if (!existingPrompt) {
        return new Response("Prompt not found", { status: 404 });
      }
  
      // Delete the prompt
    //   await Prompt.findByIdAndRemove(params.id);
    await Prompt.findByIdAndDelete(params.id);

  
      return new Response("Prompt deleted successfully");
    } catch (error) {
      console.error("Failed to delete prompt:", error);
      return new Response("Failed to delete prompt", { status: 500 });
    }
  };
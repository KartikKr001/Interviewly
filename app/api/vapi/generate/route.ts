import {generateText} from 'ai'
import {google} from '@ai-sdk/google'
import { getRandomInterviewCover } from '@/lib/utils';
import { db } from '@/firebase/admin';
export async function GET(){
    return Response.json({
        success : true,
        data : "Thank You"
    },{
        status : 200
    })
}


export async function POST(request : Request){
    const {type,
        role,
        level,
        techStack,
        userid,
        numberOfQues,
        // company
    } = await request.json();
    try{
        const {text:questions} = await generateText({
            model : google('gemini-2.0-flash-001'),
            
            // The company name is: ${company}.
            prompt: `Prepare questions for a job interview.
                    The job role is ${role}.
                    The job experience level is ${level}.
                    The tech stack used in the job is: ${techStack}.
                    The focus between behavioural and technical questions should lean towards: ${type}.
                    The amount of questions required is: ${numberOfQues}.
                    Please return only the questions, without any additional text.
                    The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break voice of assistant
                    Return the questions formatted like this:
                    ["Question 1", "Question 2", "Question 3"]`,
        })

        const interview = {
            role: role,
            level: level,
            techStack: techStack.split(','),
            type: type,
            questions: JSON.parse(questions),
            userid: userid,
            finalized : true,
            coverImage : getRandomInterviewCover(),
            createdAt : new Date().toISOString()
        }
        await db.collection("interviews").add(interview);

        return Response.json({
            success : true,
            data : "Interview created successfully"
            },{
            status : 200
        })
    }
    catch(error){
        console.log(error);
        return Response.json({
            success : false,
            message : "Error Occured",
            error : error
        },{status : 500});
            
    }

}
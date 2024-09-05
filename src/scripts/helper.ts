import { ResumeType } from '@/fakeData/personal';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define the tools
const tools: any = [
  {
    type: 'function',
    function: {
      name: 'update_resume',
      description: 'Update the resume to align with the job description.',
      parameters: {
        type: 'object',
        properties: {
          currentResume: {
            type: 'object',
            properties: {
              name: {
                type: 'object',
                properties: {
                  first: { type: 'string' },
                  middle: { type: 'string' },
                  last: { type: 'string' }
                },
                required: ['first', 'last']
              },
              contact: {
                type: 'object',
                properties: {
                  email: { type: 'string' },
                  phone: { type: 'string' },
                  personal_website: { type: 'string' },
                  linkedIn: { type: 'string' }
                },
                required: ['email', 'phone']
              },
              address: {
                type: 'object',
                properties: {
                  street: { type: 'string' },
                  city: { type: 'string' },
                  state: { type: 'string' },
                  zip: { type: 'string' }
                },
                required: ['street', 'city', 'state', 'zip']
              },
              experience: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    title: { type: 'string' },
                    company: { type: 'string' },
                    start: { type: 'string' }, // Date as ISO string
                    end: { type: 'string' },   // Date as ISO string
                    bullets: {
                      type: 'array',
                      items: { type: 'string' }
                    },
                    current: { type: 'boolean' }
                  },
                  required: ['title', 'company', 'bullets']
                }
              },
              education: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    school: { type: 'string' },
                    degree: { type: 'string' },
                    major: { type: 'string' },
                    location: {
                      type: 'object',
                      properties: {
                        city: { type: 'string' },
                        state: { type: 'string' }
                      },
                      required: ['city', 'state']
                    },
                    start: { type: 'string' }, // Date as ISO string
                    end: { type: 'string' },   // Date as ISO string
                    gpa: { type: 'number' },
                    current: { type: 'boolean' }
                  },
                  required: ['school', 'degree', 'major', 'location']
                }
              },
              skills: {
                type: 'array',
                items: { type: 'string' }
              },
              certificates: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    issuer: { type: 'string' },
                    issue_date: { type: 'string' }, // Date as ISO string
                    expiration_date: { type: 'string' } // Date as ISO string
                  },
                  required: ['name', 'issuer']
                }
              },
              projects: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    description: { type: 'string' },
                    start: { type: 'string' }, // Date as ISO string
                    end: { type: 'string' },   // Date as ISO string
                    bullets: {
                      type: 'array',
                      items: { type: 'string' }
                    },
                    current: { type: 'boolean' }
                  },
                  required: ['name', 'description', 'bullets']
                }
              }
            },
            required: ['name', 'contact', 'address', 'experience', 'education', 'skills', 'certificates', 'projects']
          },
          jobDescription: {
            type: 'string',
            description: 'The job description text'
          }
        },
        required: ['currentResume', 'jobDescription']
      }
    } as any
  }
];

// Define the function to generate the updated resume
export async function generateUpdatedResume(currentResume: ResumeType, jobDescription: string): Promise<ResumeType> {
  try {
    console.log("Starting the resume update process...");

    // Create the assistant
    const assistant = await openai.beta.assistants.create({
      name: 'Resume Assistant',
      model: 'gpt-4o',
      instructions: 'You are a resume assistant. Update the resume to fit the job description.',
      tools: tools
    });
    console.log("Assistant created:", assistant);

    // Create a thread
    const thread = await openai.beta.threads.create();
    console.log("Thread created:", thread);

    // Add a message to the thread
    const message = await openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: [
        {
          type: 'text',
          text: 'Update my resume based on the job description provided.'
        }
      ],
      metadata: {
        currentResume,
        jobDescription
      }
    });
    console.log("Message added to the thread:", message);

    // Start and poll the run
    const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
      assistant_id: assistant.id
    });
    console.log("Run started and polled:", run);

    // Handle the run status and submit tool outputs if required
    const handleRunStatus = async (run: any): Promise<any> => {
      console.log("Handling run status:", run.status);

      if (run.status === 'completed') {
        console.log("Run completed successfully.");
        const messages = await openai.beta.threads.messages.list(thread.id);
        console.log("Messages retrieved:", messages);
        return messages.data;
      } else if (run.status === 'requires_action') {
        console.log("Run requires action, submitting tool outputs...");
        const toolOutputs = run.required_action.submit_tool_outputs.tool_calls.map((tool: any) => ({
          tool_call_id: tool.id,
          output: JSON.stringify({ currentResume, jobDescription })
        }));

        await openai.beta.threads.runs.submitToolOutputsAndPoll(thread.id, run.id, {
          tool_outputs: toolOutputs
        });

        return handleRunStatus(run);
      } else {
        throw new Error('Run did not complete successfully.');
      }
    };

    const updatedMessages: any = await handleRunStatus(run);
    console.log("Updated messages:", updatedMessages);

    return updatedMessages; 
  } catch (error) {
    console.error('Error generating updated resume:', error);
    throw new Error('Error generating updated resume');
  }
}

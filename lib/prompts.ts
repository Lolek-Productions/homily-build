//These prompts contain text that will be replaced.

export const firstSetOfQuestionsPrompt = `Here are the readings: READINGS
Here is the context: CONTEXT
Here is what makes an excellent homily: DEFINITIONS
Generate thoughtful questions that explore the main themes and messages. 
These should be initial questions that help frame the homily's direction.  
Do not generate any other response other than the questions for the user to answer.
Preface your response by telling the user to read these questions and answer them in the same text area.  The user should add any additional comments or direction at the end of the list.`

export const secondSetOfQuestionsPrompt = `Here are the responses to your first set of questions: FIRST_SET_OF_QUESTIONS
Here is the context: CONTEXT
Here is what makes an excellent homily: DEFINITIONS
Generate one final set of questions before producing the final homily. 
Do not generate any other response other than the questions for the user to answer.
Preface your response by telling the user to read these questions and answer them in the same text area.  The user should add any additional comments or direction at the end of the list.`

export const finalDraftPrompt = `Here are the final responses to your second set of questions: SECOND_SET_OF_QUESTIONS
Here is the context: CONTEXT
Ensure that you abide by the context strictly.  When outputting the final draft, ensure that you output the homily in the language provided in the context.
Here is what makes an excellent homily: DEFINITIONS
Do not generate any other response other than the final draft of the homily`


export function getFirstSetOfQuestionsPrompt(homilyContent: HomilyContent): string {
  return replacePlaceholdersWithContent(firstSetOfQuestionsPrompt, homilyContent);
}

export function getSecondSetOfQuestionsPrompt(homilyContent: HomilyContent): string {
  return replacePlaceholdersWithContent(secondSetOfQuestionsPrompt, homilyContent);
}

export function getFinalDraftPrompt(homilyContent: HomilyContent): string {
  return replacePlaceholdersWithContent(finalDraftPrompt, homilyContent);
}

interface HomilyContent {
  definitions: string;
  readings: string;
  first_set_of_questions: string;
  second_set_of_questions: string;
  context: string;
}

export function replacePlaceholdersWithContent(content: string, homilyContent: HomilyContent): string {

  const definitions = { replaceText: 'DEFINITIONS', replaceWith: homilyContent.definitions };
  const readings = { replaceText: 'READINGS', replaceWith: homilyContent.readings };
  const first_set_of_questions = { replaceText: 'FIRST_SET_OF_QUESTIONS', replaceWith: homilyContent.first_set_of_questions };
  const second_set_of_questions = { replaceText: 'SECOND_SET_OF_QUESTIONS', replaceWith: homilyContent.second_set_of_questions };
  const context = { replaceText: 'CONTEXT', replaceWith: homilyContent.context };

  const placeholdersList = [definitions, readings, first_set_of_questions, second_set_of_questions, context];

  return placeholdersList.reduce((acc, { replaceText, replaceWith }) => {
    return acc.replace(new RegExp(replaceText, 'g'), replaceWith);
  }, content);
}


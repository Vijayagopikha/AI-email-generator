export const buildPrompt = (data) => {
  const {
    emailType,
    purpose,
    role,
    degree,
    experienceYears,
    experienceIn,
    tone,
    length,
  } = data;

  const type = emailType?.toLowerCase() || "";

  let extraRules = "";

  if (type.includes("leave")) {
    extraRules = `
- Mention leave dates clearly
- Keep it short
- Do NOT include degree or experience
- Include handover mention
`;
  } else if (type.includes("informal")) {
    extraRules = `
- Use friendly and casual tone
- No strict formatting needed
`;
  } else if (type.includes("pan")) {
    extraRules = `
- Write a formal request for PAN card
- Mention reason clearly
- Keep it polite
`;
  } else {
    extraRules = `
- Use professional tone
- Keep it concise
`;
  }

  return `
You are an expert email writer.

Write a ${emailType} email.

Context:
Purpose: ${purpose}
Tone: ${tone}
Length: ${length}

User Details (use only if relevant):
Role: ${role}
Degree: ${degree}
Experience: ${experienceYears} years in ${experienceIn}

${extraRules}

STRICT RULES:
- Follow correct format
- Avoid unnecessary content
- Do NOT include degree/experience unless needed
- Do NOT add extra explanations

Structure:
Subject
Greeting
Body
Closing
`;
};
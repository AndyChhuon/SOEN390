const parseJSONOrString = (input: any) => {
  if (typeof input === "string") {
    try {
      return JSON.parse(input); // Attempt to parse the input as JSON
    } catch (error) {
      return input; // Parsing failed, return the original string
    }
  }
  return input; // Return as-is if it's already a parsed object
};

export { parseJSONOrString };

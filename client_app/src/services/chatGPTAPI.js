let myHeaders = new Headers();
myHeaders.append(
  "Authorization",
  import.meta.env.VITE_VERCEL_ENV_API_KEY
);
myHeaders.append("Content-Type", "application/json");

const url = "https://api.openai.com/v1/completions";

export const PostQustionToChatGPT = async (
  raw,
  SetResultChatGPT,
  SetTextareaValue
) => {
  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  const response = await fetch(url, requestOptions);
  const data = await response.json();
  await SetResultChatGPT(data);

};

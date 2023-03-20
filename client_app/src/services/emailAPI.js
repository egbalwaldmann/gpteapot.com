const url = "https://server.gpteapot.com";

export const getEmails = async (SetGetEmail) => {
  const data = await fetch(url);
  const email = await data.json();
  SetGetEmail(email);
};

export const deleteEmail = async (id, SetGetEmail) => {
  const data = await fetch(
    `https://server.gpteapot.com/deleteEmail/${id}`,
    {
      method: "DELETE",
    }
  );
  SetGetEmail(data);
};

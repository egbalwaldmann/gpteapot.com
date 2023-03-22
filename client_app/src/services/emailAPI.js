const url = "https://server.gpteapot.com";

export const getEmails = async (SetGetEmail) => {
  const getEmail = await fetch(url);
  const email = await getEmail.json();
  SetGetEmail(email);
};

export const postEmails = async (email, SetGetEmail, id) => {
  const sending = await fetch(`${url}/postEmail`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: id,
      email: email,
    }),
  });
  const takeNewEmail = await sending.json();

  SetGetEmail(takeNewEmail);
};

export const deleteEmail = async (id, SetGetEmail) => {
  const data = await fetch(`${url}/deleteEmail/${id}`, {
    method: "DELETE",
  });
  SetGetEmail(data);
};

export const UpdateEmail = async (id, email, SetGetEmail) => {
  console.log(email, "*");
  const updatedata = await fetch(
    `https://server.gpteapot.com/update/${id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
      }),
    }
  );
  const updateEmail = await updatedata.json();
  console.log(updateEmail, " in api update email function");
  await SetGetEmail(updateEmail);
};
